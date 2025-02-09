import {
  createContext,
  createResource,
  JSX,
  onCleanup,
  Show,
  Suspense,
  useContext,
} from "solid-js";
import * as PIXI from "pixi.js";

export type ApplicationProps = Partial<PIXI.ApplicationOptions> & {
  children?: JSX.Element;
};

export const AppContext = createContext<PIXI.Application>();
export const useApplication = () => useContext(AppContext);

export const PixiApplication = (props: ApplicationProps) => {
  const [app] = createResource([props], async ([_props]) => {
    const app = new PIXI.Application();
    await app.init(_props);

    window?.addEventListener?.("resize", resizeHandler);

    return app;
  });

  const resizeHandler = () => {
    app()?.resize();
  };

  onCleanup(() => {
    window.removeEventListener("resize", resizeHandler);

    app()?.destroy();
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Show when={app()}>
        {a => {
          const _app = a();
          return (
            <>
              <AppContext.Provider value={_app}>
                {props.children}
              </AppContext.Provider>
              {_app.canvas}
            </>
          );
        }}
      </Show>
    </Suspense>
  );
};
