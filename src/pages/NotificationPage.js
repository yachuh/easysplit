import AppLayout from './AppLayout'
import { Notification } from '../components/notification/Notification'

export default function NotificationPage () {
  return (
    <AppLayout>
      <div className='mt-10 h-[65vh] overflow-y-scroll w-full md:h-[80vh] md:pl-10'>
        <Notification />
      </div>
    </AppLayout>
  )
}
