import {
  Anchor,
  Button,
  Checkbox,
  createTheme,
  CSSVariablesResolver,
  Grid,
  Input,
  MantineThemeOverride,
  Modal,
  PasswordInput,
} from '@mantine/core'
import classes from './themes.module.scss'

export const theme: MantineThemeOverride = createTheme({
  primaryColor: 'primary',
  defaultRadius: 'sm',
  fontFamily: 'Open Sans, sans-serif',
  fontSizes: { md: '14px' },
  components: {
    Input: Input.extend({
      classNames: { input: classes.input, wrapper: classes.inputWrapper },
      defaultProps: { variant: 'unstyled' },
    }),
    PasswordInput: PasswordInput.extend({
      classNames: { innerInput: classes.innerInput },
    }),
    Modal: Modal.extend({
      classNames: {
        title: classes.title,
        content: classes.content,
      },
    }),
    Checkbox: Checkbox.extend({
      classNames: {
        label: classes.checkboxLabel,
        icon: classes.checkboxIcon,
      },
    }),
    Button: Button.extend({
      classNames: { root: classes.root },
    }),
    Grid: Grid.extend({
      classNames: { inner: classes.gridInner },
    }),
    Anchor: Anchor.extend({
      defaultProps: {
        c: '#545454',
      },
    }),
  },
  colors: {
    dark: [
      '#f5f5f5',
      '#b8b8b8',
      '#828282',
      '#696969',
      '#424242',
      '#3b3b3b',
      '#2e2e2e',
      '#242424',
      '#1f1f1f',
      '#141414',
    ],
    primary: [
      '#dce4f4',
      '#b8c6e3',
      '#91a7d2',
      '#708cc4',
      '#5b7bbb',
      '#5073b8',
      '#3f60a0',
      '#365793',
      '#294b83',
      '#223f70',
    ],
    xGray: [
      '#f3f5f7',
      '#e8e8e8',
      '#cccfd0',
      '#adb5b9',
      '#939fa5',
      '#819199',
      '#778a94',
      '#657781',
      '#586a74',
      '#465c67',
    ],
  },
})

// https://mantine.dev/styles/css-variables/#css-variables-resolver
export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--success': '#3ca77a',
    '--error': '#d93e3e',
    '--warning': '#D36C18',
    '--info': theme.colors.primary[6],
    '--check-in-btn': '#EBF0F4',
    '--check-in-text': '#002F75  ',
    '--check-out-btn': '#0056BE',
    '--check-out-text': '#EFEFEF',
    '--user-icon-bg': '#CEBD7C',
    '--check-out-indicator': theme.colors.xGray[3],
    '--btn-manage-bg': '#4CA8EF',
    '--time-clock-bg': theme.colors.dark[0],
    '--time-clock-primary': '#3F60A0',
    '--time-clock-accent': '#888888',
    '--time-clock-secondary': '#e38e49',
    '--time-clock-live-clock': '#D36C18',
    '--highlight': '#FFEC98',
    '--account-verify-btn': '#FDE68A',
    '--account-verify-text': '#92400D',
    '--auth-background': '#F5F5F5',
    '--auth-surface': '#ebebeb',
  },
  light: {
    '--border-color': '#E5E5E5',
    '--hover-bg': theme.colors.primary[0],
    '--text-color': 'black',
    '--even-row-bg': theme.colors.dark[0],
    '--header': theme.colors.primary[3],
    '--select-item': theme.colors.primary[1],
    '--shift-item-bg': theme.colors.xGray[0],
    '--shift-accordion-bg': theme.colors.dark[0],
  },
  dark: {
    '--border-color': theme.colors.dark[8],
    '--hover-bg': theme.colors.dark[4],
    '--text-color': theme.colors.dark[0],
    '--even-row-bg': theme.colors.dark[8],
    '--header': theme.colors.primary[5],
    '--select-item': theme.colors.primary[5],
    '--shift-item-bg': theme.colors.dark[6],
    '--shift-accordion-bg': theme.colors.dark[6],

    '--mantine-color-body': theme.colors.dark[6],
  },
})
