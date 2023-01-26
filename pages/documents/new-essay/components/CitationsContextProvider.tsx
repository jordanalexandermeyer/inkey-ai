import { ApiResource, ApiResponse } from 'pages/api/resources.page'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { toast } from 'react-hot-toast'

export type Resource = {
  title: string
  link: string
  snippet: string
  date?: number
}

export enum CitationsModalPanels {
  RESEARCH = 'research',
  CITATIONS = 'citations',
}

export enum CitationStyle {
  APA = 'apa',
  MLA = 'mla',
}

export enum CitationSource {
  WEBSITE = 'website',
  BOOK = 'book',
  JOURNAL = 'journal',
}

export enum ContributorType {
  AUTHOR = 'author',
  EDITOR = 'editor',
  TRANSLATOR = 'translator',
  ILLUSTRATOR = 'illustrator',
}

export type CitationContributor = {
  title: string
  initials: string
  firstName: string
  lastName: string
  contributorType: ContributorType
}

export type PublicationInfo = {
  title: string
  containerTitle: string
  url: string
  publishDate?: number
  accessDate: number
}

export type Citation = {
  citationSource: CitationSource
  contributors: CitationContributor[]
  publicationInfo: PublicationInfo
}

type CitationsContext = {
  getResources: (query: string) => Promise<Resource[]>
  submitSearch: (query: string) => Promise<void>
  showCitationsModal: boolean
  setShowCitationsModal: Dispatch<SetStateAction<boolean>>
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
  isSearchLoading: boolean
  setIsSearchLoading: Dispatch<SetStateAction<boolean>>
  resources: Resource[]
  setResources: Dispatch<SetStateAction<Resource[]>>
  citations: Citation[]
  setCitations: Dispatch<SetStateAction<Citation[]>>
  panelShowing: CitationsModalPanels
  setPanelShowing: Dispatch<SetStateAction<CitationsModalPanels>>
  citationStyle: CitationStyle
  setCitationStyle: Dispatch<SetStateAction<CitationStyle>>
  showEditCitationsPanel: boolean
  setShowEditCitationsPanel: Dispatch<SetStateAction<boolean>>
  editingCitationIndex: number | undefined
  setEditingCitationIndex: Dispatch<SetStateAction<number | undefined>>
  editingCitation: Citation
  setEditingCitation: Dispatch<SetStateAction<Citation>>
}

export const newCitation = {
  citationSource: CitationSource.WEBSITE,
  publicationInfo: {
    title: '',
    containerTitle: '',
    accessDate: new Date().getTime(),
    url: '',
  },
  contributors: [
    {
      contributorType: ContributorType.AUTHOR,
      title: '',
      initials: '',
      firstName: '',
      lastName: '',
    },
  ],
}

const CitationsContext = createContext<CitationsContext | undefined>(undefined)

