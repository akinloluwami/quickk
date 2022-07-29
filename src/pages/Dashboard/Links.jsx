import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Helmet } from "react-helmet";
import { Text, Box, Button, Input, Flex, Switch } from "@chakra-ui/react";
import { fetchData, postData, deleteData } from "../../utils/Request";
import { toast, ToastContainer } from "react-toastify";
import { TbTrash } from "react-icons/tb";
import { BiPencil } from "react-icons/bi";

const Links = () => {
  const [linkInputs, setlinkInputs] = useState([]);
  const [userLinks, setUserLinks] = useState([]);
  const [reversedUserLinks, setReversedUserLinks] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [deleting, setDeleting] = useState(0);

  //initilize Ref

  const editTitle = useRef(null);
  const editUrl = useRef(null);

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
    setLoading(true);
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

        <Box
          my={"2em"}
          w={["100%", "60%"]}
          p={"1em"}
          mx={"auto"}
          borderRadius={"3em"}
        >
          <Box>
            <Button onClick={handleAddLink}>Add New Link</Button>
            <Box>
              {linkInputs.map((link) => (
                <Box
                  key={linkInputs.indexOf(link)}
                  my={4}
                  bg={"#fff"}
                  boxShadow="md"
                  borderRadius={"1em"}
                  width={"100%"}
                  px={"1.5em"}
                  py={"2em"}
                >
                  <Input
                    value={link.title}
                    my={"0.5em"}
                    variant={"filled"}
                    placeholder={"Link Name"}
                    py={"1.5em"}
                    fontWeight={"500"}
                    onChange={(e) => {
                      const newLinkInputs = [...linkInputs];
                      newLinkInputs[linkInputs.indexOf(link)].title =
                        e.target.value;
                      setlinkInputs(newLinkInputs);
                    }}
                  />
                  <Input
                    value={link.link}
                    my={"0.5em"}
                    variant={"filled"}
                    placeholder={"https://www.platform.com/username"}
                    py={"1.5em"}
                    fontWeight={"500"}
                    onChange={(e) => {
                      const newLinkInputs = [...linkInputs];
                      newLinkInputs[linkInputs.indexOf(link)].link =
                        e.target.value;
                      setlinkInputs(newLinkInputs);
                    }}
                  />

                  <Flex gap={"2em"} alignItems={"center"} my={"1em"}>
                    <Button
                      my={"0.5em"}
                      bg={"red.500"}
                      color={"#fff"}
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
                      bg={"blue.500"}
                      color={"white"}
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
                  </Flex>
                </Box>
              ))}
            </Box>
            <Box>
              {userLinks.length < 1 ? (
                <Text>No Links</Text>
              ) : (
                reversedUserLinks.map((link) => (
                  <>
                    <Box
                      key={link.id}
                      my={4}
                      bg={"#fff"}
                      width={"100%"}
                      p={["1em", "2em"]}
                      borderRadius={"1.5em"}
                    >
                      <Box
                        display={"flex"}
                        gap={"2em"}
                        alignItems={"center"}
                        justifyContent={""}
                      >
                        <Input
                          my={"0.5em"}
                          value={link.title}
                          width={["fit-content"]}
                          fontWeight={"bold"}
                          border="none"
                          ref={editTitle}
                          onChange={(e) => {
                            /***It is rendering as read-only, please fix it*/
                            userLinks[userLinks.indexOf(link)].title =
                              e.target.value;
                            // updateLink(link.id, link.title, link.url);
                          }}
                        />

                        <Text
                          cursor={"pointer"}
                          onClick={() => {
                            //edit ref
                            editTitle.current.focus();
                          }}
                        >
                          <BiPencil />
                        </Text>
                      </Box>

                      <Flex alignItems={"center"}>
                        <Input
                          my={"0.5em"}
                          value={link.url}
                          border={"none"}
                          outline={"none"}
                          fontWeight={"bold"}
                          isDisabled={disable}
                          ref={editUrl}
                          width={["fit-content"]}
                          onChange={(e) => {
                            /***It is rendering as read-only, please fix it*/
                            userLinks[userLinks.indexOf(link)].url =
                              e.target.value;

                            // updateLink(link.id, link.title, link.url);
                          }}
                        />
                        <Text
                          cursor={"pointer"}
                          onClick={() => {
                            setDisable(false);
                            editUrl.current.focus();
                          }}
                        >
                          <BiPencil />
                        </Text>
                      </Flex>

                      <Button
                        onClick={() => {
                          setDeleting(link.id)
                          handleDeleteLink(link.id);
                        
                        }}
                      >
                        <Text my={"0.5em"} fontSize={"1.2em"}>
                          {deleting === link.id ? "Deleting..." : <TbTrash />}
                        </Text>
                      </Button>
                    </Box>
                  </>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Links;
