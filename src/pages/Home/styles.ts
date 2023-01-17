import styled from "styled-components";

export const HomeContainer = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`;

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme["gray-100"]};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
`;
export const CountDownContainer = styled.div`
    font-family: "Roboto Mono", monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${({ theme }) => theme["gray-100"]};

    display: flex;
    gap: 1rem;

    span {
        background: ${({ theme }) => theme["gray-700"]};
        padding: 2rem 1rem;
        border-radius: 8px;
    }
`;

export const Separator = styled.div`
    padding: 2rem 0;
    color: ${({ theme }) => theme["gray-500"]};

    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
`;

const BaseInput = styled.input`
    background: transparent;
    height: 2.5rem;
    border: 0;
    border-bottom: 2px solid ${({ theme }) => theme["gray-500"]};
    font-weight: bold;
    font-size: inherit; //herda do componente pai
    padding: 0 0.5rem;
    color: ${({ theme }) => theme["gray-100"]};

    &:focus {
        box-shadow: none;
        border-color: ${({ theme }) => theme["green-500"]};
    }

    &::placeholder {
        color: ${({ theme }) => theme["gray-500"]};
        font-size: 0.9rem;
    }
`;

export const TaskInput = styled(BaseInput)`
    flex: 1;

    &::-webkit-calendar-picker-indicator {
        display: none !important; // remove a flecha da lista de sugestões.
    }
`;

export const MinutesAmountInput = styled(BaseInput)`
    width: 4rem;
`;

export const BaseCountdownButton = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    color: ${({ theme }) => theme["gray-100"]};

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    font-weight: bold;

    cursor: pointer;

    transition: 0.2s;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
    background: ${({ theme }) => theme["green-500"]};

    &:not(:disabled):hover {
        background: ${({ theme }) => theme["green-700"]};
    }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
    background: ${({ theme }) => theme["red-500"]};

    &:not(:disabled):hover {
        background: ${({ theme }) => theme["red-700"]};
    }
`;
