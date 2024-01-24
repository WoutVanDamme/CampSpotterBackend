import jwt from 'jsonwebtoken';


const getDeviceID = (req) => {
    const authHeader = req.headers.authorization;
        
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('unauth')
    }

    const token = authHeader.slice('Bearer '.length);

    const decodedToken = jwt.decode(token);
    
    const deviceId = decodedToken['deviceId'];
    return deviceId;
}


const Utils = {
    getDeviceID
}

export default Utils;