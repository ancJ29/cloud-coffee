import useTranslation from '@/hooks/useTranslation'
import { Text } from '@mantine/core'
import classes from './index.module.scss'

type EmailVerificationBannerProps = {
  onClick: () => void
}

export default function EmailVerificationBanner({ onClick }: EmailVerificationBannerProps) {
  const t = useTranslation()

  return (
    <div className={classes.container}>
      <Text fz={13}>{t('Email not verified')}.</Text>
      <Text fw="bold" fz={13} onClick={onClick}>
        {t('Verify now')}
      </Text>
    </div>
  )
}
