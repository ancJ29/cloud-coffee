import { navMenu } from '@/configs/navMenu'
import useTranslation from '@/hooks/useTranslation'
import { Burger, Flex, Image, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import classes from './ContentLayout.module.scss'

type ContentLayoutProps = {
  children: React.ReactNode
  navbarOpened: boolean
  toggleNavbar: () => void
}

export default function ContentLayout({
  children,
  navbarOpened,
  toggleNavbar,
}: ContentLayoutProps) {
  const location = useLocation()
  const t = useTranslation()
  const [title, setTitle] = useState('')

  useEffect(() => {
    const title = navMenu.find((item) => item.url === location.pathname)?.label
    setTitle(title || '')
  }, [location.pathname])

  return (
    <div className={`${classes.container} ${!navbarOpened ? classes.shifted : ''}`}>
      <Flex justify="space-between" align="center" hiddenFrom="sm" className={classes.header}>
        <Image src="favicon.svg" w={28} />
        <Text fw={500}>{t(title)}</Text>
        <Burger opened={navbarOpened} onClick={toggleNavbar} size="sm" />
      </Flex>
      <div className={classes.content}>{children}</div>
    </div>
  )
}
