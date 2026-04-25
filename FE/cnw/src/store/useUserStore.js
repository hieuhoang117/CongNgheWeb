import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStore = create(
  persist(
    (set) => ({
      userId: null,
      token: null,

      login: (userId, token) =>
        set({
          userId,
          token
        }),

      logout: () =>
        set({
          userId: null,
          token: null
        })
    }),
    {
      name: "user-storage"
    }
  )
);

export default userStore;