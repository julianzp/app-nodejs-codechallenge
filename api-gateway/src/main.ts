import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './apiGateway.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'apigateway-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
