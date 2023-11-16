import {
  type JSX,
  createEffect,
  createResource,
  createSignal,
  For,
  Show,
} from "solid-js";
import { createStore, produce } from "solid-js/store";
import { fetchUsers, deleteUser } from "~/data/user";

export default () => {
  const [usersResource, { mutate }] = createResource(fetchUsers);
  const [checkList, setCheckList] = createStore<boolean[]>([]);
  const [isAllChecked, setIsAllChecked] = createSignal(false);
  const [currentUserId, setCurrentUserId] = createSignal<string>("");
  let deleteUserDialogRef: HTMLDialogElement | undefined;
  let deleteSelectedUsersDialogRef: HTMLDialogElement | undefined;

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

  const onDeleteUser = async () => {
    const res = await deleteUser(currentUserId());

    if (res) {
      mutate((users) => users?.filter((user) => user.id !== currentUserId()));
    }
  };

  const onDeleteSelectedUsers = () => {
    usersResource()
      ?.map((user, i) => (checkList[i] ? user.id : null))
      .filter((id) => id !== null)
      .forEach(async (id) => {
        if (await deleteUser(id!)) {
          mutate((users) => users?.filter((user) => user.id !== id));
        }
      });
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
                    onclick={() => deleteSelectedUsersDialogRef?.showModal()}
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
                    <Show when={user.id !== "admin"}>
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
                    </Show>
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
                      <Show when={user.id !== "admin"}>
                        <button
                          onclick={() => {
                            setCurrentUserId(user.id);
                            deleteUserDialogRef?.showModal();
                          }}
                          class="btn btn-error btn-sm text-white"
                        >
                          Delete
                        </button>
                      </Show>
                    </div>
                  </td>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>

      <dialog
        id="delete-selected-users"
        class="modal"
        ref={deleteSelectedUsersDialogRef}
      >
        <div class="modal-box">
          <h3 class="text-center text-lg font-bold">Confirm deleting users</h3>
          <p class="py-4">
            Press ESC key or click the cancel button to cancel.
          </p>
          <div class="mt-6 flex justify-end gap-2">
            <button
              onclick={() => {
                onDeleteSelectedUsers();
                deleteSelectedUsersDialogRef?.close();
              }}
              class="btn"
            >
              Confirm
            </button>
            <button
              onclick={() => deleteSelectedUsersDialogRef?.close()}
              class="btn btn-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="delete-user" class="modal" ref={deleteUserDialogRef}>
        <div class="modal-box">
          <h3 class="text-center text-lg font-bold">Confirm deleting user</h3>
          <p class="py-4">
            Press ESC key or click the cancel button to cancel.
          </p>
          <div class="mt-6 flex justify-end gap-2">
            <button
              onclick={() => {
                onDeleteUser();
                deleteUserDialogRef?.close();
              }}
              class="btn"
            >
              Confirm
            </button>
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
