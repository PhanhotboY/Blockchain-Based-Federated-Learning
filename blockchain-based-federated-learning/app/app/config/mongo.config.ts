const env = import.meta.env;

interface MongodbConfig {
  dbHost: string;
  dbPort: string;
  dbName: string;
  dbUser: string;
  dbPwd: string;
}

const mongodbConfigEnv: Record<"development" | "production", MongodbConfig> = {
  development: {
    dbHost: env.VITE_DEV_DB_HOST as string,
    dbPort: env.VITE_DEV_DB_PORT as string,
    dbName: env.VITE_DEV_DB_NAME as string,
    dbUser: env.VITE_DEV_DB_USER as string,
    dbPwd: env.VITE_DEV_DB_PWD as string,
  },
  production: {
    dbHost: env.VITE_PRO_DB_HOST as string,
    dbPort: env.VITE_PRO_DB_PORT as string,
    dbName: env.VITE_PRO_DB_NAME as string,
    dbUser: env.VITE_DEV_DB_USER as string,
    dbPwd: env.VITE_DEV_DB_PWD as string,
  },
};

export const mongodbConfig: MongodbConfig =
  mongodbConfigEnv[env.VITE_NODE_ENV as "development" | "production"] ||
  mongodbConfigEnv.development;
