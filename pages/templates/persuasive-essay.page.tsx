import { NextPage } from 'next'
import React from 'react'
import { PERSUASIVE_ESSAY_ID } from '../../lib/constants'
import TemplatePage from './components/TemplatePage'

const PersuasiveEssayTemplate: NextPage = () => {
  return (
    <TemplatePage
      id={PERSUASIVE_ESSAY_ID}
      icon="📣"
      title="Persuasive Essay"
      subtitle="Write a prompt for a persuasive essay and a unique, never before seen essay will be written."
      promptPlaceholder="Write an essay persuading readers that working remotely is superior to working in-person."
    />
  )
}

export default PersuasiveEssayTemplate
