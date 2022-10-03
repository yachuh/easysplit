import { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import Modal from '@mui/material/Modal'
import { OwnerListModal } from '../GroupModal'
import { CloseOutlined } from '@mui/icons-material'
import { useGroupData } from '../../../context/context'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'

// @mui Select components UI config
const ITEM_HEIGHT = 31
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

export default function SelectOwner ({ ownerList, setOwnerList, watchCost, editModeEnabled }) {
  const { memberList } = useGroupData

  // @mui Select components
  const names = memberList?.map(member => {
    return member.memberName
  })
  const [personName, setPersonName] = useState()
  const handleChange = (event) => {
    const {
      target: { value }
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  // modals
  const [openOwnerListPopup, setOpenOwnerListPopup] = useState(false)
  const handleOpenOwnerListPopup = () => setOpenOwnerListPopup(true)
  const handleCloseOwnerListPopup = () => setOpenOwnerListPopup(false)

  // react-hook-form
  const {
    control,
    register
  } = useFormContext

  // const averageCost = parseFloat((watchCost / memberList.length)?.toFixed(2))

  return (
    <Controller
      control={control}
      name=""
      render={({ field }) => (
        <>
          <button
            disabled={!editModeEnabled}
            className="formInput py-1 px-4 mb-4 text-left disabled:border-none"
            onClick={handleOpenOwnerListPopup}
          >
              平分（全部）
          </button>
            {/* SelecOwnerListModal START */}
            <Modal open={openOwnerListPopup} onClose={handleCloseOwnerListPopup} className="modalCard-bg">
              <div onClick={(e) => e.stopPropagation()} className="groupModalCard">
                <div onClick={handleCloseOwnerListPopup} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
                <OwnerListModal open={openOwnerListPopup} onClose={handleCloseOwnerListPopup} ownerList={ownerList} setOwnerList={setOwnerList} watchCost={watchCost} />
              </div>
            </Modal>
            {/* SelectOwnerListModal End */}
        </>
      )}
    />
  )
}
