import { Camera } from "./model/Camera";

const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()



const cameraMapper = (camera) => {
  return {
    ...camera,
    confirmVotes: camera.confirmedDevices.length,
    denyVotes: camera.deniedDevices.length,
  }
}


const getAll = async (): Promise<Camera[]> => {
  const cameras = await database.Camera.findMany({
    include: { confirmedDevices: true, deniedDevices: true },
  });

  const mappedCameras = cameras.map((camera) => ({
    ...camera,
    confirmVotes: camera.confirmedDevices.length,
    denyVotes: camera.deniedDevices.length,
  }));


  return mappedCameras;
};

const createCamera = async(latitude,longitude, description, type) => {
  const camera = await database.Camera.create({
    include: { confirmedDevices: true, deniedDevices: true },
    data: {
      latitude: ""+latitude,
      longitude: ""+longitude,
      description: description,
      type: type
    }
});
}

const confirmCamera = async (camera, deviceId) => {
  try {
    const updatedCamera = await database.Camera.update({
      include: { confirmedDevices: true, deniedDevices: true },
      where: { 
        CameraId: camera.camera.CameraId
      },
      data: {

        confirmedDevices: {
          connect: {
            DeviceId: deviceId,
          },
        },
      },
    });
    return cameraMapper(updatedCamera);
  } catch (error) {
    console.error('Error updating camera:', error);
  }
};


const denyCamera = async (camera, deviceId) => {
  try {

    const updatedCamera = await database.Camera.update({
      include: { confirmedDevices: true, deniedDevices: true },
      where: { 
        CameraId: camera.camera.CameraId
      },
      data: {


        deniedDevices: {
          connect: {
            DeviceId: deviceId,
          },
        },
      },
    });
    return cameraMapper(updatedCamera);

  } catch (error) {
    console.error('Error updating camera:', error);
  }
};


const unconfirmCamera = async (camera, deviceId) => {
  try {

    const updatedCamera = await database.Camera.update({
      include: { confirmedDevices: true, deniedDevices: true },
      where: { 
        CameraId: camera.camera.CameraId
      },
      data: {

        confirmedDevices: {
          disconnect: {
            DeviceId: deviceId,
          },
        },
      },
      
    });
    return cameraMapper(updatedCamera);

  } catch (error) {
    console.error('Error updating camera:', error);
  }
};

const undenyCamera = async (camera, deviceId) => {
  try {

    const updatedCamera = await database.Camera.update({
      include: { confirmedDevices: true, deniedDevices: true },
      where: { 
        CameraId: camera.camera.CameraId
      },
      data: {
        deniedDevices: {
          disconnect: {
            DeviceId: deviceId,
          },
        },
      },
    });
    return cameraMapper(updatedCamera);

  } catch (error) {
    console.error('Error updating camera:', error);
  }
};

const removeCamera = async(camera) => {
  try {

    const res = await database.Camera.delete({
      include: { confirmedDevices: true, deniedDevices: true },
      where: { 
        CameraId: camera.CameraId
      },
    });
    return cameraMapper(res);

  } catch (error) {
    console.error('Error deleting camera:', error);
  }
}



const addDevice = async(deviceId) => {
  const device = await database.Device.create({
    data: {
      DeviceId: deviceId
    }
  });

  return device;
}

const CameraDB = {
    getAll,
    createCamera,
    confirmCamera,
    denyCamera,
    unconfirmCamera,
    undenyCamera,
    removeCamera,

    addDevice
}

export default CameraDB;
