import * as request from 'supertest';
import { TestSetup } from './testSetup.helper';
export const verifyDataAgainstDTO = (data: any, dto: any) => {
    Object.keys(dto).forEach((key) => {
        if (dto[key] instanceof Date) {
            expect(new Date(data[key]).toISOString()).toEqual(dto[key].toISOString());
        } else {
            expect(data[key]).toEqual(dto[key]);
        }
    });
};

export const postRequest = async <T>(
    testSetup: TestSetup<T>,
    url: string,
    dto: any,
    headers: Record<string, string> = {},
) => {
    const req = request(testSetup.getHttpServer()).post(url).send(dto);
    for (const [key, value] of Object.entries(headers)) {
        req.set(key, value);
    }

    return await req;
};

export const getRequest = async <T>(
    testSetup: TestSetup<T>,
    url: string,
    query = {},
    headers: Record<string, string> = {},
) => {
    const req = request(testSetup.getHttpServer()).get(url).query(query);
    for (const [key, value] of Object.entries(headers)) {
        req.set(key, value);
    }
    return await req;
};

export const patchRequest = async <T>(
    testSetup: TestSetup<T>,
    url: string,
    dto: any,
    headers: Record<string, string> = {},
) => {
    const req = request(testSetup.getHttpServer()).patch(url).send(dto);
    for (const [key, value] of Object.entries(headers)) {
        req.set(key, value);
    }
    return await req;
};

export const deleteRequest = async <T>(
    testSetup: TestSetup<T>,
    url: string,
    headers: Record<string, string> = {},
) => {
    const req = request(testSetup.getHttpServer()).delete(url);
    for (const [key, value] of Object.entries(headers)) {
        req.set(key, value);
    }
    return await req;
};

export const verifyErrorResponse = (response, status, message) => {
    expect(response.status).toBe(status);
    expect(response.body.message).toContain(message);
};
