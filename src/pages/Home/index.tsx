import { Play } from "phosphor-react";
import {
    CountDownContainer,
    FormContainer,
    HomeContainer,
    Separator,
} from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <input
                        id="task"
                        type="text"
                        placeholder="Dê um nome para o seu projeto"
                    />
                    <label htmlFor="minutesAmount">durante</label>

                    <span>-</span>
                    <input id="minutesAmount" type="text" />
                    <span>+</span>

                    <p>minutos.</p>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <button type="submit">
                    <Play size={24} />
                    Começar
                </button>
            </form>
        </HomeContainer>
    );
}
