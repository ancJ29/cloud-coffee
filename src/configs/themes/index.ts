import {
  Accordion,
  Button,
  CSSVariablesResolver,
  Grid,
  Input,
  MantineThemeOverride,
  Modal,
  NumberInput,
  PasswordInput,
  createTheme,
} from '@mantine/core'
import classes from './index.module.scss'

export const theme: MantineThemeOverride = createTheme({
  primaryColor: 'primary',
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
    NumberInput: NumberInput.extend({
      classNames: { control: classes.control },
    }),
    Button: Button.extend({
      defaultProps: { size: 'md', fw: 300, radius: 6 },
    }),
    Modal: Modal.extend({
      classNames: {
        title: classes.title,
        content: classes.content,
        body: classes.body,
        header: classes.header,
      },
      defaultProps: { zIndex: 2000 },
    }),
    Grid: Grid.extend({
      classNames: { inner: classes.gridInner },
    }),
    Accordion: Accordion.extend({
      classNames: { item: classes.item },
    }),
  },
  colors: {
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
  },
})

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--success': '#3CA77A',
    '--error': '#D93E3E',
    '--warning': '#D36C18',
    '--info': theme.colors.primary[6],
    '--highlight': '#FFEC98',
    '--menu-item-selected': '#D79C51',
    '--menu-item-hover': '##E4AB63',
    '--auth-anchor': '#545454',
    '--placeholder': '#888888',
    '--border': '#C5C5C5',
    '--navbar': '#17233A',
    '--text-secondary': theme.colors.primary[6],
    '--hover': theme.colors.primary[0],
    '--time-clock-primary': '#3F60A0',
    '--time-clock-secondary': '#E38E49',
    '--check-in-btn': '#EBF0F4',
    '--check-in-text': '#002F75  ',
    '--check-out-btn': '#0056BE',
    '--check-out-text': '#EFEFEF',
    '--corner': '#00BE4C',
    '--data-grid-header': theme.colors.primary[3],
    '--even-row': '#E6E6E6',
    '--shift-accordion': '#EAEAEA',
    '--shift-item': '#F3F3F3',
    '--btn-cancel': '#586673',
    '--btn-danger': '#B02727',
    '--no-result': '#576574',
    '--navbar-width': '214px',
    '--navbar-height': '50px',
    '--desktop-padding': '30px',
    '--mobile-padding': '16px',
    '--email-banner-height': '32px',
  },
  light: {
    '--mantine-color-text': '#3B3B3B',
    '--mantine-color-body': '#F5F5F5',
  },
  dark: {
    '--mantine-color-text': '#3B3B3B',
    '--mantine-color-body': '#F5F5F5',
  },
})
