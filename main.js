const puppeteer = require('puppeteer');
const download = require('download');
const delay = require('delay');

const url = 'https://pixabay.com/fr/music/search/lofi%20hip%20hop/';
const downloadPath = 'D:/WebDevProjects/desktop_timer/desktop_pomodoro_timer/src/assets/audio/lofi-hip-hop';

async function downloadFiles() {
    const browser = await puppeteer.launch({
        headless: false
    });
    
    const page = await browser.newPage();
    await page.goto(url);

    for (let i = 0; i < 15; i++) {
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });
        await delay(1000);
    }

    try {
        const elements = await page.evaluate(() => {
            const audioLink = document.querySelectorAll('a.download.audio-download');
            const urls = Array.from(audioLink).map(v => v.href);
            return urls;
        });
    
        for (const element of elements) {
            const response = await download(element, downloadPath);
            console.log(`File downloaded: ${element}`);
            await delay(1000);
        }
    } catch(err) {
        console.error(err);
    }

    await browser.close();
}

downloadFiles();