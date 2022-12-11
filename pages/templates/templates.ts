export interface Template {
  id: TemplateId
  icon: string
  title: string
  description: string
  characterLimit?: number
  inputRows?: number
  promptName?: string
  promptPlaceholder: string
  quotePlaceholder?: string
  supportExamplePrompt?: boolean
  supportTone?: boolean
  supportQuotes?: boolean
  supportReferences?: boolean
  supportRequestedLength?: boolean
  supportPointOfView?: boolean
  href: string
  new?: boolean
}

export enum TemplateId {
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
  SCIENTIFIC_ESSAY_ID = 'scientific-essay',
  BLOG_ID = 'blog',
  PARAPHRASER_ID = 'paraphraser',
  SUMMARIZER_ID = 'summarizer',
  POEM_ID = 'poem',
  SPEECH_ID = 'speech',
}

export type TemplateMap = {
  [key in TemplateId]: Template
}

export const templates: TemplateMap = {
  [TemplateId.POEM_ID]: {
    id: TemplateId.POEM_ID,
    icon: '📜',
    title: 'Poem',
    description:
      'A poem is a type of literature that uses artistic and imaginative language to express feelings and ideas in a compact and powerful way.',
    promptName: 'Poem title',
    promptPlaceholder: 'Trees',
    supportExamplePrompt: true,
    supportRequestedLength: false,
    supportTone: false,
    href: `/templates/${TemplateId.POEM_ID}`,
    new: true,
  },
  [TemplateId.SPEECH_ID]: {
    id: TemplateId.SPEECH_ID,
    icon: '🗣',
    title: 'Speech',
    description:
      'A speech is a formal address that is delivered to an audience for the purpose of communicating information, ideas, or feelings.',
    promptName: 'Speech title',
    promptPlaceholder:
      'Students should spend more time building friendships and less time working.',
    supportRequestedLength: false,
    supportPointOfView: false,
    href: `/templates/${TemplateId.SPEECH_ID}`,
    new: true,
  },
  [TemplateId.GENERAL_ESSAY_ID]: {
    id: TemplateId.GENERAL_ESSAY_ID,
    icon: '📝',
    title: 'General Essay',
    description: 'Ask a prompt and receive a compelling essay.',
    promptPlaceholder:
      'What is the importance of investing money in space exploration?',
    quotePlaceholder:
      '"That\'s one small step for man, one giant leap for mankind." - Neil Armstrong',
    supportQuotes: true,
    href: `/templates/${TemplateId.GENERAL_ESSAY_ID}`,
  },
  [TemplateId.THESIS_ID]: {
    id: TemplateId.THESIS_ID,
    icon: '✏️',
    title: 'Thesis',
    description: 'Write an essay prompt to create a thesis statement.',
    promptPlaceholder:
      'What is the importance of investing money in space exploration?',
    supportRequestedLength: false,
    supportTone: false,
    supportPointOfView: false,
    href: `/templates/${TemplateId.THESIS_ID}`,
  },
  [TemplateId.COLLEGE_APP_ESSAY_ID]: {
    id: TemplateId.COLLEGE_APP_ESSAY_ID,
    icon: '🎓',
    title: 'College Application Essay',
    description:
      'A college application essay is a written statement that is submitted as part of a college application, in which the writer presents their goals, experiences, and qualifications in order to demonstrate their suitability for admission to the college.',
    promptPlaceholder:
      'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.',
    quotePlaceholder: 'My father said, "You can\'t live here anymore."',
    supportQuotes: true,
    href: `/templates/${TemplateId.COLLEGE_APP_ESSAY_ID}`,
  },
  [TemplateId.PERSUASIVE_ESSAY_ID]: {
    id: TemplateId.PERSUASIVE_ESSAY_ID,
    icon: '📣',
    title: 'Persuasive Essay',
    description:
      "A persuasive essay is intended to convince the reader of the writer's opinion on a particular subject, using evidence and reasoning to support the writer's position.",
    promptPlaceholder:
      'Write an essay persuading readers that working in-person is superior to working remotely.',
    quotePlaceholder:
      'According to Elon Musk, "Remote work is no longer acceptable."',
    supportQuotes: true,
    href: `/templates/${TemplateId.PERSUASIVE_ESSAY_ID}`,
  },
  [TemplateId.EXPOSITORY_ESSAY_ID]: {
    id: TemplateId.EXPOSITORY_ESSAY_ID,
    icon: '🧑‍🎨',
    title: 'Expository Essay',
    description:
      'An expository essay explains or informs the reader about a particular topic or idea. The purpose of this type of essay is to provide information and clarify ideas or concepts for the reader.',
    promptPlaceholder:
      'Describe how communication has changed in the last twenty years.',
    quotePlaceholder:
      '"iPhone is a revolutionary and magical product that is literally five years ahead of any other mobile phone," - Steve Jobs',
    supportQuotes: true,
    href: `/templates/${TemplateId.EXPOSITORY_ESSAY_ID}`,
  },
  [TemplateId.COMPARE_CONTRAST_ESSAY_ID]: {
    id: TemplateId.COMPARE_CONTRAST_ESSAY_ID,
    icon: '💁',
    title: 'Compare and Contrast Essay',
    description:
      'A compare and contrast essay compares and contrasts two or more subjects, and analyzes the similarities and differences between them.',
    promptPlaceholder:
      'Compare and contrast the book Lord of the Flies with the TV show Survivor.',
    quotePlaceholder:
      '"Ralph wept for the end of innocence, the darkness of man\'s heart, and the fall through the air of the true, wise friend called Piggy." - William Golding',
    supportQuotes: true,
    href: `/templates/${TemplateId.COMPARE_CONTRAST_ESSAY_ID}`,
  },
  [TemplateId.ARGUMENTATIVE_ESSAY_ID]: {
    id: TemplateId.ARGUMENTATIVE_ESSAY_ID,
    icon: '🤼‍♂️',
    title: 'Argumentative Essay',
    description:
      "An argumentative essay presents the writer's point of view on a particular issue and provides evidence and arguments to support that point of view.",
    promptPlaceholder:
      'Do you think middle schoolers should have jobs like babysitting or mowing lawns?',
    quotePlaceholder:
      '"You have a lifetime to work, but children are only young once." - Polish proverb',
    supportQuotes: true,
    href: `/templates/${TemplateId.ARGUMENTATIVE_ESSAY_ID}`,
  },
  [TemplateId.CAUSE_EFFECT_ESSAY_ID]: {
    id: TemplateId.CAUSE_EFFECT_ESSAY_ID,
    icon: '↔️',
    title: 'Cause and Effect Essay',
    description:
      'A cause and effect essay explains the cause of a particular phenomenon and its effects on something else.',
    promptPlaceholder:
      'Write an essay on the causes of famine and the effects it has on human population.',
    quotePlaceholder:
      '"This is the moment when we must come together to save this planet. Let us resolve that we will not leave our children a world where the oceans rise and famine spreads and terrible storms devastate our lands." - Barack Obama',
    supportQuotes: true,
    href: `/templates/${TemplateId.CAUSE_EFFECT_ESSAY_ID}`,
  },
  [TemplateId.NARRATIVE_ESSAY_ID]: {
    id: TemplateId.NARRATIVE_ESSAY_ID,
    icon: '📖',
    title: 'Narrative Essay',
    description:
      'A narrative essay tells a story or relates a personal experience.',
    promptPlaceholder:
      'Most of us remember exactly where we were and what we were doing when we received shocking or important news. Tell the story of what you were doing when you heard about an important event and how that news affected you.',
    quotePlaceholder: '"Your aunt is going to live." - Doctor Jerry',
    supportQuotes: true,
    href: `/templates/${TemplateId.NARRATIVE_ESSAY_ID}`,
  },
  [TemplateId.DEFINITION_ESSAY_ID]: {
    id: TemplateId.DEFINITION_ESSAY_ID,
    icon: '📚',
    title: 'Definition Essay',
    description:
      'A definition essay defines a particular term or concept, and provides detailed information and examples to help the reader understand the term or concept being defined.',
    promptPlaceholder: 'How has the definition of "health" changed over time?',
    quotePlaceholder:
      '"Time and health are two precious assets that we don\'t recognize and appreciate until they have been depleted." - Denis Waitley',
    supportQuotes: true,
    href: `/templates/${TemplateId.DEFINITION_ESSAY_ID}`,
  },
  [TemplateId.DESCRIPTIVE_ESSAY_ID]: {
    id: TemplateId.DESCRIPTIVE_ESSAY_ID,
    icon: '🎨',
    title: 'Descriptive Essay',
    description:
      'A descriptive essay provides a detailed description of a person, place, object, experience, or emotion.',
    promptPlaceholder: 'What is the role of pi in mathematics and physics?',
    quotePlaceholder:
      '"This mysterious 3.141592..., which comes in at every door and window, and down every chimney, calling itself the circumference to a unit of diameter." - Augustus De Morgan',
    supportQuotes: true,
    href: `/templates/${TemplateId.DESCRIPTIVE_ESSAY_ID}`,
  },
  [TemplateId.LITERARY_ESSAY_ID]: {
    id: TemplateId.LITERARY_ESSAY_ID,
    icon: '📕',
    title: 'Literary Essay',
    description:
      'A literary essay analyzes and evaluates a piece of literature, such as a novel, poem, or play.',
    promptPlaceholder:
      "Compare and contrast the fear of terrorism and the concern with safety issues in present day society with George Orwell's novel, 1984.",
    quotePlaceholder:
      '"War is peace. Freedom is slavery. Ignorance is strength." - George Orwell',
    supportQuotes: true,
    href: `/templates/${TemplateId.LITERARY_ESSAY_ID}`,
  },
  [TemplateId.SCIENTIFIC_ESSAY_ID]: {
    id: TemplateId.SCIENTIFIC_ESSAY_ID,
    icon: '🔬',
    title: 'Scientific Essay',
    description:
      'A scientific essay describes a scientific concept or idea in a clear and concise manner.',
    promptPlaceholder: 'Vitamin D and health - The missing vitamin in humans',
    quotePlaceholder:
      'The American Academy of Dermatology declared ultraviolet radiation to be a known skin carcinogen.',
    supportQuotes: true,
    href: `/templates/${TemplateId.SCIENTIFIC_ESSAY_ID}`,
  },
  [TemplateId.PARAPHRASER_ID]: {
    id: TemplateId.PARAPHRASER_ID,
    icon: '♻️',
    title: 'Paraphraser',
    description: 'This template takes in text and paraphrases it.',
    characterLimit: 4000,
    inputRows: 10,
    promptName: 'Text',
    promptPlaceholder:
      'Inkey will rewrite your text. Start by writing or pasting something here and then press "Generate".',
    supportExamplePrompt: false,
    supportRequestedLength: false,
    href: `/${TemplateId.PARAPHRASER_ID}`,
  },
  [TemplateId.SUMMARIZER_ID]: {
    id: TemplateId.SUMMARIZER_ID,
    icon: '🛠️',
    title: 'Summarizer',
    description:
      'Condenses articles, papers, or documents down to the key points instantly.',
    characterLimit: 4000,
    inputRows: 10,
    promptName: 'Text',
    promptPlaceholder:
      'Inkey will summarize your text. Start by writing or pasting something here and then press "Generate".',
    supportExamplePrompt: false,
    supportRequestedLength: false,
    supportTone: false,
    supportPointOfView: false,
    href: `/${TemplateId.SUMMARIZER_ID}`,
  },
  [TemplateId.BLOG_ID]: {
    id: TemplateId.BLOG_ID,
    icon: '💻',
    title: 'Blog Post',
    description:
      'A blog post is an online article or entry that shares opinions, information, stories, and other media.',
    promptName: 'Blog title',
    promptPlaceholder: '5 Ways to Make Your Workplace More Productive',
    quotePlaceholder:
      '"The most productive workplaces are those that foster collaboration, innovation, and a sense of purpose." - Bill Gates',
    supportQuotes: true,
    href: `/templates/${TemplateId.BLOG_ID}`,
  },
}
