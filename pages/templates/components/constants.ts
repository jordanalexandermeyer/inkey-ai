import { FilterMap, FilterType } from 'types'

export const tones = {
  casual: 'relaxed and unconcerned',
  professional: 'qualified in a particular profession',
  scholarly: 'concerned with academic learning and research',
}

export const filters: FilterMap = {
  [FilterType.WHOLE_ESSAYS]: { text: 'Whole essays', selected: false },
  [FilterType.ESSAY_PARTS]: { text: 'Essay parts', selected: false },
  [FilterType.WRITING_TOOLS]: { text: 'Writing tools', selected: false },
  [FilterType.JOB_TOOLS]: { text: 'Job tools', selected: false },
  [FilterType.CLASS_TOOLS]: { text: 'Class tools', selected: false },
  [FilterType.OTHER]: { text: 'Other', selected: false },
}
