import Client from './client.js';

// global variables
const SERVER_URI = 'http://localhost:3000/api/clients'

let x = new Client('Rick', 'Briens', 'androiddev')

let arrClient = [],
    arrClientCopy = [...arrClient]


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

// here we put to Copy of the main array Data from server
const serverObjArray = await getServerData()

serverObjArray.forEach(serverObj => {

    const instanceClassClient = new Client(
        serverObj.name,
        serverObj.surname,
        serverObj.lastname,
        serverObj.contacts,
        serverObj.id,
        serverObj.createdAt,
        serverObj.updatedAt
    )

    arrClientCopy.push(instanceClassClient)
});
console.log(arrClientCopy);

function $createClienHTML(instanceClient) {

    const $item = document.createElement('li')
    const $clientID = document.createElement('span')
    const $clientName = document.createElement('p')
    const $clientCreating = document.createElement('div')
    const $clientDateCreating = document.createElement('span')
    const $clientTimeCreating = document.createElement('span')
    const $clientChanging = document.createElement('div')
    const $clientDateChange = document.createElement('span')
    const $clientTimeChange = document.createElement('span')
    const $clientContacts = document.createElement('ul')
    const $clientContactsItem = document.createElement('li')
    const $clientOptions = document.createElement('div')
    const $clientOptionsChange = document.createElement('div')
    const $clientOptionsDelete = document.createElement('div')

    $clientID.textContent = instanceClient._id
    $clientName.textContent = `${instanceClient._surname}   ${instanceClient._name}   ${instanceClient._lastName}`
    $clientDateCreating.textContent = instanceClient.createdDate
    $clientTimeCreating.textContent = instanceClient.createdTime
    $clientDateChange.textContent = instanceClient.updatedDate
    $clientTimeChange.textContent = instanceClient.updatedTime
    $clientOptionsChange.textContent = 'Change'
    $clientOptionsDelete.textContent = 'Delete'

    $item.classList.add('table_item')
    $clientID.classList.add('table-id', 'grey_12')
    $clientName.classList.add('table-name', 'dark_14')
    $clientCreating.classList.add('table-ceate-date', 'wrapper')
    $clientDateCreating.classList.add('dark_14')
    $clientTimeCreating.classList.add('grey_14')
    $clientChanging.classList.add('table-change-date', 'wrapper')
    $clientDateChange.classList.add('dark_14')
    $clientTimeChange.classList.add('grey_14')
    $clientContacts.classList.add('table-contacts', 'wrapper')
    $clientContactsItem.classList.add('wrapper')
    $clientOptions.classList.add('table-options', 'wrapper')
    $clientOptionsChange.classList.add('dark_14')
    $clientOptionsDelete.classList.add('dark_14')

    $clientCreating.append($clientDateCreating)
    $clientCreating.append($clientTimeCreating)
    $clientChanging.append($clientDateChange)
    $clientChanging.append($clientTimeChange)
    $clientContacts.append($clientContactsItem)
    $clientOptions.append($clientOptionsChange)
    $clientOptions.append($clientOptionsDelete)
    $item.append($clientID)
    $item.append($clientName)
    $item.append($clientCreating)
    $item.append($clientChanging)
    $item.append($clientContacts)
    $item.append($clientOptions)

    return $item
}

function renderTable(arrClientCopy) {

    const $table = document.getElementById('table')

    arrClientCopy.forEach(instanceClient => {

        const $listItem = $createClienHTML(instanceClient)
        $table.append($listItem)
    });
}

renderTable(arrClientCopy)