import client from "./client";

export function addUser(user) {
    return client.post('/api/user/addUser', {
        email: user.email,
        name: user.name,
        contactNo: user.contactNo,
        password: user.password,
        passwordConfirm: user.password
    });
}

export function getStaff() {
    return client.get('/api/users/staff');
}

export function deleteUser(name) {
    return client.patch(`/api/users/delete/${name}`);
}
export function getMe() {
    return client.get('/api/users/me');
}

export function updateMe(data) {
    return client.patch(`/users/updateMe`, data);
}

export const fetchDashticks = async () => {
    
    try{
        return  await client.get(`api/users/dashtics`);
    } catch(error){

        console.log('error', error.message);

    }
    

}

const AllServices = {
    addUser,
    getStaff,
    getMe,
    updateMe,
}
export default AllServices;
