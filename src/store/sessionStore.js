import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSessionStore = create(
  persist(
    (set) => ({
      sessions: [],

      setSession: (session) => {
        set((state) => ({
          sessions: [session, ...state.sessions],
        }));
      },

      clearSessions: () => set({ sessions: [] }),
    }),
    {
      name: "session-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useSessionStore;
