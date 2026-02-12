import { NextResponse } from 'next/server';

const BOT_TOKEN = '7586808462:AAFdOHCaZFvTD3KBjYz5ZvIH2LWpcVWbMK8';
const CHAT_ID = '-4757107595';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, activity } = body;

        if (!name || !phone || !activity) {
            return NextResponse.json(
                { error: 'Barcha maydonlarni to\'ldiring' },
                { status: 400 }
            );
        }

        const text = `
🆕 **Yangi murojaat!**

👤 **Ism:** ${name}
📞 **Telefon:** ${phone}
💼 **Faoliyat turi:** ${activity}

🌐 *one-step-web.vercel.app*
    `;

        const response = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: text,
                    parse_mode: 'Markdown',
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Telegram API Error:', errorData);
            throw new Error('Telegramga xabar yuborishda xatolik yuz berdi');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Xabar yuborishda xatolik yuz berdi. Keyinroq qayta urinib ko\'ring.' },
            { status: 500 }
        );
    }
}
