export interface Template {
  id: EssayId
  icon: string
  title: string
  description: string
  promptPlaceholder: string
  supportQuotes?: boolean
  supportReferences?: boolean
  supportRequestedLength?: boolean
  href: string
}

export enum EssayId {
  GENERAL_ESSAY_ID = 'general-essay',
  THESIS_ID = 'thesis',
  COLLEGE_APP_ESSAY_ID = 'college-app-essay',
  PERSUASIVE_ESSAY_ID = 'persuasive-essay',
  EXPOSITORY_ESSAY_ID = 'expository-essay',
  COMPARE_CONTRAST_ESSAY_ID = 'compare-contrast-essay',
  ARGUMENTATIVE_ESSAY_ID = 'argumentative-essay',
  CAUSE_EFFECT_ESSAY_ID = 'cause-effect-essay',
  NARRATIVE_ESSAY_ID = 'narrative-essay',
  DEFINITION_ESSAY_ID = 'definition-essay',
  DESCRIPTIVE_ESSAY_ID = 'descriptive-essay',
  LITERARY_ESSAY_ID = 'literary-essay',
}

export type TemplateMap = {
  [key in EssayId]: Template
}

export const templates: TemplateMap = {
  [EssayId.GENERAL_ESSAY_ID]: {
    id: EssayId.GENERAL_ESSAY_ID,
    icon: '📝',
    title: 'General Essay',
    description: 'Ask a prompt and receive a compelling essay.',
    promptPlaceholder:
      'What is the importance of investing money in space exploration?',
    supportQuotes: true,
    supportReferences: true,
    supportRequestedLength: true,
    href: `/templates/${EssayId.GENERAL_ESSAY_ID}`,
  },
  [EssayId.THESIS_ID]: {
    id: EssayId.THESIS_ID,
    icon: '✏️',
    title: 'Thesis',
    description: 'Write an essay prompt to create a thesis statement.',
    promptPlaceholder:
      'What is the importance of investing money in space exploration?',
    href: `/templates/${EssayId.THESIS_ID}`,
  },
  [EssayId.COLLEGE_APP_ESSAY_ID]: {
    id: EssayId.COLLEGE_APP_ESSAY_ID,
    icon: '🎓',
    title: 'College Application Essay',
    description:
      'A college application essay is a written statement that is submitted as part of a college application, in which the writer presents their goals, experiences, and qualifications in order to demonstrate their suitability for admission to the college.',
    promptPlaceholder:
      'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.',
    supportRequestedLength: true,
    href: `/templates/${EssayId.COLLEGE_APP_ESSAY_ID}`,
  },
  [EssayId.PERSUASIVE_ESSAY_ID]: {
    id: EssayId.PERSUASIVE_ESSAY_ID,
    icon: '📣',
    title: 'Persuasive Essay',
    description:
      "A persuasive essay is intended to convince the reader of the writer's opinion on a particular subject, using evidence and reasoning to support the writer's position.",
    promptPlaceholder:
      'Write an essay persuading readers that working in-person is superior to working remotely.',
    supportQuotes: true,
    supportReferences: true,
    supportRequestedLength: true,
    href: `/templates/${EssayId.PERSUASIVE_ESSAY_ID}`,
  },
  [EssayId.EXPOSITORY_ESSAY_ID]: {
    id: EssayId.EXPOSITORY_ESSAY_ID,
    icon: '🧑‍🎨',
    title: 'Expository Essay',
    description:
      'An expository essay explains or informs the reader about a particular topic or idea. The purpose of this type of essay is to provide information and clarify ideas or concepts for the reader.',
    promptPlaceholder:
      'Describe how communication has changed in the last twenty years.',
    supportQuotes: true,
    supportReferences: true,
    supportRequestedLength: true,
    href: `/templates/${EssayId.EXPOSITORY_ESSAY_ID}`,
  },
  [EssayId.COMPARE_CONTRAST_ESSAY_ID]: {
    id: EssayId.COMPARE_CONTRAST_ESSAY_ID,
    icon: '💁',
    title: 'Compare and Contrast Essay',
    description:
      'A compare and contrast essay compares and contrasts two or more subjects, and analyzes the similarities and differences between them.',
    promptPlaceholder:
      'Compare and contrast the book Lord of the Flies with the TV show Survivor.',
    supportQuotes: true,
    supportReferences: true,
    supportRequestedLength: true,
    href: `/templates/${EssayId.COMPARE_CONTRAST_ESSAY_ID}`,
  },
  [EssayId.ARGUMENTATIVE_ESSAY_ID]: {
    id: EssayId.ARGUMENTATIVE_ESSAY_ID,
    icon: '🗣',
    title: 'Argumentative Essay Essay',
    description:
      "An argumentative essay presents the writer's point of view on a particular issue and provides evidence and arguments to support that point of view.",
    promptPlaceholder:
      'Do you think middle schoolers should have jobs like babysitting or mowing lawns?',
    supportQuotes: true,
    supportReferences: true,
    supportRequestedLength: true,
    href: `/templates/${EssayId.ARGUMENTATIVE_ESSAY_ID}`,
  },
  [EssayId.CAUSE_EFFECT_ESSAY_ID]: {
    id: EssayId.CAUSE_EFFECT_ESSAY_ID,
    icon: '↔️',
    title: 'Cause and Effect Essay',
    description:
      'A cause and effect essay explains the cause of a particular phenomenon and its effects on something else.',
    promptPlaceholder:
      'Write an essay on the causes of famine and the effects it has on human population.',
    supportQuotes: true,
    supportReferences: true,
    supportRequestedLength: true,
    href: `/templates/${EssayId.CAUSE_EFFECT_ESSAY_ID}`,
  },
  [EssayId.NARRATIVE_ESSAY_ID]: {
    id: EssayId.NARRATIVE_ESSAY_ID,
    icon: '📖',
    title: 'Narrative Essay',
    description:
      'A narrative essay tells a story or relates a personal experience.',
    promptPlaceholder:
      'Most of us remember exactly where we were and what we were doing when we received shocking or important news. Tell the story of what you were doing when you heard about an important event and how that news affected you.',
    supportRequestedLength: true,
    href: `/templates/${EssayId.NARRATIVE_ESSAY_ID}`,
  },
  [EssayId.DEFINITION_ESSAY_ID]: {
    id: EssayId.DEFINITION_ESSAY_ID,
    icon: '📚',
    title: 'Definition Essay',
    description:
      'A definition essay defines a particular term or concept, and provides detailed information and examples to help the reader understand the term or concept being defined.',
    promptPlaceholder: 'How has the definition of "health" changed over time?',
    supportQuotes: true,
    supportReferences: true,
    supportRequestedLength: true,
    href: `/templates/${EssayId.DEFINITION_ESSAY_ID}`,
  },
  [EssayId.DESCRIPTIVE_ESSAY_ID]: {
    id: EssayId.DESCRIPTIVE_ESSAY_ID,
    icon: '🎨',
    title: 'Descriptive Essay',
    description:
      'A descriptive essay provides a detailed description of a person, place, object, experience, or emotion.',
    promptPlaceholder: 'What is the role of pi in mathematics and physics?',
    supportQuotes: true,
    supportReferences: true,
    supportRequestedLength: true,
    href: `/templates/${EssayId.DESCRIPTIVE_ESSAY_ID}`,
  },
  [EssayId.LITERARY_ESSAY_ID]: {
    id: EssayId.LITERARY_ESSAY_ID,
    icon: '📕',
    title: 'Literary Essay',
    description:
      'A literary essay analyzes and evaluates a piece of literature, such as a novel, poem, or play.',
    promptPlaceholder:
      "Compare and contrast the fear of terrorism and the concern with safety issues in present day society with George Orwell's novel, 1984.",
    supportRequestedLength: true,
    href: `/templates/${EssayId.LITERARY_ESSAY_ID}`,
  },
}
