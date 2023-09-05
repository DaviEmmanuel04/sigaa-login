const rp = require('request-promise');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const url = 'https://sigaa.ufersa.edu.br/sigaa/public/home.jsf';

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
  
    // Navigate the page to a URL
    await page.goto(url);
  
    // Set screen size
    await page.setViewport({width: 1080, height: 1024});
  

    // Wait and click on first result
    const searchResultSelector = '.login a';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    const userNameInput = 'input[name="user.login"]'
    const passwordInput = 'input[name="user.senha"]'
    const submitButton = 'input[type="submit"]'

    await page.waitForSelector(userNameInput)
    await page.$eval(userNameInput, el => el.value = 'user')
    await page.$eval(passwordInput, el => el.value = 'senha')

    await page.click(submitButton)

    await page.waitForSelector("#perfil-docente")

    const text = await page.evaluate(() => {
        const myTable = document.querySelector('#agenda-docente > table > tbody')
        const myTableRows = Array.from(myTable.querySelectorAll('tr'))

        const content = []
        let myObj = {}

        for(const tr of myTableRows) {
            const tds = Array.from(tr.querySelectorAll("td"));
            const data = tds.map((td) => td.innerText);
            content.push(data)

        }

        for(const data of content) {
            if(data.length === 2) {
                let key = data[0].toLowerCase()
                key = key.replace(/[àáâã]/g,"a");
                key = key.replace(/[èéê]/g,"e");
                key = key.replace(/[ìíî]/g,"i");
                key = key.replace(/[òóôõ]/g,"o");
                key = key.replace(/[ùúû]/g,"u");
                key = key.replaceAll(' ', '_')
                key = key.replace('.', '');
                key = key.replace(':', '')
                myObj[key] = data[1]
            }
        }

        let [emails] = content.filter((arr) => arr[0]?.includes('@'))
        emails = emails[0]?.split('\n')
        myObj.personalEmail = emails[1]
        myObj.institutionalEmail = emails[4]

        const image = document.querySelector('.foto > img')

        myObj.userImage = image.currentSrc

        return myObj;
    });


    console.log(text);

    await browser.close();
  
  })();