import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import ProfileBlock from "../../pages/Profile/ProfileBlock";
import ProfileItems from "./ProfileItems";
import { Link } from "react-router-dom";
import React, { Fragment } from "react";

const ProfileLayout = ({ children }) => {
  return (
    <>
      <Box bg={"#fff"} p={"2em"} w={"100%"}>
        <ProfileBlock />
        <Box my={["1em", "3em"]}>
          <UnorderedList
            listStyleType={"none"}
            mx={"0"}
            display={"flex"}
            gap={"3em"}
          >
            {ProfileItems.map((item, index) => {
              return (
                <Fragment key={index}>
                  <Link to={item.path}>
                    <ListItem> {item.name}</ListItem>
                  </Link>
                </Fragment>
              );
            })}
          </UnorderedList>
        </Box>
      </Box>

      <Box my={"1em"}>{children}</Box>
    </>
  );
};

export default ProfileLayout;
