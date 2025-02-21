import { type Component, Show } from "solid-js";
import { DartView } from "./components/DartView";
import { NewGameModal } from "./components/NewGameModal";
import { type GameState, getGameState } from "./utils/game";

const App: Component = () => {
  return (
    <div class="w-full h-screen flex">
      <div class="h-full flex-1 flex flex-col items-center justify-center">
        <Show when={getGameState()} keyed={true} fallback={<NewGameModal />}>
          {(state: GameState) => (
            <p>
              Welcome {state.players.join(", ")} You are playing{" "}
              {state.gameMode} darts
            </p>
          )}
        </Show>
      </div>
      <div class="flex-1">
        <DartView />
      </div>
    </div>
  );
};

export default App;
