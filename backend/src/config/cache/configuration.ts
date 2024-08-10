import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
    cacheItems: process.env.CACHE_ITEMS,
    cacheTTL: process.env.CACHE_TTL,
}));
