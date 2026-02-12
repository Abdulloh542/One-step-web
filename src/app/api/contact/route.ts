import { NextResponse } from 'next/server';

const BOT_TOKEN = '7586808462:AAFdOHCaZFvTD3KBjYz5ZvIH2LWpcVWbMK8';
const CHAT_ID = '-4757107595';

const escapeHtml = (str: string) => {
    return str.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[m] || m);
};

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

        const safeName = escapeHtml(name);
        const safePhone = escapeHtml(phone);
        const safeActivity = escapeHtml(activity);

        const text = `
<b>🆕 Yangi murojaat!</b>

👤 <b>Ism:</b> ${safeName}
📞 <b>Telefon:</b> ${safePhone}
💼 <b>Faoliyat turi:</b> ${safeActivity}

<i>🌐 one-step-web.vercel.app</i>`;

        console.log('Attempting to send lead to Telegram...', { CHAT_ID });

        const response = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: text.trim(),
                    parse_mode: 'HTML',
                }),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error('Telegram API Error:', result);
            return NextResponse.json(
                { error: `Telegram Error: ${result.description || 'Noma\'lum xatolik'}` },
                { status: response.status }
            );
        }

        console.log('Telegram message sent successfully');
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('CRITICAL API ERROR:', error.message || error);
        return NextResponse.json(
            { error: error.message || 'Xabar yuborishda xatolik yuz berdi' },
            { status: 500 }
        );
    }
}
