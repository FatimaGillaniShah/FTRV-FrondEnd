import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { colors } from './colors';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
      },
    },
  },
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    bgColor: colors.bgColor,
    textColor: colors.textColor,
    iconColor: colors.iconColor,
    menuColor: colors.menuColor,
    checkbox: {
      main: 'grey',
      secondary: 'white',
    },
  },
  defaultHeights: {
    header: '5rem',
    sideMenuItem: '6rem',
  },
  defaultWidths: {},
  spacing: (factor) => `${0.25 * factor}rem`,
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    // h1: {},
    // h2: {},
    // h3: {},
    // h4: {},
    // h5: {},
    // h6: {},
    // subtitle1: 'h2',
    // subtitle2: 'h2',
    // body1: 'span',
    // body2: 'span',
    body2: {
      fontWeight: 300,
      fontSize: '12px',
    },
  },
});
const updatedTheme = responsiveFontSizes(theme);
export default updatedTheme;
