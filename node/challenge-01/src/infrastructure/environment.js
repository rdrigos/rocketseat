import environment from 'env-var';

export const env = {
  // Application
  NAME: environment.get('NAME').required().asString(),
  DESC: environment.get('DESC').required().asString(),
  HOST: environment.get('HOST').required().asString(),
  PORT: environment.get('PORT').required().asPortNumber(),

  // Databse
  DATABASE_NAME: environment.get('DATABASE_NAME').required().asString(),
};
