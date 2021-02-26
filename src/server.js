const express = require('express');
const ejs = require('ejs');
const path = require('path');
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
    }
]

app.get('/', (request, response) => {
    const filePath = path.join(__dirname, 'print.ejs')
    ejs.renderFile(filePath, { passengers }, (err, data) => {
        if(err) {
            response.send("Erro")
        }
        return response.send(data)
    })

})

app.listen(3000);

/*passengers.forEach(passenger => {
    console.log(passenger.name)
})*/