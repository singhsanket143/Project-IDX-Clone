import { create } from "zustand";

export const useActiveFileTabStore = create((set) => {
    return {
        activeFileTab: null,
        tabs: [],
        setActiveFileTab: (path, value, extension) => {
            set((state) => {
                const tabExists = state.tabs.some((tab) => tab.path === path);
                return {
                    activeFileTab: { path, value, extension },
                    tabs: tabExists
                        ? state.tabs
                        : [
                            ...state.tabs,
                            { path, name: path.replace(/\\/g, '/').split('/').pop(), extension, value }
                        ]
                };
            });
        },

        setActiveTab: (path) => {
            set((state) => {
                const tab = state.tabs.find((t) => t.path === path);
                console.log(state.tabs);
                
                if (tab) {
                    return {
                        activeFileTab: { ...tab }
                    };
                }
                return {
                    activeFileTab: null
                };
            });
        },

        closeTab: (path) => {
            set((state) => {
                const updatedTabs = state.tabs.filter((tab) => tab.path !== path);
                return {
                    tabs: updatedTabs,
                    activeFileTab: updatedTabs.length > 0
                        ? updatedTabs[updatedTabs.length - 1]
                        : null
                };
            });
        },

        clearTabs: () => {
            set({
                tabs: [],
                activeFileTab: null
            });
        }
    };
});
