import { For } from "solid-js";
import { sharedLogList } from "~/data/log";

export default () => {
  return (
    <div class="overflow-x-auto h-96">
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
            {(log) => (
              <tr>
                <th>{log.time}</th>
                <th>{JSON.stringify(log.log)}</th>
                <th>{log.location}</th>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};
