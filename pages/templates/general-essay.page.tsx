import { NextPage } from 'next'
import React from 'react'
import { GENERAL_ESSAY_ID } from '../../lib/constants'
import TemplatePage from './components/TemplatePage'

const GeneralParagraphEssayTemplate: NextPage = () => {
  return (
    <TemplatePage
      id={GENERAL_ESSAY_ID}
      icon="📝"
      title="General Essay"
      subtitle="Ask a prompt and receive a compelling essay."
      promptPlaceholder="What is the importance of investing money in space exploration?"
      supportReferences={true}
    />
  )
}

export default GeneralParagraphEssayTemplate
