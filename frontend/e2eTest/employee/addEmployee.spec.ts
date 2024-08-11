import { mockApiRoute } from "@/utils";
import { test, expect } from '@playwright/test';

test.describe('AddNotice', () => {
    test.beforeEach(async ({ page }) => {
        await mockApiRoute(page, '*/**/api/employee', {
            status: 201
        });
        await page.goto('/employee/list');
        await page.waitForLoadState('networkidle');
    });

    test('should render the form and submit new employee', async ({ page }) => {

        await page.waitForTimeout(10000);
        // Explicitly wait for the button to be available
        const addEmployeeButton = page.locator('text=Add Employee');
        await addEmployeeButton.waitFor({ state: 'visible', timeout: 50000 });

        // Click the "Add Employee" button and wait for the navigation
        await Promise.all([
            page.waitForURL('/employee/add'),
            addEmployeeButton.click()
        ]);

        await page.getByPlaceholder('First Name of the Employee').fill('Usamaa');
        await page.getByPlaceholder('Last Name of the Employee').fill('Uzaair');

        await page.getByPlaceholder('Email of the Employee').fill('usama19026@gmail.com');
        await page.getByPlaceholder('Phone Number of the Employee').fill('0777609615');

        // Select gender from the dropdown
        await page.click('button:has-text("Select Gender")');
        await page.click('text=Male');

        await page.click('button[type="submit"]');
    });
});
