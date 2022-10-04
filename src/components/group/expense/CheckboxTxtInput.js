import { useEffect, useState } from 'react'
import { AttachMoney } from '@mui/icons-material'

export default function CheckboxTxtInput ({ memberId, memberName, imageUrl, ownerExpenseList, setOwnerExpenseList, onChange }) {
  // CheckboxTxtInput component
  const [checkboxValue, setCheckboxValue] = useState({
    memberId,
    checkbox: false,
    inputValue: 0
  })
  const handleCheckbox = (e) => {
    setCheckboxValue(checkboxValue => ({
      ...checkboxValue,
      checkbox: e.target.checked
    }))
    // onChange() // trigger CheckboxTxtInput onChange
  }
  const handleInput = (e) => {
    setCheckboxValue(checkboxValue => ({
      ...checkboxValue,
      inputValue: Number(e.target.value)
    }))
    // onChange() // trigger CheckboxTxtInput onChange
  }

  // pass checkbox value to parent when checkboxValue changes
  useEffect(() => {
    if (!checkboxValue.checkbox) {
      // console.log('invalid', checkboxValue)

    }
    // console.log('valid', checkboxValue)
  }, [checkboxValue])

  return (
    <label className="formStyle cursor-pointer hover:bg-colors-fifth/20">
      <div className="flex justify-center items-center gap-4">
        {/* checkbox */}
        <input
          type="checkbox"
          className="h-5 w-5"
          checked={checkboxValue.checkbox}
          onChange={(e) => { handleCheckbox(e) }}
        />
        {/* member */}
        <div className="flex items-center gap-2">
          <img className="w-10 h-10" src={imageUrl} alt={memberName} />
          <p className="font-bold">{memberName}</p>
        </div>
      </div>
      {/* 金額 */}
      <div className="flex items-center">
        <AttachMoney sx={{ fontSize: 20 }} className="text-gray-400" />
        <input
          type="number"
          value={ checkboxValue.checkbox ? checkboxValue.inputValue : ''}
          disabled={!checkboxValue.checkbox}
          onChange={(e) => { handleInput(e) }}
        />
      </div>
    </label>
  )
}
