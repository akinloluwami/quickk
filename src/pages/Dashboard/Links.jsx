import { useState, useEffect } from "react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Helmet } from "react-helmet";
import { Text, Box, Button, Input, Flex } from "@chakra-ui/react";
import { fetchData, postData, deleteData } from "../../utils/Request";
import { toast, ToastContainer } from "react-toastify";

const Links = () => {
  const [linkInputs, setlinkInputs] = useState([]);
  const [userLinks, setUserLinks] = useState([]);
  const [reversedUserLinks, setReversedUserLinks] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setReversedUserLinks(userLinks.reverse());
  }, [userLinks]);

  const linkRegex =
    /^(http:\/\/www.|https:\/\/www.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

  const validURL = (str) => {
    return linkRegex.test(str);
  };

  useEffect(() => {
    fetchData("/dashboard/links/get", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setUserLinks(res.data.links);
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
    const response = postData("/dashboard/links/add", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    response.then((res) => {
      if (res.status === 200) {
        setSuccess(true);
        toast.success("Link added successfully");
        setUserLinks([...userLinks, res.data.link]);
      } else {
        toast.error(res.response.data.message);
      }
    });
  };

  const handleDeleteLink = (id) => {
    deleteData(`/dashboard/links/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        toast.success("Link deleted successfully");
        const newUserLinks = [...userLinks];
        const index = newUserLinks.findIndex((link) => link.id === id);
        newUserLinks.splice(index, 1);
        setUserLinks(newUserLinks);
      })
      .catch((err) => {
        toast.error("Error deleting link");
      });
  };

  const updateLink = (id, title, url) => {
    const data = {
      title,
      url,
    };
    postData(`/dashboard/links/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Links | Quickk Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <ToastContainer />
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
                    const newLinkInputs = [...linkInputs];
                    newLinkInputs[linkInputs.indexOf(link)].adding = true;
                    setlinkInputs(newLinkInputs);
                    setTimeout(() => {
                      const newLinkInputs = [...linkInputs];
                      newLinkInputs.splice(linkInputs.indexOf(link), 1);
                      setlinkInputs(newLinkInputs);
                    }, 1000);
                  }}
                  disabled={
                    !link.title ||
                    !link.link ||
                    !validURL(link.link) ||
                    link.adding
                  }
                >
                  {link.adding ? "Adding..." : "Add"}
                </Button>
              </Box>
            ))}
          </Box>
          <Box>
            {userLinks.length < 1 ? (
              <Text>No Links</Text>
            ) : (
              reversedUserLinks.map((link) => (
                <Box
                  key={link.id}
                  my={4}
                  bg={"#fff"}
                  boxShadow="md"
                  height={"150px"}
                  width={"100%"}
                >
                  <Input
                    value={link.title}
                    onChange={(e) => {
                      /***It is rendering as read-only, please fix it*/
                      userLinks[userLinks.indexOf(link)].title = e.target.value;
                      // updateLink(link.id, link.title, link.url);
                    }}
                  />
                  <Input
                    value={link.url}
                    onChange={(e) => {
                      /***It is rendering as read-only, please fix it*/
                      userLinks[userLinks.indexOf(link)].url = e.target.value;
                      // updateLink(link.id, link.title, link.url);
                    }}
                  />

                  <Button
                    onClick={() => {
                      handleDeleteLink(link.id);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Links;
