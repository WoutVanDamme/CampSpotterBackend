
import express, { Request, Response, Router} from 'express';
import CameraService from '../service/camera.service';
import Utils from '../util/index'

const cameraRouter = express.Router();


cameraRouter.get('/getAll', async (req: Request, res: Response) => {

    try {



        const cams = await CameraService.getAll();
        res.status(200).json(cams);
    }catch(error) {
        res.status(401).json({status: 'unauth', errorMessage: error.message});
    }
});


cameraRouter.post('/create', async (req: Request, res: Response) => {
    
    try {
        console.log('req body: ', req.body);
        const {cameraCoords, description, type} = req.body;

        const cams = await CameraService.createCamera(cameraCoords.latitude, cameraCoords.longitude, description, type.toUpperCase());
        res.status(200).json(cams);
    }catch(error) {
        console.log(error.message);
        res.status(401).json({status: 'unauth', errorMessage: error.message});
    }

});


cameraRouter.put('/confirm', async (req: Request, res: Response) => {
    
    try {
        const cam = req.body;

        const deviceId = Utils.getDeviceID(req);

        const result = await CameraService.confirmCamera(cam, deviceId);
        res.status(200).json(result);

    }catch(error) {
        res.status(401).json({status: 'unauth', errorMessage: error.message});
    }
});


cameraRouter.put('/deny', async (req: Request, res: Response) => {
    
    try {
        const cam = req.body;
        const deviceId = Utils.getDeviceID(req);
        const result = await CameraService.denyCamera(cam, deviceId);


        if(result.confirmVotes+result.denyVotes >= 10 && result.confirmVotes/result.denyVotes < (1/3.0)) {
            // remove camera
            await CameraService.removeCamera(result);
        }

        res.status(200).json(result);
        
    }catch(error) {
        res.status(401).json({status: 'unauth', errorMessage: error.message});
    }
});



cameraRouter.delete('/unconfirm', async (req: Request, res: Response) => {
    try {
      const cam = req.body;

      const deviceId = Utils.getDeviceID(req);
      const result = await CameraService.unconfirmCamera(cam, deviceId);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ status: 'unauth', errorMessage: error.message });
    }
  });
  
  cameraRouter.delete('/undeny', async (req: Request, res: Response) => {
    try {
      const cam = req.body;

      const deviceId = Utils.getDeviceID(req);
      const result = await CameraService.undenyCamera(cam, deviceId);
  
      if (result.confirmVotes / result.denyVotes < 1 / 3) {
        // remove camera
        await CameraService.removeCamera(result);
      }
  
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ status: 'unauth', errorMessage: error.message });
    }
  });


module.exports = cameraRouter;