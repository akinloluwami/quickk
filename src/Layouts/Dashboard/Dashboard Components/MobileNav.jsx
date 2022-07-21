import { UnorderedList, Box, ListItem, Text } from "@chakra-ui/react";
import BarItems from "../../../utils/BarContent";
import { Link } from "react-router-dom";
import { Fragment } from "react";

export const MobileNav = () => {
  return (
    <>
      <Box bg={"#fff"} py={"1.5em"} px={"0em"}>
        {/* display items from sidebar  */}
        <UnorderedList
          display={"flex"}
          justifyContent={"space-between"}
          mx={"0"}
        >
          {BarItems.map((items, index) => {
            const { name, link, icon, mobileView, styles, bg } = items;
            return (
              <Fragment key={index}>
                <Link to={link} key={index}>
                  {/* display item on mobile now */}
                  {mobileView ? (
                    <>
                      <ListItem
                        alignItems={"center"}
                        display={"flex"}
                        alignContent={"center"}
                        gap={"0.5em"}
                        flexDirection={"column"}
                        mx="0.6em"
                      >
                        <Text fontSize={"1.2em"} style={styles} bg={bg}>
                          {icon}
                        </Text>
                        <Text fontSize={"0.8em"}>{name}</Text>
                      </ListItem>
                    </>
                  ) : (
                    // hide items with mobile display hiden
                    <>
                      <ListItem
                        alignItems={"center"}
                        display={"none"}
                        gap={"1em"}
                        flexDirection={"column"}
                        mx="0.6em"
                      >
                        <Text fontSize={"1.2em"}>{icon}</Text>
                        <Text fontSize={"0.8em"}>{name}</Text>
                      </ListItem>
                    </>
                  )}
                </Link>
              </Fragment>
            );
          })}
        </UnorderedList>
      </Box>
    </>
  );
};
