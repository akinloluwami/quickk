import { useState, useEffect } from "react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Helmet } from "react-helmet";
import { Text, Box, Button, Input, Flex } from "@chakra-ui/react";
import { fetchData, postData, deleteData } from "../../utils/Request";

const Links = () => {
  const [linkInputs, setlinkInputs] = useState([]);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchData("/dashboard/links/get", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      console.log(res);
    });
  }, []);

  const handleAddLink = () => {
    const newLinkInputs = [...linkInputs];
    const input = {
      title: "",
      url: "",
    };
    newLinkInputs.push(input);
    setlinkInputs(newLinkInputs);
  };

  const addNewLink = (title, url) => {
    const data = {
      title,
      url,
    };
    postData("/dashboard/links/add", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      console.log(res);
    });
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
                  onChange={(e) => {
                    const newLinkInputs = [...linkInputs];
                    newLinkInputs[linkInputs.indexOf(link)].title =
                      e.target.value;
                    setlinkInputs(newLinkInputs);
                  }}
                />
                <Input
                  value={link.link}
                  onChange={(e) => {
                    const newLinkInputs = [...linkInputs];
                    newLinkInputs[linkInputs.indexOf(link)].link =
                      e.target.value;
                    setlinkInputs(newLinkInputs);
                  }}
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
                <Button
                  onClick={() => {
                    addNewLink(link.title, link.link);
                  }}
                >
                  Add
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
