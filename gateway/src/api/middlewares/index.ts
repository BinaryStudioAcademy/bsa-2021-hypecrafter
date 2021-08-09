import express, { Express, json } from "express";
import cors from "cors";
import Gateway from "micromq/gateway";
import { Project } from "hypecrafter-shared/enums";
import swaggerUI from "swagger-ui-express";
import { handleError } from "./error-handler";
import { logger } from "./logger";
import { authorization } from "./authorization";
import { Services } from "../../services";
import openApiDocumentation from "../../../openApiDocumentation.json";
import { env } from "../../env";
import { WHITE_ROUTES } from "./../../common/constants/whiteRouts";

export const initMiddlewares = (app: Express, _services: Services) => {
  const { rabbit } = env.app;
  const gateway = new Gateway({
    microservices: [Project.BACKEND, Project.PAYMENT, Project.NOTIFICATION],
    rabbit
  });

  app.use("/", authorization(WHITE_ROUTES));
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openApiDocumentation));
  app.use(cors());
  app.use(logger);
  app.use(json());
  app.use(express.urlencoded({ extended: true }));
  app.use(gateway.middleware());
  app.use(handleError);
};
