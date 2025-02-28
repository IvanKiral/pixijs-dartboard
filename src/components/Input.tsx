import { type JSX, splitProps } from "solid-js";

type InputProps = JSX.HTMLElementTags["input"] & { error?: string };

export const Input = (props: InputProps) => {
  const [local, others] = splitProps(props, ["class", "error"]);

  return (
    <div class="flex flex-col gap-2">
      <input
        type="text"
        class={`${local.class ?? ""} border rounded-md p-2 border-secondary focus:outline-secondary`}
        {...others}
      />
      {local.error && <span class="text-red-500 text-sm">{local.error}</span>}
    </div>
  );
};
