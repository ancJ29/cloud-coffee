import logger from '@/services/logger'
import { GenericObject } from '@/types'
import { unique } from '@/utils'
import { useCallback, useEffect, useState } from 'react'

export default function useFilterData<
  T extends { name?: string } & Record<string, unknown>,
  F extends GenericObject | void = void,
>({
  defaultCondition,
  filter,
  dataLoader,
  resetKeywordOnFilterChanged = true,
}: {
  resetKeywordOnFilterChanged?: boolean
  defaultCondition?: F
  filter?: (el: T, filter?: F) => boolean
  dataLoader?: () => Promise<T[] | undefined> | T[] | undefined
} = {}) {
  const [page, setPage] = useState(1)
  const [data, setData] = useState<T[]>([])
  const [counter, setCounter] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [names, setNames] = useState<string[]>([])
  const [xRecords, setXRecords] = useState<T[]>([])
  const [filtered, setFiltered] = useState(false)
  const [condition, setCondition] = useState<F | undefined>(defaultCondition)

  const _load = useCallback(async () => {
    if (dataLoader) {
      const data = (await dataLoader()) || []
      setXRecords(data)
      setNames(unique(data.map((el) => el.name || '')))
      logger.trace('useFilterData: loaded', data.length || 0)
    }
  }, [dataLoader])

  const reload = useCallback(
    (keyword = '') => {
      let _keyword = ''
      if (typeof keyword !== 'string') {
        logger.warn('useFilterData: invalid keyword', keyword)
      } else {
        _keyword = keyword.toLowerCase()
        setKeyword(keyword || '')
      }
      logger.trace('useFilterData: reload', keyword || '<empty>')
      const _filteredData = filter ? xRecords.filter((el) => filter(el, condition)) : xRecords
      setNames(unique(_filteredData.map((el) => el.name || '')))
      const _data = _filteredData.filter((el) => {
        if (!keyword) {
          return true
        }
        return el.name?.toLowerCase().includes(_keyword)
      })
      setData(_data)
      setFiltered(_data.length !== xRecords.length)
      setPage(1)
      setCounter((c) => c + 1)
    },
    [condition, filter, xRecords],
  )

  const reset = useCallback(() => {
    setData(xRecords)
    setCondition(defaultCondition)
    setKeyword('')
    setPage(1)
    setCounter((c) => c + 1)
  }, [xRecords, defaultCondition])

  useEffect(() => {
    logger.trace('useFilterData: load...')
    _load()
  }, [_load])

  useEffect(() => {
    logger.trace('useFilterData: keyword changed', keyword)
    reload(keyword)
  }, [reload, keyword, filter, condition])

  const updateCondition = useCallback(
    (key: string, value: unknown, keyword = '') => {
      logger.trace('useFilterData: updateCondition', key, value)
      if (!defaultCondition || key in defaultCondition === false) {
        return
      }
      logger.trace('useFilterData: setCondition', key, value)
      if (resetKeywordOnFilterChanged) {
        typeof keyword === 'string' ? setKeyword(keyword || '') : setKeyword('')
      }
      setCondition((prev) => {
        if (!prev) {
          return { [key]: value } as F
        }
        return { ...prev, [key]: value } as F
      })
    },
    [defaultCondition, resetKeywordOnFilterChanged],
  )

  return {
    condition,
    counter,
    data,
    filtered,
    keyword,
    names,
    page,
    reload,
    reset,
    setCondition,
    setPage,
    updateCondition,
  }
}
