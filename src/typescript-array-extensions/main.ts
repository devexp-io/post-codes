import {enableArrayExtensions} from "./array.extension";

export function testArrayExtensions() {

    enableArrayExtensions()

    let users = [
        {name: "Salvatore", surname: "Romeo", age: 34},
        {name: "Mario", surname: "Rossi", age: 30},
        {name: "Luca", surname: "Rossi", age: 30},
        {name: "Giuseppe", surname: "Ferri", age: 40},
        {name: "Giuseppe", surname: "Mauri", age: 40}
    ]

    let RossiUsers = users.filter(user => user.surname == "Rossi")
    RossiUsers = users.filterBy({surname: "Rossi"})

    let Giuseppe40Users = users.filterBy({name: "Giuseppe", age: 40})

    let sortedBySyrname = users.sortBy({name: "desc"})
}


