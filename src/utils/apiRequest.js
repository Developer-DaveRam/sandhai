import axios from "axios";

const getToken = () =>{
    return localStorage.getItem("token")
}
const getBrowserToken =()=>{
    return localStorage.getItem("browser_token")
}




const apiRequest = async (method, url, data = {}) => {
    try {
      const token = getToken();
      const browser_token = getBrowserToken()

      console.log(token);
      console.log(browser_token);
      
      

      if (!token) {
        console.error("No token found in localStorage");
    }

    if (!browser_token) {
        console.error("No browser token found in localStorage");
    }

      const response = await axios({
        method,
        url,
        data,
        headers: {
          Authorization: `BEARER ${token}`,
          "X-Browser-Token": browser_token  , 
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  };
  
  export default apiRequest;