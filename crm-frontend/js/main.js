import Client from './client.js';
const element = document.getElementById('form__contact_selector')
const choices = new Choices(element, {
    searchEnabled: false,
    searchChoices: false,
    itemSelectText: '',
    allowHTML: false
})

// global variables
const SERVER_URI = 'http://localhost:3000/api/clients',
    $table = document.getElementById('table'),
    btnAddClient = document.getElementById('btn_add-client'),
    popUpAddClient = document.getElementById('add__client-popup'),
    popUpDeleteClient = document.getElementById('delete__client-popup'),
    btnAddClientClose = document.getElementById('btn-close-add'),
    btnDeleteClientClose = document.getElementById('btn-close-delete'),
    addClientBtnCancel = document.getElementById('form-cancel'),
    deleteClientBtnCancel = document.getElementById('delete__client-cancel'),
    addClientForm = document.getElementById('add__client-form'),
    addClientSubmitBtn = document.getElementById('add__client-submit-btn'),
    addInputSurname = document.getElementById('add__client-surname'),
    addInputName = document.getElementById('add__client-name'),
    addInputLastname = document.getElementById('add__client-lastname'),
    addContactBtn = document.getElementById('add__client_add_contact_btn'),
    inputSurname = document.getElementById('box-surname'),
    inputName = document.getElementById('box-name'),
    inputLastname = document.getElementById('box-lastname'),
    deleteClientBtnDelete = document.getElementById('delete__client-delete-btn')

let checkServerData = await getServerData(),
    currentServerObjID = null

let arrClient = [],
    arrClientCopy = [...arrClient]

