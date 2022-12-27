export const config = {
  runtime: 'edge',
}

export default async function handler(request: Request, response: Response) {
  return new Response(null, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
