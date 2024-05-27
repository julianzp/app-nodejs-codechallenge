import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    await app.listen(3002);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
