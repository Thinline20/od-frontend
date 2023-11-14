import {
  type JSX,
  createEffect,
  createResource,
  onMount,
  For,
  createSignal,
} from "solid-js";
import { createStore, produce } from "solid-js/store";
import { fetchUsers } from "~/data/user";

export default () => {
  const [usersResource, { mutate, refetch }] = createResource(fetchUsers);
  const [checkList, setCheckList] = createStore<boolean[]>([]);
  const [isAllChecked, setIsAllChecked] = createSignal(false);

  createEffect(() => {
    if (usersResource.loading) return;

    setCheckList(Array.from({ length: usersResource()!.length }, () => false));
  });

  const toggleCheck = (index: number) => {
    setCheckList(
      produce((checkList) => (checkList[index] = !checkList[index])),
    );
  };

  const toggleAllCheck = () => {
    setCheckList(
      produce((checkList) => {
        const allChecked = checkList.every((checked) => checked);
        checkList.forEach((_, i) => (checkList[i] = !allChecked));
      }),
    );
  };

  createEffect(() => {
    checkList.every((checked) => checked)
      ? setIsAllChecked(true)
      : setIsAllChecked(false);
  });

  return (
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  class="checkbox"
                  checked={isAllChecked()}
                  onchange={toggleAllCheck}
                />
              </label>
            </th>
            <th>Name</th>
            <th>E-Mail</th>
            <th>Authority</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <For each={usersResource()}>
            {(user, i) => {
              return (
                <tr>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        class="checkbox"
                        checked={checkList[i()]}
                        onchange={() => {
                          toggleCheck(i());
                        }}
                      />
                    </label>
                  </th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.authority}</td>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
    </div>
  );
};
