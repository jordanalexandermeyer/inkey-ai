import { User } from 'firebase/auth'

export default async function getIsUserEarlyAccess(
  user: User,
): Promise<boolean> {
  user.getIdToken(true)
  const decodedToken = await user?.getIdTokenResult()
  // stripe role will be set if user has paid
  return decodedToken?.claims?.stripeRole ? true : false
}
