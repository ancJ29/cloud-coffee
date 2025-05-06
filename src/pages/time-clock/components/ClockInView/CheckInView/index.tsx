import { Shift, User } from '@/services/domain'
import Actions from './Actions'
import Header from './Header'
import ShiftInformation from './ShiftInformation'

type CheckInViewProps = {
  user?: User
  shifts: Shift[]
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function CheckInView({ user, shifts, onCheckIn, onCheckOut }: CheckInViewProps) {
  return (
    <>
      <Header user={user} />
      <Actions onCheckIn={onCheckIn} onCheckOut={onCheckOut} />
      <ShiftInformation shifts={shifts} />
    </>
  )
}
