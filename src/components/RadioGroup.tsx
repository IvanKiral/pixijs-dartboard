import { For, createSignal, type Component } from "solid-js";

type RadioGroupProps = {
  options: ReadonlyArray<string>;
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  class?: string;
};

export const RadioGroup: Component<RadioGroupProps> = props => {
  const [selectedValue, setSelectedValue] = createSignal(
    props.defaultValue || ""
  );

  const handleChange = (value: string) => {
    setSelectedValue(value);
    props.onChange?.(value);
  };

  return (
    <div class={`flex flex-row gap-2 ${props.class || ""}`} role="radiogroup">
      <For each={props.options}>
        {option => (
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={props.name}
              checked={selectedValue() === option}
              onChange={() => handleChange(option)}
              class="w-4 h-4 accent-primary"
            />
            <span class="text-sm text-gray-700">{option}</span>
          </label>
        )}
      </For>
    </div>
  );
};
