import { useState } from 'react'
import SideNavGroupItem from './SideNavGroupItem'
import { Add } from '@mui/icons-material'

// fake data: group
const group = [
  {
    groupId: 9,
    groupName: '綠島 gogogo'
  },
  {
    groupId: 10,
    groupName: '嘉義三天二夜'
  },
  {
    groupId: 11,
    groupName: "Wang's Family"
  }
]

export default function SideNavGroup () {
  const [groupData, setGroupData] = useState({
    groupId: '',
    groupName: ''
  })
  return (
        <div className="flex flex-col mb-10">
            {/* add group */}
            <div className="flex items-center justify-between font-bold mb-12">
                <h4>群組</h4>
                <div className="flex items-center gap-2 text-colors-primary cursor-pointer">
                    <Add sx={{ fontSize: 20 }} />
                    <p>新增群組</p>
                </div>
            </div>
            {/* group list */}
            <ul className="flex flex-col gap-5 w-full">
              {
                  group.map((group, i) => {
                    return (
                          <SideNavGroupItem key={i} {...group} />
                    )
                  })
              }
            </ul>
        </div>
  )
}
