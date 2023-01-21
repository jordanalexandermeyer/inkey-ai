import { updateUserWordsGenerated } from '@/utils/db'
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
  thesis: string
  setThesis: Dispatch<SetStateAction<string>>
  generateThesis: () => Promise<any>
  thesisGenerated: boolean
  setThesisGenerated: Dispatch<SetStateAction<boolean>>
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
  generateEssay: () => Promise<{ essay: string; title: string }>
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
  const [thesis, setThesis] = useState('')
  const [title, setTitle] = useState('')
  const [argumentsState, setArgumentsState] = useState<string[]>([''])
  const [paragraphsState, setParagraphsState] = useState<Paragraphs>([
    { argument: '', paragraph: [{ title: '', sentences: [] }] },
  ])
  const [essay, setEssay] = useState<string>('')
  const [thesisGenerated, setThesisGenerated] = useState(false)
  const [argumentsGenerated, setArgumentsGenerated] = useState(false)
  const [paragraphsGenerated, setParagraphsGenerated] = useState(false)
  const [essayGenerated, setEssayGenerated] = useState(false)
  const numberOfSteps = 5

  const generateThesis = async () => {
    const response = await fetch(
      `/api/thesis?userId=${user?.uid}&prompt=${prompt}`,
    )

    const body = await response.json()
    const thesis = body.thesis
    if (!thesis) {
      throw {}
    }
    return thesis
  }

  const generateArguments = async () => {
    const response = await fetch(
      `/api/arguments?userId=${user?.uid}&thesis=${thesis}&prompt=${prompt}`,
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
        prompt,
        thesis,
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

  const generateEssay = async (): Promise<{ essay: string; title: string }> => {
    const response = await fetch('/api/essay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.uid,
        prompt,
        thesis,
        paragraphs: paragraphsState,
      }),
    })
    const body = await response.json()
    const essay: string = body.essay
    const generatedTitle: string = body.title
    if (!essay || !generatedTitle) {
      throw {}
    }

    await updateUserWordsGenerated(
      user!.uid,
      Math.round(essay.split(' ').length),
    )

    return { essay, title: generatedTitle }
  }

  const value = {
    numberOfSteps,
    step,
    setStep,
    prompt,
    setPrompt,
    title,
    setTitle,
    thesis,
    setThesis,
    generateThesis,
    thesisGenerated,
    setThesisGenerated,
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
