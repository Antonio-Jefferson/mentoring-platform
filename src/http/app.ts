import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDb, disconnectDB } from '../config/database';
import routes from '../routes';
import { handleApplicationErrors } from '../middlewares/errorHandlingMiddleware';
import swaggerDocs from './swagger.json';
const app = express();


dotenv.config();


app
  .use(cors())
  .use(express.json())
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  .use(routes)
  .use(handleApplicationErrors);

  export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
  }

  export async function close(): Promise<void> {
    await disconnectDB();
  }

export default app;