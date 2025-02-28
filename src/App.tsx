import { type Component, Show } from "solid-js";
import { DartView } from "./components/DartView";
import { NewGameModal } from "./components/NewGameModal";
import { getGameState } from "./utils/game";
import GameView from "./views/GameView";

const App: Component = () => {
  return (
    <div class="w-full h-screen">
      <Show when={getGameState()}>
        {(game) => (
          <div class="flex h-full">
            <div class="flex-1">
              <DartView />
            </div>
            <div class="h-full flex-1 flex w-full">
              <GameView game={game()} />
            </div>
          </div>
        )}
      </Show>
      <div class="fixed bottom-6 right-6">
        <NewGameModal shouldShake={getGameState() === null} />
      </div>
    </div>
  );
};

export default App;
