import { NextPage } from 'next'
import React from 'react'
import { COMPARE_CONTRAST_ESSAY_ID } from '../../lib/constants'
import TemplatePage from './components/TemplatePage'

const CompareContrastEssayTemplate: NextPage = () => {
  return (
    <TemplatePage
      id={COMPARE_CONTRAST_ESSAY_ID}
      icon="💁"
      title="Compare and Contrast Essay"
      subtitle="Write a prompt for a compare and contrast essay and a unique, never before seen essay will be written."
      promptPlaceholder="Compare and contrast the book Lord of the Flies with the TV show Survivor."
    />
  )
}

export default CompareContrastEssayTemplate
