import { create } from 'zustand';

export const useActiveFileTabStore = create((set) => {
    return {
        activeFileTab: null,
        setActiveFileTab: (path, value, extension) => {
            set( {
                activeFileTab: {
                    path: path,
                    value: value,
                    extension: extension
                }
            })
        }
    }
});