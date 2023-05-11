import Client from './client.js';

// global variables
const SERVER_URI = 'http://localhost:3000/api/clients',
    $table = document.getElementById('table'),
    btnAddClient = document.getElementById('btn_add-client'),
    popUpAddClient = document.getElementById('add__client-popup'),
    popUpChangeClient = document.getElementById('change__client-popup'),
    popUpDeleteClient = document.getElementById('delete__client-popup'),
    btnAddClientClose = document.getElementById('btn-close-add'),
    btnChangeClientClose = document.getElementById('btn-close-change'),
    btnDeleteClientClose = document.getElementById('btn-close-delete'),
    addClientBtnCancel = document.getElementById('form-cancel'),
    changeClientBtnCancel = document.getElementById('change-form-cancel'),
    deleteClientBtnCancel = document.getElementById('delete__client-cancel'),
    addClientForm = document.getElementById('add__client-form'),
    changeClientForm = document.getElementById('change__client-form'),
    formContactWrapper = document.getElementById('form__contact__wrapper'),
    formContactWrapperChangeField = document.getElementById('change-form__contact__wrapper'),
    addClientSubmitBtn = document.getElementById('add__client-submit-btn'),
    changeClientSubmitBtn = document.getElementById('change__client-submit-btn'),
    addInputSurname = document.getElementById('add__client-surname'),
    addInputSurnameChangeField = document.getElementById('change__client-surname'),
    addInputName = document.getElementById('add__client-name'),
    addInputNameChangeField = document.getElementById('change__client-name'),
    addInputLastname = document.getElementById('add__client-lastname'),
    addInputLastnameChangeField = document.getElementById('change__client-lastname'),
    addContactBtn = document.getElementById('add__client_add_contact_btn'),
    addContactBtnChangeField = document.getElementById('change__client_add_contact_btn'),
    inputSurname = document.getElementById('box-surname'),
    inputSurnameChangeField = document.getElementById('change-box-surname'),
    inputName = document.getElementById('box-name'),
    inputNameChangeField = document.getElementById('change-box-name'),
    inputLastname = document.getElementById('box-lastname'),
    inputLastnameChangeField = document.getElementById('change-box-lastname'),
    deleteClientBtnDelete = document.getElementById('delete__client-delete-btn'),
    svgvk = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97312 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92644 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70111C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
    </svg>`,
    svgFbook = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
    </svg>`,
    svgtel = `<svg class="svgtel" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7">
    <circle cx="8" cy="8" r="8" fill="#9873FF"/>
    <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
    </g>
    </svg>`,
    svgMail = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
    </svg>`,
    svgPerson = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
    </svg>`,
    svgSixPlus = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7.5" stroke="#9873FF"/>
    <path d="M4.92969 8.52734H3.375V7.83203H4.92969V6.23828H5.63281V7.83203H7.19141V8.52734H5.63281V10.1133H4.92969V8.52734ZM7.9375 8.56641C7.9375 6.33203 8.84766 5.21484 10.668 5.21484C10.9544 5.21484 11.1966 5.23698 11.3945 5.28125V6.04688C11.1966 5.98958 10.9674 5.96094 10.707 5.96094C10.0951 5.96094 9.63542 6.125 9.32812 6.45312C9.02083 6.78125 8.85417 7.30729 8.82812 8.03125H8.875C8.9974 7.82031 9.16927 7.65755 9.39062 7.54297C9.61198 7.42578 9.8724 7.36719 10.1719 7.36719C10.6901 7.36719 11.0938 7.52604 11.3828 7.84375C11.6719 8.16146 11.8164 8.59245 11.8164 9.13672C11.8164 9.73568 11.6484 10.2096 11.3125 10.5586C10.9792 10.9049 10.5234 11.0781 9.94531 11.0781C9.53646 11.0781 9.18099 10.9805 8.87891 10.7852C8.57682 10.5872 8.34375 10.3008 8.17969 9.92578C8.01823 9.54818 7.9375 9.09505 7.9375 8.56641ZM9.92969 10.3203C10.2448 10.3203 10.487 10.2188 10.6562 10.0156C10.8281 9.8125 10.9141 9.52214 10.9141 9.14453C10.9141 8.81641 10.8333 8.55859 10.6719 8.37109C10.513 8.18359 10.2734 8.08984 9.95312 8.08984C9.75521 8.08984 9.57292 8.13281 9.40625 8.21875C9.23958 8.30208 9.10807 8.41797 9.01172 8.56641C8.91536 8.71224 8.86719 8.86198 8.86719 9.01562C8.86719 9.38281 8.96615 9.69271 9.16406 9.94531C9.36458 10.1953 9.61979 10.3203 9.92969 10.3203Z" fill="#333333"/>
    </svg>`

let checkServerData = await getServerData(),
    currentServerObjID = null

let clientContactsForServer = []

let arrClient = [],
    arrClientCopy = [...arrClient]

const contactsData = [
    {
        inputPlaceholder: "+972-xx-xxx-xx-xx",
        inputType: "tel",
        inputName: "tel",
        inputClass: "form__contact-input",
        inputID: "form__contact-input",
        buttonType: "button",
        buttonClass: "contact-box-btn",
        buttonID: "contact-box-btn",
    },
    {
        inputPlaceholder: "xxxxx@xxx.xxx",
        inputType: "email",
        inputName: "email",
        inputClass: "form__contact-input",
        inputID: "form__contact-input",
        buttonType: "button",
        buttonClass: "contact-box-btn",
        buttonID: "contact-box-btn",
    },
    {
        inputPlaceholder: "https://vk.com/xxxxx",
        inputType: "text",
        inputName: "vk",
        inputClass: "form__contact-input",
        inputID: "form__contact-input",
        buttonType: "button",
        buttonClass: "contact-box-btn",
        buttonID: "contact-box-btn",
    },
    {
        inputPlaceholder: "https://www.facebook.com/xxxxx",
        inputType: "text",
        inputName: "facebook",
        inputClass: "form__contact-input",
        inputID: "form__contact-input",
        buttonType: "button",
        buttonClass: "contact-box-btn",
        buttonID: "contact-box-btn",
    },
    {
        inputPlaceholder: "Enter contact details..",
        inputType: "text",
        inputName: "other",
        inputClass: "form__contact-input",
        inputID: "form__contact-input",
        buttonType: "button",
        buttonClass: "contact-box-btn",
        buttonID: "contact-box-btn",
    },
]
let contactID = 1,
    addClientContactID = 1,
    changeClientContactID = 1

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
async function deeAllServerData() {

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
            contacts: instanceClient._contacts
        })
    })

    const data = await response.json()
    // past this ID for next step... submit. Threr we need id for 
    // retern 'Server Obj' to instance Client & put it to array
    currentServerObjID = data.id

    return data
}
const allSelectorsMadeChoices = () => {
    const selectors = document.querySelectorAll('.form__contact_selector')
    selectors.forEach(selector => {
        const choices = new Choices(selector, {
            searchEnabled: false,
            searchChoices: false,
            itemSelectText: '',
            allowHTML: false
        })
    })
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
    const $clientOptions = document.createElement('div')
    const $clientOptionsChange = document.createElement('button')
    const $clientOptionsDelete = document.createElement('button')

    const contacts = instanceClient._contacts
    for (const contact of contacts) {

        const $clientContactsItem = document.createElement('li')

        switch (contact.type) {
            case 'tel': $clientContactsItem.innerHTML = svgtel
                break;
            case 'vk': $clientContactsItem.innerHTML = svgvk
                break;
            case 'email': $clientContactsItem.innerHTML = svgMail
                break;
            case 'facebook': $clientContactsItem.innerHTML = svgFbook
                break;
            default: $clientContactsItem.innerHTML = svgPerson
                break;
        }

        $clientContactsItem.classList.add('wrapper', 'contacts_svg')
        $clientContactsItem.setAttribute('data-tippy-content', `${contact.type}: ${contact.value}`)
        $clientContacts.append($clientContactsItem)
    }

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
    $clientContacts.classList.add('wrapper', 'table-contacts')
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

    $clientOptionsChange.addEventListener('click', async () => {
        const dataToBeChange = await getServerDataByID(instanceClient._id)
        console.log(dataToBeChange);

        popUpChangeClient.classList.add('open-popup')
        addInputNameChangeField.value = dataToBeChange.name
        addInputSurnameChangeField.value = dataToBeChange.surname
        addInputLastnameChangeField.value = dataToBeChange.lastName

        if (addInputNameChangeField.value) { inputNameChangeField.firstElementChild.classList.add('placeholder-up') }
        if (addInputSurnameChangeField.value) { inputSurnameChangeField.firstElementChild.classList.add('placeholder-up') }
        if (addInputLastnameChangeField.value) { inputLastnameChangeField.firstElementChild.classList.add('placeholder-up') }

        if (dataToBeChange.contacts[0]) {

            for (let contactObj = 0; contactObj < dataToBeChange.contacts.length; contactObj++) {

                const contactType = dataToBeChange.contacts[contactObj].type
                const contactValue = dataToBeChange.contacts[contactObj].value

                addContactOnClick(addContactBtnChangeField, formContactWrapperChangeField, changeClientContactID, contactType, contactValue)

                const formContactsList = document.querySelectorAll('#form__contact')

                for (const form of formContactsList) {
                    console.log(form);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                }

            }
        }
    })

    $clientCreating.append($clientDateCreating)
    $clientCreating.append($clientTimeCreating)
    $clientChanging.append($clientDateChange)
    $clientChanging.append($clientTimeChange)
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
function $contactInputDOM(inputName, text = '') {
    const $input = document.createElement('input'),
        $btn = document.createElement('button')
    let typeOfInput = 0

    switch (inputName) {
        case "tel": typeOfInput = 0
            break;
        case "email": typeOfInput = 1
            break;
        case "vk": typeOfInput = 2
            break;
        case "facebook": typeOfInput = 3
            break;
        case "other": typeOfInput = 4
            break;
        default: typeOfInput = 0
            break;
    }

    $input.placeholder = contactsData[typeOfInput].inputPlaceholder
    $input.type = contactsData[typeOfInput].inputType
    $input.name = contactsData[typeOfInput].inputName
    $input.classList.add(contactsData[typeOfInput].inputClass)
    $input.id = `${contactsData[typeOfInput].inputID}${contactID}`
    $input.value = text

    $btn.type = contactsData[typeOfInput].buttonType
    $btn.classList.add(contactsData[typeOfInput].buttonClass)
    $btn.id = `${contactsData[typeOfInput].buttonID}${contactID}`

    // remove [x]-BTN of client's table
    $btn.addEventListener('click', () => {

        if ($btn.closest('#add__client-form') == addClientForm) {
            $btn.parentNode.remove()
            addClientContactID--

            if (addClientContactID < 5) { addContactBtn.style.display = 'block' }
            // check if exist any contact field so add display = 'flex' to its wrapper
            const countOfContaktFields = document.querySelectorAll('.form__contact')
            if (countOfContaktFields.length > 0) {
                formContactWrapper.style.display = 'flex'
            } else {
                formContactWrapper.style.display = 'none'
            }
        }

        if ($btn.closest('#change__client-form') == changeClientForm) {
            $btn.parentNode.remove()
            changeClientContactID--

            if (changeClientContactID < 5) { addContactBtnChangeField.style.display = 'block' }
            // check if exist any contact field so add display = 'flex' to its wrapper
            const countOfContaktFields = document.querySelectorAll('.form__contact')
            if (countOfContaktFields.length > 0) {
                formContactWrapperChangeField.style.display = 'flex'
            } else {
                formContactWrapperChangeField.style.display = 'none'
            }
        }
    })

    return {
        $input,
        $btn
    }
}
function resetContactField() {
    contactID = 0
    addClientContactID = 0
    changeClientContactID = 0

    let countOfContaktFields = document.querySelectorAll('.form__contact')
    countOfContaktFields.forEach(form => {
        form.remove()
    })

    countOfContaktFields = document.querySelectorAll('.form__contact')

    if (countOfContaktFields.length > 0) {
        formContactWrapper.style.display = 'flex'
    } else {
        formContactWrapper.style.display = 'none'
    }

    const allForms = document.querySelectorAll('form')
    allForms.forEach(form => {
        form.reset()
    })
}
function $contactSelectorDOM(selectValue = "tel") {
    const $contactSelector = document.createElement('select'),
        $contactOption1 = document.createElement('option'),
        $contactOption2 = document.createElement('option'),
        $contactOption3 = document.createElement('option'),
        $contactOption4 = document.createElement('option'),
        $contactOption5 = document.createElement('option')

    $contactSelector.id = `form__contact_selector${contactID}`
    $contactSelector.classList.add("form__contact_selector")
    $contactSelector.name = "select"

    $contactOption1.textContent = "tel"
    $contactOption2.textContent = "other"
    $contactOption3.textContent = "email"
    $contactOption4.textContent = "vk"
    $contactOption5.textContent = "facebook"

    $contactOption1.value = "tel"
    $contactOption2.value = "other"
    $contactOption3.value = "email"
    $contactOption4.value = "vk"
    $contactOption5.value = "facebook"

    $contactSelector.append($contactOption1)
    $contactSelector.append($contactOption3)
    $contactSelector.append($contactOption4)
    $contactSelector.append($contactOption5)
    $contactSelector.append($contactOption2)

    $contactSelector.value = selectValue

    return $contactSelector
}
function $formContactDOM(selectorValue = 'tel', inputText = '') {
    const $selector = $contactSelectorDOM(selectorValue)
    const $inputField = $contactInputDOM(selectorValue, inputText)

    const $formContact = document.createElement('div')
    $formContact.classList.add('form__contact')
    $formContact.id = 'form__contact'


    $selector.addEventListener('change', () => {
        const apropriateInput = $contactInputDOM($selector.value)
        $formContact.removeChild($formContact.lastChild)
        $formContact.removeChild($formContact.lastChild)
        $formContact.append(apropriateInput.$input)
        $formContact.append(apropriateInput.$btn)
    })

    $formContact.append($selector)
    $formContact.append($inputField.$input)
    $formContact.append($inputField.$btn)
    //     $formContact.append($createAddContactInputBox())

    return $formContact
}
function addContactOnClick(btnOnClick, wrapperField, clientContactID, selectorValue, inputText = '') {

    const addContactChangeField = $formContactDOM(selectorValue, inputText)

    wrapperField.append(addContactChangeField)
    clientContactID += 1
    contactID += 1

    if (clientContactID > 3) { btnOnClick.style.display = 'none' }

    // check if exist any contact field so add display = 'flex' to its wrapper
    const countOfContaktFields = wrapperField.querySelectorAll('.form__contact')
    if (countOfContaktFields.length > 0) {
        wrapperField.style.display = 'flex'
    } else {
        wrapperField.style.display = 'none'
    }

    allSelectorsMadeChoices()
}
function $renderTable(arrClientCopy) {

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

// here we put  data from server to 'Copy Main Array'
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
$renderTable(arrClientCopy)

// Adding new client to server then it will be taken as Instance to Array Copy !!!!!!!!!!!!!!
addClientForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    // get TYPE & VALUE of contacts
    let contacts = document.querySelectorAll('.form__contact')
    for (const contact of contacts) {

        const temptObj = {
            type: contact.childNodes[1].name,
            value: contact.childNodes[1].value
        }

        clientContactsForServer.push(temptObj)
    }

    let newClient = new Client(
        addInputName.value.trim(),
        addInputSurname.value.trim(),
        addInputLastname.value.trim(),
        clientContactsForServer
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
        $renderTable(arrClientCopy)
        setTimeout(() => {
            popUpAddClient.classList.remove('open-popup')
        }, 200)
    }, 1500)

})

// BTN add contacts
addContactBtn.addEventListener('click', () => {
    addContactOnClick(addContactBtn, formContactWrapper, addClientContactID, 'tel')
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
    resetContactField()
})
addClientBtnCancel.addEventListener('click', () => {
    inputLastname.firstElementChild.classList.remove('placeholder-up')
    inputSurname.firstElementChild.classList.remove('placeholder-up')
    inputName.firstElementChild.classList.remove('placeholder-up')
    popUpAddClient.classList.remove('open-popup')
    resetContactField()
})
// add form listeners
popUpAddClient.addEventListener('click', (click) => {
    if (click.target == popUpAddClient) {
        inputLastname.firstElementChild.classList.remove('placeholder-up')
        inputSurname.firstElementChild.classList.remove('placeholder-up')
        inputName.firstElementChild.classList.remove('placeholder-up')
        popUpAddClient.classList.remove('open-popup')
        resetContactField()
    }
})
addContactBtnChangeField.addEventListener('click', () => {
    addContactOnClick(addContactBtnChangeField, formContactWrapperChangeField, changeClientContactID, 'tel')
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
        inputLastnameChangeField.firstElementChild.classList.remove('placeholder-up')
        inputSurnameChangeField.firstElementChild.classList.remove('placeholder-up')
        inputNameChangeField.firstElementChild.classList.remove('placeholder-up')
        popUpAddClient.classList.remove('open-popup')
        popUpChangeClient.classList.remove('open-popup')
        popUpDeleteClient.classList.remove('open-popup')
        resetContactField()
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

// change client
// buttons & work with pop-up windows (close, moving placeholders)
btnChangeClientClose.addEventListener('click', () => {
    inputLastnameChangeField.firstElementChild.classList.remove('placeholder-up')
    inputSurnameChangeField.firstElementChild.classList.remove('placeholder-up')
    inputNameChangeField.firstElementChild.classList.remove('placeholder-up')
    popUpChangeClient.classList.remove('open-popup')
    resetContactField()
})
changeClientBtnCancel.addEventListener('click', () => {
    inputLastnameChangeField.firstElementChild.classList.remove('placeholder-up')
    inputSurnameChangeField.firstElementChild.classList.remove('placeholder-up')
    inputNameChangeField.firstElementChild.classList.remove('placeholder-up')
    popUpChangeClient.classList.remove('open-popup')
    resetContactField()
})

// change form listeners
popUpChangeClient.addEventListener('click', (click) => {
    if (click.target == popUpChangeClient) {
        inputLastnameChangeField.firstElementChild.classList.remove('placeholder-up')
        inputSurnameChangeField.firstElementChild.classList.remove('placeholder-up')
        inputNameChangeField.firstElementChild.classList.remove('placeholder-up')
        popUpChangeClient.classList.remove('open-popup')
        resetContactField()
    }
})
inputLastnameChangeField.addEventListener('mouseover', () => {
    inputLastnameChangeField.firstElementChild.classList.add('placeholder-up')
    addInputLastnameChangeField.addEventListener('input', () => {
        inputLastnameChangeField.firstElementChild.classList.add('placeholder-up')
    })
})
inputSurnameChangeField.addEventListener('mouseover', () => {
    inputSurnameChangeField.firstElementChild.classList.add('placeholder-up')
    addInputSurnameChangeField.addEventListener('input', () => {
        inputSurnameChangeField.firstElementChild.classList.add('placeholder-up')
    })
})
inputNameChangeField.addEventListener('mouseover', () => {
    inputNameChangeField.firstElementChild.classList.add('placeholder-up')
    addInputNameChangeField.addEventListener('input', () => {
        inputNameChangeField.firstElementChild.classList.add('placeholder-up')
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

// tippy toltip
tippy('[data-tippy-content]', {
    theme: 'castom'
})

