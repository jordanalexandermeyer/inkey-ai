import {
  doc,
  getDoc,
  getFirestore,
  increment,
  updateDoc,
} from 'firebase/firestore'
import { UsageDetails } from 'types'

const db = getFirestore()

export async function updateUserWordsGenerated(
  userId: string,
  numberOfWordsGenerated: number,
) {
  const usageDetailsDocRef = doc(db, 'usage_details', userId)
  const docSnapshot = await getDoc(usageDetailsDocRef)

  if (docSnapshot.exists()) {
    const {
      monthly_allowance: monthlyAllowance,
      monthly_usage: monthlyUsage,
      bonus_allowance: bonusAllowance,
    } = docSnapshot.data() as UsageDetails

    // case: monthly usage < allowance
    // add to monthly usage (if > allowance, set equal to allowance)
    if (monthlyUsage < monthlyAllowance) {
      if (monthlyUsage + numberOfWordsGenerated > monthlyAllowance) {
        await updateDoc(usageDetailsDocRef, {
          monthly_usage: monthlyAllowance,
          total_usage: increment(numberOfWordsGenerated),
        })
      } else {
        await updateDoc(usageDetailsDocRef, {
          monthly_usage: increment(numberOfWordsGenerated),
          total_usage: increment(numberOfWordsGenerated),
        })
      }
    } else {
      // case: monthly usage > allowance
      // double check to make sure bonus allowance is not 0, then subtract from bonus allowance (if > bonus allowance, set bonus allowance to 0)
      if (bonusAllowance <= 0) {
      } else {
        if (numberOfWordsGenerated > bonusAllowance) {
          await updateDoc(usageDetailsDocRef, {
            bonus_allowance: 0,
            total_usage: increment(numberOfWordsGenerated),
          })
        } else {
          await updateDoc(usageDetailsDocRef, {
            bonus_allowance: increment(-1 * numberOfWordsGenerated),
            total_usage: increment(numberOfWordsGenerated),
          })
        }
      }
    }
  }
}
