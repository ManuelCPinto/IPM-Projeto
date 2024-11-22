import { create } from 'zustand'
import { produce } from 'immer'
import { random } from 'lodash'
import { subscribeWithSelector } from 'zustand/middleware'
import { ExtendedSong } from '@/database/utils/getExtendedSong'

export enum RepeatMode {
  NONE,
  ALL,
  CURRENT
}

interface MusicPlayerStore {
  queue: ExtendedSong[]
  currentMusicIndex: number | null
  repeatMode: RepeatMode
  isShuffled: boolean

  currentMusic(): ExtendedSong | null

  add(song: ExtendedSong): void
  set(newQueue: ExtendedSong[]): void
  next(): Promise<number | null>
  previous(): Promise<number | null>
}

// Client-side code only
export const audio = typeof window !== 'undefined' ? new Audio() : undefined

export const useMusicPlayerStore = create(
  subscribeWithSelector<MusicPlayerStore>((set, get) => ({
    queue: [],
    currentMusicIndex: null,
    repeatMode: RepeatMode.NONE,
    isShuffled: false,

    currentMusic() {
      const state = get()
      return state.currentMusicIndex !== null ? state.queue[state.currentMusicIndex] : null
    },

    add(song: ExtendedSong) {
      set(
        produce((draft: MusicPlayerStore) => {
          draft.queue.push(song)
          if (draft.currentMusicIndex === null && draft.queue.length > 0) {
            draft.currentMusicIndex = 0
          }
        })
      )
    },
    set(newQueue: ExtendedSong[]) {
      set({
        queue: newQueue,
        currentMusicIndex: newQueue.length > 0 ? 0 : null
      })
    },
    next() {
      audio.currentTime = 0

      return new Promise<number | null>((resolve) => {
        set((state) => {
          const newCurrentMusicIndex =
            state.currentMusicIndex !== null
              ? state.isShuffled
                ? random(0, state.queue.length - 1)
                : (state.currentMusicIndex + 1) % state.queue.length
              : null
          resolve(newCurrentMusicIndex)
          return { currentMusicIndex: newCurrentMusicIndex }
        })
      })
    },
    previous() {
      return new Promise<number | null>((resolve) => {
        const oldCurrentTime = audio.currentTime
        audio.currentTime = 0
        if (oldCurrentTime < 3) return resolve(get().currentMusicIndex)

        set((state) => {
          const newCurrentMusicIndex =
            state.currentMusicIndex !== null
              ? state.isShuffled
                ? random(0, state.queue.length - 1)
                : (state.currentMusicIndex - 1) % state.queue.length
              : null
          resolve(newCurrentMusicIndex)
          return { currentMusicIndex: newCurrentMusicIndex }
        })
      })
    }
  }))
)

useMusicPlayerStore.subscribe(
  (state) => state.currentMusic(),
  async (currentMusic) => {
    const audioURL = currentMusic?.audio
    if (audioURL) {
      audio.src = audioURL
      await audio.play()
    } else {
      audio.removeAttribute('src')
      audio.load()
    }
  }
)

audio?.addEventListener('ended', async () => {
  const musicPlayerStore = useMusicPlayerStore.getState()
  switch (musicPlayerStore.repeatMode) {
    case RepeatMode.NONE: {
      const newCurrentMusicIndex = await musicPlayerStore.next()
      if (!newCurrentMusicIndex) return
      break
    }
    case RepeatMode.ALL: {
      const newCurrentMusicIndex = await musicPlayerStore.next()
      if (newCurrentMusicIndex === null) return
      break
    }
    case RepeatMode.CURRENT: {
      audio.currentTime = 0
      break
    }
  }
  await audio.play()
})
