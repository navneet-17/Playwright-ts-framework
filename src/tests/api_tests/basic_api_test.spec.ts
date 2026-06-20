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

  responseStatus === 200 ? logger.success('API is working fine') 
                : logger.error('API is not working fine');

  const responseBody = await response.json();
//   console.log(responseBody);

  const firstUser = responseBody.data[0];
  console.log (firstUser);
  logger.info('The user details are: ' + JSON.stringify(firstUser));     
  const firstUserName = responseBody.data[0].first_name + ' ' + responseBody.data[0].last_name;
  expect (firstUserName).toBe('George Bluth');
  
  logger.error('Dummy failure statement to test the logger implementation');

}
)


