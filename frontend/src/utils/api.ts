import { BACKEND_BASE_URL } from '@/config';
import axios from 'axios';

export const api = axios.create({
    baseURL: BACKEND_BASE_URL,
});
