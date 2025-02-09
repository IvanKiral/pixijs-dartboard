import { createSignal, type Component } from "solid-js";
import { PixiApplication } from "./PixiApplication";
import { PixiDarts } from "./PixiDarts";

const App: Component = () => {
  const [state, seState] = createSignal("");
  let myDiv;

  return (
    <>
      <h1>Hello {state()}</h1>
      <div style={{ width: "50vw", height: "100vh" }} ref={myDiv}>
        <PixiApplication
          antialias={true}
          resizeTo={myDiv}
          background={0x1099bb}
        >
          <PixiDarts onClick={clicked => seState(clicked)}></PixiDarts>
        </PixiApplication>
      </div>
    </>
  );
};

export default App;
