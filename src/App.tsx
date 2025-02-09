import { type Component } from "solid-js";
import { DartView } from "./components/DartView";

const App: Component = () => {
  return (
    <div class="w-full h-screen flex">
      <div class="h-full flex-1 flex flex-col items-center justify-center">
        <h1 class="w-fit">Dart Game</h1>
      </div>
      <div class="flex-1">
        <DartView></DartView>
      </div>
    </div>
  );
};

export default App;
