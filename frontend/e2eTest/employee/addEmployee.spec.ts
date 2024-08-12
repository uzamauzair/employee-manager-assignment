import { mockApiRoute } from "@/utils";
import { test, expect } from '@playwright/test';

test.describe('AddNotice', () => {
    test.beforeEach(async ({ page }) => {
        await mockApiRoute(page, '*/**/api/employee', {
            status: 201
        });
        await page.goto('/employee/add');
        await page.waitForLoadState('networkidle');
    });

    test('should render the form and submit new employee', async ({ page }) => {

        await page.getByPlaceholder('First Name of the Employee').fill('Usamaall');
        await page.getByPlaceholder('Last Name of the Employee').fill('Uzaair');

        await page.getByPlaceholder('Email of the Employee').fill('usama19026@gmail.com');
        await page.getByPlaceholder('Phone Number of the Employee').fill('0777609615');
        await page.click('button:has-text("Create")');

    });
});
