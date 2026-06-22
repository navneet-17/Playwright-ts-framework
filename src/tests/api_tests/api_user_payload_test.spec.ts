import { expect, test } from "@playwright/test";
import fs from "fs";
import path from "path";
import { ApiConfig } from "../../config/ApiConfig";

test('Post with external Json Payload', async  ({request}) => {
    const filePath = path.resolve(__dirname, '../../resources/testdata/testdata.json');
    const userData = JSON.parse(fs.readFileSync(filePath, 'utf-8')); 

    const response = await request.post(`${ApiConfig.API_ENDPOINT}`, {
        headers: ApiConfig.getHeaders(),
        data: userData
    });       
    
    const responseStatus = response.status();
    expect(responseStatus).toBe(201);  
    const responseBody = await response.json();
    console.log(responseBody);
})
