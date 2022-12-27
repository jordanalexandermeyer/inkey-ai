import { NextPage } from 'next'

const DebugPage: NextPage = () => {
  const getDebug = async () => {
    const response = await fetch('/api/debug', {
      method: 'POST',
      body: JSON.stringify({
        message: 'what is the meaning of life?',
        id: 'ask-inkey',
        userId: 'EhAvXjddzoUYZ1vOMDBvg3c3bCi2',
        inputs: { prompt: 'what is the meaning of life?' },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return (
    <>
      <button onClick={() => getDebug()}>Debug</button>
    </>
  )
}

export default DebugPage
