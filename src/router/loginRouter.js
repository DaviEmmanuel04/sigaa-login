const express = require('express')
const puppeteer = require('puppeteer');

const loginRouter = express.Router()

const url = 'https://sigaa.ufersa.edu.br/sigaa/public/home.jsf';

loginRouter.post("/login", async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
    
        
        await page.goto(url, {
            waitUntil: "load",
            timeout: 0
        });
    
        await page.setViewport({width: 1080, height: 1024});
    

        const searchResultSelector = '.login a';
        await page.waitForSelector(searchResultSelector);
        await page.click(searchResultSelector);

        const userNameInput = 'input[name="user.login"]'
        const passwordInput = 'input[name="user.senha"]'
        const submitButton = 'input[type="submit"]'

        await page.waitForSelector(userNameInput)
        await page.$eval(userNameInput, (el, username) => el.value = username, username)
        await page.$eval(passwordInput, (el, password) => el.value = password, password)

        await page.click(submitButton)

        const errorMessage = await page.$("center")
        
        if (errorMessage) {
            await browser.close();
            throw new Error("Usuário e/ou senha inválidos")
        }

        await page.waitForSelector("#perfil-docente")

        const userContent = await page.evaluate(() => {
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
        }, );

        await browser.close();

        res.status(200).send(userContent)

    } catch (error) {
        if (error?.message) {
            return res.status(400).send({ message: error.message })
        }

        res.status(500).send({ message: "Erro inesperado" })

    }
    
})

module.exports = loginRouter