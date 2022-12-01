import { NextPage } from 'next'
import React from 'react'
import { COMMON_APP_ESSAY_ID } from '../../lib/constants'
import TemplatePage from './components/TemplatePage'

const CommonAppEssayTemplate: NextPage = () => {
  return (
    <TemplatePage
      id={COMMON_APP_ESSAY_ID}
      icon="🎓"
      title="College Application Essay"
      subtitle="Write some words and themes you want included in your college application essay and get a never-before-seen essay!"
      promptPlaceholder="growing up, childhood, biculturalism, cultural homelessness, dislocation, foreign, familiar, rootlessness, identity, confidence, empathy"
    />
  )
}

export default CommonAppEssayTemplate
