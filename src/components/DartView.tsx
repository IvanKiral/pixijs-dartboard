import { createSignal } from "solid-js";
import { PixiApplication } from "./PixiApplication";
import { PixiDarts } from "./PixiDarts";

export const DartView = () => {
  const [darts, setDarts] = createSignal<string[]>([]);
  let myDiv;

  const onDartBoardClick = (clicked: string) => {
    if(darts().length >= 3) return;

    setDarts(prev => [...prev, clicked]);
  }

  const acceptDarts = () => {
    setDarts([]);
  }

  return (
    <div class="h-full flex flex-col gap-6 py-8">
      <ul class="flex flex-row gap-4 justify-center">
        {[0, 1, 2].map((i) => (
          <li class="w-[3ch] h-[2rem] text-2xl border-b-2 text-center">{darts()[i] ? darts()[i] : ""}</li>
        ))}
        <li><button class="text-2xl" onClick={acceptDarts}>OK!</button></li>
      </ul>

      <div ref={myDiv} class="flex-1">
        <PixiApplication
          antialias={true}
          resizeTo={myDiv}
          background={0xffffff}
        >
          <PixiDarts onClick={clicked => onDartBoardClick(clicked)}></PixiDarts>
        </PixiApplication>
      </div>
    </div>
  );
};
