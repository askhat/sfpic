import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    jwt({
      secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
      }),
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ["RS256"]
    })
  );

  await app.listen(3000);
}
bootstrap();
