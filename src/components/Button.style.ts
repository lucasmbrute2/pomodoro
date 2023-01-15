import styled from "styled-components";
import { ButtonVariant } from "./Button";

interface ButtonContainerProps {
    variant: ButtonVariant;
}

const ButtonContainerColorsCtx = {
    primary: "green",
    secondary: "blue",
    success: "orange",
    danger: "red",
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 100px;

    ${({ variant }) => {
        return `background-color: ${ButtonContainerColorsCtx[variant]}`;
    }}
`;
