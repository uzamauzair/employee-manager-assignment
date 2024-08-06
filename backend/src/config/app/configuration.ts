import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    apiKey: process.env.APP_API_KEY,
    env: process.env.APP_ENV,
    name: process.env.APP_NAME,
    origins: process.env.APP_ORIGINS,
    port: process.env.APP_PORT,
    throttleLimit: process.env.THROTTLE_LIMIT,
    throttleTTL: process.env.THROTTLE_TTL,
    url: process.env.APP_URL,
    version: process.env.APP_VERSION,
}));
