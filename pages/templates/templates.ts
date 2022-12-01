import {
  COMMON_APP_ESSAY_ID,
  COMPARE_CONTRAST_ESSAY_ID,
  EXPOSITORY_ESSAY_ID,
  FIVE_PARAGRAPH_ESSAY_ID,
  PERSUASIVE_ESSAY_ID,
  THESIS_ID,
} from '../../lib/constants'

export const templates = [
  {
    id: FIVE_PARAGRAPH_ESSAY_ID,
    icon: '📝',
    title: 'General Essay',
    description: 'Ask a prompt and receive a compelling essay.',
    maxOutputs: 1,
    href: '/templates/five-paragraph-essay',
  },
  {
    id: THESIS_ID,
    icon: '✏️',
    title: 'Thesis',
    description: 'Write an essay prompt to create a thesis.',
    maxOutputs: 3,
    href: '/templates/thesis',
  },
  {
    id: COMMON_APP_ESSAY_ID,
    icon: '🎓',
    title: 'Common App Essay',
    description:
      'Write some words and themes you want included in your college application essay and get a never-before-seen essay!',
    maxOutputs: 1,
    href: '/templates/common-app-essay',
  },
  {
    id: PERSUASIVE_ESSAY_ID,
    icon: '📣',
    title: 'Persuasive Essay',
    description:
      'Write a prompt for a persuasive essay and a unique, never before seen essay will be written.',
    maxOutputs: 1,
    href: '/templates/persuasive-essay',
  },
  {
    id: EXPOSITORY_ESSAY_ID,
    icon: '🧑‍🎨',
    title: 'Expository Essay',
    description:
      'Write a prompt for an expository essay and a unique, never before seen essay will be written.',
    maxOutputs: 1,
    href: '/templates/expository-essay',
  },
  {
    id: COMPARE_CONTRAST_ESSAY_ID,
    icon: '💁',
    title: 'Compare and Contrast Essay',
    description:
      'Write a prompt for a compare and contrast essay and a unique, never before seen essay will be written.',
    maxOutputs: 1,
    href: '/templates/compare-contrast-essay',
  },
  // {
  //   id: '2',
  //   icon: '✏️',
  //   title: 'Introduction Paragraph',
  //   description:
  //     'Supply a prompt and thesis to create an introduction paragraph.',
  //   maxOutputs: 3,
  //   href: '/templates/introduction-paragraph',
  // },
  // {
  //   id: '3',
  //   icon: '✏️',
  //   title: 'Body Paragraph',
  //   description:
  //     'Supply a thesis, prompt, and topic to create a body paragraph.',
  //   maxOutputs: 3,
  //   href: '/templates/body-paragraph',
  // },
  // {
  //   id: '4',
  //   icon: '✏️',
  //   title: 'Conclusion Paragraph',
  //   description: 'Supply an unfinished essay to create a conclusion paragraph.',
  //   maxOutputs: 3,
  //   href: '/templates/conclusion-paragraph',
  // },
  // {
  //   id: '5',
  //   icon: '📝',
  //   title: 'Common App Essay: Prompt #1',
  //   description:
  //     'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.',
  //   maxOutputs: 1,
  //   href: '/templates/common-app-essay-prompt-1',
  // },
  // {
  //   id: '6',
  //   icon: '📝',
  //   title: 'Common App Essay: Prompt #2',
  //   description:
  //     'The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?',
  //   maxOutputs: 1,
  //   href: '/templates/common-app-essay-prompt-2',
  // },
  // {
  //   id: '7',
  //   icon: '📝',
  //   title: 'Common App Essay: Prompt #3',
  //   description:
  //     'Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?',
  //   maxOutputs: 1,
  //   href: '/templates/common-app-essay-prompt-3',
  // },
]
