import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
    mongoUrl: process.env.MONGO_URL,
}));
