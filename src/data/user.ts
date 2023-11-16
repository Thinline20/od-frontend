export type User = {
  name: string;
  id: string;
  email: string;
  authority: string;
};

let tempUsers = [
  {
    name: "admin",
    id: "admin",
    email: "admin@example.com",
    authority: "admin",
  },
  {
    name: "user",
    id: "user",
    email: "user1@example.com",
    authority: "user",
  },
  {
    name: "user2",
    id: "user2",
    email: "user2@example.com",
    authority: "user",
  },
];

export const fetchUsers = async (): User[] => {
  return await [...tempUsers];
};

export const deleteUser = async (id: string): boolean => {
  if (tempUsers.filter((u) => u.id === id).length === 0) {
    return false;
  }

  tempUsers = tempUsers.filter((u) => u.id !== id);
  return true;
};
