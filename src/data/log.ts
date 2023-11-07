import { createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";

export type LogType = {
  log: object;
  location: string;
  time: string;
};

export type AccidentType = {
  log: object;
  location: string;
  time: string;
};

export const [sharedLogList, setSharedLogList] = createStore<LogType[]>([]);
export const [sharedAccidentList, setSharedAccidentList] = createStore<
  AccidentType[]
>([]);

export const addLog = (data: LogType) => {
  setSharedLogList(
    produce((list) => {
      list.push(data);
    }),
  );

  if (sharedLogList.length > 128) {
    setSharedLogList(
      produce((list) => {
        list.shift();
      }),
    );
  }
};

export const addAccident = (data: AccidentType) => {
  setSharedAccidentList(
    produce((list) => {
      list.push(data);
    }),
  );

  if (sharedAccidentList.length > 128) {
    setSharedAccidentList(
      produce((list) => {
        list.shift();
      }),
    );
  }
};
