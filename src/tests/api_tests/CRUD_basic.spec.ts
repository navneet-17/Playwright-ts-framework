import { test, expect} from '@playwright/test';
import { CustomLogger } from '../../loggers/CustomLogger';
const logger = CustomLogger.getInstance();
// Things implemented in this test:
/*  1. API GET request using Playwright's request object 
    2. Custom Logger implementation to log the API response and status
    3. Assertion to verify the API response status and user details
    4. Error handling and logging for failed API requests
*/
test('GET users API Test @smoke @regression', async  ({request}) => {
  const response = await request.get('https://reqres.in/api/users',{
    headers:{
        'content-type': 'application/json',
        'x-api-key': 'free_user_3F7x5FGcq1mftvzmk3OJl7hAqgR'
    }
  }
  );
  const responseStatus = response.status();
  expect(responseStatus).toBe(200);
  const responseBody = await response.json();
//   console.log(responseBody);
  const firstUser = responseBody.data[0];
  console.log (firstUser);
}
)

test('DELETE users API Test @smoke @regression', async  ({request}) => {
  const response = await request.delete('https://reqres.in/api/users/2',{
    headers:{
        'content-type': 'application/json',
        'x-api-key': 'free_user_3F7x5FGcq1mftvzmk3OJl7hAqgR'
    }
  }
  );
  const responseStatus = response.status();
  expect(responseStatus).toBe(204);  
})

test('POST users API Test @smoke @regression', async  ({request}) => {
  const response = await request.post('https://reqres.in/api/users',{
    headers:{
        'content-type': 'application/json',
        'x-api-key': 'free_user_3F7x5FGcq1mftvzmk3OJl7hAqgR'
    },
    data:{
      "username": "navneet_shree",
      "email": "navneet.shree@reqres.in",
      "password": "nav_password"
    }
  }
  );
  const responseStatus = response.status();
  logger.info (`POST API Response Status: ${responseStatus}`);
  expect(responseStatus).toBe(201);  
  const responseBody = await response.json();
  console.log(responseBody);
})

test('PUT users API Test @smoke @regression', async  ({request}) => {
  const response = await request.put('https://reqres.in/api/users/61',{
    headers:{
        'content-type': 'application/json',
        'x-api-key': 'free_user_3F7x5FGcq1mftvzmk3OJl7hAqgR'
    },
    data:{
            "email": "navneet_shree@reqres.in"    
    }
  }
  );
  const responseStatus = response.status();
  logger.info (`PUT API Response Status: ${responseStatus}`);
  expect(responseStatus).toBe(200);  
  const responseBody = await response.json();
  console.log(responseBody);
  logger.info (`Verifying updated email in response: "navneet_shree@reqres.in"`);
  expect(responseBody.email).toBe("navneet_shree@reqres.in");

})