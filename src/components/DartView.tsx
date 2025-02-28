import { createSignal, For } from "solid-js";
import { PixiApplication } from "./PixiApplication";
import { PixiDarts } from "./PixiDarts";
import { getGameState, handleThrow } from "../utils/game";
import { isDartValue, type DartValue } from "../utils/constants";
import { HiSolidCheck } from "solid-icons/hi";

export const DartView = () => {
  const [darts, setDarts] = createSignal<DartValue[]>([]);
  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let myDiv;

  const onDartBoardClick = (clicked: string) => {
    if (!isDartValue(clicked)) return;

    if (darts().length >= 3) return;

    setDarts((prev) => [...prev, clicked]);
  };

  const acceptDarts = () => {
    const gameState = getGameState();
    if (!gameState) return;

    handleThrow(darts(), gameState);
    setDarts([]);
  };

  return (
    <div class="h-full flex flex-col gap-10 py-12">
      <div ref={myDiv} class="flex-grow">
        <PixiApplication
          antialias={true}
          resizeTo={myDiv}
          background={0xffffff}
        >
          <PixiDarts onClick={(clicked) => onDartBoardClick(clicked)} disabled={darts().length >= 3 || getGameState()?.state !== "playing"} />
        </PixiApplication>
      </div>

      <ul class="flex flex-row gap-4 justify-center">
        <For each={[0, 1, 2]}>
         {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
         { index => <li class="w-[3ch] h-[2rem] text-2xl border-b-2 text-center cursor-pointer" onClick={() => setDarts(prev => prev.filter((_, i) => i !== index))}>
            {darts()[index] ? darts()[index] : ""}
          </li>
          }
          </For>
        <li class="h-fit self-center">
          <HiSolidCheck class="text-4xl justify-center self-center text-primary hover:text-primary-hover cursor-pointer transition-colors" onClick={acceptDarts} />
        </li>
      </ul>
    </div>
  );
};
