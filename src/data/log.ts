import { createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";

export const [sharedLogList, setSharedLogList] = createStore<any[]>([]);
export const [sharedAccidentList, setSharedAccidentList] = createStore<any[]>([]);

export const addLog = (type: "log" | "accident", data: any) => {
  let list;
  let setList

  if (type === "log") {
    list = sharedLogList;
    setList = setSharedLogList
  } else {
    list = sharedAccidentList;
    setList = setSharedAccidentList
  }
  
  setList(produce((list) => {
    list.push(data);
  }))
  
  if (list.length > 128) {
    setList(produce((list) => {
      list.shift();
    }))
  }
}