import { DataGridProps, GenericObject } from '@/types'
import Desktop from './Desktop'
import Mobile from './Mobile'

export function DataGrid<T extends GenericObject>(props: DataGridProps<T>) {
  return (
    <>
      <Desktop {...props} />
      <Mobile {...props} />
    </>
  )
}
