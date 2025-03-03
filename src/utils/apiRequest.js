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
      const response = await axios({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
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