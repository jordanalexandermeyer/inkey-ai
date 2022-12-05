import { NextPage } from 'next'
import React from 'react'
import { EXPOSITORY_ESSAY_ID } from '../../lib/constants'
import TemplatePage from './components/TemplatePage'

const ExpositoryEssayTemplate: NextPage = () => {
  return (
    <TemplatePage
      id={EXPOSITORY_ESSAY_ID}
      icon="🧑‍🎨"
      title="Expository Essay"
      subtitle="Write a prompt for an expository essay and a unique, never before seen essay will be written."
      promptPlaceholder="Describe how communication has changed in the last twenty years."
      supportReferences={true}
    />
  )
}

export default ExpositoryEssayTemplate
