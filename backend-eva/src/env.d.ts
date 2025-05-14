declare namespace NodeJS {
  interface ProcessEnv {
    SERVERPORT: number;
    HOST: string;
    JWT_SECRET: string;
    AUTHORIZATIONLOGIN: string;
  }
}
