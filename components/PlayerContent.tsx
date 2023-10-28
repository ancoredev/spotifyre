'use client'

import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerXMark, HiSpeakerWave } from 'react-icons/hi2'
import { useEffect, useState } from 'react';
import { useGlobalAudioPlayer } from 'react-use-audio-player';

import { Song } from '@/types';
import MediaItem from './MediaItem';
import LikeButton from './LikeButton';
import Slider from './Slider';
import usePlaylist from '@/hooks/usePlaylist';


interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  song,
  songUrl
}) => {
  const sound = useGlobalAudioPlayer();
  const playlist = usePlaylist();

  const Icon = sound.playing ? BsPauseFill : BsPlayFill;
  const VolumeIcon = sound.muted ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (playlist.ids.length === 0) return;

    const currentIndex = playlist.ids.findIndex((id) => id === playlist.activeId);
    const nextSong = playlist.ids[currentIndex + 1];

    if (!nextSong) return playlist.setId(playlist.ids[0]);

    playlist.setId(nextSong);
  }

  const onPlayPrevious = () => {
    if (playlist.ids.length === 0) return;

    const currentIndex = playlist.ids.findIndex((id) => id === playlist.activeId);
    const previousSong = playlist.ids[currentIndex - 1];

    if (!previousSong) return playlist.setId(playlist.ids[playlist.ids.length - 1]);

    playlist.setId(previousSong);
  };


  // TODO: bind volume and mute playlist with sound
  const handleChangeVolume = (value: number) => {
    if (value === 0) {
      playlist.setMuted(true);
      sound.mute(true);
    } else {
      playlist.setMuted(false);
      sound.mute(false);
    }

    sound.setVolume(value);
    playlist.setVolume(value);
  }

  const handleMuteToggle = () => {
    if (sound.muted) {
      playlist.setMuted(false);
      sound.mute(false);
    } else {
      playlist.setMuted(true);
      sound.mute(true);
    }

  }

  useEffect(() => {
    sound.load(songUrl, {
      initialVolume: playlist.volume,
      initialMute: playlist.isMuted,
      autoplay: true,
      onend: () => onPlayNext(),
      format: 'mp3'
    });
  }, [songUrl]);


  return (
    <div className='grid grid-cols-2 md:grid-cols-3 h-full'>
      <div className='flex w-full justify-start'>
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      {/* Mobile */}
      <div className='
        flex
        md:hidden
        col-auto
        w-full
        justify-end
        items-center
      '>
        <div 
          onClick={() => sound.togglePlayPause()}
          className='
            h-10
            w-10
            flex
            items-center
            justify-center
            rounded-full
            bg-white
            p-1
            cursor-pointer
          '
        >
          <Icon size={30} className="text-black"/>
        </div>
      </div>

      {/* Desktop */}
      <div className='flex flex-col'>
        <div className='
          hidden
          h-full
          md:flex
          justify-center
          items-center
          w-full
          max-w-[722px]
          gap-x-6
        '>
          <AiFillStepBackward 
            onClick={onPlayPrevious}
            size={30}
            className="
              text-neutral-400
              cursor-pointer
              hover:text-white
              transition
            "
          />
          <div
            onClick={() => sound.togglePlayPause()}
            className='
              flex
              items-center
              justify-center
              h-10
              w-10
              rounded-full
              bg-white
              p-1
              cursor-pointer
            '
          >
            <Icon size={30} className="text-black"/>
          </div>
          <AiFillStepForward 
            onClick={onPlayNext}
            size={30}
            className="
              text-neutral-400
              cursor-pointer
              hover:text-white
              transition
            "
          />
        </div>
      </div>
      
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon 
            onClick={handleMuteToggle}
            className="cursor-pointer"
            size={34}
          />
          <Slider 
            value={playlist.volume}
            isMuted={playlist.isMuted}
            onChange={handleChangeVolume}
          />
        </div>
      </div>

    </div>
  )
}

export default PlayerContent;