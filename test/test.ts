const Model = require('../src/db');

async function create(data : typeof Model) {
    const user = await data.save(data)
    return user;
}

describe("User API",()=> {   
   
    test("Create User",()=> {
        let data = new Model({
            userId : 1,
            name : "Aiswarya",
            emailId :"iceratan@gmail.com",
            dob : "26/11/1990"
        });
    })
})