import { ReactNode } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#635fc7",
      dark: "#635fc7",
    },
  },
});

function MUICustomstyles({ children }: { children: ReactNode }) {
  return (
    <div>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  );
}

export default MUICustomstyles;
