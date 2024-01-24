import AuthDB from "../domain/auth.database";


const isRegistered = async (devid) => {
    const res =  await AuthDB.isRegistered(devid);
    if(res === null) return false;
    return true;
}

const AuthService = {
    isRegistered

}

export default AuthService;