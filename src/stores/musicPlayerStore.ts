import { create } from 'zustand'
import { produce } from 'immer'
import { random } from 'lodash'
import { Music } from '@/database/schema'
import { subscribeWithSelector } from 'zustand/middleware'

export enum RepeatMode {
  NONE,
  ALL,
  CURRENT
}

interface MusicPlayerStore {
  queue: Music[]
  currentMusicIndex: number | null
  repeatMode: RepeatMode
  isShuffled: boolean

  currentMusic(): Music | null

  add(music: Music): void
  set(newQueue: Music[]): void
  next(): Promise<number | null>
  previous(): Promise<number | null>
}

export const audio = new Audio()

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

    add(music: Music) {
      set(
        produce((draft: MusicPlayerStore) => {
          draft.queue.push(music)
          if (draft.currentMusicIndex === null && draft.queue.length > 0) {
            draft.currentMusicIndex = 0
          }
        })
      )
    },
    set(newQueue: Music[]) {
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
    const audioURL = currentMusic?.audioURL
    if (audioURL) {
      audio.src = audioURL
      await audio.play()
    } else {
      audio.removeAttribute('src')
      audio.load()
    }
  }
)

audio.addEventListener('ended', async () => {
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
