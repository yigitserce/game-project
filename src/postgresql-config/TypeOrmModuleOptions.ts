import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { postgresqlConfig } from "./postgresql.config";

export const typeOrmModuleOptions:TypeOrmModuleOptions = {
  type: 'postgres',
  host: postgresqlConfig.host,
  port: postgresqlConfig.port,
  username: postgresqlConfig.user,
  password: postgresqlConfig.password,
  database: postgresqlConfig.database,
  autoLoadEntities: true,
  synchronize: true,
};