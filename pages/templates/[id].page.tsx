import { NextPage } from 'next'
import React from 'react'
import TemplatePage from './components/TemplatePage'
import { useRouter } from 'next/router'
import { TemplateId, templates } from './templates'

const DynamicTemplatePage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query as { id: TemplateId }
  let pageData = templates[TemplateId.GENERAL_ESSAY_ID]
  if (id && Object.values(TemplateId).includes(id)) pageData = templates[id]

  return (
    <TemplatePage
      id={pageData.id}
      icon={pageData.icon}
      title={pageData.title}
      description={pageData.description}
      characterLimit={pageData.characterLimit}
      inputRows={pageData.inputRows}
      promptPlaceholder={pageData.promptPlaceholder}
      quotePlaceholder={pageData.quotePlaceholder}
      supportExamplePrompt={pageData.supportExamplePrompt}
      supportTone={pageData.supportTone}
      supportQuotes={pageData.supportQuotes}
      supportReferences={pageData.supportReferences}
      supportRequestedLength={pageData.supportRequestedLength}
      supportPointOfView={pageData.supportPointOfView}
      href={pageData.href}
    />
  )
}

export default DynamicTemplatePage
