import { NextPage } from 'next'
import React from 'react'
import { FIVE_PARAGRAPH_ESSAY_ID } from '../../lib/constants'
import TemplatePage from './components/TemplatePage'

const FiveParagraphEssayTemplate: NextPage = () => {
  return (
    <TemplatePage
      id={FIVE_PARAGRAPH_ESSAY_ID}
      icon="📝"
      title="General Essay"
      subtitle="Ask a prompt and receive a compelling essay."
      promptPlaceholder="What is the importance of investing money in space exploration?"
    />
  )
}

export default FiveParagraphEssayTemplate
