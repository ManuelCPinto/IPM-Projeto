import ky from 'ky'

export default function Home() {
  async function showMusicMessage() {
    const musicName = await ky.get('/api/music').text()
    alert('From "musics" table:\n' + musicName)
  }

  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center">
      <p className="text-xl font-bold">Hello World!</p>
      <button onClick={showMusicMessage} className="px-2 py-1 rounded bg-white/50 hover:bg-white/30 transition">
        Click Here
      </button>
    </div>
    
  )
  
}
