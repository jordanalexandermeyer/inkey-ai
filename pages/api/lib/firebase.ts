import admin from 'firebase-admin'
import { firebaseConfig } from './firebaseConfig'

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  })
} catch (error) {}

export default admin
