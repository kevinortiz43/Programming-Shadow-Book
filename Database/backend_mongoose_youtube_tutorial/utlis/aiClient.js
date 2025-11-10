import OpenAI from 'openai'

export async function callAI(provider, prompt) {
    if (provider === 'openai') {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        })
        const response = await openai.chat.completions.create(({
            model: 'gpt-4o-mini',
            messages: [{role:'user', content:prompt}]
        }))
        return response.choices[0].message_content
        // ...
    }
}