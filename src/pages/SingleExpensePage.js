import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Edit, Delete, LastPage, Check } from '@mui/icons-material'

export default function SigleExpensePage () {
  return (
        <div>
            {/* header */}
          {/* <div className="px-8 py-2 border border-gray-300"> */}
                {/* header icons */}
               <div className="px-8 py-2 border border-gray-300 flex items-center">
                    <Edit sx={{ fontSize: 24 }}/>
                    <Delete sx={{ fontSize: 24 }} />
                    <Check sx={{ fontSize: 24 }} />
                    <LastPage sx={{ fontSize: 24 }} />
                </div>
            {/* </div> */}
        </div>
  )
}
