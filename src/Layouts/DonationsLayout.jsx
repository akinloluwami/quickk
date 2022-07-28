import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";
const DonationsLayout = ({ children }) => {
  const tabs = [
    {
      name: "Donations ",
      path: "/dashboard/donation",
    },
    {
      name: "Settings ",
      path: "/dashboard/donations/settings",
    },
  ];

  //set active styles
  const activeStyle = {
    backgroundColor: "rgb(215 238 255 / 34%)",
    color: "blue",
    padding: "0.5em",
    borderRadius: "0.25em",
  };

  //set default style
  const defaultStyle = {
    backgroundColor: "none",

    padding: "0.4em",
    borderRadius: "0.25em",
  };
  return (
    <>
      <Box display={"flex"} gap={"2em"} justifyContent={"center"}>
        {tabs.map((items) => {
          return (
            <Fragment key={tabs.indexOf(items)}>
              <NavLink
                to={items.path}
                style={({ isActive }) =>
                  isActive ? activeStyle : defaultStyle
                }
              >
                {items.name}
              </NavLink>
            </Fragment>
          );
        })}
      </Box>

      <Box>{children}</Box>
    </>
  );
};

export default DonationsLayout;
