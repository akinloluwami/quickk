import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BarItems from "../../utils/BarContent";
import { MdOutlineDashboard } from "react-icons/md";

const Sidebar = () => {
  return (
    <>
      <Box px={"4em"} py="6em">
        {/* Loop through items of bar contents  */}
        <UnorderedList
          listStyleType={"none"}
          display={"flex"}
          flexDir={"column"}
          gap={"3em"}
        >
          {BarItems.map((items, index) => {
            const { name, link, icon , hideDesktop } = items;
            return (
              //check if hideDesktop is true
                <>
                  {
                    hideDesktop ? (
                      <>
                        {/* dont display anything if its true */}
                      </>
                    ) : 
                    (
                      <Link to={link} key={index}>
                      <ListItem display={"flex"} gap={"1em"}>
                        <Text fontSize={"1.2em"}>{icon}</Text>
                        <Text>{name}</Text>
                      </ListItem>
                    </Link>
                    )
                  }
                </>
              
            )
          })}
        </UnorderedList>
      </Box>
    </>
  );
};

export default Sidebar;
