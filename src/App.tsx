import { ThemeProvider } from "styled-components";
import { Router } from "./Router";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { CyclesContexProvider } from "./contexts/CyclesContext";

export function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <CyclesContexProvider>
                    <Router />
                </CyclesContexProvider>
            </BrowserRouter>
            <GlobalStyle />
        </ThemeProvider>
    );
}
