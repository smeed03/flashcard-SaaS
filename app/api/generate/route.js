import {NextResponse} from 'next/server'
import OpenAI from 'openai'

const systemPrompt = `You are a flashcard creator.

1. Create clear and concise questions for the front of the card.
2. Creat informative and accurate answers for the back of the card.
3. Ensure that each card focuses on a single concept or piece of info.
4. Use simple language and avoid jargon to make cards accessible for more learners.
5. Include a variety of question types, such as multiple choice, fill-in-the-blank, and true/false.
6. When appropriate, use mnemonics or memory aids to help learners remember information.
7. Tailor the difficulty of the cards to the user's specified preferences.
8. If given a body of text, extract the most important and relevant info for the flashcards.
9. Aim to create a balanced set of flashcards that covers the topic comprehensively.
10. Only generate 10 flashcards.

Remember, the goal is to facilitate effective learning and retention of information.

Return in the following JSON format:
{
    "flashcards": [
        {
            "front": str,
            "back": str
        }
    ]
}
`

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: systemPrompt},
            {role: 'user', content: data},
        ],
        model:'gpt-4o',
        response_format: {type: 'json_object'},
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcards)
}