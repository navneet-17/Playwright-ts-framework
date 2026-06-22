import {test, request, expect} from "@playwright/test"
import { CustomLogger } from "../../loggers/CustomLogger";
import {UserDataProvider} from "../../designPatterns/factories/UserDataProvider"
import { ApiConfig } from "../../config/ApiConfig";

const logger = CustomLogger.getInstance();
const header = ApiConfig.getHeaders();
const apiEndpoint = ApiConfig.API_ENDPOINT;

test.describe("API Tests - Using Data Provider", () => {

  test("Test all SDET users", async ({ request }) => {
    const sdetUsers = UserDataProvider.getUsersByRole("sdet");

    for (const user of sdetUsers) {
      const response = await request.post(`${apiEndpoint}`, { 
            headers: header,
            data: user });
      expect(response.status()).toBe(201);
      console.log(" 'SDET' User Response: ", await response.json());
    }
  });

  test("Test specific user by name", async ({ request }) => {
    const navneet = UserDataProvider.getUserByName("navneet_shree");
      const response = await request.post(`${apiEndpoint}`, {
            headers: header,
            data: navneet });
      expect(response.status()).toBe(201);
      console.log("Response for 'navneet_shree': ", await response.json());
  });

  test("Random user test", async ({ request }) => {
    const randomUser = UserDataProvider.getRandomUser();
    const response = await request.post(`${apiEndpoint}`, {
            headers: header,
            data: randomUser 
        });
    expect(response.status()).toBe(201);
    console.log("Random User Response: ", await response.json());

    })
})