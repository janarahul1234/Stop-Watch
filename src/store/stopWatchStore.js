import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStopWatchStore = create(
  persist(
    (set) => ({
      time: 0,
      isPaused: true,
      isLoaded: true,
      task: "",

      setTime: (time) => set({ time }),
      setIsPaused: (isPaused) => set({ isPaused }),
      setIsLoaded: (isLoaded) => set({ isLoaded }),
      setTask: (task) => set({ task }),
    }),
    {
      name: "stopwatch-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useStopWatchStore;
