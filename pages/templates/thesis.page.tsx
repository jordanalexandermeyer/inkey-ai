import { NextPage } from 'next'
import React from 'react'
import { THESIS_ID } from '../../lib/constants'
import TemplatePage from './components/TemplatePage'

const ThesisTemplate: NextPage = () => {
  return (
    <TemplatePage
      id={THESIS_ID}
      icon="✏️"
      title="Thesis"
      subtitle="Write an essay prompt to create a thesis."
      promptPlaceholder="What is the importance of investing money in space exploration?"
    />
  )
}

export default ThesisTemplate
