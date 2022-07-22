import { useState, useEffect } from "react";
import PostBox from "../../components/Post/PostBox";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Flex } from "@chakra-ui/react";
import DashboardCard from "../../components/minor/Card";
import { FiUsers, FiUser, FiGlobe, FiGift } from "react-icons/fi";
import { fetchData } from "../../utils/Request";

const DashboardIndex = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const response = fetchData("/dashboard/overview", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    response.then((res) => {
      const { followers, following } = res.data;
      setFollowers(followers);
      setFollowing(following);
    });
  }, []);

  const data = [
    {
      title: "Followers",
      number: followers.length,
      color: "rgb(34, 197, 94)",
      icon: <FiUsers size={"1.5em"} fill={"rgb(34, 197, 94)"} />,
    },
    {
      title: "Following",
      number: following.length,
      color: "rgb(14, 165, 233)",
      icon: <FiUser size={"1.5em"} fill={"rgb(14, 165, 233)"} />,
    },
    {
      title: "Total Page Views",
      number: "10,234",
      color: " rgb(168, 85, 247)",
      icon: <FiGlobe size={"1.5em"} fill={" rgb(168, 85, 247)"} />,
    },
    {
      title: "Total Donations",
      number: "1,234",
      color: "rgba(239, 105, 38, 0.5)",
      icon: <FiGift size={"1.5em"} fill={"rgba(239, 105, 38, 0.5)"} />,
    },
  ];

  return (
    <>
      <DashboardLayout>
        <Flex gap={"1em"} flexDir={["column", "row"]}>
          {data.map((item, index) => (
            <DashboardCard
              key={index}
              title={item.title}
              number={item.number}
              color={item.color}
              icon={item.icon}
            />
          ))}
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default DashboardIndex;
