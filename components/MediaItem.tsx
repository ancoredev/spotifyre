'use client'
import useLoadImage from '@/hooks/useLoadImage';
import usePlaylist from '@/hooks/usePlaylist';
import { Song } from '@/types';
import Image from 'next/image';
import { FC } from 'react'

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
  
}

const MediaItem: FC<MediaItemProps> = ({
  data,
  onClick
}) => {
  const imageUrl = useLoadImage(data);
  const playlist = usePlaylist();

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id)
    }

    // default turn on player
    return playlist.setId(data.id)
  }
  return (
    <div
      onClick={handleClick}
      className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-800/75
        w-full
        p-2
        rounded-md
      "
    >
      <div
        className="
          relative
          rounded-md
          min-h-[48px]
          min-w-[48px]
          overflow-hidden
        "
      >
        <Image 
          fill
          src={imageUrl || '/images/liked.png'}
          alt='media item'
          className='object-cover'
          priority={true}
        />
      </div>
      <div className="
          flex
          flex-col
          gap-y-1
          overflow-hidden 
        ">
          <p className="text-white truncate">
            {data.title}
          </p>
          <p className="text-neutral-400 text-sm truncate">
            {data.author}
          </p>
        </div>
    </div>
  )
}

export default MediaItem