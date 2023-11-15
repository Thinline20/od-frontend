import {
  type JSX,
  createEffect,
  createResource,
  createSignal,
  For,
  Show,
} from "solid-js";
import { createStore, produce } from "solid-js/store";
import { fetchUsers } from "~/data/user";

export default () => {
  const [usersResource, { mutate, refetch }] = createResource(fetchUsers);
  const [checkList, setCheckList] = createStore<boolean[]>([]);
  const [isAllChecked, setIsAllChecked] = createSignal(false);
  let deleteUserDialogRef: HTMLDialogElement | undefined;

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

  const deleteUser = (index: number) => {
    mutate((users) => users?.filter((_, i) => i !== index));
  };

  const deleteSelectedUsers = () => {
    const ids = usersResource()
      ?.map((user, i) => (checkList[i] ? user.id : null))
      .filter((id) => id !== null);

    mutate((users) => users?.filter((user) => !ids?.includes(user.id)));
  };

  createEffect(() => {
    if (usersResource.loading || checkList.length === 0) {
      setIsAllChecked(false);
      return;
    }

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
            <th>ID</th>
            <th>Name</th>
            <th>E-Mail</th>
            <th>Authority</th>
            <th>
              <Show when={!usersResource.loading}>
                <div class="flex justify-end">
                  <button
                    onclick={deleteSelectedUsers}
                    class="btn btn-error btn-sm text-white"
                  >
                    Delete
                  </button>
                </div>
              </Show>
            </th>
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
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.authority}</td>
                  <td>
                    <div class="flex items-center justify-end gap-2">
                      <button class="btn btn-sm">Detail</button>
                      <button class="btn btn-warning btn-sm text-white">
                        Edit
                      </button>
                      <button
                        onclick={() => {
                          deleteUserDialogRef?.showModal();
                        }}
                        class="btn btn-error btn-sm text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
      <dialog id="delete-user" class="modal" ref={deleteUserDialogRef}>
        <div class="modal-box">
          <h3 class="text-center text-lg font-bold">Confirm deleting user</h3>
          <p class="py-4">
            Press ESC key or click the cancel button to cancel.
          </p>
          <div class="mt-6 flex justify-end gap-2">
            <button class="btn">Confirm</button>
            <button
              onclick={() => deleteUserDialogRef?.close()}
              class="btn btn-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
