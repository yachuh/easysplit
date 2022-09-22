import GroupSettingForm from '../components/group/GroupSettingForm'

export default function GroupSettingPage () {
  return (
    <div className="member-sm mt-[25px] md:mt-10 md:border md:border-colors-primary md:rounded-[20px]">
      <h3 className="text-2xl font-medium ">設定</h3>
      <GroupSettingForm />
    </div>
  )
}
