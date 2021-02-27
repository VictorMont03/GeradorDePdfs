const express = require('express');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');
const app = express();

const passengers = [
    {
        name: 'Duda',
        flightNumber: 2121,
        time: "18h00",
    },
    {
        name: 'Marina',
        flightNumber: 3400,
        time: "10h00",
    },
    {
        name: 'Duarte',
        flightNumber: 1234,
        time: "22h00",
    },
    {
        name: 'André',
        flightNumber: 5544,
        time: "12h00",
    },
    {
        name: 'Neymar Jr',
        flightNumber: 1010,
        time: "14h00",
    }
]

app.get("/pdf", async(request, response) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/", {
        waitUntil: 'networkidle0'
    })
    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',
    });
    await browser.close();
    response.contentType("application/pdf")
    return response.send(pdf)
})

app.get('/', (request, response) => {
    const filePath = path.join(__dirname, 'print.ejs')
    ejs.renderFile(filePath, { passengers }, (err, html) => {
        if(err) {
            response.send("Erro")
        }
        return response.send(html)
        
    })

})

app.listen(3000);

/*passengers.forEach(passenger => {
    console.log(passenger.name)
})*/