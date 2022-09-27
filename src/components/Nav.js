import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import {
//   getGroupAllSettlementApi,
//   getPersonalSettlementApi,
//   getPaymentTypeApi,
//   settleUpApi,
//   getAllSettledApi,
//   getSettledDetailApi,
//   deleteSettlemetApi,
//   getReminderApi,
//   sendReminderApi
// } from '../utils/api'
import Modal from '@mui/material/Modal'
// import Accordion from '@mui/material/Accordion'
// import AccordionDetails from '@mui/material/AccordionDetails'
// import AccordionSummary from '@mui/material/AccordionSummary'
// import Typography from '@mui/material/Typography'
import { ModalResetPwd, ModalPwdSuccess, ModalVerifySignup, ModalSettlementSuccess } from '../components/ModalFeedback'
import {
  CloseOutlined,
  Add
} from '@mui/icons-material'
import { ModalDetailSettlement } from '../components/settlement/ModalDetailSettlement'
import LoadingModal from './LoadingModal'

import GroupAllSettlement from '../components/settlement/GroupAllSettlement'

const Nav = () => {
  // const [isOpen, setIsOpen] = useState(false)

  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [settleopen, setSettleOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleOpen2 = () => setOpen2(true)
  const handleClose2 = () => setOpen2(false)

  const handleOpen3 = () => setOpen3(true)
  const handleClose3 = () => setOpen3(false)

  const settleHandleOpen = () => setSettleOpen(true)
  const settleHandleClose = () => setSettleOpen(false)

  // 結算明細
  // const [expanded, setExpanded] = useState(false)

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false)
  // }

  // 5.1.1 檢視所有待結算金額(尚未結清的費用) API

  // const [groupAllSettlementData, setGroupAllSettlementData] = useState({
  //   settlementList: [],
  //   payerList: [],
  //   ownerList: [],
  //   notInvolvedList: []
  // })

  // const getGroupAllSettlement = async () => {
  //   try {
  //     const { status: isSuccess, message, settlementList, payerList, ownerList, notInvolvedList } = await getGroupAllSettlementApi()
  //     if (!isSuccess) {
  //       console.log(message)
  //       return
  //     }
  //     setGroupAllSettlementData(groupAllSettlementData => ({
  //       ...groupAllSettlementData,
  //       settlementList,
  //       payerList,
  //       ownerList,
  //       notInvolvedList
  //     }))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // console.log(groupAllSettlementData)

  // // 5.1.2 檢視個人待結算金額(尚未結清的費用) API
  // const [personalSettlementData, setPersonalSettlementData] = useState({
  //   settlement: [],
  //   notInvolvedList: []
  // })

  // const getPersonalSettlement = async () => {
  //   try {
  //     const { status: isSuccess, message, settlement, notInvolvedList } = await getPersonalSettlementApi()
  //     if (!isSuccess) {
  //       console.log(message)
  //       return
  //     }
  //     setPersonalSettlementData(personalSettlementData => ({
  //       ...personalSettlementData,
  //       settlement,
  //       notInvolvedList
  //     }))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // console.log(personalSettlementData)

  // // 5.1.3 檢視收款方式的種類 API
  // const [paymentTypeData, setPaymentTypeData] = useState({
  //   paymentType: []
  // })

  // const getPaymentType = async () => {
  //   try {
  //     const { paymentType } = await getPaymentTypeApi()
  //     setPaymentTypeData(paymentTypeData => ({
  //       ...paymentTypeData,
  //       paymentType
  //     }))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // console.log(paymentTypeData)

  // // 5.2進行結算 API
  // const [settleUpData, setSettleUpData] = useState({
  //   groupid: 11,
  //   ownermemberid: 26,
  //   payermemberid: 24,
  //   ownerpaytopayeramount: 40,
  //   paymentmethod: 0,
  //   memo: '銀行轉帳'
  // })

  // const settleUp = async () => {
  //   try {
  //     const { groupid, ownermemberid, payermemberid, ownerpaytopayeramount, paymentmethod, memo } = await settleUpApi(settleUpData)
  //     //   getGroupAllSettlement()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // console.log(settleUpData)
  // console.log(settleUp())

  // // 5.3取得所有結算紀錄(已結完) API
  // const [allSettledData, setAllSettledData] = useState({
  //   paymentType: []
  // })

  // const getAllSettled = async () => {
  //   try {
  //     const { status: isSuccess, message, setlledList } = await getAllSettledApi()
  //     if (!isSuccess) {
  //       console.log(message)
  //       return
  //     }
  //     setAllSettledData(allSettledData => ({
  //       ...allSettledData,
  //       setlledList
  //     }))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // console.log(allSettledData)

  // // 5.4取得單筆結算紀錄明細(已結完) API
  // const [settledDetailData, setSettledDetailData] = useState({
  //   setllementDetail: []
  // })

  // const getSettledDetail = async () => {
  //   try {
  //     const { status: isSuccess, message, setllementDetail } = await getSettledDetailApi()
  //     if (!isSuccess) {
  //       console.log(message)
  //       return
  //     }
  //     setSettledDetailData(settledDetailData => ({
  //       ...settledDetailData,
  //       setllementDetail
  //     }))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // console.log(settledDetailData)

  // // 5.5刪除單筆結算紀錄 API
  // const deleteSettlemet = async (id) => {
  //   console.log(id)
  //   try {
  //     const { status: isSuccess, message } = await deleteSettlemetApi(id)
  //     if (!isSuccess) {
  //       console.log(message)
  //       return
  //     }
  //     console.log(message)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const deleteSettlemetClick = () => {
  //   deleteSettlemet()
  // }
  // //   console.log(deleteSettlemetClick())

  // // 5.6取得還款提醒資訊 API
  // const [reminderdData, setReminderData] = useState({
  //   settlementReminder: []
  // })

  // const getReminder = async () => {
  //   try {
  //     const { status: isSuccess, message, settlementReminder } = await getReminderApi()
  //     if (!isSuccess) {
  //       console.log(message)
  //       return
  //     }
  //     setReminderData(reminderdData => ({
  //       ...reminderdData,
  //       settlementReminder
  //     }))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // console.log(reminderdData)

  // // 5.7發送還款提醒 API
  // const [sendReminderData, setSendReminderData] = useState(
  //   {
  //     OwnerId: 21,
  //     PayerId: 26
  //   }
  // )

  // const sendReminder = async () => {
  //   try {
  //     const { status: isSuccess, message, OwnerId, PayerId } = await sendReminderApi(sendReminderData)
  //     if (!isSuccess) {
  //       console.log(message)
  //       return
  //     }
  //     console.log(message)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // console.log(sendReminderData)
  // console.log(sendReminder())

  // // useEffect API
  // useEffect(() => {
  //   getGroupAllSettlement()
  //   getPersonalSettlement()
  //   getPaymentType()
  //   getAllSettled()
  //   getSettledDetail()
  //   getReminder()
  // }, [])

  return (
    <nav className="viewContainer mt-5 mb-5 flex flex-col gap-x-4 list-none w-full">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <div className="cursor-pointer" onClick={handleOpen}>重設密碼信已送出</div>
        <Modal
          open={open}
          onClose={handleClose}
          className='modalCard-bg'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='modalCard'>
            <div
              onClick={handleClose}
              className="modalCancel">
              <CloseOutlined sx={{ fontSize: 14 }} />
            </div>
            <ModalResetPwd
              open={open}
              onClose={handleClose} />
          </div>
        </Modal>
      </li>

      <li>
        <div className="cursor-pointer" onClick={handleOpen2}>密碼修改成功</div>
        <Modal
          open={open2}
          onClose={handleClose2}
          className='modalCard-bg'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='modalCard'>
            <div
              onClick={handleClose2}
              className="modalCancel">
              <CloseOutlined sx={{ fontSize: 14 }} />
            </div>
            <ModalPwdSuccess
              open={open}
              onClose={handleClose2} />
          </div>
        </Modal>
      </li>

      <li className='mb-16'>
        <div className="cursor-pointer" onClick={handleOpen3}>驗證信已送出</div>
        <Modal
          open={open3}
          onClose={handleClose3}
          className='modalCard-bg'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='modalCard'>
            <div
              onClick={handleClose3}
              className="modalCancel">
              <CloseOutlined sx={{ fontSize: 14 }} />
            </div>
            <ModalVerifySignup
              open={open}
              onClose={handleClose3} />
          </div>
        </Modal>
      </li>

      {/* <li className='mb-16'>
        <GroupAllSettlement />
      </li> */}

      <li>
        <p className="cursor-pointer" onClick={settleHandleOpen}>
          結算詳細頁面
        </p>

        <Modal
          open={settleopen}
          onClose={settleHandleClose}
          className='modalCard-bg'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='modalCard'>
            <div
              onClick={settleHandleClose}
              className="modalCancel">
              <CloseOutlined sx={{ fontSize: 14 }} />
            </div>
            <ModalDetailSettlement
              open={settleopen}
              onClose={settleHandleClose} />
          </div>
        </Modal>
      </li>

      <li>
        <div className="cursor-pointer" onClick={handleOpen2}>結算成功</div>
        <Modal
          open={open2}
          onClose={handleClose2}
          className='modalCard-bg'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='modalCard'>
            <div
              onClick={handleClose2}
              className="modalCancel">
              <CloseOutlined sx={{ fontSize: 14 }} />
            </div>
            <ModalSettlementSuccess
              open={open}
              onClose={handleClose2} />
          </div>
        </Modal>
      </li>

      <li>
        <LoadingModal />
      </li>

    </nav>
  )
}

export default Nav
