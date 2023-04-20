export default

    // const client = {
    //     name: asString(data.name),
    //     surname: asString(data.surname),
    //     lastName: asString(data.lastName),
    //     contacts: Array.isArray(data.contacts) ? data.contacts.map(contact => ({
    //       type: asString(contact.type),
    //       value: asString(contact.value),
    //     })) : [],
    //   };

    class Client {

    constructor(name = 'name', surname = 'surname', lastname = 'lastname', contacts = [], id = 'id', createdAt = 'createdAt', updatedAt = 'updatedAt') {

        this._id = id
        this._createdAt = createdAt
        this._updatedAt = updatedAt
        this._name = name
        this._surname = surname
        this._lastname = lastname
        this._contacts = contacts
    }

    get date() {

        var today = date;
        var dd = today.getDate();
        var mm = today.getMonth() + 1;//January is 0!`

        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }
        var today = mm + '.' + dd + '.' + yyyy;

        return today
    }


}