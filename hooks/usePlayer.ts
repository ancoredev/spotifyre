import { create } from "zustand";

export interface PlayerStore {
  ids: string[];
  activeId?: string;

  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;

  volume: number;
  setVolume: (volume: number) => void;

  isMuted: boolean;
  toggleMute: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,

  setId: (id: string) => set({ activeId: id}),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined}),

  volume: 1,
  setVolume: (volume: number) => set({ volume: volume, isMuted: false }),

  isMuted: false,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted }))

}));

export default usePlayer;