import {test, request, expect} from "@playwright/test"
import {createUserPayload} from "../../dataModels/userPayload"
import { CustomLogger } from "../../loggers/CustomLogger";
import { ApiConfig } from "../../config/ApiConfig";

const logger = CustomLogger.getInstance();

test.describe("API Tests for User Payload", () => {

    test("Test to validate the user payload structure", async ({request}) => {
        logger.info("Starting the test to validate user payload structure...");
        
        const user : createUserPayload = {
            name: "John Doe",
            job: "Software Engineer",
            email: "johndoe@example.com",
            skills: ["JavaScript", "TypeScript", "Playwright"],
            address: {
                "street": "123 Pune Main raod",
                "city": "Pune",
                "state": "Maharashtra",
                "zip": "411007"
            }
        };

        const response = await request.post(`${ApiConfig.API_ENDPOINT}`, {
            headers: ApiConfig.getHeaders(),
            data: user
        });

    const responseStatus = response.status();
    expect(responseStatus).toBe(201);  
    const responseBody = await response.json();
    console.log(responseBody);
    logger.info(responseBody.skills);
    logger.info(JSON.stringify(responseBody.address));

    console.log("User has below Skills:");
        
    for (const skill of responseBody.skills) {
        console.log("\t" + skill);
    }

    expect(responseBody.skills).toContain("Playwright");  
    expect(responseBody.address.city).toContain("Pune");  

    logger.success("User payload structure validated successfully!");

    })


})