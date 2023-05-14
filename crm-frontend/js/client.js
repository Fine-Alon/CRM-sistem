export default
    class Client {

    constructor(name, surname, lastname = 'lastname', contacts = [], id = 'id', createdAt = 'createdAt', updatedAt = 'updatedAt') {

        this._name = name
        this._surname = surname
        this._lastname = lastname
        this._contacts = contacts
        this._id = id
        this._createdAt = createdAt
        this._updatedAt = updatedAt
    }

    get createdDate() {

        let today = new Date(Date.parse(this._createdAt))
        let dd = today.getDate()
        let mm = today.getMonth() + 1;//January is 0!`

        const yyyy = today.getFullYear()
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }

        return `${mm}.${dd}.${yyyy}`
        
    }

    get createdTime() {

        let today = new Date(Date.parse(this._createdAt))
        const hours = today.getUTCHours().toString().padStart(2, '0')
        const minuts = today.getUTCMinutes().toString().padStart(2, '0')

        return `${hours}:${minuts}`
    }
    get updatedDate() {

        let today = new Date(Date.parse(this._updatedAt))
        let dd = today.getDate()
        let mm = today.getMonth() + 1;//January is 0!`

        const yyyy = today.getFullYear()
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }

        return mm + '.' + dd + '.' + yyyy
    }

    get updatedTime() {

        let today = new Date(Date.parse(this._updatedAt))
        const hours = today.getUTCHours().toString().padStart(2, '0')
        const minuts = today.getUTCMinutes().toString().padStart(2, '0')

        return `${hours}:${minuts}`
    }

}