let contactID = 1
const contactsData = [
    {
        inputPlaceholder: "Tel.",
        inputType: "tel",
        inputName: "tel",
        inputClass: "form__contact-input",
        inputID: `form__contact-input${contactID}`,
        buttonType: "button",
        buttonClass: "contact-box-btn",
        buttonID: `contact-box-btn${contactID}`,
    },
    {
        inputPlaceholder: "add..Tel.",
        inputType: "tel",
        inputName: "tel2",
        inputClass: "form__contact-input",
        inputID: `form__contact-input${contactID}`,
        buttonType: "button",
        buttonClass: "contact-box-btn",
        buttonID: `contact-box-btn${contactID}`,
    },
    {
        inputPlaceholder: "Email",
        inputType: "email",
        inputName: "email",
        inputClass: "form__contact-input",
        inputID: `form__contact-input${contactID}`,
        buttonType: "button",
        buttonClass: "contact-box-btn",
        buttonID: `contact-box-btn${contactID}`,
    },
    {
        inputPlaceholder: "vk..",
        inputType: "text",
        inputName: "vk",
        inputClass: "form__contact-input",
        inputID: `form__contact-input${contactID}`,
        buttonType: "button",
        buttonClass: "contact-box-btn",
        buttonID: `contact-box-btn${contactID}`,
    },
    {
        inputPlaceholder: "facebook",
        inputType: "text",
        inputName: "facebook",
        inputClass: "form__contact-input",
        inputID: `form__contact-input${contactID}`,
        buttonType: "button",
        buttonClass: "contact-box-btn",
        buttonID: `contact-box-btn${contactID}`,
    },
]
// func's for work with server
async function getServerData() {
    const response = await fetch(SERVER_URI, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()

    return data
}
async function getServerDataByID(id) {
    const response = await fetch(`${SERVER_URI}/${id}`, {
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
    // past this ID for next step... submit. Threr we need id for 
    // retern 'Server Obj' to instance Client & put it to array
    currentServerObjID = data.id

    return data
}
function $createClientHTML(instanceClient) {

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
    const $clientOptionsChange = document.createElement('button')
    const $clientOptionsDelete = document.createElement('button')

    $clientID.textContent = instanceClient._id
    $clientName.textContent = `${instanceClient._surname}   ${instanceClient._name}   ${instanceClient._lastname}`
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
    $clientOptionsChange.classList.add('dark_14', 'table_option', 'table_change')
    $clientOptionsDelete.classList.add('dark_14', 'table_option', 'table_delete')

    // delete from: 1-server, 2-arrClientCopy, 3-DOM
    $clientOptionsDelete.addEventListener('click', () => {
        popUpDeleteClient.classList.add('open-popup')
        deleteClientBtnDelete.addEventListener('click', async () => {
            await deleteObjFromServer(instanceClient._id)
            const indexOfArrayElementToRemove = arrClientCopy.findIndex(el => el._id === instanceClient._id)
            if (indexOfArrayElementToRemove !== -1) { arrClientCopy.splice(indexOfArrayElementToRemove, 1) }
            $item.remove()
            popUpDeleteClient.classList.remove('open-popup')
        })
    })

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



function $createSelectorDOM() {
    const $contactSelector = document.createElement('select'),
        $contactOption1 = document.createElement('option'),
        $contactOption2 = document.createElement('option'),
        $contactOption3 = document.createElement('option'),
        $contactOption4 = document.createElement('option'),
        $contactOption5 = document.createElement('option')

    $contactSelector.id = "form__contact_selector"
    $contactSelector.classList.add("form__contact_selector")
    $contactSelector.name = "select"

    $contactOption1.textContent = "phone"
    $contactOption2.textContent = "phone"
    $contactOption3.textContent = "Email"
    $contactOption4.textContent = "Vk"
    $contactOption5.textContent = "Facebook"

    $contactOption1.value = "phone"
    $contactOption2.value = "phone"
    $contactOption3.value = "Email"
    $contactOption4.value = "Vk"
    $contactOption5.value = "Facebook"

    $contactSelector.append($contactOption1)
    $contactSelector.append($contactOption2)
    $contactSelector.append($contactOption3)
    $contactSelector.append($contactOption4)
    $contactSelector.append($contactOption5)

    return $contactSelector
}

function $formContactDOM() {
    const selector = $createSelectorDOM()

    const $formContact = document.createElement('div')
    $formContact.classList.add('form__contact')
    $formContact.id = 'form__contact'

    $formContact.append(selector)
    //     $formContact.append($createAddContactInputBox())

    return $formContact
}


const addContact = $formContactDOM()
addContactBtn.addEventListener('click', () => {

    addClientForm.insertBefore(addContact, addContactBtn)//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
})
// function $createAddContactInputBox() {
//     const $contactInputBox = document.createElement('div')
//     $contactInputBox.classList.add('form__contact-input-box')

//     $contactInputBox.append($createAddContactBox('Tel.', 'one'))
//     $contactInputBox.append($createAddContactBox('add..Tel.', 'two'))
//     $contactInputBox.append($createAddContactBox('Email', 'three'))
//     $contactInputBox.append($createAddContactBox('vk..', 'fore'))
//     $contactInputBox.append($createAddContactBox('facebook', 'five'))

//     return $contactInputBox
// }
// function $createAddContactBox(placeholder, dataName) {
//     const $contactBox = document.createElement('div'),
//         $contactInput = document.createElement('input')

//     $contactBox.classList.add('contact-box', 'visible')
//     $contactBox.dataset.target = dataName

//     $contactInput.placeholder = placeholder
//     $contactInput.type = 'tel'
//     $contactInput.id = 'form__contact-tel'

//     $contactBox.append($contactInput)
//     $contactBox.append($createAddContactDeleteBtn())

//     return $contactBox
// }
// function $createAddContactDeleteBtn() {
//     const $delBtn = document.createElement('button')

//     $delBtn.classList.add('contact-box-btn')
//     $delBtn.type = 'button'

//     $delBtn.append(`
//     <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
//     xmlns="http://www.w3.org/2000/svg">
//     <path
//         d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z"
//         fill="#B0B0B0" />
// </svg>
//     `)

//     $delBtn.addEventListener('click', () => {
//         console.log($delBtn.parentElement.parentElement.parentElement);
//         $delBtn.parentElement.parentElement.parentElement.remove()
//     })

//     return $delBtn
// }

// function $createAddContactDropdownselectorItem(text, dataName) {
//     const $contactDropdownselectorItem = document.createElement('li'),
//         $contactDropdownselectorBtn = document.createElement('button')

//     $contactDropdownselectorItem.classList.add('dropdown-selector__item')
//     $contactDropdownselectorBtn.classList.add('form__contact-tab', 'dropdown-selector__btn')

//     $contactDropdownselectorBtn.dataset.path = dataName
//     $contactDropdownselectorBtn.textContent = text

//     $contactDropdownselectorItem.append($contactDropdownselectorBtn)

//     return $contactDropdownselectorItem
// }
function renderTable(arrClientCopy) {

    const lines = $table.querySelectorAll('.table_item')

    for (const line of lines) {
        line.remove()
    }

    // for (let item = 1; item < lines.length; item++) {
    //     lines[item].remove()
    // }
    arrClientCopy.forEach(instanceClient => {

        const $listItem = $createClientHTML(instanceClient)
        $table.append($listItem)
    });
}

// here we put to 'Copy Main Array' data from server
if (checkServerData) {
    for (const serverObj of checkServerData) {

        arrClientCopy.push(new Client(
            serverObj.name,
            serverObj.surname,
            serverObj.lastName,
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
        addInputSurname.value.trim(),
        addInputLastname.value.trim()
    )

    // FOR ADD NEW STUDENT TO SERVER...
    await addServerData(newClient);
    // get ID
    const serverObj = await getServerDataByID(currentServerObjID)

    // FOR ADD NEW STUDENT TO ARRAY[]
    arrClientCopy.push(
        new Client(
            serverObj.name,
            serverObj.surname,
            serverObj.lastName,
            serverObj.contacts,
            serverObj.id,
            serverObj.createdAt,
            serverObj.updatedAt
        )
    )

    // animation for loading
    addClientSubmitBtn.classList.remove('form-submit-btn')
    addClientSubmitBtn.classList.add('form-submit-btn-loading')
    addInputName.value = ''
    addInputSurname.value = ''
    addInputLastname.value = ''
    inputLastname.firstElementChild.classList.remove('placeholder-up')
    inputSurname.firstElementChild.classList.remove('placeholder-up')
    inputName.firstElementChild.classList.remove('placeholder-up')
    setTimeout(() => {
        addClientSubmitBtn.classList.remove('form-submit-btn-loading')
        addClientSubmitBtn.classList.add('form-submit-btn')
        renderTable(arrClientCopy)
        setTimeout(() => {
            popUpAddClient.classList.remove('open-popup')
        }, 200)
    }, 1500)

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

addClientBtnCancel.addEventListener('click', () => {
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

// 'Enter' btn for Delete
window.addEventListener('keydown', (event) => {
    if (popUpDeleteClient.classList.contains('open-popup') && event.key == 'Enter') {
        deleteClientBtnDelete.click()
    }
})

// Escape btn close 
window.addEventListener('keydown', (click) => {
    if (click.key === 'Escape') {
        inputLastname.firstElementChild.classList.remove('placeholder-up')
        inputSurname.firstElementChild.classList.remove('placeholder-up')
        inputName.firstElementChild.classList.remove('placeholder-up')
        popUpAddClient.classList.remove('open-popup')
        popUpDeleteClient.classList.remove('open-popup')
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


// delete form listeners
popUpDeleteClient.addEventListener('click', (click) => {
    if (click.target == popUpDeleteClient) {
        popUpDeleteClient.classList.remove('open-popup')
    }
})

btnDeleteClientClose.addEventListener('click', () => {
    popUpDeleteClient.classList.remove('open-popup')
})

deleteClientBtnCancel.addEventListener('click', () => {
    popUpDeleteClient.classList.remove('open-popup')
})

