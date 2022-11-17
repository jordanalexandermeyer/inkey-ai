import { User } from 'firebase/auth'

export default async function getIsUserEarlyAccess(
  user: User,
): Promise<boolean> {
  user.getIdToken(true)
  const decodedToken = await user?.getIdTokenResult()
  console.log(decodedToken)
  // stripe role will be set if user has paid
  console.log(decodedToken?.claims?.stripeRole ? true : false)
  return decodedToken?.claims?.stripeRole ? true : false
}
