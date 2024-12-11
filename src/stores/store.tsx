import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User } from "../types/type";

interface States {
  user: { data: User | undefined };
}
interface Actions {
  user: { setData: (data: User | undefined) => void };
  reset: () => void;
}
export type DataStore = States & Actions;

const initialDataState: States = { user: { data: undefined } };

export const createDataStore = (initState: States = initialDataState) => {
  return createStore<DataStore>()(
    immer(
      persist(
        (set) => ({
          ...initState,
          user: {
            ...initState.user,
            setData: (data) =>
              set((state) => ({
                ...state,
                user: { ...state.user, data },
              })),
          },
          reset: () => set(initialDataState as Partial<DataStore>),
        }),
        {
          name: "store",
        }
      )
    )
  );
};

// 모든 전역 상태 초기화
const storeResetFns = new Set<() => void>();
export const resetAllStores = () => {
  storeResetFns.forEach((resetFn) => {
    resetFn();
  });
};
