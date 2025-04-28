import { Button, Flex, Stack, Text } from '@mantine/core'
import classes from './CustomButton.module.scss'

type CustomButtonProps = {
  title: string
  leftSection: React.ElementType
  rightSection: React.ElementType
  onClick: () => void
}

export default function CustomButton({
  title,
  leftSection: LeftSection,
  rightSection: RightSection,
  onClick,
}: CustomButtonProps) {
  return (
    <Button className={classes.button} onClick={onClick} color="var(--clock-in-btn-bg)">
      <Stack gap={0}>
        <Flex gap={0} align="center" justify="center">
          <LeftSection size={50} />
          <RightSection size={50} />
        </Flex>
        <Text fw="bold" c="white" fz={24}>
          {title}
        </Text>
      </Stack>
    </Button>
  )
}
