import { AccountBalanceWallet } from '@mui/icons-material'

export function PaymentRecordItem ({ expenseTypeList, expenseId, item, cost, creatDate, memo, expenseType }) {
  const toExpenseTypeIcon = (expenseType) => {
    // get expense type imageUrl
    const filterExpenseTypeList = expenseTypeList.filter(type => {
      const { expenseMethod, imageUrl } = type
      if (expenseMethod === expenseType) {
        return imageUrl
      }
    })
    // console.log(filterExpenseTypeList[0]?.imageUrl)
    return (filterExpenseTypeList[0]?.imageUrl)
  }

  // turn time into date formnat, e.g. Sep 23
  const toDate = (time) => {
    const dateAry = time.split(' ')
    const date = `${dateAry[0]} ${dateAry[1]}`
    return date
  }

  return (
    <div className="flex">
      {/* date & type */}
      <div className="md:flex items-center">
        <p>{toDate(creatDate)}</p>
        <div className="w-[64px] h-[64px] rounded-2xl p-5 bg-emerald-100 text-emerald-500">
          <img src={toExpenseTypeIcon(expenseType)} alt={expenseType}/>
        </div>
      </div>
      <div className="flex ml-2">
        <h3>{item}</h3>
        <p>{cost}</p>
      </div>
    </div>
  )
}

export function SettledRecordItem ({ settleId, owenerName: ownerName, payerName, ownerPaytoPayerAmount: amount }) {
  return (
    <div className="flex">
      {/* date & type */}
      <div className="md:flex items-center">
        <p>Sep 23</p>
        <div className="w-[64px] h-[64px] rounded-2xl p-5 bg-emerald-100 text-emerald-500">
          <AccountBalanceWallet sx={{ fontSize: 24 }} />
        </div>
        <p className="ml-2">{ownerName} 支付 {payerName} ${amount}</p>
      </div>
    </div>
  )
}
