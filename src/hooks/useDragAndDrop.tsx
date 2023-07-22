import { editItem } from '../apis/ItemAPI'
import { useEffect, useState } from 'react'

interface ItemType {
  id: number
  name: string
  progress_percentage: number
}

interface ItemData {
  [groupId: number]: ItemType[]
}

export function useDragAndDrop(
  initialItemData: ItemData,
  handleDataFetch: () => void
) {
  const [itemData, setItemData] = useState<ItemData>(initialItemData)

  useEffect(() => {
    // Update the itemData state whenever the initial data changes
    setItemData(initialItemData)
  }, [initialItemData])

  const handleDragEnd = (result: any) => {
    const { source, destination } = result

    // Check if the item is dropped to a valid position
    if (!destination) {
      return
    }

    // Check if the item is dropped to a different position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    // Check if the item is dragged within the same group
    if (source.droppableId === destination.droppableId) {
      return
    }

    // Get the source group and destination group
    const sourceGroupID = source.droppableId
    const destinationGroupID = destination.droppableId

    // Get the item that is being dragged
    const draggedItem = itemData[sourceGroupID][source.index]

    // Remove the item from the source group
    const updatedSourceItems = [...itemData[sourceGroupID]]
    updatedSourceItems.splice(source.index, 1)

    // Add the item to the destination group at the appropriate index
    const updatedDestinationItems = [
      ...itemData[destinationGroupID].slice(0, destination.index),
      draggedItem,
      ...itemData[destinationGroupID].slice(destination.index)
    ]

    // Update the itemData state
    setItemData((prevItemData) => ({
      ...prevItemData,
      [sourceGroupID]: updatedSourceItems,
      [destinationGroupID]: updatedDestinationItems
    }))

    // Send API request to update the item target_todo_id
    editItem(draggedItem.id, sourceGroupID, {
      targetID: destinationGroupID,
      name: draggedItem.name,
      progress_percentage: draggedItem.progress_percentage
    })
      .then(() => {
        handleDataFetch()
      })
      .catch(() => {
        alert('Error saat memindahkan task.')
      })
  }

  const moveTask = (
    groupID: number,
    taskID: number,
    taskIndex: number,
    task: ItemType,
    direction: 'left' | 'right',
    setLoad: (value: any) => void,
    groupData: any
  ) => {
    const availableGroups = groupData.map((group: any) => group.id)
    const currentIndex = availableGroups.indexOf(groupID)

    let targetGroupID: number | undefined
    if (direction === 'left') {
      targetGroupID = findPreviousGroup(availableGroups, currentIndex)
    } else if (direction === 'right') {
      targetGroupID = findNextGroup(availableGroups, currentIndex)
    }

    if (targetGroupID === undefined) {
      return // Handle the case when there is no targetGroupID found
    }

    // Check if itemData[groupID] exists before accessing it
    const sourceGroupItems = [...(itemData[groupID] || [])]
    const updatedSourceItems = sourceGroupItems.filter(
      (item) => item.id !== taskID
    )

    const destinationGroupItems = [...(itemData[targetGroupID] || [])]
    const updatedDestinationItems = [...destinationGroupItems, task]

    setItemData((prevItemData) => ({
      ...prevItemData,
      [groupID]: updatedSourceItems,
      [targetGroupID!]: updatedDestinationItems
    }))

    editItem(taskID, groupID, {
      targetID: targetGroupID,
      name: task.name,
      progress_percentage: task.progress_percentage
    })
      .then(() => {
        setLoad(new Date().getTime())
      })
      .catch((error) => {
        console.error('Error saat memindahkan task.', error)
      })
  }

  const findPreviousGroup = (groups: number[], currentIndex: number) => {
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (groups[i]) {
        return groups[i]
      }
    }
    return groups[currentIndex]
  }

  const findNextGroup = (groups: number[], currentIndex: number) => {
    for (let i = currentIndex + 1; i < groups.length; i++) {
      if (groups[i]) {
        return groups[i]
      }
    }
    return groups[currentIndex]
  }

  return { handleDragEnd, moveTask, findPreviousGroup, findNextGroup }
}
