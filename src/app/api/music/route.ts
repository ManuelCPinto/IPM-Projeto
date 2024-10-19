import { turso } from '@/utils/turso'

export const runtime = 'edge'

export async function GET() {
  const { rows } = await turso.execute('SELECT * FROM musics')

  return Response.json(rows)
}
