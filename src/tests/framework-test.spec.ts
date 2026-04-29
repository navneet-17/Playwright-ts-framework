import { test } from '@playwright/test';

test ('check record data type implementation', async()=>{
    const user: Record<string, any> = {
        name : 'Navneet',
        age : 35
    }

    console.log(user)
    console.log(user.name)
    console.log(user.age)

    console.log("**using for loop to iterate over the record-set**");
    for(const key in user){
        console.log(`${key}: ${user[key]}!`)
    }

});
