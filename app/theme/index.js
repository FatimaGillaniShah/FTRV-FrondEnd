import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { colors } from './colors';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto'
        }
      }
    }
  },
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    },
    bgColor: colors.bgColor,
    textColor: colors.textColor,
    iconColor: {
      main: colors.iconColor
    },
    menuColor: colors.menuColor
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(',')
  }
});
const updatedTheme = responsiveFontSizes(theme);
export default updatedTheme;
