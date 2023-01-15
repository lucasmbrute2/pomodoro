import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
        display: flex;
        gap: 0.5rem;
    }

    a {
        width: 3rem;
        height: 3rem;

        display: flex;
        justify-content: center;
        align-items: center;

        color: ${({ theme }) => theme["gray-100"]};

        border-top: 3px solid transparent; //Usado para empurrar 3px para baixo
        border-bottom: 3px solid transparent; // Usado para não empurar o elemento para cima no hover

        transition: 0.1s;

        &:hover {
            border-bottom: 3px solid ${({ theme }) => theme["green-500"]};
        }

        &.active {
            color: ${({ theme }) =>
                theme[
                    "green-500"
                ]}; // Esse classe é gerada automaticamente pelo react router dom
        }
    }
`;
