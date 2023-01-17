import { createDocument } from '@/db/documents'
import { useUser } from '@/utils/useUser'
import classNames from 'classnames'
import Modal from 'components/Modal'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import BorderedInput from './BorderedInput'
import { BackButton, NextButton } from './Buttons'
import { Essay, Paragraphs, useNewEssay } from './NewEssayContextProvider'
import OneLineInput from './OneLineInput'

const getOpacityFromCurrentStep = (
  currentStep: number,
  componentStep: number,
) => {
  if (currentStep != componentStep) return 0
  else return 1
}

const getTranslationFromCurrentStep = (
  currentStep: number,
  componentStep: number,
) => {
  if (currentStep < componentStep) return '100vw'
  else if (currentStep > componentStep) return '-100vw'
  else return '0vw'
}

const NewEssayWizard = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <ProgressBar />
      <div className="pt-20 flex flex-col items-center">
        <PromptStep componentStep={1} />
        <TitleStep componentStep={2} />
        <ArgumentStep componentStep={3} />
        <ParagraphStep componentStep={4} />
        <EssayStep componentStep={5} />
      </div>
    </div>
  )
}

export default NewEssayWizard

const PromptStep = ({ componentStep }: { componentStep: number }) => {
  const {
    step: currentStep,
    setStep,
    prompt,
    setPrompt,
    title,
    setTitle,
  } = useNewEssay()
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const generateTitle = async (prompt: string) => {
    const response = await fetch(
      `/api/title?userId=${user?.uid}&prompt=${prompt}`,
    )
    const body = await response.json()
    return body.title
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const title = await generateTitle(prompt)
    setTitle(title)
    setStep((step) => step + 1)
    setIsLoading(false)
  }

  return (
    <div
      style={{
        transform: `translateX(${getTranslationFromCurrentStep(
          currentStep,
          componentStep,
        )})`,
        height: 'calc(100vh - 80px)',
        opacity: getOpacityFromCurrentStep(currentStep, componentStep),
      }}
      className="flex flex-col items-center w-full fixed overflow-y-scroll scrollbar-hide transition-all ease-in-out duration-1000"
    >
      <div className="max-w-2xl flex flex-col items-center px-16 py-12 my-10 gap-6 bg-white rounded-lg border drop-shadow-xl">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-medium text-center">
            What's your essay prompt?
          </h2>
          <p className="text-lg text-gray-500 text-center">
            This is your assignment. For example, "Discuss the differences
            between Democrats and Republicans in the United States."
          </p>
          <OneLineInput
            value={prompt}
            onChange={(e: any) => setPrompt(e.target.value)}
            placeholder="Type your prompt here..."
          />
        </div>
        <div className="flex w-full justify-end">
          <NextButton
            isLoading={isLoading}
            disabled={prompt.trim() == ''}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  )
}

const TitleStep = ({ componentStep }: { componentStep: number }) => {
  const {
    step: currentStep,
    setStep,
    title,
    setTitle,
    setArgumentsState,
  } = useNewEssay()
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const generateArguments = async (title: string) => {
    const response = await fetch(
      `/api/arguments?userId=${user?.uid}&title=${title}`,
    )
    const body = await response.json()
    return body.arguments
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const args = await generateArguments(title)
    setArgumentsState(args)
    setStep((step) => step + 1)
    setIsLoading(false)
  }

  return (
    <div
      style={{
        transform: `translateX(${getTranslationFromCurrentStep(
          currentStep,
          componentStep,
        )})`,
        height: 'calc(100vh - 80px)',
        opacity: getOpacityFromCurrentStep(currentStep, componentStep),
      }}
      className="flex flex-col items-center w-full fixed overflow-y-scroll scrollbar-hide transition-all ease-in-out duration-1000"
    >
      <div className="max-w-2xl flex flex-col items-center px-16 py-12 my-10 gap-6 bg-white rounded-lg border drop-shadow-xl">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-medium text-center">
            What do you want the title to be?
          </h2>
          <p className="text-lg text-gray-500 text-center">
            We created one for you! If you don’t like it, feel free to change
            it.
          </p>
          <OneLineInput
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            placeholder="Type your title here..."
          />
        </div>
        <div className="flex w-full justify-between">
          <BackButton onClick={() => setStep((step) => step - 1)} />
          <NextButton isLoading={isLoading} onClick={() => handleSubmit()} />
        </div>
      </div>
    </div>
  )
}

