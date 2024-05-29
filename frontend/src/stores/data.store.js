import { create } from "zustand";
import { toDate } from "../utils";

const _fields = ["bike", "bus", "car", "total", "truck"];
const _step = 60; // Each field will have 60 points

export const useDataStore = create((set) => ({
   data: [],
   latestPoint: [],
   setData: (data) => set({ data }),
   addPoint: (point) =>
      set((state) => {
         let data = [];
         _fields.forEach((field, index) => {
            const range = [index * _step, (index + 1) * _step];
            const insertPoint = {
               _field: field,
               _time: toDate(point.time),
               _value: point[field],
            };
            data = [...data, ...state.data.slice(range[0] + 1, range[1]), insertPoint];
         });
         return { ...state, data, latestPoint: point };
      }),
}));

export const useDetailStore = create((set) => ({
   data: {
      cameraID: "",
      nameStreet: "",
      type: "",
      status: null,
      startDate: "",
      alongDate: null,
      totalVehicle: null,
   },
   setData: (newData) =>
      set((state) => ({
         data: {
            ...state.data,
            ...newData,
         },
      })),
}));
