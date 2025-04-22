import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVERPORT ?? 3000, '0.0.0.0', () => {
    console.log(`Servidor iniciado puerto: ${process.env.SERVERPORT}`);
  });
}
bootstrap();
