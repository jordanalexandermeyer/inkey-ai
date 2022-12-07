import { NextPage } from 'next'
import React from 'react'
import TemplatePage from './components/TemplatePage'
import { useRouter } from 'next/router'
import { EssayId, templates } from './templates'

const DynamicTemplatePage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query as { id: EssayId }
  let pageData = templates[EssayId.GENERAL_ESSAY_ID]
  if (id && Object.values(EssayId).includes(id)) pageData = templates[id]

  return (
    <TemplatePage
      id={pageData.id}
      icon={pageData.icon}
      title={pageData.title}
      description={pageData.description}
      promptPlaceholder={pageData.promptPlaceholder}
      quotePlaceholder={pageData.quotePlaceholder}
      supportQuotes={pageData.supportQuotes}
      supportReferences={pageData.supportReferences}
      supportRequestedLength={pageData.supportRequestedLength}
      href={pageData.href}
    />
  )
}

export default DynamicTemplatePage
