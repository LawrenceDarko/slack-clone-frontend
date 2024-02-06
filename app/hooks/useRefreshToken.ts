import axios from "axios"
import { useAuthContext } from "../context/AuthContext";

const useRefreshToken = () => {
const { setAuth } = useAuthContext()
  const refresh = async() => {
    const response = await axios.get('http://localhost:8000/refresh', {
      withCredentials: true
    })
    setAuth((prev: any) => {
      return {...prev, accessToken: response.data.newAccessToken}
    })
    // console.log(response.data.newAccessToken)
    return response.data.newAccessToken
  }
  return refresh 
};

export default useRefreshToken