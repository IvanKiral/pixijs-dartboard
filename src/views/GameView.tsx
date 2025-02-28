
import type { GameState  } from "../utils/game";
import ScoreTable from "../components/ScoreTable";

type GameViewProps = {
  game: GameState;
};

const GameView = (props: GameViewProps) => {
  return (
    <div class="flex flex-col py-10 ps-14 gap-8 ">
      <ScoreTable players={props.game.players} />
    </div>
  );
};

export default GameView;
