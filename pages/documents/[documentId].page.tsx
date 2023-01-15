import {
  Document,
  DocumentFields,
  getDocument,
  updateDocument,
} from '@/db/documents'
import { useUser } from '@/utils/useUser'
import { Editor } from '@tinymce/tinymce-react'
import Page from 'components/Page'
import ProtectedPage from 'components/ProtectedPage'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const DocumentPage: NextPage = () => {
  const router = useRouter()
  const { documentId } = router.query as any
  const { user } = useUser()
  const [documentState, setDocumentState] = useState<Document | undefined>(
    undefined,
  )
  const [editorContent, setEditorContent] = useState('')
  const [documentTitle, setDocumentTitle] = useState(documentState?.title ?? '')
  const [isSavingDocument, setIsSavingDocument] = useState(false)
  let typingTimer: NodeJS.Timeout

  useEffect(() => {
    const loadDocument = async () => {
      const document = await getDocument(documentId)
      if (!document || document.owner != user?.uid) router.replace('/documents')
      else setDocumentState(document)
    }

    if (documentId && user) loadDocument()
  }, [documentId, user])

  useEffect(() => setEditorContent(documentState?.content ?? ''), [
    documentState?.content,
  ])
  useEffect(() => setDocumentTitle(documentState?.title ?? ''), [
    documentState?.title,
  ])

  const autosaveDocument = (editorContent: string) => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(
      async () => await persistDocumentChanges({ content: editorContent }),
      5000,
    )
  }

  const persistDocumentChanges = async (documentFields: DocumentFields) => {
    if (documentState) {
      setIsSavingDocument(true)
      setDocumentState((currentDocumentState) => {
        return { ...currentDocumentState, ...documentFields } as Document
      })
      await updateDocument(documentState.id, documentFields)
      setIsSavingDocument(false)
    }
  }

  return (
    <ProtectedPage>
      <Page title={`${documentState?.title} | Documents - Inkey`}>
        {documentState && (
          <>
            <div className="w-full absolute flex justify-center items-center p-1.5 bg-gray-50">
              <div className="z-20 flex gap-2 justify-center items-center">
                <input
                  className="w-40 text-ellipsis px-2 bg-transparent text-center border border-transparent rounded-md hover:border hover:border-gray-300"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onBlur={() =>
                    persistDocumentChanges({ title: documentTitle })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur()
                    }
                  }}
                ></input>

                {isSavingDocument ? (
                  <div className="flex justify-center items-center w-6 h-6">
                    <svg
                      className="w-4 h-4 text-blue-700 animate-spin"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#d1d5db"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 48 48"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    {documentState.content == editorContent ? (
                      <path
                        fill="currentColor"
                        d="m20.6 34.05 11.5-11.5-2-2L20.65 30l-5-5-2.05 2.05ZM12.55 40q-4.4 0-7.475-3.075Q2 33.85 2 29.45q0-3.9 2.5-6.85 2.5-2.95 6.35-3.55 1-4.85 4.7-7.925T24.1 8.05q5.6 0 9.45 4.075Q37.4 16.2 37.4 21.9v1.2q3.6-.1 6.1 2.325Q46 27.85 46 31.55q0 3.45-2.5 5.95T37.55 40Zm0-3h25q2.25 0 3.85-1.6t1.6-3.85q0-2.25-1.6-3.85t-3.85-1.6H34.4v-4.2q0-4.55-3.05-7.7-3.05-3.15-7.45-3.15t-7.475 3.15q-3.075 3.15-3.075 7.7h-.95q-3.1 0-5.25 2.175T5 29.45q0 3.15 2.2 5.35Q9.4 37 12.55 37ZM24 24Z"
                      />
                    ) : (
                      <path
                        fill="currentColor"
                        d="M12.55 40q-4.4 0-7.475-3.075Q2 33.85 2 29.45q0-3.9 2.5-6.85 2.5-2.95 6.35-3.55 1-4.85 4.7-7.925T24.1 8.05q5.6 0 9.45 4.075Q37.4 16.2 37.4 21.9v1.2q3.6-.1 6.1 2.325Q46 27.85 46 31.55q0 3.45-2.5 5.95T37.55 40Zm0-3h25q2.25 0 3.85-1.6t1.6-3.85q0-2.25-1.6-3.85t-3.85-1.6H34.4v-4.2q0-4.55-3.05-7.7-3.05-3.15-7.45-3.15t-7.475 3.15q-3.075 3.15-3.075 7.7h-.95q-3.1 0-5.25 2.175T5 29.45q0 3.15 2.2 5.35Q9.4 37 12.55 37ZM24 24Z"
                      />
                    )}
                  </svg>
                )}
              </div>
            </div>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
              value={editorContent}
              onEditorChange={(newValue, editor) => setEditorContent(newValue)}
              init={{
                height: '100vh',
                statusbar: false,
                sidebar_show: 'mysidebar',
                setup: (editor) => {
                  editor.addShortcut('meta+s', 'Save document.', () => {
                    persistDocumentChanges({ content: editor.getContent() })
                  })

                  editor.on('keyup', () => {
                    autosaveDocument(editor.getContent())
                  })

                  editor.on('Change', () => {
                    autosaveDocument(editor.getContent())
                  })
                },
                skin_url: '/assets/skins/ui/CUSTOM',
                content_css: '/assets/skins/content/CUSTOM/content.css',
                menubar: 'file edit insert format tools',
                menu: {
                  file: {
                    title: 'File',
                    items: 'export print',
                  },
                  edit: {
                    title: 'Edit',
                    items:
                      'undo redo | cut copy paste pastetext | selectall | searchreplace',
                  },
                  insert: {
                    title: 'Insert',
                    items:
                      'image link | codesample inserttable | charmap emoticons hr',
                  },
                  format: {
                    title: 'Format',
                    items:
                      'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | removeformat',
                  },
                  tools: {
                    title: 'Tools',
                    items: 'wordcount',
                  },
                },
                plugins:
                  'export lists advlist link autolink image codesample charmap wordcount emoticons searchreplace table',
                toolbar:
                  'undo redo | styles | fontfamily | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | lineheight | bullist numlist outdent indent | subscript superscript strikethrough removeformat | print export',
                toolbar_sticky: true,
              }}
            />
          </>
        )}
      </Page>
    </ProtectedPage>
  )
}

export default DocumentPage
