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
        jwksUri: "https://dev-7h6ae2vd.auth0.com/.well-known/jwks.json"
      }),
      issuer: "https://dev-7h6ae2vd.auth0.com/",
      algorithms: ["RS256"]
    })
  );

  await app.listen(3000);
}
bootstrap();
