import { expect, test } from '@playwright/test';
import { getTestData } from '../utils/TestDataReader';

test('get started link',async({page})=>{
    const url= getTestData ("base_url")
    await page.goto(url);
    //Click on the get started link
    await page.getByRole('link', {name:'Get started'}).click();
    //Expect page to have a heading woth the name of Installation
    await expect(page.getByRole('heading', {name: 'Installation'}))
    .toBeVisible();
});