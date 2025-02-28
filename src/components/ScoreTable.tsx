import { createMemo, Index, For } from "solid-js";
import type { Player, Round } from "../utils/game";

import { zipMultipleWithPadding } from "../utils/common";

type ScoreTableProps = {
  players: ReadonlyArray<Player>;
};

const ScoreTable = (props: ScoreTableProps) => {
  const scoreRows = createMemo(() =>
    zipMultipleWithPadding(...props.players.map(p => p.rounds))
  );

  const createScoreRow = (
    round: number,
    playersRounds: ReadonlyArray<Round | null>
  ) => {
    return (
      <tr>
        <td class=" p-2 min-w-[8ch] text-center min-h-[1ch]">{round}.</td>
        <Index each={playersRounds}>
          {round => {
            return (
              <td class="p-2 min-w-[8ch] text-center min-h-[1ch]">
                {round()?.score}
              </td>
            );
          }}
        </Index>
      </tr>
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <td class="min-w-[4ch] text-center bg-secondary text-white">
            Player
          </td>
          <For each={props.players}>
            {player => (
              <td class="p-2 text-center bg-secondary text-white min-w-[16ch]">
                {player.name}
              </td>
            )}
          </For>
        </tr>
      </thead>
      <tbody>
        <For each={scoreRows()}>
          {(row, index) => {
            return createScoreRow(index(), row);
          }}
        </For>
      </tbody>
    </table>
  );
};

export default ScoreTable;
