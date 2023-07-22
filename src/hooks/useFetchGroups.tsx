import { useEffect, useState } from 'react'
import { getGroups } from '../apis/GroupAPI'

interface GroupData {
  id: number
  title: string
  description: string
}

export function useFetchGroups(load: number) {
  const [groupData, setGroupData] = useState<GroupData[]>([])

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response: any = await getGroups()
        const data: GroupData[] = response.data
        setGroupData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchGroups()
  }, [load])

  return groupData
}
