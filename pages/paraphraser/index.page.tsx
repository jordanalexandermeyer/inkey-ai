import { NextPage } from 'next'
import React from 'react'
import { TemplateId, templates } from '../templates/templates'
import TemplatePage from '../templates/components/TemplatePage'

const ParaphraserPage: NextPage = () => {
  let pageData = templates[TemplateId.PARAPHRASER_ID]

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
      supportRequestedLength={pageData.supportRequestedLength}
      supportPointOfView={pageData.supportPointOfView}
      href={pageData.href}
      attribute={pageData.attribute}
    />
  )
}

export default ParaphraserPage
