import { getAllWorkShifts, WorkShift } from '@/services/domain'
import { create } from 'zustand'

type WorkShiftStore = {
  workShifts: Map<string, WorkShift>
  set: (workShifts: WorkShift[]) => void
  load: () => Promise<void>
}

export default create<WorkShiftStore>((set, get) => ({
  workShifts: new Map(),
  set: (workShifts: WorkShift[]) =>
    set(() => ({
      workShifts: new Map(workShifts.map((e) => [e.id, e])),
    })),
  load: async () => {
    if (localStorage.__WORK_SHIFTS__) {
      const workShifts = JSON.parse(localStorage.__WORK_SHIFTS__)
      if (workShifts.length > 0) {
        get().set(workShifts)
        return
      }
    }
    const data = await getAllWorkShifts()
    localStorage.__WORK_SHIFTS__ = JSON.stringify(data)
    get().set(data)
  },
}))
