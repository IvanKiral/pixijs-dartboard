
import type { GameState  } from "../utils/game";
import ScoreTable from "../components/ScoreTable";

type GameViewProps = {
  game: GameState;
};

const GameView = (props: GameViewProps) => {
  return (
    <div class="flex flex-col py-10 ps-14 gap-4 ">
      <div class="flex flex-col gap">
        <p class="text-2xl font-bold">Playing: {props.game.players.find(p => p.id === props.game.currentPlayer)?.name}</p>
        <p class="text-md">NumberOfRounds: {props.game.ruleset.numberOfRounds}</p>
        <p class="text-md">GameMode: {props.game.ruleset.id}</p>
      </div>
      <ScoreTable players={props.game.players} />
    </div>
  );
};

export default GameView;
