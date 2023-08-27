const person: {
    name: string
    age: number
    surname: string
    address: { city: string, street: string }
} = {
    name: 'Vladilen',
    surname: 'Minin',
    age: 29,
    address: {
        city: 'moscow',
        street: 'lenina',
    },
}

function fullname(obj: { name: string; surname: string }): string {
    return obj.name + ' ' + obj.surname
}

console.log(fullname(person))