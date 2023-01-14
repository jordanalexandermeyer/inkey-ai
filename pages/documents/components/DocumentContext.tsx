import { Document } from '@/db/documents'
import * as React from 'react'

export enum DocumentsAction {
  DELETE = 'delete',
  CREATE = 'create',
  SET = 'set',
}

export interface DocumentState {
  documents?: { [key: string]: Document }
}

type Action = { type: DocumentsAction; payload: any }
type Dispatch = (action: Action) => void
type DocumentsProviderProps = { children: React.ReactNode }

const DocumentsStateContext = React.createContext<
  { state: DocumentState; dispatch: Dispatch } | undefined
>(undefined)

function DocumentsReducer(state: DocumentState, action: Action) {
  switch (action.type) {
    case DocumentsAction.CREATE: {
      return { documents: {} }
    }
    case DocumentsAction.DELETE: {
      return { documents: {} }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function DocumentsProvider({ children }: DocumentsProviderProps) {
  const [state, dispatch] = React.useReducer(DocumentsReducer, {
    documents: {},
  })
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }
  return (
    <DocumentsStateContext.Provider value={value}>
      {children}
    </DocumentsStateContext.Provider>
  )
}

function useDocuments() {
  const context = React.useContext(DocumentsStateContext)
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentsProvider')
  }
  return context
}

export { DocumentsProvider, useDocuments }

const handleCreateDocumentAction = (state: DocumentState, payload: any) => {}
