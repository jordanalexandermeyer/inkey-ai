import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

const Home: NextPage = () => {
  const handleSubmit = async (event: React.SyntheticEvent) => {
    // put page into loading state

    // prevents form from redirecting on submit
    event.preventDefault()

    // get text from event
    const target = event.target as typeof event.target & {
      text: { value: string }
    }
    const text = target.text

    // send text to OpenAI to get essay outline
    // after receiving outline from OpenAI, exit loading state
    // redirect to new page putting outline in query (https://stackoverflow.com/questions/72221255/how-to-pass-data-from-one-page-to-another-page-in-next-js)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Essay generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-col items-center justify-center px-20 text-center">
        <h1 className="text-3xl font-bold">Essay generator</h1>

        <p className="mt-6 text-2xl">
          Enter an essay prompt to generate a 5 paragraph essay
        </p>

        <form
          className="mt-6 flex w-full flex-1 flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            className="border border-gray-400 rounded w-full pt-2 p-2 text-2xl"
            type="text"
            placeholder="Describe the impact of..."
            minLength={20}
            required
          />
          <button
            className="mt-6 bg-blue-700 text-white font-medium py-4 px-8 rounded text-xl"
            type="submit"
          >
            Write my essay
          </button>
        </form>
      </main>
    </div>
  )
}

export default Home
