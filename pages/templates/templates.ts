import {
  COLLEGE_APP_ESSAY_ID,
  COMPARE_CONTRAST_ESSAY_ID,
  EXPOSITORY_ESSAY_ID,
  GENERAL_ESSAY_ID,
  PERSUASIVE_ESSAY_ID,
  THESIS_ID,
} from '../../lib/constants'

export const templates = [
  {
    id: GENERAL_ESSAY_ID,
    icon: '📝',
    title: 'General Essay',
    description: 'Ask a prompt and receive a compelling essay.',
    href: '/templates/general-essay',
  },
  {
    id: THESIS_ID,
    icon: '✏️',
    title: 'Thesis',
    description: 'Write an essay prompt to create a thesis.',
    href: '/templates/thesis',
  },
  {
    id: COLLEGE_APP_ESSAY_ID,
    icon: '🎓',
    title: 'College Application Essay',
    description:
      'Write a college application essay prompt like a Common App prompt to receive an essay that could get you into the school of your dreams!',
    href: '/templates/college-app-essay',
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
    href: '/templates/expository-essay',
  },
  {
    id: COMPARE_CONTRAST_ESSAY_ID,
    icon: '💁',
    title: 'Compare and Contrast Essay',
    description:
      'Write a prompt for a compare and contrast essay and a unique, never before seen essay will be written.',
    href: '/templates/compare-contrast-essay',
  },
]
