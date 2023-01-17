import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

const db = getFirestore()

export const getDocument = async (
  documentId: string,
): Promise<Document | null> => {
  const docRef = doc(db, 'documents', documentId)
  const docSnapshot = await getDoc(docRef)
  if (!docSnapshot.exists()) {
    return null
  } else {
    const data: any = docSnapshot.data()
    return {
      id: docSnapshot.id,
      ...data,
    }
  }
}

export const getDocuments = async (uid: string) => {
  const docQuery = query(collection(db, 'documents'), where('owner', '==', uid))
  const querySnapshot = await getDocs(docQuery)
  const docs: Document[] = []
  querySnapshot.forEach((doc) => {
    const data: any = doc.data()
    if (!doc.data().deletionDate)
      docs.push({
        id: doc.id,
        ...data,
      })
  })
  return docs
}

export const createDocument = async (
  uid: string,
  options?: CreateDocumentOptions,
): Promise<Document> => {
  const newDoc = {
    owner: uid,
    title: 'New Document',
    content: '',
    citations: [],
    citationStyleId: CitationStyle.MLA,
    modifiedDate: Date.now(),
    creationDate: Date.now(),
    ...options,
  }

  const docRef = await addDoc(collection(db, 'documents'), newDoc)

  return {
    id: docRef.id,
    ...newDoc,
  }
}

export const updateDocument = async (
  documentId: string,
  documentFields: DocumentFields,
) => {
  const docRef = doc(db, 'documents', documentId)
  await setDoc(
    docRef,
    { ...documentFields, modifiedDate: Date.now() },
    { merge: true },
  )
}

export const deleteDocument = async (id: string) => {
  const docRef = doc(db, 'documents', id)
  await setDoc(docRef, { deletionDate: Date.now() }, { merge: true })
}

export interface Document extends DocumentWithoutId {
  id: string
}

export interface DocumentWithoutId {
  title: string
  content: string
  citations?: Citation[]
  citationStyleId: string
  owner: string
  modifiedDate: number
  creationDate: number
  deletionDate?: number
}

export interface DocumentFields {
  title?: string
  content?: string
  citations?: Citation[]
  citationStyleId?: string
}

export interface CreateDocumentOptions {
  title?: string
  content?: string
  citations?: Citation[]
  totalStorageUsed?: number
  citationStyleId?: string
}

export interface Citation {
  citationSource: string
  contributors: Contributor[]
  publicationInfo: PublicationInfo
  refId: string
  ignore: boolean
  isCited: boolean
  id: string
}

export enum CitationStyle {
  MLA = 'modern-language-association',
  APA = 'american-psychological-association',
}

export interface Contributor {
  key: string
  firstName: string
  lastName: string
  contributorType: string
}

export interface PublicationInfo {
  title: string
  issue: string
  publisher: string
  publishDate: PublishDate
  volume: string
  citedPages: CitedPages
}

export interface CitedPages {
  start: string
  end: string
}

export interface PublishDate {
  day: number
  month: number
  year: number
}
