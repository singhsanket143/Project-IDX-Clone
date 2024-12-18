import { create } from "zustand";

export const useEditorValueStore = create((set) => {
  return {
    value : null,
    setValue : (value) => {
      set({value})
    }
  }
})