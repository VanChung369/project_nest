declare namespace NodeJS {
  export interface ProcessEnv {
    TYPEORM_CONNECTION?: 'mysql' | 'mariadb';
    TYPEORM_HOST?: string;
    TYPEORM_USERNAME?: string;
    TYPEORM_PASSWORD?: string;
    TYPEORM_DATABASE?: string;
    TYPEORM_PORT?: number;
    REDIS_HOST?: string;
  }
}
