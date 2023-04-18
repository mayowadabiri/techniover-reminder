require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import sequelize from 'db';
import Reminder from 'models/reminder';
import helmet from 'helmet';
import cors from 'cors';
import routes from 'route';
import { NotAllowedError } from 'utils/error';
const app = express();

express.urlencoded({ extended: false });
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(routes);

app.use((req, res, next) => {
  throw new NotAllowedError(
    'Deleting or modifying reminder for any id value is not allowed'
  );
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status || 500;
  const message =
    statusCode === 500
      ? 'There was an error processing the request, please try again'
      : error.message;

  return res.status(statusCode).json({
    message,
    status: false,
    data: null,
  });
});

sequelize
  .authenticate()
  .then(async () => {
    await Reminder.sync({ alter: true });
    console.log('Database connected');
    app.listen(process.env.PORT, () => {
      console.log('listening on port ' + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log('error: ' + error);
  });
