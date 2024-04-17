import { create } from "zustand";

export const useDataStore = create((set) => ({
  data: [],
  latestPoint: [],
  setData: (data) => set({ data }),
  addPoint: (point) => set((state) => {
    let data = state.data;
    const pointTime = point[0]._time;
    const marker = new Date(pointTime).getTime() - 60000;
    data = data.filter((point) => new Date(point._time) > marker);
    return { ...state, data: [...data, ...point], latestPoint: point}
  }),
}))