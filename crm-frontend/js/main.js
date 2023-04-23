import Client from './client.js';

// global variables
const SERVER_URI = 'http://localhost:3000/api/clients',
    $table = document.getElementById('table'),
    btnAddClient = document.getElementById('btn_add-client'),
    popUpAddClient = document.getElementById('add__client-popup'),
    btnAddClientClose = document.getElementById('btn-close'),
    btnCancel = document.getElementById('form-cancel'),
    addClientForm = document.getElementById('add__client-form'),
    addFormBox = document.getElementById('add__client-box'),
    addInputSurname = document.getElementById('add__client-surname'),
    addInputName = document.getElementById('add__client-name'),
    addInputLastname = document.getElementById('add__client-lastname'),
    inputSurname = document.getElementById('box-surname'),
    inputName = document.getElementById('box-name'),
    inputLastname = document.getElementById('box-lastname')

let checkServerData = await getServerData()



let arrClient = [],
    arrClientCopy = [...arrClient]


// func's for work with server
async function getServerData() {
    const response = await fetch(SERVER_URI, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()

    return data
}

async function deleteAllServerData() {

    const dataServer = await getServerData()
    for (const servObj of dataServer) {
        
        deleteObjFromServer(servObj.id)
    }
}

async function deleteObjFromServer(id) {
    const response = await fetch(`${SERVER_URI}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    return data
}

async function addServerData(instanceClient) {
    const response = await fetch(SERVER_URI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: instanceClient._name,
            surname: instanceClient._surname,
            lastName: instanceClient._lastname,
            contacts: []
        })
    })

    const data = await response.json()

    return data
}

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

    const lines = $table.querySelectorAll('.table_item')

    for (let item = 1; item < lines.length; item++) {
        console.log(lines[item]);
        lines[item].remove()
    }

    arrClientCopy.forEach(instanceClient => {

        const $listItem = $createClienHTML(instanceClient)
        $table.append($listItem)
    });
}

// here we put to 'Copy Main Array' data from server
if (checkServerData) {
    for (const serverObj of checkServerData) {

        arrClientCopy.push(new Client(

            serverObj.name,
            serverObj.surname,
            serverObj.lastname,
            serverObj.contacts,
            serverObj.id,
            serverObj.createdAt,
            serverObj.updatedAt
        ))
    }
}
renderTable(arrClientCopy)

// Adding new client to server then it will be taken as Instance to Array Copy 
addClientForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    let newClient = new Client(
        addInputName.value.trim(),
        addInputName.value.trim(),
        addInputName.value.trim()
    )

    // FOR ADD NEW STUDENT TO SERVER...
    addServerData(newClient)

    // FOR ADD NEW STUDENT TO ARRAY[]
    arrClientCopy.push(newClient)

    renderTable(arrClientCopy)
})

// buttons & work with pop-up windows (close, moving placeholders)
btnAddClient.addEventListener('click', () => {
    popUpAddClient.classList.add('open-popup')
})

btnAddClientClose.addEventListener('click', () => {
    inputLastname.firstElementChild.classList.remove('placeholder-up')
    inputSurname.firstElementChild.classList.remove('placeholder-up')
    inputName.firstElementChild.classList.remove('placeholder-up')
    popUpAddClient.classList.remove('open-popup')
})

btnCancel.addEventListener('click', () => {
    inputLastname.firstElementChild.classList.remove('placeholder-up')
    inputSurname.firstElementChild.classList.remove('placeholder-up')
    inputName.firstElementChild.classList.remove('placeholder-up')
    popUpAddClient.classList.remove('open-popup')
})

// add form listeners
popUpAddClient.addEventListener('click', (click) => {
    if (click.target == popUpAddClient) {
        inputLastname.firstElementChild.classList.remove('placeholder-up')
        inputSurname.firstElementChild.classList.remove('placeholder-up')
        inputName.firstElementChild.classList.remove('placeholder-up')
        popUpAddClient.classList.remove('open-popup')
    }
})

// Escape btn close 
window.addEventListener('keydown', (click) => {
    if (click.key === 'Escape') {
        inputLastname.firstElementChild.classList.remove('placeholder-up')
        inputSurname.firstElementChild.classList.remove('placeholder-up')
        inputName.firstElementChild.classList.remove('placeholder-up')
        popUpAddClient.classList.remove('open-popup')
    }
})

inputLastname.addEventListener('mouseover', () => {
    inputLastname.firstElementChild.classList.add('placeholder-up')
    addInputLastname.addEventListener('input', () => {
        inputLastname.firstElementChild.classList.add('placeholder-up')
    })
})
inputSurname.addEventListener('mouseover', () => {
    inputSurname.firstElementChild.classList.add('placeholder-up')
    addInputSurname.addEventListener('input', () => {
        inputSurname.firstElementChild.classList.add('placeholder-up')
    })
})
inputName.addEventListener('mouseover', () => {
    inputName.firstElementChild.classList.add('placeholder-up')
    addInputName.addEventListener('input', () => {
        inputName.firstElementChild.classList.add('placeholder-up')
    })
})