import { create } from "zustand";

export const useTerminalSocketStore = create((set) => {
    return {
        terminalSocket: null,
        setTerminalSocket: (incomingSocket) => {
            set({
                terminalSocket: incomingSocket
            });
        }
    }
})