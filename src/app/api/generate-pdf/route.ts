import path from 'path';
import puppeteer from 'puppeteer';


export async function POST(req: Request,) {
    try {

        const { htmlContent, Filename, id } = await req.json();

        if (!htmlContent) {
            return new Response('HTML content is required', { status: 400 });
        }

        console.log(htmlContent, Filename)

        const browser = await puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        await page.goto(`https://3000-idx-googledocs-1733156828101.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev/document/${id}`, { waitUntil: 'networkidle2' });

        const pdfBuffer = await page.pdf({
            path: `${Filename}.pdf`,
            format: 'A4',
            printBackground: true,
        });

        await browser.close();


        return new Response(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${Filename}.pdf`,
            },
        });

    } catch (error) {
        console.error('Error generating PDF:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