function CitationsProvider({ children }: { children: ReactNode }) {
  const [showCitationsModal, setShowCitationsModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [resources, setResources] = useState<Resource[]>([])
  const [citations, setCitations] = useState<Citation[]>([])
  const [editingCitationIndex, setEditingCitationIndex] = useState<
    number | undefined
  >(undefined)
  const [showEditCitationsPanel, setShowEditCitationsPanel] = useState(false)
  const [editingCitation, setEditingCitation] = useState<Citation>(newCitation)
  const [panelShowing, setPanelShowing] = useState<CitationsModalPanels>(
    CitationsModalPanels.CITATIONS,
  )
  const [citationStyle, setCitationStyle] = useState<CitationStyle>(
    CitationStyle.APA,
  )

  const submitSearch = async (query: string) => {
    if (query.trim() == '') return
    setIsSearchLoading(true)
    const newResources = await getResources(query)
    setResources(newResources)
    setIsSearchLoading(false)
  }

  const getResources = async (query: string) => {
    try {
      const response = await fetch(`/api/resources?query=${query}`)
      const body: ApiResponse = await response.json()
      const resources: ApiResource[] = body.resources
      if (!resources) {
        throw {}
      }

      const parsedResources: Resource[] = []
      for (let i = 0; i < resources.length; i++) {
        const parsedResource: Resource = {
          title: resources[i].title,
          snippet: resources[i].snippet,
          link: resources[i].link,
          date: resources[i].date,
        }
        parsedResources.push(parsedResource)
      }
      return parsedResources
    } catch (error) {
      toast.error(`Error: ${error}`)
      return []
    }
  }

  const value = {
    getResources,
    submitSearch,
    showCitationsModal,
    setShowCitationsModal,
    searchQuery,
    setSearchQuery,
    isSearchLoading,
    setIsSearchLoading,
    resources,
    setResources,
    citations,
    setCitations,
    panelShowing,
    setPanelShowing,
    citationStyle,
    setCitationStyle,
    showEditCitationsPanel,
    setShowEditCitationsPanel,
    editingCitationIndex,
    setEditingCitationIndex,
    editingCitation,
    setEditingCitation,
  }

  return (
    <CitationsContext.Provider value={value}>
      {children}
    </CitationsContext.Provider>
  )
}

function useCitations() {
  const context = useContext(CitationsContext)
  if (context === undefined) {
    throw new Error('useCitations must be used within a CitationsProvider')
  }
  return context
}

export { CitationsProvider, useCitations }

export const getApaInTextCitation = (citation: Citation) => {
  const contributors = citation.contributors
  const publicationInfo = citation.publicationInfo
  const authors = []
  let inTextCitation = '('
  for (let i = 0; i < contributors.length; i++) {
    if (contributors[i].contributorType == ContributorType.AUTHOR) {
      if (contributors[i].firstName && contributors[i].lastName) {
        authors.push(contributors[i])
      }
    }
  }
  if (authors.length == 0) {
    inTextCitation += publicationInfo.title
  } else {
    authors.sort((a, b) => {
      return a.lastName > b.lastName ? 1 : -1
    })
    for (let i = 0; i < authors.length; i++) {
      if (i > 0) {
        inTextCitation += ` & ${authors[i].lastName}`
      } else {
        inTextCitation += authors[i].lastName
      }
    }
  }
  if (publicationInfo.publishDate) {
    inTextCitation += ', '
    inTextCitation += new Date(publicationInfo.publishDate).getFullYear()
  }
  inTextCitation += ')'
  return inTextCitation
}

export const getMlaInTextCitation = (citation: Citation) => {
  const contributors = citation.contributors
  const publicationInfo = citation.publicationInfo
  const authors = []
  let inTextCitation = '('
  for (let i = 0; i < contributors.length; i++) {
    if (contributors[i].contributorType == ContributorType.AUTHOR) {
      if (contributors[i].firstName && contributors[i].lastName) {
        authors.push(contributors[i])
      }
    }
  }
  if (authors.length == 0) {
  } else {
    authors.sort((a, b) => {
      return a.lastName > b.lastName ? 1 : -1
    })
    for (let i = 0; i < authors.length; i++) {
      if (i > 0) {
        inTextCitation += ` & ${authors[i].lastName}`
      } else {
        inTextCitation += authors[i].lastName
      }
    }
  }
  if (publicationInfo.title) {
    if (authors.length > 0) {
      inTextCitation += ', '
    }
    inTextCitation += `"${publicationInfo.title}"`
  }
  inTextCitation += ')'
  return inTextCitation
}

export const getApaFullCitation = (citation: Citation) => {
  const contributors = citation.contributors
  const publicationInfo = citation.publicationInfo
  const accessDate = new Date(publicationInfo.accessDate)
  const authors = []
  let fullCitation = ''
  for (let i = 0; i < contributors.length; i++) {
    if (contributors[i].contributorType == ContributorType.AUTHOR) {
      if (contributors[i].firstName && contributors[i].lastName) {
        authors.push(contributors[i])
      }
    }
  }
  if (authors.length == 0) {
    fullCitation += `${publicationInfo.title}.`
  } else {
    authors.sort((a, b) => {
      return a.lastName > b.lastName ? 1 : -1
    })
    for (let i = 0; i < authors.length; i++) {
      const firstName = authors[i].firstName
      if (i > 0) {
        fullCitation += `, `
      }
      if (i == authors.length - 1 && authors.length > 1) {
        fullCitation += '& '
      }
      fullCitation += authors[i].lastName
      fullCitation += `, ${firstName[0].toUpperCase()}.`
    }
  }
  if (publicationInfo.publishDate) {
    fullCitation += ` (${new Date(publicationInfo.publishDate).getFullYear()}).`
  }
  if (publicationInfo.containerTitle) {
    fullCitation += ` ${
      publicationInfo.containerTitle[0].toUpperCase() +
      publicationInfo.containerTitle.substring(1)
    }.`
  }
  fullCitation += ` Retrieved ${accessDate.toLocaleString('default', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}`
  fullCitation += `, from ${publicationInfo.url}`

  return fullCitation
}

export const getMlaFullCitation = (citation: Citation) => {
  const contributors = citation.contributors
  const publicationInfo = citation.publicationInfo
  const authors = []
  let fullCitation = ''
  for (let i = 0; i < contributors.length; i++) {
    if (contributors[i].contributorType == ContributorType.AUTHOR) {
      if (contributors[i].firstName && contributors[i].lastName) {
        authors.push(contributors[i])
      }
    }
  }
  if (authors.length == 0) {
  } else {
    authors.sort((a, b) => {
      return a.lastName > b.lastName ? 1 : -1
    })
    for (let i = 0; i < authors.length; i++) {
      const firstName = authors[i].firstName
      if (i > 0) {
        fullCitation += `, and `
      }
      if (i == authors.length - 1) {
        fullCitation += `${authors[i].firstName} ${authors[i].lastName}. `
      } else {
        fullCitation += authors[i].lastName
        if (firstName) {
          fullCitation += `, ${firstName}`
        }
      }
    }
  }
  const title = publicationInfo.title
  fullCitation += `"${title[0].toUpperCase() + title.substring(1)}."`
  if (publicationInfo.containerTitle) {
    fullCitation += ` ${publicationInfo.containerTitle}`
  }
  if (publicationInfo.publishDate) {
    fullCitation += `, ${new Date(publicationInfo.publishDate).getFullYear()}`
  }

  fullCitation += `, ${publicationInfo.url}.`

  return fullCitation
}
