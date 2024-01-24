const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()



const isRegistered = async (devid) => {
    const cameras = await database.Device.findUnique({
        where: { 
            DeviceId: devid
          },
    });
    return cameras;
};
  



const AuthDB = {
    isRegistered,
};

export default AuthDB;
