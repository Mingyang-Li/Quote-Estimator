import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    root:{
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    primary: {
      main: "#29b329",
    },
    secondary: {
      main: "#c1c4c0",
    },
    textColor: {
      main: "#ffffff",
      contrastText: "#fff",
    },
  },
});

export default theme;

/*
font-family: 'Poppins', sans-serif;
*/