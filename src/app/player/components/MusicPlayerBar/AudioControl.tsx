'use client'

import { FaShuffle, FaBackwardStep, FaCirclePause, FaCirclePlay, FaForwardStep, FaRepeat } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import { IconButton, Slider } from '@mui/material'
import { useMusicPlayerStore } from '@/stores/musicPlayerStore'
import { clsx } from 'clsx'

function formatDuration(value: number) {
  const minutes = Math.floor(value / 60)
  const seconds = value % 60
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

export default function AudioControl() {
  const { next, previous } = useMusicPlayerStore()
  const currentMusic = useMusicPlayerStore((state) => state.currentMusic())

  const [isPlaying, setIsPlaying] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatCurrentMusic, setRepeatCurrentMusic] = useState(false)
  const [position, setPosition] = useState(0)

  useEffect(() => {
    setPosition(0)
  }, [currentMusic])

  return (
    <div
      className={clsx(
        'flex flex-col items-center transition',
        currentMusic == null && 'opacity-50 pointer-events-none'
      )}
    >
      <div className="flex items-center gap-5 text-xl">
        <IconButton onClick={() => setIsShuffled(!isShuffled)}>
          <FaShuffle color={isShuffled ? '#5dff92' : 'white'} />
        </IconButton>
        <IconButton onClick={() => previous(isShuffled)}>
          <FaBackwardStep color="white" />
        </IconButton>
        <IconButton onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? (
            <FaCirclePause color="white" className="text-4xl" />
          ) : (
            <FaCirclePlay color="white" className="text-4xl" />
          )}
        </IconButton>
        <IconButton onClick={() => next(isShuffled)}>
          <FaForwardStep color="white" />
        </IconButton>
        <IconButton onClick={() => setRepeatCurrentMusic(!repeatCurrentMusic)}>
          <FaRepeat color={repeatCurrentMusic ? '#5dff92' : 'white'} />
        </IconButton>
      </div>
      <div className="flex gap-5 items-center">
        <p className="text-xs">{formatDuration(position)}</p>
        <Slider
          className="text-white w-72"
          size="small"
          value={position}
          min={0}
          step={1}
          max={currentMusic?.duration || 0}
          onChange={(_, value) => setPosition(value as number)}
        />
        <p className="text-xs">-{formatDuration(100 - position)}</p>
      </div>
    </div>
  )
}
