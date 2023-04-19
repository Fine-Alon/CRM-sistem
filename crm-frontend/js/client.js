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


}