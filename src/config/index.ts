import { registerAs } from '@nestjs/config';

export const config = registerAs('app', () => ({
  PORT: process.env.PORT,
  DB_PORT: parseInt(process.env.DB_PORT),
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USERNAME: process.env.DB_USERNAME,
  SWAGGER_PASSWORD: process.env.SWAGGER_PASSWORD,
  JSON_WEB_TOKEN_SECRET_KEY: process.env.JSON_WEB_TOKEN_SECRET_KEY,
  STATIC_JSON_WEB_TOKEN_SECRET_KEY: process.env.STATIC_JSON_WEB_TOKEN_SECRET_KEY,
}));

export const validateEnvironmentVariables = (
  envConfig: Record<string, unknown>,
): Record<string, any> => {
  const requiredVariables = [
    'PORT',
    'DB_PORT',
    'DB_HOST',
    'DB_NAME',
    'DB_PASSWORD',
    'DB_USERNAME',
    'SWAGGER_PASSWORD',
    'JSON_WEB_TOKEN_SECRET_KEY',
    'STATIC_JSON_WEB_TOKEN_SECRET_KEY',
  ];

  for (const variable of requiredVariables) {
    if (envConfig[variable] === undefined || envConfig[variable] === null) {
      throw new Error(
        `Missing or empty required environment variable: ${variable}`,
      );
    }
  }

  // Return the validated config object
  return envConfig as Record<string, any>;
};
