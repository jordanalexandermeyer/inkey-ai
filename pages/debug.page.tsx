import { NextPage } from 'next'

const DebugPage: NextPage = () => {
  const getDebug = async () => {
    const response = await fetch('/api/debug')
    console.log('success')
  }

  return (
    <>
      <button onClick={() => getDebug()}>Debug</button>
    </>
  )
}

export default DebugPage
