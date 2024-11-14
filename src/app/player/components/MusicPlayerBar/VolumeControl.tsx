import { Slider } from '@mui/material'
import { FaVolumeLow, FaVolumeHigh } from 'react-icons/fa6'
import { useState } from 'react'

export default function VolumeControl() {
  const [volume, setVolume] = useState(1)

  return (
    <div className="flex gap-5 items-center">
      <FaVolumeLow className="flex-shrink-0" />
      <Slider
        className="text-white w-72"
        size="small"
        value={volume}
        min={0}
        step={0.01}
        max={1}
        onChange={(_, value) => setVolume(value as number)}
      />
      <FaVolumeHigh className="flex-shrink-0" />
    </div>
  )
}
