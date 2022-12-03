import { ConfigService } from "@nestjs/config"
import entities from "src"

export const getConfig = (configService: ConfigService) => {
  return {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    // sslmode: configService.get('SSL_MODE'),
    synchronize: true,
    entities: entities,
  }
}