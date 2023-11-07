import { For } from "solid-js";
import { sharedLogList } from "~/data/log";

export default () => {
  return (
    <div class="h-96 overflow-x-auto">
      <table class="table table-pin-rows">
        <thead>
          <tr>
            <th class="capitalize">Time</th>
            <th class="capitalize">log</th>
            <th class="capitalize">location</th>
          </tr>
        </thead>
        <tbody>
          <For each={sharedLogList}>
            {(log) => {
              const keys = Object.keys(log.log);
              const values = Object.values(log.log);
              const logString = keys
                .map((key, index) => {
                  return `${key}: ${values[index]}`;
                })
                .join(", ");

              return (
                <tr>
                  <th>{log.time}</th>
                  <th>{logString}</th>
                  <th>{log.location}</th>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
    </div>
  );
};
