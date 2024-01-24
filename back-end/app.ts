import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { expressjwt } from 'express-jwt';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/status', (req, res) => {
    res.json({ message: 'CameraSpotter API is running...' });
});

const jwtSecret = process.env.JWT_SECRET;
app.use(
    expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }).unless({
      path: [/^\/api-docs\/.*/, '/auth/checkCaptcha', '/auth/login', '/status', '/images/.*'],
    })
  );

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Whatt API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

var camera = require('./controller/camera.routes');
var auth = require('./controller/auth.routes');
app.use('/cameras', camera);
app.use('/auth', auth);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: error.message });
    } else {
        next();
    }
});

app.listen(port || 3000, () => {
    console.log(`Courses API is running on port ${port}.`);
});
