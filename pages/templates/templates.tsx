import { ReactElement } from 'react'
import { FilterType } from 'types'

export interface Template {
  id: TemplateId
  icon?: string
  svgIcon?: ReactElement
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
  supportRequestedLength?: boolean
  supportPointOfView?: boolean
  supportLanguages?: boolean
  supportCodingLanguages?: boolean
  supportContent?: boolean
  href: string
  new?: boolean
  attribute: FilterType
}

export enum TemplateId {
  // Whole essays
  GENERAL_ESSAY_ID = 'general-essay',
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

  // Essay parts
  THESIS_ID = 'thesis',
  INTRODUCTION_PARAGRAPH_ID = 'introduction-paragraph',
  BODY_PARAGRAPH_ID = 'body-paragraph',
  CONCLUSION_PARAGRAPH_ID = 'conclusion-paragraph',

  // Other
  POEM_ID = 'poem',
  SPEECH_ID = 'speech',
  STORY_ID = 'story',

  // Writing tools
  TRANSLATOR_ID = 'translator',
  PARAPHRASER_ID = 'paraphraser',
  SUMMARIZER_ID = 'summarizer',

  // Class tools
  DISCUSSION_BOARD_RESPONSE_ID = 'discussion-board-response',

  // Professional
  BLOG_ID = 'blog',
  // EMAIL_ID = '',
  // EMAIL_RESPONSE_ID = '',
  // BLOG_OUTLINE_ID = '',
  // BLOG_IDEAS_ID = '',

  // Job
  LINKEDIN_BIO_ID = 'linkedin-bio',
  COVER_LETTER_ID = 'cover-letter',
  RESUME_BULLET_POINTS_ID = 'resume-bullet-points',

  // Coding
  CODING_QUESTION_SOLVER_ID = 'coding-question-solver',
  FUNCTION_ID = 'function',
  CLASS_ID = 'class',
  SCRIPT_ID = 'script',
  REGEX_ID = 'regex',
  EXPLAIN_CODE_ID = 'explain-code',
}

export type TemplateMap = {
  [key in TemplateId]: Template
}

