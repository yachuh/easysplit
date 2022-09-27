import { useNavigate } from 'react-router-dom'

export const SingleExpenseModal = () => {
  const navigate = useNavigate()
  return (
    <div className="modalCard-bg">
      <div className="expenseModal">
        <h3>Modal</h3>
        <button onClick={() => navigate(-1)}>Close</button>
      </div>
    </div>
  )
}
