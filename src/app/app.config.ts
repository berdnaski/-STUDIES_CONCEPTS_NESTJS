import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  database: {
    type: process.env.DATABASE_TYPE as 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),
    synchronize: Boolean(process.env.SYNCHRONIZE),
  },
  environment: process.env.NODE_ENV || 'development',
}));
