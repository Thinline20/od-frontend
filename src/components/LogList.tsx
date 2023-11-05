import { For } from "solid-js";
import { sharedLogList } from "~/data/log";

export default () => {
  return (
    <div>
    <ul>

      <For each={sharedLogList}>{(log) => <div>{log}</div>}</For>
    </ul>
    </div>
  );
};
