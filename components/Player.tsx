'use client'

import useGetSongById from "@/hooks/useGetSongByid";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";
import { useState } from "react";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const [ volume, setVolume ] = useState(1);

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
        key={songUrl} 
        song={song}
        songUrl={songUrl}
        volume={volume}
        setVolume={setVolume}
      />
    </div>
  )
}

export default Player;