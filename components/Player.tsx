'use client'

import useGetSongById from "@/hooks/useGetSongByid";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlaylist from "@/hooks/usePlaylist";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlaylist();

  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) return null;

  return (
    <div className="
      fixed
      bottom-0
      bg-black
      w-full
      py-2
      h-[80px]
      px-4
    ">
      <PlayerContent
        song={song}
        songUrl={songUrl}
      />
    </div>
  )
}

export default Player;