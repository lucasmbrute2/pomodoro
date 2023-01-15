import { ButtonContainer } from "./Button.style";

export type ButtonVariant = "primary" | "secondary" | "success" | "danger";

interface ButtonProps {
    color?: ButtonVariant;
}

export function Button({ color = "primary" }: ButtonProps) {
    return <ButtonContainer variant={color}>Enviar</ButtonContainer>;
}
