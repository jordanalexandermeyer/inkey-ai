import { NextPage } from 'next'
import React from 'react'
import { TemplateId, templates } from '../templates/templates'
import TemplatePage from '../templates/components/TemplatePage'
import { useUser } from 'utils/useUser'

const ParaphraserPage: NextPage = () => {
  let pageData = templates[TemplateId.PARAPHRASER_ID]

  const { subscription } = useUser()

  return (
    <TemplatePage
      id={pageData.id}
      icon={pageData.icon}
      title={pageData.title}
      description={pageData.description}
      characterLimit={!!subscription?.role ? 15000 : 1000}
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
      attribute={pageData.attribute}
    />
  )
}

export default ParaphraserPage
