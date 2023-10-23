import { create } from "zustand"

interface AutUploadModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useUploadModal = create<AutUploadModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUploadModal;
