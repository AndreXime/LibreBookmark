import { NextResponse } from 'next/server';
import { chromium as playwright } from 'playwright-core';
import chromium from '@sparticuz/chromium';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
    }

    try {
        const browser = await playwright.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath(),
            headless: true,
        });

        const page = await browser.newPage();
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto(url, { waitUntil: 'networkidle' });

        const buffer = await page.screenshot({ type: 'jpeg', quality: 80 });

        await browser.close();

        const base64 = buffer.toString('base64');

        return NextResponse.json({
            thumbnail: `data:image/jpeg;base64,${base64}`,
        });
    } catch (err) {
        console.error('Erro no Playwright:', err);
        return NextResponse.json({ error: 'Erro ao gerar screenshot' }, { status: 500 });
    }
}
