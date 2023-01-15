import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { defaultTheme } from "./styles/themes/default";

export function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Button color="primary" />
            <Button color="secondary" />
            <Button color="danger" />
            <Button color="success" />
        </ThemeProvider>
    );
}
