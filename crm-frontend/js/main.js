import Client from './client.js';

// global variables
const SERVER_URI = 'http://localhost:3000/api/clients'

// let startArrForAddToServer = [
//     new Client('Александр', 'Иванов', 'Экономика'),
//     new Client('Michail', 'Babojko', 'godofprogramming'),
//     new Client('Alexandr', 'Dudukalo', 'curator'),
//     new Client('Alon', 'Fine', 'fullstack'),
//     new Client('Judit', 'Fine', 'rocketsince'),
//     new Client('Ron', 'Green', 'iosdev'),
//     new Client('Glen', 'Stark', 'disainer'),
//     new Client('Rick', 'Briens', 'androiddev'),
// ]
let x = new Client('Rick', 'Briens', 'androiddev')

// func's for work with server

async function getServerData() {
    const response = await fetch(SERVER_URI, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log(data)

    return data
}

async function addServerData(classClient) {
    const response = await fetch(SERVER_URI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: x._name,
            surname: x._surname,
            lastName: x._lastname,
            contacts: [
                {
                    type: 'Email',
                    value: 'abc@xyz.com'
                },
                {
                    type: 'Facebook',
                    value: 'https://facebook.com/vasiliy-pupkin-the-best'
                }
            ]
        })
    })

    const data = await response.json()
    console.log(data)

    return data
}
// addServerData(x)

