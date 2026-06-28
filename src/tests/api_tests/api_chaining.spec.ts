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
const endpoint = "https://reqres.in/api/users";
console.log('endpoint : ' + endpoint);
const createUserPayload = getJsonObject("api_test_data");
console.log('createUserPayload : ' + JSON.stringify(createUserPayload));

test.describe('VALIDATING API CHAINING', () => {
  test('POST create user API Test @smoke @regression', async ({request}) => {
    logger.info(`POST ${endpoint} with payload: \n ${JSON.stringify(createUserPayload)}`);
    let response = await request.post(`${endpoint}`, {headers, data: createUserPayload});
    let responseStatus = response.status();
    expect(responseStatus).toBe(201);
    logger.success('POST API Request Passed with status code 201');
    logger.info(`Response: \n ${JSON.stringify(await response.json())}`);
    let userId = (await response.json()).id;
    logger.info('User created successfully with id: ' + userId);
 
    console.log(" ***** GET REQUEST TO VERIFY USER CREATION ***** ");
    logger.info(`Fetching endpoint: ${endpoint}/1`);
    response = await request.get(`${endpoint}/1`, {
      headers: ApiConfig.API_HEADERS
    });
    responseStatus = response.status();
    expect(responseStatus).toBe(200);
    logger.success('GET API Request Passed with status code 200');    
  
    console.log(" ***** DELETE REQUEST TO DELETE the created user ***** ");
    console.log('userIdToDelete : ' + userId);
    const deleteEndpoint = `${endpoint}/${userId}`;
    logger.info('Deleting user with id: ' + userId);
    logger.info('deleteEndpoint : ' + deleteEndpoint);
    response = await request.delete(`${deleteEndpoint}`, {
      headers: ApiConfig.API_HEADERS
    });
    expect(response.status()).toBe(204);
    logger.success('DELETE API Request Passed with status code 204 \n ' +   
      'User with id ' + userId + ' was deleted successfully');    
    })
})