export const templates: TemplateMap = {
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
    supportContent: true,
    href: `/templates/${TemplateId.GENERAL_ESSAY_ID}`,
    attribute: FilterType.WHOLE_ESSAYS,
  },
  [TemplateId.RESUME_BULLET_POINTS_ID]: {
    id: TemplateId.RESUME_BULLET_POINTS_ID,
    icon: '•••',
    title: 'Resume Bullet Points',
    description:
      'Enter a work experience to get descriptive bullet points you can put on your resume.',
    promptName: 'Experience',
    supportExamplePrompt: true,
    promptPlaceholder: 'Sous chef at Alinea',
    supportRequestedLength: false,
    supportTone: false,
    supportPointOfView: false,
    supportContent: true,
    href: `/templates/${TemplateId.RESUME_BULLET_POINTS_ID}`,
    attribute: FilterType.JOB_TOOLS,
    new: true,
  },
  [TemplateId.COVER_LETTER_ID]: {
    id: TemplateId.COVER_LETTER_ID,
    icon: '✉️',
    title: 'Cover Letter',
    description:
      'A document sent with a resume to provide additional information on your skills and experience.',
    promptName: 'Resume',
    characterLimit: 15000,
    inputRows: 10,
    supportExamplePrompt: false,
    promptPlaceholder: 'Paste your resume here.',
    supportRequestedLength: true,
    supportTone: false,
    supportPointOfView: false,
    supportContent: true,
    href: `/templates/${TemplateId.COVER_LETTER_ID}`,
    attribute: FilterType.JOB_TOOLS,
    new: true,
  },
  [TemplateId.CODING_QUESTION_SOLVER_ID]: {
    id: TemplateId.CODING_QUESTION_SOLVER_ID,
    icon: '🧑‍💻',
    title: 'Coding Question Solver',
    description:
      'Paste a coding question here to have it solved in any language.',
    promptName: 'Coding question',
    promptPlaceholder: 'How do you determine if a string is a palindrome?',
    characterLimit: 15000,
    inputRows: 10,
    supportExamplePrompt: true,
    supportRequestedLength: false,
    supportTone: false,
    supportPointOfView: false,
    supportLanguages: false,
    supportCodingLanguages: true,
    supportQuotes: false,
    href: `/templates/${TemplateId.CODING_QUESTION_SOLVER_ID}`,
    attribute: FilterType.CODING_TOOLS,
    new: true,
  },
  [TemplateId.EXPLAIN_CODE_ID]: {
    id: TemplateId.EXPLAIN_CODE_ID,
    icon: '#',
    title: 'Explain Code',
    description:
      'Enter a block of code to have it explained and have comments added.',
    promptName: 'Code',
    promptPlaceholder: `export const getTodoData = () => {
      let msg=request.get(
       'https://hello-cloudbase.service.base.com/todo-demo/v1.0/xxx',
         {
           "query": {
             "account": { "$eq": "super" },
           },
         })
       .then((response) => {
         initialToContext = {
           myTodo: response.data.map((item: any) => {
             let { _id, title, completed }: ITodoItem = item;
             let todoItme: ITodoItem = {
               _id: _id,
               title: title,
               completed: completed
             }
             return todoItme
           })
         }
         return  { msg: 'success', data: initialToContext.myTodo }
       })
       .catch((error) => {
         return { msg: 'error', data: [] }
       });
     return msg
   }`,
    characterLimit: 15000,
    inputRows: 10,
    supportExamplePrompt: true,
    supportRequestedLength: false,
    supportTone: false,
    supportPointOfView: false,
    supportLanguages: true,
    supportCodingLanguages: false,
    supportQuotes: false,
    href: `/templates/${TemplateId.EXPLAIN_CODE_ID}`,
    attribute: FilterType.CODING_TOOLS,
    new: true,
  },
  [TemplateId.LINKEDIN_BIO_ID]: {
    id: TemplateId.LINKEDIN_BIO_ID,
    svgIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 294 293"
        fill="none"
        className="h-8 w-8"
      >
        <path
          d="M15.492 0.61352C8.06024 2.96259 1.99457 9.73667 0.573779 17.3848C-0.19126 21.2089 -0.19126 271.249 0.573779 275.127C1.83063 281.738 6.74874 287.965 12.9783 290.915L16.1478 292.39H146.751H277.354L280.524 290.915C286.753 287.965 291.671 281.738 292.928 275.127C293.693 271.194 293.693 21.2089 292.928 17.2756C291.671 10.72 286.753 4.54685 280.524 1.59685L277.354 0.121853L147.571 0.0125939C41.3394 -0.0420357 17.35 0.0672236 15.492 0.61352ZM76.0941 43.1154C81.2308 45.683 85.7117 50.2172 88.1708 55.407C89.8102 58.9033 89.9194 59.4496 89.9194 65.4589C89.9194 71.632 89.8648 71.7959 87.8429 75.8932C76.8045 98.2913 44.6182 93.2107 41.0116 68.5182C39.7001 59.5043 44.7821 49.0154 52.815 44.3172C57.7331 41.4219 60.4108 40.7663 66.4765 40.9302C71.5585 41.0941 72.3235 41.258 76.0941 43.1154ZM206.369 106.977C230.741 109.654 243.583 122.601 247.845 148.714C249.321 157.564 249.758 174.5 249.375 212.194L249.048 248.96H227.845H206.643L206.479 207.004C206.26 166.032 206.26 164.994 205.113 160.897C202.817 152.866 199.593 148.551 193.855 145.928C190.741 144.453 189.976 144.344 183.91 144.344C176.314 144.344 172.708 145.218 168.555 148.059C163.582 151.446 160.74 156.417 158.664 165.103C157.899 168.436 157.735 174.117 157.571 208.916L157.352 248.96H136.04H114.783V179.58V110.201H135.275H155.767V119.488C155.767 129.376 156.15 130.523 158.117 127.19C160.084 123.858 164.128 119.433 167.953 116.428C178.719 108.015 190.304 105.175 206.369 106.977ZM86.9139 179.58V248.96H65.6021H44.2903V179.58V110.201H65.6021H86.9139V179.58Z"
          fill="#0173B1"
        />
      </svg>
    ),
    title: 'LinkedIn Bio',
    description:
      'The text box at the top of your LinkedIn Profile, aka the “About” section.',
    promptName: 'Resume',
    characterLimit: 15000,
    inputRows: 10,
    supportExamplePrompt: false,
    promptPlaceholder: 'Paste your resume here.',
    supportRequestedLength: true,
    supportTone: false,
    supportPointOfView: true,
    supportContent: true,
    href: `/templates/${TemplateId.LINKEDIN_BIO_ID}`,
    attribute: FilterType.JOB_TOOLS,
    new: true,
  },
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
    attribute: FilterType.OTHER,
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
    supportRequestedLength: true,
    supportPointOfView: false,
    supportQuotes: true,
    supportContent: true,
    href: `/templates/${TemplateId.SPEECH_ID}`,
    attribute: FilterType.OTHER,
  },
  [TemplateId.THESIS_ID]: {
    id: TemplateId.THESIS_ID,
    icon: '✏️',
    title: 'Thesis',
    description:
      'A single sentence that expresses the main idea of an essay or other written piece.',
    supportExamplePrompt: true,
    promptPlaceholder:
      'What is the importance of investing money in space exploration?',
    supportRequestedLength: false,
    supportTone: false,
    supportPointOfView: false,
    href: `/templates/${TemplateId.THESIS_ID}`,
    attribute: FilterType.ESSAY_PARTS,
  },
  [TemplateId.INTRODUCTION_PARAGRAPH_ID]: {
    id: TemplateId.INTRODUCTION_PARAGRAPH_ID,
    icon: '↑❡',
    title: 'Introduction Paragraph',
    description:
      'Provides an overview of the main points of the essay and introduce the reader to the topic.',
    promptName: 'Thesis',
    promptPlaceholder:
      "The importance of investing money in space exploration is critical for advancing humanity's scientific understanding, stimulating economic growth, and protecting the planet from potential asteroid impacts.",
    supportExamplePrompt: true,
    supportRequestedLength: false,
    supportTone: true,
    supportPointOfView: true,
    supportLanguages: true,
    supportQuotes: true,
    supportContent: true,
    href: `/templates/${TemplateId.INTRODUCTION_PARAGRAPH_ID}`,
    attribute: FilterType.ESSAY_PARTS,
    new: true,
  },
  [TemplateId.BODY_PARAGRAPH_ID]: {
    id: TemplateId.BODY_PARAGRAPH_ID,
    icon: '❡',
    title: 'Body Paragraph',
    description:
      'A group of related sentences that develop a single idea or topic.',
    promptName: 'Paragraph idea',
    promptPlaceholder:
      'Investing money in space exploration encourages technological advancements.',
    supportExamplePrompt: true,
    supportRequestedLength: true,
    supportTone: true,
    supportPointOfView: true,
    supportLanguages: true,
    supportQuotes: true,
    supportContent: true,
    href: `/templates/${TemplateId.BODY_PARAGRAPH_ID}`,
    attribute: FilterType.ESSAY_PARTS,
    new: true,
  },
  [TemplateId.TRANSLATOR_ID]: {
    id: TemplateId.TRANSLATOR_ID,
    icon: '💱',
    title: 'Translator',
    description: 'A tool that converts text from one language to another.',
    promptName: 'Text',
    promptPlaceholder:
      'Enter text in any language here and choose a language to translate to.',
    supportExamplePrompt: false,
    supportRequestedLength: false,
    supportTone: false,
    supportPointOfView: false,
    supportLanguages: true,
    characterLimit: 15000,
    inputRows: 10,
    href: `/templates/${TemplateId.TRANSLATOR_ID}`,
    attribute: FilterType.WRITING_TOOLS,
    new: true,
  },
  [TemplateId.CONCLUSION_PARAGRAPH_ID]: {
    id: TemplateId.CONCLUSION_PARAGRAPH_ID,
    icon: '↓❡',
    title: 'Conclusion Paragraph',
    description:
      'Reviews the main points of the essay and wraps up the ideas previously introduced.',
    promptName: 'Essay without conclusion',
    promptPlaceholder: 'Paste an essay without a conclusion here.',
    characterLimit: 15000,
    inputRows: 10,
    supportExamplePrompt: false,
    supportRequestedLength: false,
    supportTone: true,
    supportPointOfView: true,
    supportLanguages: true,
    supportQuotes: true,
    supportContent: true,
    href: `/templates/${TemplateId.CONCLUSION_PARAGRAPH_ID}`,
    attribute: FilterType.ESSAY_PARTS,
    new: true,
  },
  [TemplateId.DISCUSSION_BOARD_RESPONSE_ID]: {
    id: TemplateId.DISCUSSION_BOARD_RESPONSE_ID,
    icon: '⏎',
    title: 'Discussion Board Response',
    description: 'Paste a discussion board post or question to get a response.',
    promptName: 'Discussion board post/s',
    promptPlaceholder:
      'Paste a discussion board post or question to get a response.',
    characterLimit: 15000,
    inputRows: 10,
    supportExamplePrompt: false,
    supportRequestedLength: true,
    supportTone: true,
    supportPointOfView: true,
    supportLanguages: true,
    supportQuotes: true,
    supportContent: true,
    href: `/templates/${TemplateId.DISCUSSION_BOARD_RESPONSE_ID}`,
    attribute: FilterType.CLASS_TOOLS,
    new: true,
  },
  [TemplateId.PARAPHRASER_ID]: {
    id: TemplateId.PARAPHRASER_ID,
    icon: '♻️',
    title: 'Paraphraser',
    description: 'This template takes in text and paraphrases it.',
    characterLimit: 15000,
    inputRows: 10,
    promptName: 'Text',
    promptPlaceholder:
      'Inkey will rewrite your text. Start by writing or pasting something here and then press "Generate".',
    supportExamplePrompt: false,
    supportRequestedLength: false,
    href: `/${TemplateId.PARAPHRASER_ID}`,
    attribute: FilterType.WRITING_TOOLS,
  },
  [TemplateId.SUMMARIZER_ID]: {
    id: TemplateId.SUMMARIZER_ID,
    icon: '🛠️',
    title: 'Summarizer',
    description:
      'Condenses articles, papers, or documents down to the key points instantly.',
    characterLimit: 15000,
    inputRows: 10,
    promptName: 'Text',
    promptPlaceholder:
      'Inkey will summarize your text. Start by writing or pasting something here and then press "Generate".',
    supportExamplePrompt: false,
    supportRequestedLength: false,
    supportTone: false,
    supportPointOfView: false,
    href: `/${TemplateId.SUMMARIZER_ID}`,
    attribute: FilterType.WRITING_TOOLS,
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
    supportContent: true,
    href: `/templates/${TemplateId.BLOG_ID}`,
    attribute: FilterType.OTHER,
  },
  [TemplateId.STORY_ID]: {
    id: TemplateId.STORY_ID,
    icon: '📖',
    title: 'Story',
    description:
      'A narrative that conveys a sequence of events to entertain or inform an audience.',
    promptName: 'Story title',
    promptPlaceholder: 'How Santa Saved the World',
    supportExamplePrompt: true,
    supportRequestedLength: false,
    supportQuotes: true,
    supportTone: true,
    supportPointOfView: true,
    supportLanguages: true,
    supportContent: true,
    href: `/templates/${TemplateId.STORY_ID}`,
    attribute: FilterType.OTHER,
    new: true,
  },
  [TemplateId.REGEX_ID]: {
    id: TemplateId.REGEX_ID,
    icon: '(.*)',
    title: 'Regex',
    description:
      'Regular expressions (regex) are a way of describing patterns in text strings for searching, manipulating, and validating data.',
    promptName: 'Regex explanation',
    promptPlaceholder:
      'Contains any character other than an i, asterisk, ampersand, 2, or at-sign',
    supportExamplePrompt: true,
    supportRequestedLength: false,
    supportTone: false,
    supportPointOfView: false,
    supportLanguages: false,
    supportCodingLanguages: false,
    supportQuotes: false,
    href: `/templates/${TemplateId.REGEX_ID}`,
    attribute: FilterType.CODING_TOOLS,
    new: true,
  },
  [TemplateId.SCRIPT_ID]: {
    id: TemplateId.SCRIPT_ID,
    icon: '<>',
    title: 'Script',
    description:
      'A set of instructions that tells a computer how to perform a task.',
    promptName: 'Script explanation',
    promptPlaceholder:
      'Iterate through a csv file and capitalize the second column',
    supportExamplePrompt: true,
    supportRequestedLength: false,
    supportTone: false,
    supportPointOfView: false,
    supportLanguages: false,
    supportCodingLanguages: true,
    supportQuotes: false,
    href: `/templates/${TemplateId.SCRIPT_ID}`,
    attribute: FilterType.CODING_TOOLS,
    new: true,
  },
  [TemplateId.CLASS_ID]: {
    id: TemplateId.CLASS_ID,
    icon: '{}',
    title: 'Class',
    description:
      'A template that is used to create objects, define object data types, and methods.',
    promptName: 'Class explanation',
    promptPlaceholder:
      'Ball with a diameter and color and getter/setter methods',
    supportExamplePrompt: true,
    supportRequestedLength: false,
    supportTone: false,
    supportPointOfView: false,
    supportLanguages: false,
    supportCodingLanguages: true,
    supportQuotes: false,
    href: `/templates/${TemplateId.CLASS_ID}`,
    attribute: FilterType.CODING_TOOLS,
    new: true,
  },
  [TemplateId.FUNCTION_ID]: {
    id: TemplateId.FUNCTION_ID,
    icon: '⚙️',
    title: 'Function',
    description: 'A block of code that performs a specific task.',
    promptName: 'Function explanation',
    promptPlaceholder: 'Iterate through a list and print each item.',
    supportExamplePrompt: true,
    supportRequestedLength: false,
    supportTone: false,
    supportPointOfView: false,
    supportLanguages: false,
    supportCodingLanguages: true,
    supportQuotes: false,
    href: `/templates/${TemplateId.FUNCTION_ID}`,
    attribute: FilterType.CODING_TOOLS,
    new: true,
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
    supportContent: true,
    href: `/templates/${TemplateId.COLLEGE_APP_ESSAY_ID}`,
    attribute: FilterType.WHOLE_ESSAYS,
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
    supportContent: true,
    href: `/templates/${TemplateId.PERSUASIVE_ESSAY_ID}`,
    attribute: FilterType.WHOLE_ESSAYS,
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
    supportContent: true,
    href: `/templates/${TemplateId.EXPOSITORY_ESSAY_ID}`,
    attribute: FilterType.WHOLE_ESSAYS,
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
    supportContent: true,
    href: `/templates/${TemplateId.COMPARE_CONTRAST_ESSAY_ID}`,
    attribute: FilterType.WHOLE_ESSAYS,
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
    supportContent: true,
    href: `/templates/${TemplateId.ARGUMENTATIVE_ESSAY_ID}`,
    attribute: FilterType.WHOLE_ESSAYS,
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
    supportContent: true,
    href: `/templates/${TemplateId.CAUSE_EFFECT_ESSAY_ID}`,
    attribute: FilterType.WHOLE_ESSAYS,
  },
  [TemplateId.NARRATIVE_ESSAY_ID]: {
    id: TemplateId.NARRATIVE_ESSAY_ID,
    icon: '🙊',
    title: 'Narrative Essay',
    description:
      'A narrative essay tells a story or relates a personal experience.',
    promptPlaceholder:
      'Most of us remember exactly where we were and what we were doing when we received shocking or important news. Tell the story of what you were doing when you heard about an important event and how that news affected you.',
    quotePlaceholder: '"Your aunt is going to live." - Doctor Jerry',
    supportQuotes: true,
    supportContent: true,
    href: `/templates/${TemplateId.NARRATIVE_ESSAY_ID}`,
    attribute: FilterType.WHOLE_ESSAYS,
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
    supportContent: true,
    href: `/templates/${TemplateId.DEFINITION_ESSAY_ID}`,
    attribute: FilterType.WHOLE_ESSAYS,
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
    supportContent: true,
    href: `/templates/${TemplateId.DESCRIPTIVE_ESSAY_ID}`,
    attribute: FilterType.WHOLE_ESSAYS,
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
    supportContent: true,
    href: `/templates/${TemplateId.LITERARY_ESSAY_ID}`,
    attribute: FilterType.WHOLE_ESSAYS,
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
    supportContent: true,
    href: `/templates/${TemplateId.SCIENTIFIC_ESSAY_ID}`,
    attribute: FilterType.WHOLE_ESSAYS,
  },
}
