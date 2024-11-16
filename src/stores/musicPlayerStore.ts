import { create } from 'zustand'
import { produce } from 'immer'
import { random } from 'lodash'

export interface Music {
  name: string
  author: string
  imageURL: string
  duration: number
}

interface MusicPlayerStore {
  queue: Music[]
  currentMusicIndex: number | null

  currentMusic(): Music | null
  add(music: Music): void
  set(newQueue: Music[]): void
  next(randomly?: boolean): void
  previous(randomly?: boolean): void
}

export const useMusicPlayerStore = create<MusicPlayerStore>((set, get) => ({
  queue: [],
  currentMusicIndex: null,

  currentMusic() {
    const state = get()
    return state.currentMusicIndex !== null ? state.queue[state.currentMusicIndex] : null
  },
  add(music: Music) {
    set(
      produce((draft: MusicPlayerStore) => {
        draft.queue.push(music)
      })
    )
  },
  set(newQueue: Music[]) {
    set({
      queue: newQueue,
      currentMusicIndex: newQueue.length > 0 ? 0 : null
    })
  },
  next(randomly = false) {
    set((state) => ({
      currentMusicIndex:
        state.currentMusicIndex !== null
          ? randomly
            ? random(0, state.queue.length - 1)
            : Math.max(0, Math.min(state.currentMusicIndex + 1, state.queue.length))
          : null
    }))
  },
  previous(randomly = false) {
    set((state) => ({
      currentMusicIndex:
        state.currentMusicIndex !== null
          ? randomly
            ? random(0, state.queue.length - 1)
            : Math.max(0, Math.min(state.currentMusicIndex - 1, state.queue.length))
          : null
    }))
  }
}))
