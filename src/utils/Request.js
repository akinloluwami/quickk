import axios from "axios";

//add the default url
let defaultUrl = import.meta.env.VITE_APP_BACKEND_URL;

const postData = async (url, payload, configurations) => {
  try {
    const response = await axios.post(
      `${defaultUrl}${url}`,
      payload,
      configurations
    );
    return response;
    //if the endpoint has data that is returned, return the data as response.data
  } catch (error) {
    const err = error.response;

    //if the endpoint has data that is return, now you will need to
    //return error.response.data.message
    //this will make axios automatically detect the error and display the message
    return error;
  }
};

//function to fetch data
const fetchData = async (url, payload) => {
  try {
    const response = await axios.get(`${defaultUrl}${url}`, payload);
    return response;
    //this return response is what you will use in your function to get the datas
  } catch (error) {
    const err = error.response;
    return error;
  }
};

const deleteData = async (url, payload) => {
  try {
    const response = await axios.delete(`${defaultUrl}${url}`, payload);
    return response;
    //this return response is what you will use in your function to get the datas
  } catch (error) {
    const err = error.response;
    return error;
  }
};

export { postData, fetchData, deleteData };
