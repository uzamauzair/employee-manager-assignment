import { mockApiRoute } from "@/utils";
import { test, expect } from '@playwright/test';

test.describe('Edit Notice', () => {
    test.beforeEach(async ({ page }) => {
        await mockApiRoute(page, '*/**/api/employee', {
            status: 201
        });
        await page.goto('/employee/edit/66b8549edf6e5e2f54103ae1');
        await page.waitForLoadState('networkidle');
    });

    test('should render the form and submit updated employee', async ({ page }) => {

        await page.getByPlaceholder('First Name of the Employee').fill('Usamaall');
        await page.getByPlaceholder('Last Name of the Employee').fill('Uzaair');

        await page.getByPlaceholder('Email of the Employee').fill('ricky@gmail.com');
        await page.getByPlaceholder('Phone Number of the Employee').fill('0777609615');
        await page.click('button:has-text("Update")');

    });
});
