import { NextApiRequest, NextApiResponse } from 'next'
import admin from '../lib/firebase'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const db = admin.firestore()

  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  })
}
