import * as PIXI from "pixi.js";
import { createDartBoard } from "./dart";

(async () => {
  const app = new PIXI.Application();
  await app.init({
    resizeTo: window,
    backgroundColor: 0x1099bb,
    antialias: true,
  });

  app.resize();

  const radius = 300;

  window?.addEventListener?.("resize", () => {
    app.resize();
    app.stage.removeChildren();
    app.stage.addChild(
      createDartBoard(
        window.innerWidth / 2,
        window.innerHeight / 2,
        0.8 * 0.5 * window.innerWidth < 300
          ? 0.8 * 0.5 * window.innerWidth
          : radius
      )
    );
  });

  app.stage.addChild(
    createDartBoard(window.innerWidth / 2, window.innerHeight / 2, radius)
  );

  document.body.appendChild(app.canvas);
})();
