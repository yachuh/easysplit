import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useFormContext, Controller } from 'react-hook-form'

export default function DateField () {
  const {
    control
  } = useFormContext

  return (
        <Controller
          control={control}
          name="creatDate"
          render={({ field }) => (
            <DatePicker
              className="px-4 py-1 bg-white border border-gray-300 rounded w-[122px]"
              placeholderText="Select date"
              selected={field.value}
              onChange={(date) => { field.onChange(date) }}
            />
          )}
        />
  )
}
