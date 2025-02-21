import { Dialog } from "@kobalte/core/dialog";
import { HiOutlinePlusCircle, HiOutlineXMark } from "solid-icons/hi";
import { createEffect, createSignal, Index } from "solid-js";
import { createStore } from "solid-js/store";
import { Input } from "./Input";
import { RadioGroup } from "./RadioGroup";
import { createGame } from "../utils/game";

type DialogState = {
  playerNames: string[];
  error: string | null;
  gameMode: "501" | "301" | "Free";
};

const createNewInitialState = (): DialogState => ({
  playerNames: [""],
  error: null,
  gameMode: "501",
});

export const NewGameModal = () => {
  const [open, setOpen] = createSignal(false);
  const [dialogState, setDialogState] = createStore<DialogState>(
    createNewInitialState()
  );
  const [players] = createSignal<string[]>(dialogState.playerNames);
  const [gameMode, setGameMode] = createSignal<DialogState["gameMode"]>(
    dialogState.gameMode
  );

  const startGame = () => {
    if (players().some(name => name.trim() === "")) {
      setDialogState("error", "Please provide names for all players");
      return;
    }

    setDialogState(createNewInitialState());
    setOpen(false);
    createGame(players(), gameMode());
  };

  createEffect(() => {
    console.log(gameMode());
  });

  return (
    <Dialog
      open={open()}
      onOpenChange={newOpen => {
        if (!newOpen) {
          setDialogState(createNewInitialState());
        }
        setOpen(newOpen);
      }}
    >
      <Dialog.Trigger class="bg-primary hover:bg-primary-hover outline-0 hover:scale-102 text-xl text-white px-6 py-2 rounded-md hover:opacity-90">
        New Game
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black opacity-20" />
        <div class="fixed inset-0 z-50 flex items-center justify-center">
          <Dialog.Content
            onOpenAutoFocus={e => e.preventDefault()}
            class="z-50 rounded-xl opacity-0 data-expanded:opacity-100 transition-all duration-1000 ease-in-out bg-white border border-[#d4d4d8]  shadow-lg min-w-[400px] p-6"
          >
            <div class="flex items-center justify-between mb-4">
              <Dialog.Title class="text-2xl font-semibold text-gray-800">
                New Game
              </Dialog.Title>
              <Dialog.CloseButton class="cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
                <HiOutlineXMark class="text-2xl text-gray-600" />
              </Dialog.CloseButton>
            </div>
            <div class="flex flex-col gap-4">
              <RadioGroup
                options={["501", "301", "Free"]}
                name="Game Modes"
                defaultValue={dialogState.gameMode}
                onChange={value =>
                  setGameMode(value as DialogState["gameMode"])
                }
              />
              <div class="flex flex-col gap-2">
                <Index each={dialogState.playerNames}>
                  {(player, index) => {
                    return (
                      <Input
                        type="text"
                        placeholder="Player Name"
                        class=" w-full outline-secondary-hover"
                        value={player()}
                        onInput={e => {
                          setDialogState(
                            "playerNames",
                            index,
                            e.currentTarget.value
                          );
                        }}
                      />
                    );
                  }}
                </Index>
              </div>
              <HiOutlinePlusCircle
                class="text-4xl text-secondary hover:text-secondary-hover cursor-pointer transition-colors self-center"
                onClick={() =>
                  setDialogState("playerNames", players().length, "")
                }
              />
              {dialogState.error && (
                <span class="text-red-500 text-sm">{dialogState.error}</span>
              )}
              <button
                type="button"
                onClick={startGame}
                class="bg-primary hover:bg-primary-hover hover:opacity-90 hover:sacle-102 w-full text-white px-4 py-3 rounded-md text-lg font-medium transition-colors"
              >
                Start Game
              </button>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
};
