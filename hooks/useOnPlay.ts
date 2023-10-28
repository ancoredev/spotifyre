import { Song } from "@/types";
import usePlaylist from "./usePlaylist";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
  const playlist = usePlaylist();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) return authModal.onOpen();

    playlist.setId(id);
    playlist.setIds(songs.map((song) => song.id));
  }

  return onPlay;
}

export default useOnPlay;