const ArgumentStep = ({ componentStep }: { componentStep: number }) => {
  const {
    step: currentStep,
    setStep,
    title,
    argumentsState,
    setArgumentsState,
    setParagraphsState,
  } = useNewEssay()
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const generateParagraphs = async (args: string[]): Promise<Paragraphs> => {
    const response = await fetch('/api/paragraphs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user?.uid, title, arguments: args }),
    })
    const body = await response.json()
    return body.paragraphs
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const paragraphs = await generateParagraphs(argumentsState)
    setParagraphsState(paragraphs)
    setStep((step) => step + 1)
    setIsLoading(false)
  }

  return (
    <div
      style={{
        transform: `translateX(${getTranslationFromCurrentStep(
          currentStep,
          componentStep,
        )})`,
        opacity: getOpacityFromCurrentStep(currentStep, componentStep),
        height: 'calc(100vh - 80px)',
      }}
      className="flex flex-col items-center w-full fixed overflow-y-scroll scrollbar-hide transition-all ease-in-out duration-1000"
    >
      <div className="w-full max-w-4xl flex flex-col items-center px-16 py-12 my-10 gap-8 bg-white rounded-lg border drop-shadow-xl">
        <div className="w-full flex flex-col gap-6">
          <h2 className="text-2xl font-medium text-center">
            Choose your arguments
          </h2>
          <p className="text-lg text-gray-500 text-center">
            Here are a few suggested talking points. Feel free to change them.
          </p>
          <div>
            <DragDropContext
              onDragEnd={(result) => {
                const { destination, source, draggableId } = result

                if (!destination) {
                  return
                }

                if (
                  destination.droppableId === source.droppableId &&
                  destination.index === source.index
                ) {
                  return
                }

                const newArgState = Array.from(argumentsState)
                newArgState.splice(source.index, 1)
                newArgState.splice(
                  destination.index,
                  0,
                  argumentsState[Number(draggableId)],
                )

                setArgumentsState(newArgState)
              }}
            >
              <Droppable
                droppableId="arguments"
                renderClone={(provided, snapshot, rubric) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="flex items-center gap-4 w-full"
                  >
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        stroke="currentColor"
                        className="h-9 w-9 text-gray-500 bg-gray-100 rounded-lg"
                      >
                        <path
                          fill="currentColor"
                          d="M17.5 40q-1.45 0-2.475-1.025Q14 37.95 14 36.5q0-1.45 1.025-2.475Q16.05 33 17.5 33q1.45 0 2.475 1.025Q21 35.05 21 36.5q0 1.45-1.025 2.475Q18.95 40 17.5 40Zm13 0q-1.45 0-2.475-1.025Q27 37.95 27 36.5q0-1.45 1.025-2.475Q29.05 33 30.5 33q1.45 0 2.475 1.025Q34 35.05 34 36.5q0 1.45-1.025 2.475Q31.95 40 30.5 40Zm-13-12.5q-1.45 0-2.475-1.025Q14 25.45 14 24q0-1.45 1.025-2.475Q16.05 20.5 17.5 20.5q1.45 0 2.475 1.025Q21 22.55 21 24q0 1.45-1.025 2.475Q18.95 27.5 17.5 27.5Zm13 0q-1.45 0-2.475-1.025Q27 25.45 27 24q0-1.45 1.025-2.475Q29.05 20.5 30.5 20.5q1.45 0 2.475 1.025Q34 22.55 34 24q0 1.45-1.025 2.475Q31.95 27.5 30.5 27.5ZM17.5 15q-1.45 0-2.475-1.025Q14 12.95 14 11.5q0-1.45 1.025-2.475Q16.05 8 17.5 8q1.45 0 2.475 1.025Q21 10.05 21 11.5q0 1.45-1.025 2.475Q18.95 15 17.5 15Zm13 0q-1.45 0-2.475-1.025Q27 12.95 27 11.5q0-1.45 1.025-2.475Q29.05 8 30.5 8q1.45 0 2.475 1.025Q34 10.05 34 11.5q0 1.45-1.025 2.475Q31.95 15 30.5 15Z"
                        />
                      </svg>
                    </button>
                    <BorderedInput
                      value={argumentsState[rubric.source.index]}
                      onChange={(e) => {}}
                    />
                    <button className="p-1 hover:bg-gray-100 rounded-lg invisible">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        stroke="currentColor"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                      >
                        <path
                          fill="currentColor"
                          d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              >
                {(provided, snapshot) => (
                  <div
                    className="flex flex-col"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {argumentsState.map((arg, index) => (
                      <ArgumentRow
                        key={index}
                        index={index}
                        isDragging={snapshot.isUsingPlaceholder}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <button
              onClick={() => {
                setArgumentsState((currentArgState) => {
                  const newArgState: string[] = JSON.parse(
                    JSON.stringify(currentArgState),
                  )
                  newArgState.push('')
                  return newArgState
                })
              }}
              className="flex items-center justify-center self-start text-lg font-medium text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  fill="currentColor"
                  d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"
                />
              </svg>
              Add argument
            </button>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <BackButton onClick={() => setStep((step) => step - 1)} />
          <NextButton isLoading={isLoading} onClick={() => handleSubmit()} />
        </div>
      </div>
    </div>
  )
}

const ArgumentRow = ({
  index,
  isDragging,
}: {
  index: number
  isDragging: boolean
}) => {
  const { argumentsState, setArgumentsState } = useNewEssay()

  return (
    <Draggable draggableId={String(index)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="flex items-center gap-4 w-full mb-6"
        >
          <button {...provided.dragHandleProps}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              stroke="currentColor"
              className="h-9 w-9 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <path
                fill="currentColor"
                d="M17.5 40q-1.45 0-2.475-1.025Q14 37.95 14 36.5q0-1.45 1.025-2.475Q16.05 33 17.5 33q1.45 0 2.475 1.025Q21 35.05 21 36.5q0 1.45-1.025 2.475Q18.95 40 17.5 40Zm13 0q-1.45 0-2.475-1.025Q27 37.95 27 36.5q0-1.45 1.025-2.475Q29.05 33 30.5 33q1.45 0 2.475 1.025Q34 35.05 34 36.5q0 1.45-1.025 2.475Q31.95 40 30.5 40Zm-13-12.5q-1.45 0-2.475-1.025Q14 25.45 14 24q0-1.45 1.025-2.475Q16.05 20.5 17.5 20.5q1.45 0 2.475 1.025Q21 22.55 21 24q0 1.45-1.025 2.475Q18.95 27.5 17.5 27.5Zm13 0q-1.45 0-2.475-1.025Q27 25.45 27 24q0-1.45 1.025-2.475Q29.05 20.5 30.5 20.5q1.45 0 2.475 1.025Q34 22.55 34 24q0 1.45-1.025 2.475Q31.95 27.5 30.5 27.5ZM17.5 15q-1.45 0-2.475-1.025Q14 12.95 14 11.5q0-1.45 1.025-2.475Q16.05 8 17.5 8q1.45 0 2.475 1.025Q21 10.05 21 11.5q0 1.45-1.025 2.475Q18.95 15 17.5 15Zm13 0q-1.45 0-2.475-1.025Q27 12.95 27 11.5q0-1.45 1.025-2.475Q29.05 8 30.5 8q1.45 0 2.475 1.025Q34 10.05 34 11.5q0 1.45-1.025 2.475Q31.95 15 30.5 15Z"
              />
            </svg>
          </button>
          <BorderedInput
            value={argumentsState[index]}
            onChange={(e) => {
              const arg = e.target.value
              setArgumentsState((currentArgState) => {
                const newArgState = JSON.parse(JSON.stringify(currentArgState))
                newArgState[index] = arg
                return newArgState
              })
            }}
          />
          <button
            onClick={() => {
              setArgumentsState((currentArgState) => {
                const newArgState = JSON.parse(JSON.stringify(currentArgState))
                newArgState.splice(index, 1)
                return newArgState
              })
            }}
            className={classNames('p-1 hover:bg-gray-100 rounded-lg', {
              invisible: isDragging,
            })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              stroke="currentColor"
              className="h-5 w-5 text-gray-400"
              fill="none"
            >
              <path
                fill="currentColor"
                d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"
              />
            </svg>
          </button>
        </div>
      )}
    </Draggable>
  )
}

const ParagraphStep = ({ componentStep }: { componentStep: number }) => {
  const {
    step: currentStep,
    setStep,
    title,
    paragraphsState,
    setEssayState,
  } = useNewEssay()
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const generateEssay = async (paragraphs: Paragraphs): Promise<Essay> => {
    const response = await fetch('/api/essay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.uid,
        title,
        paragraphs,
      }),
    })
    const body = await response.json()
    return body
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const essay = await generateEssay(paragraphsState)
    setEssayState(essay)
    setStep((step) => step + 1)
    setIsLoading(false)
  }

  return (
    <div
      style={{
        transform: `translateX(${getTranslationFromCurrentStep(
          currentStep,
          componentStep,
        )})`,
        opacity: getOpacityFromCurrentStep(currentStep, componentStep),
        height: 'calc(100vh - 80px)',
      }}
      className="flex flex-col items-center w-full fixed overflow-y-scroll scrollbar-hide transition-all ease-in-out duration-1000"
    >
      <div className="w-full max-w-4xl flex flex-col items-center px-16 py-12 my-10 gap-8 bg-white rounded-lg border drop-shadow-xl">
        <div className="w-full flex flex-col gap-6">
          <h2 className="text-2xl font-medium text-center">
            Edit essay content
          </h2>
          <p className="text-lg text-gray-500 text-center">
            Expand each argument to edit the content of each paragraph.
          </p>
          {paragraphsState.map((paragraph, index) => (
            <ParagraphRow key={index} paragraphIndex={index} />
          ))}
        </div>
        <div className="flex w-full justify-between">
          <BackButton onClick={() => setStep((step) => step - 1)} />
          <NextButton isLoading={isLoading} onClick={() => handleSubmit()} />
        </div>
      </div>
    </div>
  )
}

const ParagraphRow = ({ paragraphIndex }: { paragraphIndex: number }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { paragraphsState, setParagraphsState } = useNewEssay()
  const [height, setHeight] = useState(0)
  const ref = useRef<any>(null)

  useEffect(() => {
    if (isExpanded) setHeight(ref.current.clientHeight)
    if (!isExpanded) setHeight(0)
  }, [isExpanded])

  return (
    <div className="flex flex-col justify-center w-full border border-gray-300 rounded-lg">
      <div
        className={classNames(
          'flex items-center justify-center w-full gap-2 px-4 py-3 transition-colors duration-500',
          {
            'border-b border-b-gray-300': isExpanded,
            'border-b border-b-white': !isExpanded,
          },
        )}
      >
        <h2 className="w-full text-lg font-medium">
          {paragraphsState[paragraphIndex].argument}
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hover:bg-gray-100 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            stroke="currentColor"
            className={`h-9 w-9 text-gray-500 transition-transform duration-500 ${
              isExpanded && 'rotate-180'
            }`}
          >
            <path
              fill="currentColor"
              d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z"
            />
          </svg>
        </button>
      </div>
      <div
        className={classNames(
          'transition-all ease-in-out duration-500 overflow-hidden',
        )}
        style={{ height: height }}
      >
        <div ref={ref} className="flex flex-col gap-4 w-full pt-4">
          {paragraphsState[paragraphIndex].paragraph.map(
            (paragraphComponent, paragraphComponentIndex) => {
              return (
                <div
                  key={paragraphComponentIndex}
                  className="flex flex-col gap-3 px-4 py-3"
                >
                  <h2 className="text-lg font-medium text-left">
                    {paragraphComponent.title}
                  </h2>

                  <div>
                    <DragDropContext
                      onDragEnd={(result) => {
                        const { destination, source, draggableId } = result

                        if (!destination) {
                          return
                        }

                        if (
                          destination.droppableId === source.droppableId &&
                          destination.index === source.index
                        ) {
                          return
                        }

                        setParagraphsState((currentParagraphsState) => {
                          const newParagraphsState: Paragraphs = JSON.parse(
                            JSON.stringify(currentParagraphsState),
                          )
                          newParagraphsState[paragraphIndex].paragraph[
                            paragraphComponentIndex
                          ].sentences.splice(source.index, 1)
                          newParagraphsState[paragraphIndex].paragraph[
                            paragraphComponentIndex
                          ].sentences.splice(
                            destination.index,
                            0,
                            currentParagraphsState[paragraphIndex].paragraph[
                              paragraphComponentIndex
                            ].sentences[Number(draggableId)],
                          )
                          return newParagraphsState
                        })
                      }}
                    >
                      <Droppable
                        droppableId="arguments"
                        renderClone={(provided, snapshot, rubric) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="flex items-center gap-4 w-full"
                          >
                            <button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                stroke="currentColor"
                                className="h-9 w-9 text-gray-500 bg-gray-100 rounded-lg"
                              >
                                <path
                                  fill="currentColor"
                                  d="M17.5 40q-1.45 0-2.475-1.025Q14 37.95 14 36.5q0-1.45 1.025-2.475Q16.05 33 17.5 33q1.45 0 2.475 1.025Q21 35.05 21 36.5q0 1.45-1.025 2.475Q18.95 40 17.5 40Zm13 0q-1.45 0-2.475-1.025Q27 37.95 27 36.5q0-1.45 1.025-2.475Q29.05 33 30.5 33q1.45 0 2.475 1.025Q34 35.05 34 36.5q0 1.45-1.025 2.475Q31.95 40 30.5 40Zm-13-12.5q-1.45 0-2.475-1.025Q14 25.45 14 24q0-1.45 1.025-2.475Q16.05 20.5 17.5 20.5q1.45 0 2.475 1.025Q21 22.55 21 24q0 1.45-1.025 2.475Q18.95 27.5 17.5 27.5Zm13 0q-1.45 0-2.475-1.025Q27 25.45 27 24q0-1.45 1.025-2.475Q29.05 20.5 30.5 20.5q1.45 0 2.475 1.025Q34 22.55 34 24q0 1.45-1.025 2.475Q31.95 27.5 30.5 27.5ZM17.5 15q-1.45 0-2.475-1.025Q14 12.95 14 11.5q0-1.45 1.025-2.475Q16.05 8 17.5 8q1.45 0 2.475 1.025Q21 10.05 21 11.5q0 1.45-1.025 2.475Q18.95 15 17.5 15Zm13 0q-1.45 0-2.475-1.025Q27 12.95 27 11.5q0-1.45 1.025-2.475Q29.05 8 30.5 8q1.45 0 2.475 1.025Q34 10.05 34 11.5q0 1.45-1.025 2.475Q31.95 15 30.5 15Z"
                                />
                              </svg>
                            </button>
                            <BorderedInput
                              value={
                                paragraphsState[paragraphIndex].paragraph[
                                  paragraphComponentIndex
                                ].sentences[rubric.source.index]
                              }
                              onChange={(e) => {}}
                            />
                            <button className="p-1 hover:bg-gray-100 rounded-lg invisible">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                stroke="currentColor"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                              >
                                <path
                                  fill="currentColor"
                                  d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      >
                        {(provided, snapshot) => (
                          <div
                            className="flex flex-col"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {paragraphComponent.sentences.map(
                              (sentences, sentenceIndex) => {
                                return (
                                  <SentenceRow
                                    key={sentenceIndex}
                                    paragraphIndex={paragraphIndex}
                                    paragraphComponentIndex={
                                      paragraphComponentIndex
                                    }
                                    sentenceIndex={sentenceIndex}
                                    isDragging={snapshot.isUsingPlaceholder}
                                  />
                                )
                              },
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    <button
                      onClick={() => {
                        setParagraphsState((currentParagraphsState) => {
                          const newParagraphsState: Paragraphs = JSON.parse(
                            JSON.stringify(currentParagraphsState),
                          )
                          newParagraphsState[paragraphIndex].paragraph[
                            paragraphComponentIndex
                          ].sentences.push('')
                          return newParagraphsState
                        })
                      }}
                      className="flex items-center justify-center self-start text-lg font-medium text-blue-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fill="currentColor"
                          d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"
                        />
                      </svg>
                      Add argument
                    </button>
                  </div>
                </div>
              )
            },
          )}
          <button
            onClick={() => setIsExpanded(false)}
            className="flex items-center justify-center border-t border-t-gray-300 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              stroke="currentColor"
              className="h-9 w-9 text-gray-500"
            >
              <path
                fill="currentColor"
                d="M14.15 30.75 12 28.6l12-12 12 11.95-2.15 2.15L24 20.85Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

const SentenceRow = ({
  paragraphIndex,
  paragraphComponentIndex,
  sentenceIndex,
  isDragging,
}: {
  paragraphIndex: number
  paragraphComponentIndex: number
  sentenceIndex: number
  isDragging: boolean
}) => {
  const { paragraphsState, setParagraphsState } = useNewEssay()

  return (
    <Draggable draggableId={String(sentenceIndex)} index={sentenceIndex}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="flex items-center gap-4 w-full mb-6"
        >
          <button {...provided.dragHandleProps}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              stroke="currentColor"
              className="h-9 w-9 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <path
                fill="currentColor"
                d="M17.5 40q-1.45 0-2.475-1.025Q14 37.95 14 36.5q0-1.45 1.025-2.475Q16.05 33 17.5 33q1.45 0 2.475 1.025Q21 35.05 21 36.5q0 1.45-1.025 2.475Q18.95 40 17.5 40Zm13 0q-1.45 0-2.475-1.025Q27 37.95 27 36.5q0-1.45 1.025-2.475Q29.05 33 30.5 33q1.45 0 2.475 1.025Q34 35.05 34 36.5q0 1.45-1.025 2.475Q31.95 40 30.5 40Zm-13-12.5q-1.45 0-2.475-1.025Q14 25.45 14 24q0-1.45 1.025-2.475Q16.05 20.5 17.5 20.5q1.45 0 2.475 1.025Q21 22.55 21 24q0 1.45-1.025 2.475Q18.95 27.5 17.5 27.5Zm13 0q-1.45 0-2.475-1.025Q27 25.45 27 24q0-1.45 1.025-2.475Q29.05 20.5 30.5 20.5q1.45 0 2.475 1.025Q34 22.55 34 24q0 1.45-1.025 2.475Q31.95 27.5 30.5 27.5ZM17.5 15q-1.45 0-2.475-1.025Q14 12.95 14 11.5q0-1.45 1.025-2.475Q16.05 8 17.5 8q1.45 0 2.475 1.025Q21 10.05 21 11.5q0 1.45-1.025 2.475Q18.95 15 17.5 15Zm13 0q-1.45 0-2.475-1.025Q27 12.95 27 11.5q0-1.45 1.025-2.475Q29.05 8 30.5 8q1.45 0 2.475 1.025Q34 10.05 34 11.5q0 1.45-1.025 2.475Q31.95 15 30.5 15Z"
              />
            </svg>
          </button>
          <BorderedInput
            value={
              paragraphsState[paragraphIndex].paragraph[paragraphComponentIndex]
                .sentences[sentenceIndex]
            }
            onChange={(e) => {
              const sentence = e.target.value
              setParagraphsState((currentParagraphsState) => {
                const newParagraphState: Paragraphs = JSON.parse(
                  JSON.stringify(currentParagraphsState),
                )
                newParagraphState[paragraphIndex].paragraph[
                  paragraphComponentIndex
                ].sentences[sentenceIndex] = sentence
                return newParagraphState
              })
            }}
          />
          <button
            onClick={() => {
              setParagraphsState((currentParagraphsState) => {
                const newParagraphState: Paragraphs = JSON.parse(
                  JSON.stringify(currentParagraphsState),
                )
                newParagraphState[paragraphIndex].paragraph[
                  paragraphComponentIndex
                ].sentences.splice(sentenceIndex, 1)
                return newParagraphState
              })
            }}
            className={classNames('p-1 hover:bg-gray-100 rounded-lg', {
              invisible: isDragging,
            })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              stroke="currentColor"
              className="h-5 w-5 text-gray-400"
              fill="none"
            >
              <path
                fill="currentColor"
                d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"
              />
            </svg>
          </button>
        </div>
      )}
    </Draggable>
  )
}

const EssayStep = ({ componentStep }: { componentStep: number }) => {
  const { step: currentStep, setStep, title, essayState } = useNewEssay()
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  // const generateTitle = async (prompt: string) => {
  //   const response = await fetch(
  //     `/api/title?userId=${user?.uid}&prompt=${prompt}`,
  //   )
  //   const body = await response.json()
  //   return body.title
  // }

  const handleSubmit = async () => {
    setIsLoading(true)
    const doc = await createDocument(user?.uid!, {
      title: title,
      content: getDocumentContent(),
    })
    window.location.assign(`/documents/${doc.id}`)
    setIsLoading(false)
  }

  const getDocumentContent = () => {
    let documentContents = ''
    documentContents += `<h3 style="text-align: center;">${title}</h3>`
    essayState.body.split('\n\n').map((paragraph: string) => {
      documentContents += `<p>${paragraph}</p>`
    })
    return documentContents
  }

  return (
    <div
      style={{
        transform: `translateX(${getTranslationFromCurrentStep(
          currentStep,
          componentStep,
        )})`,
        height: 'calc(100vh - 80px)',
        opacity: getOpacityFromCurrentStep(currentStep, componentStep),
      }}
      className="flex flex-col items-center w-full fixed overflow-y-scroll scrollbar-hide transition-all ease-in-out duration-1000"
    >
      <div className="max-w-5xl w-full flex justify-between mt-10">
        <button
          onClick={() => setStep((step) => step - 1)}
          className="flex justify-center items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            stroke="currentColor"
            className="h-6 w-6 text-gray-500"
          >
            <path
              fill="currentColor"
              d="M24 40 8 24 24 8l2.1 2.1-12.4 12.4H40v3H13.7l12.4 12.4Z"
            />
          </svg>
          <span className="text-lg">Edit essay content</span>
        </button>
        <button
          onClick={() => handleSubmit()}
          className="flex justify-center items-center gap-1"
        >
          <span className="text-lg">Open in editor</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            stroke="currentColor"
            className="h-6 w-6 text-gray-500"
          >
            <path
              fill="currentColor"
              d="m24 40-2.1-2.15L34.25 25.5H8v-3h26.25L21.9 10.15 24 8l16 16Z"
            />
          </svg>
        </button>
      </div>
      <div className="max-w-5xl w-full px-28 py-32 my-10 bg-white rounded-lg border drop-shadow-xl">
        <div className="flex flex-col gap-12">
          <h1 className="text-2xl font-medium text-center">{title}</h1>
          <p className="text-lg text-left whitespace-pre-wrap">
            {essayState.body}
          </p>
        </div>
      </div>
    </div>
  )
}

const ProgressBar = () => {
  const [showModal, setShowModal] = useState(false)
  const { step, numberOfSteps } = useNewEssay()

  const getProgressPercentage = () => {
    return (step / numberOfSteps) * 100
  }

  return (
    <>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <div className="flex flex-col gap-5 px-10 pb-10">
            <h2 className="text-center text-xl font-semibold">Are you sure?</h2>
            <div>You will lose all of your progress.</div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="p-2 border border-gray-300 rounded-md font-semibold"
              >
                Take me back
              </button>
              <Link
                href="/documents"
                className="flex justify-center p-2 bg-red-600 rounded-md text-white font-semibold"
              >
                Delete my progress
              </Link>
            </div>
          </div>
        </Modal>
      )}
      <div className="z-10 fixed w-full bg-gray-50">
        <div className="flex justify-between items-center px-6 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 102 40"
            fill="none"
            className="w-24 h-10"
          >
            <path
              d="M42.456 29V10.41H46.226V29H42.456ZM52.2797 15.662V17.482H52.3577C53.2764 16.026 54.5937 15.298 56.3097 15.298C57.6791 15.298 58.7884 15.766 59.6377 16.702C60.4871 17.6207 60.9117 18.8167 60.9117 20.29V29H57.3757V20.81C57.3757 20.082 57.1677 19.4927 56.7517 19.042C56.3531 18.5913 55.7897 18.366 55.0617 18.366C54.2817 18.366 53.6317 18.652 53.1117 19.224C52.6091 19.796 52.3577 20.5327 52.3577 21.434V29H48.8217V15.662H52.2797ZM71.8793 29L68.1353 22.916L66.6013 24.502V29H63.0913V10.41H66.6013V20.706L71.3333 15.662H75.5713L70.6573 20.732L76.1693 29H71.8793ZM82.6366 29.39C80.4872 29.39 78.7972 28.7313 77.5666 27.414C76.3359 26.0793 75.7206 24.3807 75.7206 22.318C75.7206 20.3247 76.3359 18.6607 77.5666 17.326C78.7972 15.974 80.3746 15.298 82.2986 15.298C84.3959 15.298 86.0166 16.026 87.1606 17.482C88.3046 18.938 88.8766 20.888 88.8766 23.332H79.2046C79.3432 24.3893 79.6986 25.2127 80.2706 25.802C80.8426 26.374 81.6226 26.66 82.6106 26.66C83.9106 26.66 84.7686 26.114 85.1846 25.022H88.6686C88.4086 26.27 87.7499 27.31 86.6926 28.142C85.6352 28.974 84.2832 29.39 82.6366 29.39ZM82.3506 18.028C80.6346 18.028 79.6032 18.9813 79.2566 20.888H85.1846C85.1326 20.0387 84.8466 19.354 84.3266 18.834C83.8066 18.2967 83.1479 18.028 82.3506 18.028ZM90.4183 33.368V30.586H91.6663C92.9836 30.586 93.6423 29.9793 93.6423 28.766C93.6423 28.1767 93.3043 26.972 92.6283 25.152L89.0403 15.662H92.7583L94.7343 21.668L95.5923 24.58H95.6443C95.8869 23.4533 96.1469 22.4827 96.4243 21.668L98.2963 15.662H101.858L97.2043 29.338C96.6843 30.8633 96.0949 31.912 95.4363 32.484C94.7949 33.0733 93.8156 33.368 92.4983 33.368H90.4183Z"
              fill="black"
            />
            <path
              d="M28.8205 11.3049C28.8205 11.3049 28.7489 11.3566 28.6729 11.335C28.6058 11.3159 28.5721 11.2656 28.5721 11.2656C28.5721 11.2656 26.4812 7.9878 25.1557 6.22658C24.3414 5.14446 21.7564 2.27327 21.7564 2.27327C21.7564 2.27327 20.8689 1.41968 21.0765 1.32092C21.4568 1.13998 22.1611 1.39155 22.4929 1.55137C25.873 3.17955 32.8421 6.65301 32.8421 7.61372C32.8421 8.9161 28.8205 11.3049 28.8205 11.3049Z"
              fill="#1A56DB"
            />
            <path
              d="M4.02165 11.3049C4.02165 11.3049 4.09324 11.3566 4.16917 11.335C4.23631 11.3159 4.27005 11.2656 4.27005 11.2656C4.27005 11.2656 6.36095 7.9878 7.68637 6.22658C8.50074 5.14446 11.0857 2.27327 11.0857 2.27327C11.0857 2.27327 11.9732 1.41968 11.7656 1.32092C11.3853 1.13998 10.681 1.39155 10.3492 1.55137C6.9691 3.17955 0 6.65301 0 7.61372C0 8.9161 4.02165 11.3049 4.02165 11.3049Z"
              fill="#1A56DB"
            />
            <path
              d="M4.97159 32.0174V33.6175L3.56082 34.2133C1.91492 34.9112 1.70024 35.0985 1.70024 35.8645C1.70024 36.7326 2.3034 37.2348 3.33592 37.2348C3.83684 37.2263 4.09242 37.1412 5.84054 36.4007C7.38421 35.7453 7.83402 35.5155 8.01804 35.2857C8.23272 35.0048 8.24294 34.9368 8.24294 32.7153C8.24294 32.7153 8.25841 31.1993 7.93447 30.7947C7.61052 30.3902 6.60727 30.4258 6.60727 30.4258C6.60727 30.4258 5.66684 30.3902 5.3429 30.7947C5.01895 31.1993 4.97159 32.0174 4.97159 32.0174Z"
              fill="#1A56DB"
            />
            <path
              d="M27.8883 32.0108V33.611L29.2991 34.2067C30.945 34.9047 31.1596 35.0919 31.1596 35.8579C31.1596 36.7261 30.5565 37.2282 29.524 37.2282C29.023 37.2197 28.7675 37.1346 27.0193 36.3941C25.4757 35.7388 25.0259 35.509 24.8418 35.2792C24.6272 34.9983 24.6169 34.9302 24.6169 32.7088C24.6169 32.7088 24.6015 31.1927 24.9254 30.7882C25.2494 30.3836 26.2526 30.4192 26.2526 30.4192C26.2526 30.4192 27.193 30.3836 27.517 30.7882C27.8409 31.1927 27.8883 32.0108 27.8883 32.0108Z"
              fill="#1A56DB"
            />
            <path
              d="M11.5147 32.8266V35.2268L9.9404 36.5546C8.63186 37.644 8.34561 37.9334 8.25361 38.2313C7.91625 39.2697 9.07144 40.2314 10.3186 39.9506C10.6765 39.874 11.0445 39.6101 12.6188 38.3164C13.6513 37.4653 14.5612 36.6652 14.643 36.5375C14.7554 36.3503 14.7861 35.746 14.7861 33.3628C14.7861 33.3628 14.7378 31.1999 14.4139 30.7954C14.0899 30.3908 13.1504 30.4264 13.1504 30.4264C13.1504 30.4264 12.1463 30.4264 11.8223 30.7954C11.4984 31.1643 11.5147 32.8266 11.5147 32.8266Z"
              fill="#1A56DB"
            />
            <path
              d="M21.3451 32.8184V35.2186L22.9195 36.5463C24.228 37.6358 24.5143 37.9251 24.6063 38.223C24.9436 39.2614 23.7884 40.2232 22.5412 39.9423C22.1834 39.8657 21.8154 39.6019 20.2411 38.3082C19.2085 37.457 18.2987 36.657 18.2169 36.5293C18.1045 36.342 18.0738 35.7377 18.0738 33.3546C18.0738 33.3546 18.1221 31.1917 18.446 30.7871C18.7699 30.3826 19.7095 30.4182 19.7095 30.4182C19.7095 30.4182 20.7136 30.4182 21.0376 30.7871C21.3615 31.1561 21.3451 32.8184 21.3451 32.8184Z"
              fill="#1A56DB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.5116 0.178738C14.9494 0.459611 12.9866 2.10229 12.0563 3.06406C6.73542 8.56964 3.48398 16.3202 2.68773 25.3523C2.55194 26.8932 3.14021 27.4291 3.14021 27.4291C3.46413 27.7797 3.85289 28.0224 4.20923 28.1573L4.21414 28.1591C4.57268 28.2948 5.34944 28.5888 6.74862 28.5896L16.401 28.5979H26.0756C26.0756 28.5979 27.7493 28.6025 28.6348 28.1842L28.643 28.1804C29.1072 27.9611 29.3817 27.8314 29.7038 27.456C30.0277 27.0784 30.255 26.4457 30.1508 25.3523C30.081 24.6202 29.9958 23.8588 29.9056 23.1932C28.6993 14.1202 24.8861 6.46857 19.1408 1.55756C17.5971 0.229805 17.1984 0 16.4317 0C16.033 0 15.757 0.0510685 15.5116 0.178738ZM11.4194 20.902C11.4194 22.466 10.2591 23.7339 8.82786 23.7339C7.39657 23.7339 6.23628 22.466 6.23628 20.902C6.23628 19.338 7.39657 18.0701 8.82786 18.0701C10.2591 18.0701 11.4194 19.338 11.4194 20.902ZM24.0529 23.7339C25.4841 23.7339 26.6444 22.466 26.6444 20.902C26.6444 19.338 25.4841 18.0701 24.0529 18.0701C22.6216 18.0701 21.4613 19.338 21.4613 20.902C21.4613 22.466 22.6216 23.7339 24.0529 23.7339Z"
              fill="#1A56DB"
            />
          </svg>

          <button onClick={() => setShowModal(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="1"
              className="w-9 h-9 text-gray-400 rounded-md hover:bg-gray-100 cursor-pointer"
              viewBox="0 0 48 48"
            >
              <path
                fill="currentColor"
                d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"
              />
            </svg>
          </button>
        </div>
        <div className="w-full bg-gray-200">
          <div
            className="w-40 h-2 bg-blue-700 transition-width duration-1000 ease-in-out rounded-r"
            style={{ width: getProgressPercentage() + '%' }}
          ></div>
        </div>
      </div>
    </>
  )
}
