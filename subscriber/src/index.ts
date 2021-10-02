import dotenv from 'dotenv';
import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import routes from './routes/index';

const app = express();
app.use(json());
app.use(cors());

// create application/json parser
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

// Configure routes
app.use(routes);

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
