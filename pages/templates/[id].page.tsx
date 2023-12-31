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
      svgIcon={pageData.svgIcon}
      title={pageData.title}
      description={pageData.description}
      promptCharacterLimit={pageData.promptCharacterLimit}
      inputRows={pageData.inputRows}
      promptName={pageData.promptName}
      promptPlaceholder={pageData.promptPlaceholder}
      quotePlaceholder={pageData.quotePlaceholder}
      supportExamplePrompt={pageData.supportExamplePrompt}
      supportTone={pageData.supportTone}
      supportQuotes={pageData.supportQuotes}
      supportRequestedLength={pageData.supportRequestedLength}
      supportPointOfView={pageData.supportPointOfView}
      supportLanguages={pageData.supportLanguages}
      supportCodingLanguages={pageData.supportCodingLanguages}
      supportContent={pageData.supportContent}
      contentCharacterLimit={pageData.contentCharacterLimit}
      href={pageData.href}
      attribute={pageData.attribute}
    />
  )
}

export default DynamicTemplatePage
