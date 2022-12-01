import { NextPage } from 'next'
import React from 'react'
import { FIVE_PARAGRAPH_ESSAY_ID } from '../../lib/constants'
import TemplatePage from './components/TemplatePage'

const FiveParagraphEssayTemplate: NextPage = () => {
  return (
    <TemplatePage
      id={FIVE_PARAGRAPH_ESSAY_ID}
      icon="📝"
      title="Five Paragraph Essay"
      subtitle="Supply a prompt to create a compelling five paragraph essay."
      promptPlaceholder="What is the importance of investing money in space exploration?"
    />
  )
}

export default FiveParagraphEssayTemplate
