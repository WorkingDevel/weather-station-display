import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width']
      breakpoint: Breakpoint
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties['width']
      breakpoint?: Breakpoint
    }
  }
}

export function createMyTheme(options: ThemeOptions) {
    return createMuiTheme({
      appDrawer: {
        width: 225,
        breakpoint: 'lg',
      },
      ...options,
    })
  }

const theme = createMyTheme({ appDrawer: { breakpoint: 'md' }});

export default theme;
