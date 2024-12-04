import axios from 'axios';
const USER_API = "http://localhost:8000/api/"
export const signup=async(user)=> {
return await axios.post(USER_API + "http://localhost:800/users/register",user);
}
export const signin=async(user)=> {
    return await axios.post(USER_API + "users/login", user);
}
export const logout=async()=> {
return await axios.post(USER_API+"logout");
}
export const profile=async()=> {

return await axios.get(USER_API+"/user-profile");
}