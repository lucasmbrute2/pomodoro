import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./style";
import { formatDistanceToNowStrict } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function History() {
    const { cycles } = useContext(CyclesContext);

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(
                            ({
                                id,
                                task,
                                minutesAmount,
                                startDate,
                                finishedDate,
                                interrupedDate,
                            }) => (
                                <tr key={id}>
                                    <td>{task}</td>
                                    <td>{minutesAmount}</td>
                                    <td>
                                        {formatDistanceToNowStrict(
                                            new Date(startDate),
                                            {
                                                addSuffix: true,
                                                locale: ptBR,
                                            }
                                        )}
                                    </td>
                                    <td>
                                        {finishedDate && (
                                            <Status statusColor="green">
                                                Concluido
                                            </Status>
                                        )}
                                        {interrupedDate && (
                                            <Status statusColor="red">
                                                Interrompido
                                            </Status>
                                        )}

                                        {!interrupedDate && !finishedDate && (
                                            <Status statusColor="yellow">
                                                Andamento
                                            </Status>
                                        )}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
}
