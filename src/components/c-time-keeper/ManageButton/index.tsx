import useTranslation from '@/hooks/useTranslation'
import { Button } from '@mantine/core'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './ManageButton.module.scss'

type ManageButtonProps = {
  navigateUrl?: string
}

export default function ManageButton({ navigateUrl = '/working-status' }: ManageButtonProps) {
  const t = useTranslation()
  const navigate = useNavigate()

  const onClick = useCallback(() => {
    navigate(navigateUrl)
  }, [navigate, navigateUrl])

  return (
    <Button className={classes.button} color="var(--btn-manage-bg)" onClick={onClick} size="lg">
      {t('Manager')}
    </Button>
  )
}
