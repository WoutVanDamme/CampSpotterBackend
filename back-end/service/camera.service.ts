import CameraDB from "../domain/camera.database";
import { Camera } from "../domain/model/Camera";

const getAll = async (): Promise<Camera[]> => {
    const cameras = await CameraDB.getAll();
    return  cameras;
}

const createCamera = async (latitude,longitude, description, type) => {
    const cameras = await CameraDB.createCamera(latitude, longitude, description, type);
    return  cameras;
}

const confirmCamera = async (camera, deviceId) => {
    const res = await CameraDB.confirmCamera(camera, deviceId);
    return  res;
}

const denyCamera = async (camera, deviceId) => {
    const res = await CameraDB.denyCamera(camera, deviceId);
    return  res;
}

const unconfirmCamera = async (camera, deviceId) => {
    const res = await CameraDB.unconfirmCamera(camera, deviceId);
    return  res;
}

const undenyCamera = async (camera, deviceId) => {
    const res = await CameraDB.undenyCamera(camera, deviceId);
    return  res;
}

const removeCamera = async (camera) => {
    return await CameraDB.removeCamera(camera);
}


const addDevice = async (deviceId) => {
    return await CameraDB.addDevice(deviceId);
}


const CameraService = {
    getAll,
    createCamera,
    confirmCamera,
    unconfirmCamera,
    undenyCamera,
    denyCamera,
    removeCamera,

    addDevice
}

export default CameraService;