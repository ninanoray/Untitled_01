import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User } from "../types/type";

type State = {
  user: User | undefined;
};
type Actions = {
  setUser: (data: User | undefined) => void;
  reset: () => void;
};
export type DataStore = State & Actions;

const defaultInitState: State = { user: undefined };

export const createDataStore = (initState: State = defaultInitState) => {
  return createStore<DataStore>()(
    immer(
      persist(
        (set) => ({
          ...initState,
          setUser: (data) =>
            set((state) => {
              state.user = data;
            }),
          reset: () => set(defaultInitState),
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

// export const createDataStore = create<DataStore>()(
//   immer(
//     persist(
//       (set) => ({
//         ...defaultInitState,
//         setUser: (data: User | undefined) =>
//           set((state: State) => {
//             state.user = data;
//           }),
//         reset: () => set(defaultInitState),
//       }),
//       {
//         name: "store",
//       }
//     )
//   )
// );

// const useDataStore = <T, F>(
//   store: (callback: (state: T) => unknown) => unknown,
//   callback: (state: T) => F
// ) => {
//   const result = store(callback) as F;
//   const [data, setData] = useState<F>();

//   useEffect(() => {
//     setData(result);
//   }, [result]);

//   return data;
// };
// export default useDataStore;
