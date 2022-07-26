import { useState, useEffect } from "react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Helmet } from "react-helmet";
import { Text, Box, Button, Input, Flex } from "@chakra-ui/react";
import { fetchData, postData, deleteData } from "../../utils/Request";

const Links = () => {
  const [linkInputs, setlinkInputs] = useState([]);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkAddress, setLinkAddress] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleAddLink = () => {
    const newLinkInputs = [...linkInputs];
    const input = {
      title: linkTitle,
      link: linkAddress,
      deleting: false,
    };
    newLinkInputs.push(input);
    setlinkInputs(newLinkInputs);
  };
  return (
    <>
      <Helmet>
        <title>Links | Quickk Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <Box>
          <Button onClick={handleAddLink}>Add New Link</Button>
          <Box>
            {linkInputs.map((link) => (
              <Box
                key={linkInputs.indexOf(link)}
                my={4}
                bg={"#fff"}
                boxShadow="md"
                height={"150px"}
                width={"100%"}
              >
                <Input
                  value={link.title}
                  onChange={(e) => setLinkTitle(e.target.value)}
                />
                <Input
                  value={link.link}
                  onChange={(e) => setLinkAddress(e.target.value)}
                />
                <Button
                  onClick={() => {
                    const newLinkInputs = [...linkInputs];
                    newLinkInputs[linkInputs.indexOf(link)].deleting = true;
                    setlinkInputs(newLinkInputs);
                    setTimeout(() => {
                      const newLinkInputs = [...linkInputs];
                      newLinkInputs.splice(linkInputs.indexOf(link), 1);
                      setlinkInputs(newLinkInputs);
                    }, 1000);
                  }}
                >
                  {link.deleting ? "Deleting..." : "Delete"}
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Links;
