import { NextPage } from 'next'
import React from 'react'
import { TemplateId, templates } from '../templates/templates'
import TemplatePage from '../templates/components/TemplatePage'
import { useUser } from 'utils/useUser'

const SummarizerPage: NextPage = () => {
  let pageData = templates[TemplateId.SUMMARIZER_ID]

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
      supportRequestedLength={pageData.supportRequestedLength}
      supportPointOfView={pageData.supportPointOfView}
      href={pageData.href}
      attribute={pageData.attribute}
    />
  )
}

export default SummarizerPage
