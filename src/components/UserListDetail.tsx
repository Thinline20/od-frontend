import { type User } from "~/data/user";

type UserListDetailProps = {
  user: User;
  dialogRef: HTMLDialogElement | undefined;
};

export default (props: UserListDetailProps) => {
  return (
    <dialog ref={props.dialogRef} class="dialog">
      <div class="modal-box">
        <h3 class="text-lg font-bold">User Detail</h3>
        <div>
          
        </div>
      </div>
    </dialog>
  );
};
