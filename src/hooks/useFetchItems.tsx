import { useEffect, useState } from 'react'
import { getItems } from '../apis/ItemAPI'

interface GroupData {
  id: number
}

interface ItemData {
  [groupId: number]: ItemType[] // ItemType should be defined based on your actual item data structure
}

interface ItemType {
  id: number
  name: string
  progress_percentage: number
  created_at: Date
  updated_at: Date
}

export function useFetchItems(groupData: GroupData[]) {
  const [itemData, setItemData] = useState<ItemData>({})

  useEffect(() => {
    const fetchItemsForGroups = () => {
      groupData.forEach((group) => {
        getItems(group.id)
          .then((response: any) => {
            const data: ItemType[] = response.data
            const sortedItems = sortItemsByTimestamp(data)
            setItemData((prevItems) => ({
              ...prevItems,
              [group.id]: sortedItems
            }))
          })
          .catch((error) => {
            console.error(error)
          })
      })
    }

    fetchItemsForGroups()
  }, [groupData])

  const sortItemsByTimestamp = (items: ItemType[]) => {
    return items.sort((a, b) => {
      const timestampA = new Date(a.updated_at || a.created_at)
      const timestampB = new Date(b.updated_at || b.created_at)
      return timestampB.getTime() - timestampA.getTime()
    })
  }

  return itemData
}
