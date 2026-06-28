import {test, request, APIRequestContext, expect } from '@playwright/test' 
import { ApiConfig } from '../../config/ApiConfig';
interface User{
    name : string ;
    job : string;
}
// Shared request context
let apiContext : APIRequestContext
test.beforeAll(async({playwright}) => {
  apiContext = await playwright.request.newContext({
    baseURL: 'https://reqres.in',
    extraHTTPHeaders: ApiConfig.API_HEADERS
  })  
})
test.afterAll(async () => {
    await apiContext.dispose();
})
test('create user and validate the response', async({page}) => {
    const user: User = {name: 'Jose', job: 'The Special One' }
    const postResponse = await apiContext.post('/api/users', 
        {
            data: user
        })
    expect (postResponse.status()).toBe(201);
    const createdUser = await postResponse.json();
    console.log("Post Response ", createdUser);
})