import { useUser } from '@/utils/useUser'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type NewEssayContext = {
  numberOfSteps: number
  step: number
  setStep: Dispatch<SetStateAction<number>>
  prompt: string
  setPrompt: Dispatch<SetStateAction<string>>
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  titleGenerated: boolean
  setTitleGenerated: Dispatch<SetStateAction<boolean>>
  generateTitle: () => Promise<any>
  argumentsState: Array<string>
  setArgumentsState: Dispatch<SetStateAction<string[]>>
  generateArguments: () => Promise<string[]>
  argumentsGenerated: boolean
  setArgumentsGenerated: Dispatch<SetStateAction<boolean>>
  paragraphsState: Paragraphs
  setParagraphsState: Dispatch<SetStateAction<Paragraphs>>
  generateParagraphs: () => Promise<Paragraphs>
  paragraphsGenerated: boolean
  setParagraphsGenerated: Dispatch<SetStateAction<boolean>>
  essay: string
  setEssay: Dispatch<SetStateAction<string>>
  generateEssay: () => Promise<string>
  essayGenerated: boolean
  setEssayGenerated: Dispatch<SetStateAction<boolean>>
}

export type ParagraphComponent = {
  title: string
  sentences: string[]
}

export type Paragraph = {
  argument: string
  paragraph: ParagraphComponent[]
}

export type Paragraphs = Paragraph[]

const NewEssayContext = createContext<NewEssayContext | undefined>(undefined)

function NewEssayProvider({ children }: { children: ReactNode }) {
  const { user } = useUser()
  const [step, setStep] = useState(1)
  const [prompt, setPrompt] = useState('')
  const [title, setTitle] = useState('')
  const [argumentsState, setArgumentsState] = useState<string[]>([''])
  const [paragraphsState, setParagraphsState] = useState<Paragraphs>([
    { argument: '', paragraph: [{ title: '', sentences: [] }] },
  ])
  const [essay, setEssay] = useState<string>('')
  const [titleGenerated, setTitleGenerated] = useState(false)
  const [argumentsGenerated, setArgumentsGenerated] = useState(false)
  const [paragraphsGenerated, setParagraphsGenerated] = useState(false)
  const [essayGenerated, setEssayGenerated] = useState(false)
  const numberOfSteps = 5

  const generateTitle = async () => {
    const response = await fetch(
      `/api/title?userId=${user?.uid}&prompt=${prompt}`,
    )

    const body = await response.json()
    const title = body.title
    if (!title) {
      throw {}
    }
    return title
  }

  const generateArguments = async () => {
    const response = await fetch(
      `/api/arguments?userId=${user?.uid}&title=${title}`,
    )
    const body = await response.json()
    const args: string[] = body.arguments
    if (!args) {
      throw {}
    }
    return args
  }

  const generateParagraphs = async (): Promise<Paragraphs> => {
    const response = await fetch('/api/paragraphs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.uid,
        title,
        arguments: argumentsState,
      }),
    })

    const body = await response.json()
    const paragraphs: Paragraphs = body.paragraphs
    if (!paragraphs) {
      throw {}
    }
    return paragraphs
  }

  const generateEssay = async (): Promise<string> => {
    const response = await fetch('/api/essay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.uid,
        title,
        paragraphs: paragraphsState,
      }),
    })
    const body = await response.json()
    const essay: string = body.essay
    if (!essay) {
      throw {}
    }
    return essay
  }

  const value = {
    numberOfSteps,
    step,
    setStep,
    prompt,
    setPrompt,
    title,
    setTitle,
    generateTitle,
    titleGenerated,
    setTitleGenerated,
    argumentsState,
    setArgumentsState,
    generateArguments,
    argumentsGenerated,
    setArgumentsGenerated,
    paragraphsState,
    setParagraphsState,
    generateParagraphs,
    paragraphsGenerated,
    setParagraphsGenerated,
    essay,
    setEssay,
    generateEssay,
    essayGenerated,
    setEssayGenerated,
  }

  return (
    <NewEssayContext.Provider value={value}>
      {children}
    </NewEssayContext.Provider>
  )
}

function useNewEssay() {
  const context = useContext(NewEssayContext)
  if (context === undefined) {
    throw new Error('useNewEssay must be used within a NewEssayProvider')
  }
  return context
}

export { NewEssayProvider, useNewEssay }
