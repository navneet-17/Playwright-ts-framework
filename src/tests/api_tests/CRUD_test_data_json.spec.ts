import { test, expect} from '@playwright/test';
import { CustomLogger } from '../../loggers/CustomLogger';
import { getJsonObject } from '../../utils/TestDataReader';
import { ApiConfig } from "../../config/ApiConfig";
import * as dotenv from 'dotenv';
// ✅ Load .env file
dotenv.config();
const logger = CustomLogger.getInstance();
// ✅ Get API key from environment variable
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error('API_KEY not found in .env file');
}
// ✅ Fetch, destructure test data and define the constants for API testing
const headers = {
  'content-type': 'application/json',
  'x-api-key': API_KEY 
};
const endpoint = ApiConfig.API_ENDPOINT;
const createUserPayload = getJsonObject("api_test_data");
console.log('createUserPayload : ' + JSON.stringify(createUserPayload));
const oldUserEmail = "navneet.shree@reqres.in";
const updateUserEmail = "navneet_shree@reqres.in";

test.describe('CRUD API Tests using test data.json file', () => {
  test('GET users API Test @smoke @regression', async  ({request}) => {
    logger.info(`Fetching endpoint: ${endpoint}`);
    const response = await request.get(`${endpoint}`, {headers});
    const responseStatus = response.status();
    expect(responseStatus).toBe(200);
    logger.success('GET API Request Passed with status code 200');
  });

  test('POST create user API Test @smoke @regression', async ({request}) => {
    logger.info(`POST ${endpoint} with payload: \n ${JSON.stringify(createUserPayload)}`);
    const response = await request.post(`${endpoint}`, {headers, data: createUserPayload});
    const responseStatus = response.status();
    expect(responseStatus).toBe(201);
    logger.success('POST API Request Passed with status code 201');
    logger.info(`Response: \n ${JSON.stringify(await response.json())}`);
    const userId = (await response.json()).id;
    logger.info('User created successfully with id: ' + userId);
  })

  test('PUT update user API Test @smoke @regression', async({request}) =>{
    const userIdToUpdate = 1; // Assuming we want to update user with id 1
    const updateEndpoint = `${endpoint}/${userIdToUpdate}`;
    logger.info('updateEndpoint : ' + updateEndpoint);
    logger.info ("Updating useremail with id: " + userIdToUpdate +
       " from existing email: '" + oldUserEmail + "' to new email: '" + updateUserEmail + "'");
    logger.info(`PUT ${updateEndpoint} with payload: \n ${JSON.stringify(updateUserEmail)}`);
    const response = await request.put(updateEndpoint, {headers,       data: {
        update_user_email: updateUserEmail  
      }});
    const responseStatus = response.status();
    expect(responseStatus).toBe(200);
    logger.success('PUT API Request Passed with status code 200');
    logger.info(`Response: \n ${JSON.stringify(await response.json())}`);
    expect((await response.json()).update_user_email).toBe(updateUserEmail);
    logger.success('Email updated successfully in the response');
  })

  test('DELETE user API Test @smoke @regression', async({request}) =>{
    const userIdToDelete = 1;
    const deleteEndpoint = `${endpoint}/${userIdToDelete}`;
    logger.info('deleteEndpoint : ' + deleteEndpoint);
    logger.info('Deleting user with id: ' + userIdToDelete);
    const response = await request.delete(deleteEndpoint, {headers});
    const responseStatus = response.status();
    expect(responseStatus).toBe(204);
    logger.success('DELETE API Request Passed with status code 204 \n ' +   
      'User with id ' + userIdToDelete + ' was deleted successfully');    
  })
})