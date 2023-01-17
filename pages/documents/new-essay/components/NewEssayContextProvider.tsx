import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type NewEssayContext = {
  step: number
  setStep: Dispatch<SetStateAction<number>>
  prompt: string
  setPrompt: Dispatch<SetStateAction<string>>
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  numberOfSteps: number
  argumentsState: Array<string>
  setArgumentsState: Dispatch<SetStateAction<string[]>>
  paragraphsState: Paragraphs
  setParagraphsState: Dispatch<SetStateAction<Paragraphs>>
  essayState: Essay
  setEssayState: Dispatch<SetStateAction<Essay>>
}

export type ParagraphComponent = {
  title: string
  sentences: string[]
}

export type Paragraph = {
  argument: string
  paragraph: ParagraphComponent[]
}

export type Essay = {
  body: string
}

export type Paragraphs = Paragraph[]

const NewEssayContext = createContext<NewEssayContext | undefined>(undefined)

function NewEssayProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1)
  const [prompt, setPrompt] = useState('')
  const [title, setTitle] = useState('')
  const [argumentsState, setArgumentsState] = useState<string[]>([])
  const [paragraphsState, setParagraphsState] = useState<Paragraphs>([])
  const [essayState, setEssayState] = useState<Essay>({ body: '' })
  const numberOfSteps = 5

  const value = {
    step,
    setStep,
    prompt,
    setPrompt,
    title,
    setTitle,
    numberOfSteps,
    argumentsState,
    setArgumentsState,
    paragraphsState,
    setParagraphsState,
    essayState,
    setEssayState,
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
