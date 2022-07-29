import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import BarItems from "../../utils/BarContent";
import { MdOutlineDashboard } from "react-icons/md";
import React from "react";

const Sidebar = () => {
  let activeStyle = {
    backgroundColor: "#d8d8ff47",
    borderRadius: "0.5em",
    color: "#0031af",
  };

  let activeClassName = "underline";

  return (
    <>
      <Box px={"4em"} py="3em" overflowY={"scroll"} height="100vh">
        {/* Loop through items of bar contents  */}
        <UnorderedList
          listStyleType={"none"}
          display={"flex"}
          flexDir={"column"}
          gap={"3em"}
        >
          {BarItems.map((items, index) => {
            const { name, link, icon, hideDesktop, styles } = items;
            return (
              //check if hideDesktop is true
              <React.Fragment key={index}>
                {hideDesktop ? (
                  <>{/* dont display anything if its true */}</>
                ) : (
                  <NavLink
                    to={link}
                    key={index}
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    <ListItem display={"flex"} gap={"1em"} style={styles}>
                      <Text fontSize={"1.2em"}>{icon}</Text>
                      <Text>{name}</Text>
                    </ListItem>
                  </NavLink>
                )}
              </React.Fragment>
            );
          })}
        </UnorderedList>
      </Box>
    </>
  );
};

export default Sidebar;
