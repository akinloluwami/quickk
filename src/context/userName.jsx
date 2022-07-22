//createApi text to userName
import { createContext, useState, useEffect } from "react";
import { fetchData } from "../utils/Request";

const UserNameContext = createContext();

//function for context
const UserNameProvider = ({ children }) => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    try {
      const response = fetchData("/dashboard/user/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        //get userName
        const userName = response?.data?.username;
        //set the username to state
        setUserName(userName);
        console.clear();
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    //now set pass userName publicly and call it anywhere in your app
    <UserNameContext.Provider value={userName}>
      {children}
    </UserNameContext.Provider>
  );
};

export { UserNameContext, UserNameProvider };
