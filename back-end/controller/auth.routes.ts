
import express, {NextFunction, Request, Response, Router} from 'express';
import AuthService from '../service/auth.service';
import jwt from 'jsonwebtoken';
import CameraService from '../service/camera.service';


const authRouter = express.Router();


const captchas = [{image: 'captcha1.png', answer: 'coffee is a soup'}, {image: 'captcha2.png', answer: '51515'}];

var openCaptchas = {};



const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }



  
const jwtSecret = process.env.JWT_SECRET;

const generateJwtToken = (deviceId: string): string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'whatt'};

    try{
        return jwt.sign({deviceId}, jwtSecret, options);
    } catch (error){
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.')
    }
}




authRouter.post('/login', async (req: Request, res: Response) => {
    console.log('run login');
    try {
        console.log('LOGIN: req body: ', req.body);
        const {deviceId} = req.body;
        
        const isRegistered = await AuthService.isRegistered(deviceId);

        if(isRegistered) {
            // give jwt token
            console.log('give jwt token')
            res.status(200).json({token: generateJwtToken(deviceId)})
        } else {
            // give image
            
            const selectedCaptcha =  getRandomInt(0, captchas.length-1);

            openCaptchas[deviceId] = selectedCaptcha;

            console.log('give image = ', selectedCaptcha);
            res.status(200).json({image: captchas[selectedCaptcha].image});
        }

    }catch(error) {
        console.log(error.message);
        res.status(401).json({status: 'unauth', errorMessage: error.message});
    }

});






authRouter.post('/checkCaptcha', async (req: Request, res: Response) => {
    console.log('open: ', openCaptchas);
    try {
        console.log('CHECKCAPTCHA: req body: ', req.body);
        const {deviceId, answer} = req.body;

        if (captchas[openCaptchas[deviceId]].answer.toUpperCase() === answer.toUpperCase()) {
            delete openCaptchas[deviceId];
            // give token

            const result = await CameraService.addDevice(deviceId);

            res.status(200).json({token: generateJwtToken(deviceId)})
        }
        else {
            res.status(400).json({token: 'incorrect'})

        }
        
    }catch(error) {
        console.log(error.message);
        res.status(401).json({status: 'unauth', errorMessage: error.message});
    }

});


module.exports = authRouter;