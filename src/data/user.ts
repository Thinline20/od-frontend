export type User = {
  name: string;
  id: string;
  email: string;
  authority: string;
};

export const fetchUsers = async () => {
  return await [
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
};
