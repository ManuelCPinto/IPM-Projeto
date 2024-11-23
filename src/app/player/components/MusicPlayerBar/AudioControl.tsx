'use client'

import { FaShuffle, FaBackwardStep, FaCirclePause, FaCirclePlay, FaForwardStep } from 'react-icons/fa6'
import { useState } from 'react'
import { useEvent } from 'react-use'
import { IconButton, Slider } from '@mui/material'
import { audio, RepeatMode, useMusicPlayerStore } from '@/stores/musicPlayerStore'
import { clsx } from 'clsx'
import { LuRepeat, LuRepeat1 } from 'react-icons/lu'

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  let result = ''
  if (hours > 0) result += `${hours}:`
  result += `${minutes.toString().padStart(hours > 0 ? 2 : 1, '0')}:`
  result += secs.toString().padStart(2, '0')
  return result
}

export default function AudioControl() {
  const { next, previous } = useMusicPlayerStore()
  const repeatMode = useMusicPlayerStore((state) => state.repeatMode)
  const isShuffled = useMusicPlayerStore((state) => state.isShuffled)
  const currentMusic = useMusicPlayerStore((state) => state.currentMusic())

  const [isPlaying, setIsPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)

  let nextRepeatMode = RepeatMode.ALL

  useEvent('play', () => setIsPlaying(true), audio)
  useEvent('pause', () => setIsPlaying(false), audio)
  useEvent('durationchange', () => setDuration(Math.floor(audio.duration)), audio)
  useEvent('timeupdate', () => setPosition(Math.floor(audio.currentTime)), audio)
  useEvent(
    'emptied',
    () => {
      setIsPlaying(false)
      setPosition(0)
      setDuration(0)
    },
    audio
  )

  return (
    <div
      className={clsx(
        'flex flex-col items-center transition',
        currentMusic == null && 'opacity-50 pointer-events-none'
      )}
    >
      <div className="flex items-center gap-5 text-xl">
        <IconButton onClick={() => useMusicPlayerStore.setState({ isShuffled: !isShuffled })}>
          <FaShuffle color={isShuffled ? '#5dff92' : 'white'} />
        </IconButton>
        <IconButton onClick={() => previous()}>
          <FaBackwardStep color="white" />
        </IconButton>
        <IconButton>
          {isPlaying ? (
            <FaCirclePause color="white" className="text-4xl" onClick={() => audio.pause()} />
          ) : (
            <FaCirclePlay color="white" className="text-4xl" onClick={() => audio.play()} />
          )}
        </IconButton>
        <IconButton onClick={() => next()}>
          <FaForwardStep color="white" />
        </IconButton>
        <IconButton onClick={() => useMusicPlayerStore.setState({ repeatMode: nextRepeatMode })}>
          {(() => {
            switch (repeatMode) {
              case RepeatMode.NONE:
                nextRepeatMode = RepeatMode.ALL
                return <LuRepeat color="white" />
              case RepeatMode.ALL:
                nextRepeatMode = RepeatMode.CURRENT
                return <LuRepeat color="#5dff92" />
              case RepeatMode.CURRENT:
                nextRepeatMode = RepeatMode.NONE
                return <LuRepeat1 color="#5dff92" />
            }
          })()}
        </IconButton>
      </div>
      <div className="grid grid-cols-[auto_300px_auto] gap-5 w-full items-center justify-center">
        <p className="text-xs">{formatDuration(position)}</p>
        <Slider
          className="text-white w-72"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => (audio.currentTime = value as number)}
        />
        <p className="text-xs">-{formatDuration(duration - position)}</p>
      </div>
    </div>
  )
}
