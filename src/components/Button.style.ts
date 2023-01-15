import styled, { DefaultTheme } from "styled-components";
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
    width: 150px;
    height: 50px;
    border-radius: 8px;
    border: none;
    margin: 2rem;
    cursor: pointer;

    background-color: ${({ theme }) => theme["green-300"]};
`;
