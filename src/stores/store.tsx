import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User } from "../types/type";

interface States {
  user: User | undefined;
}
interface Actions {
  setUser: (data: User | undefined) => void;
  reset: () => void;
}
export type DataStore = States & Actions;

const initialDataState: States = { user: undefined };

export const createDataStore = (initState: States = initialDataState) => {
  return createStore<DataStore>()(
    immer(
      persist(
        (set) => ({
          ...initState,
          setUser: (data) =>
            set({
              user: data,
            }),
          reset: () => set(initialDataState),
        }),
        {
          name: "store",
        }
      )
    )
  );
};
