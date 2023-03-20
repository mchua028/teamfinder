import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      title1: {
        fontSize: 18,
        // fontWeight: 600,
      },
      subtitle1: {
        fontSize: 14.5,
        fontWeight: 600,
      },
      subtitle2: {
        fontSize: 12,
      },
      subtitle3: {
        fontSize: 11,
      }

    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          html {
            height: 100%;
          }
  
          body {
            height: 100%;
            & > #root {
              height: 100%;
            }
          }
        `,
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            'boxShadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            '&:hover': {
              'backgroundColor': 'lightgray',
              'color': '#313030',
              'boxShadow': '0 5px 8px rgba(0,0,0,0.22), 0 5px 6px rgba(0,0,0,0.23)',
           },
          },
          text: {
            '&:hover': {
              'backgroundColor': 'transparent',
              'fontWeight': '700',
           },
          },
        },
      },
      MuiTypography: {
        styleOverrides: { 
          root: {
            'color': '#313030'
          }
        }
  
      }
    },
    palette: {
        primary: {
            main: '#031322',
            contrastText: '#fff',
        },
        secondary: {
            main: '#24FEFE',
            contrastText: '#000',
        },
        background: {
            default: '#031322',
            paper: '#343333',
        },
        violet: {
            main: '#5F4BA8',
            contrastText: '#fff',
        },
        purple: {
            main: '#CAACCF',
            contrastText: '#fff',
        },
        red: {
            main: '#FF0000',
            contrastText: '#fff',
            light: '#f2d5d5',
            dark: '#ff0000'
        },
        yellow: {
            main: '#ECD679',
            contrastText: '#fff',
        },
        green: {
            main: '#9FE2BF',
            contrastText: '#000',
            light: '#EBFFF0',
            dark: '#217A37',
            bright: '#65FF87'
        },
        turquoise:{
            main: '#40E0D0',
            contrastText: '#000',
        },
        blue: {
            main: '#67A0AC',
            contrastText: '#fff',
        },
        orange: {
            main: '#ffac1c',
            contrastText: '#fff',
            light: '#fff2db',
            dark: '#ff8c00',
        },
        lightGray: {
            main: '#D9D9D9',
            contrastText: '#000',
            translucent: '#ffffff4d'
        },
        gray: {
            main: '#343333',
            contrastText: '#fff',
        }
    },
  });
  theme = responsiveFontSizes(theme);
  
  export default theme;