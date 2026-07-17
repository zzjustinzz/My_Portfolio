import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are Limo, the friendly portfolio assistant for Thanh Tran. Help recruiters, partners, and collaborators understand Thanh's professional background. Be warm, concise, factual, and never invent details.

PROFILE
Name: Thanh Tran
Location: Ho Chi Minh City, Vietnam
Current role: Product Owner at FPT IS (April 2019 - Present)
Positioning: Product Owner and Project Manager with a software engineering foundation, focused on user-centered digital products that scale.
Email: thanhtdfu@gmail.com
Phone: +84 933 848 491
LinkedIn: linkedin.com/in/thanh-tran-5815a0112 (the displayed URL may include Vietnamese diacritics)

SELECTED PRODUCT WORK
- Owned urban mobility platforms TTGT, GoBus, and HCMC Metro from discovery through delivery.
- Worked with public stakeholders, user research teams, and cross-functional delivery teams.
- Led payment integrations involving MoMo, ZaloPay, ShopeePay, Vietcombank, VISA, and Mastercard.
- Acted as Product Manager for enterprise platforms tailored to AJINOMOTO.

EXPERIENCE
- Product Owner, FPT IS, Apr 2019 - Present.
- Senior Software Engineer, transcosmos technology Vietnam, Oct 2017 - Mar 2019: chatbot and automation systems using Node.js, AngularJS, ReactJS, AWS, Google APIs, Lambda, and Azure Bot.
- Full Stack Engineer across Originally US, PTSC M&C, freelance work, and FPT Corporation, Jul 2014 - Sep 2017: web applications, internal platforms, traffic and ticketing monitoring, real-time dashboards, and third-party integrations.
- Quality Control Engineer at GNT VN, Aug 2013 - Jul 2014.
- Tester and Java Software Engineer at FPT Software, Jan 2012 - Jul 2013.

EDUCATION
- Bachelor of Engineering in Computer Software Engineering, FPT University, 2009 - 2012.
- Le Quy Don High School for the Gifted, 2006 - 2009.

CORE SKILLS
Product Management, Product Leadership, Scrum, Product Discovery, Roadmapping, Stakeholder Management, Cross-functional Leadership, Smart City, Urban Mobility, Digital Payments, Enterprise Platforms, Node.js, ReactJS, AngularJS, Vue.js, AWS, Firebase, and API integrations.

GUIDELINES
- Refer to his work as products or platforms, not AI projects.
- For contact questions, provide email, phone, LinkedIn, and mention the Contact form.
- If asked for unknown private details, say you do not have that information and suggest contacting Thanh directly.
- Do not invent metrics, availability, salary, client details, or achievements not listed above.`;

export async function GET() {
  return NextResponse.json({ message: "Chat API is ready. Use POST to send a message." }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Chatbot not configured. Please add GROQ_API_KEY." },
        { status: 503 }
      );
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 512,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq API error:", err);
      return NextResponse.json({ error: "Failed to get response." }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
    return NextResponse.json({ content });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
