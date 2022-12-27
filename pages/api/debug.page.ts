export const config = {
  runtime: 'edge',
}

export default async function handler(request: Request, response: Response) {
  const { message } = await request.json()

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      body: JSON.stringify({
        stream: true,
        model: 'text-davinci-003',
        prompt: message,
        temperature: 1,
        top_p: 0.9,
        max_tokens: 1000,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
      },
    })

    const stream = response.body

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    let chunkNumber = 0
    let output = ''
    let incompleteChunk = ''

    const transformedResponse = stream!.pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          // get chunk in string format
          const textChunk = decoder.decode(chunk)

          // separate chunks into lines of data
          const listOfChunks = textChunk.split('\n\n')

          // iterate through chunks
          for (let i = 0; i < listOfChunks.length; i++) {
            // if string is empty, continue
            if (!listOfChunks[i]) continue

            let fullChunk = listOfChunks[i]

            // if incompleteChunk not empty, append it to front of chunk then clear incompleteChunk
            if (incompleteChunk) {
              fullChunk = incompleteChunk + listOfChunks[i]
              incompleteChunk = ''
            }

            // if chunk is last chunk, break
            if (fullChunk.slice(6) == '[DONE]') {
              break
            }

            // if chunk is data, parse it and append it to output
            try {
              if (isError(fullChunk)) {
                controller.enqueue(
                  encoder.encode(
                    'The chat has reached its maximum length. Please "Clear chat" to continue chatting with Inkey.',
                  ),
                )
                break
              }
              const parsedData = JSON.parse(fullChunk.slice(6))
              const text = parsedData.choices[0].text
              if (text == '\n' && chunkNumber < 2) continue // beginning response usually has 2 new lines
              controller.enqueue(encoder.encode(text))
              output += text
              chunkNumber++
            } catch (error) {
              // if chunk is incomplete, store it in incompleteChunk and continue
              incompleteChunk = fullChunk
              continue
            }
          }
        },
        async flush() {},
      }),
    )

    return new Response(transformedResponse, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  } catch (error) {
    console.error(JSON.stringify(error))
    return new Response(null, {
      status: 500,
      statusText: 'Server Error',
    })
  }
}

const isError = (chunk: string) => {
  try {
    if (JSON.parse(chunk).error) return true
  } catch (e) {}
  return false
}
