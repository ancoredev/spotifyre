import { create } from "zustand";

export interface PlaylistStore {
  ids: string[];
  activeId?: string;

  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;

  volume: number;
  setVolume: (volume: number) => void;

  isMuted: boolean;
  setMuted: (mute: boolean) => void;
}

const usePlaylist = create<PlaylistStore>((set) => ({
  ids: [],
  activeId: undefined,

  setId: (id: string) => set({ activeId: id}),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined}),

  volume: 0.75,
  setVolume: (volume: number) => set({ volume: volume, isMuted: false }),

  isMuted: false,
  setMuted: (mute: boolean) => set({ isMuted: mute })
}));

export default usePlaylist;