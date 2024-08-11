import { Page } from '@playwright/test';

type MockApiRouteOptions = {
    status?: number;
    body?: object;
}

export async function mockApiRoute(page: Page, urlPattern: string, options: MockApiRouteOptions = {}) {
    const { status = 200, body = {} } = options;
    await page.route(urlPattern, async route => {
        await route.fulfill({
            status,
            contentType: 'application/json',
            body: JSON.stringify(body),
        });
    });
}
