import { config } from 'better-sql';

config.url = process.env.DATABASE_URL;

export default config;
