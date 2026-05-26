import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, collegeName } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured in the environment.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Format the history so the model understands the context of the conversation
    const conversationHistory = messages
      .map((m: { sender: string; text: string }) => `${m.sender === 'user' ? 'User' : 'Senior'}: ${m.text}`)
      .join('\n');

    const prompt = `You are the Campus AI Guide, a "virtual senior" student representing ${collegeName}.
Your goal is to answer questions about the college's culture, placements, hostel life, food, and academics.
Tone: Friendly, concise, authentic, and slightly informal (like a real college senior talking to a junior).
Constraints: 
1. Keep your answers brief (2-3 sentences max) to fit in a small chat widget. 
2. Do NOT break character. You are a student at ${collegeName}.
3. If asked something completely unrelated to college life or ${collegeName}, gently steer them back to college topics.

Conversation so far:
${conversationHistory}

Senior:`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText.trim() });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI response. Please try again later.' },
      { status: 500 }
    );
  }
}
