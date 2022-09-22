import { useNavigate, useParams } from 'react-router-dom'
import { delGroupApi } from '../../utils/api'

export default function DeleteGroupModal ({ onClose }) {
  const { groupId } = useParams()
  const navigate = useNavigate()

  const onSubmitDelete = async () => {
    try {
      const { status: isSuccess, message } = await delGroupApi(groupId)
      if (!isSuccess) {
        console.log(message)
        return
      }
      console.log(message)
      onClose()
      navigate('/profile')
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <div className="w-full">
            <div className="groupModalCard-title">
                <h4>刪除群組</h4>
            </div>
          <p className="groupModalCard-text">確定要刪除群組？</p>
          <p className="modalHint">
            請注意：此動作一經確認無法復原。<br></br>
            您將無法恢復群組與其中的相關紀錄。
          </p>
          <div className="groupModalCard-btns">
              <button type="submit" className="btn-outline  w-1/2" onClick={onClose}>
                  取消
              </button>
              <button type="submit" className="btn-primary w-1/2" onClick={onSubmitDelete}>
                  確認
              </button>
          </div>
        </div>
  )
}
