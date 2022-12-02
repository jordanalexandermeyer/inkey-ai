import { NextPage } from 'next'
import React from 'react'
import { COLLEGE_APP_ESSAY_ID } from '../../lib/constants'
import TemplatePage from './components/TemplatePage'

const CollegeAppEssayTemplate: NextPage = () => {
  return (
    <TemplatePage
      id={COLLEGE_APP_ESSAY_ID}
      icon="🎓"
      title="College Application Essay"
      subtitle="Write a college application essay prompt like a Common App prompt to receive an essay that could get you into the school of your dreams!"
      promptPlaceholder="Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story."
    />
  )
}

export default CollegeAppEssayTemplate
