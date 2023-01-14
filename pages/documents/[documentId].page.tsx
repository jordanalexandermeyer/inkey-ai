import { Document, getDocument, updateDocument } from '@/db/documents'
import { useUser } from '@/utils/useUser'
import { Editor } from '@tinymce/tinymce-react'
import Page from 'components/Page'
import ProtectedPage from 'components/ProtectedPage'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const DocumentPage: NextPage = () => {
  const router = useRouter()
  const { user } = useUser()
  const { documentId } = router.query as any
  const [document, setDocument] = useState<Document>()
  const [value, setValue] = useState(document?.content ?? '')

  useEffect(() => {
    const loadDocument = async () => {
      const document = await getDocument(documentId)
      if (!document || document.owner != user?.uid) router.replace('/documents')
      else setDocument(document)
    }

    if (documentId && user) loadDocument()
  }, [documentId, user])

  useEffect(() => setValue(document?.content ?? ''), [document?.content])

  return (
    <ProtectedPage>
      <Page title={`${document?.title} | Documents - Inkey`}>
        {document && (
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
            initialValue={document?.content}
            value={value}
            onEditorChange={(newValue, editor) => setValue(newValue)}
            onSaveContent={async (evt, editor) => {
              evt.preventDefault()
              await updateDocument(document.id, value)
            }}
            init={{
              height: '100vh',
              statusbar: false,
              skin_url: '/assets/skins/ui/CUSTOM',
              content_css: '/assets/skins/content/CUSTOM/content.css',
              menubar: 'file edit insert format tools',
              menu: {
                file: {
                  title: 'File',
                  items: 'newdocument | export print',
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
                'export lists advlist link autolink image codesample charmap wordcount emoticons searchreplace table save',
              toolbar:
                'undo redo | styles | fontfamily | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | lineheight | bullist numlist outdent indent | subscript superscript strikethrough removeformat | print export',
              toolbar_sticky: true,
            }}
          />
        )}
      </Page>
    </ProtectedPage>
  )
}

export default DocumentPage
