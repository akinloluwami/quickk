import PostBox from "../../components/Post/PostBox";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Flex } from "@chakra-ui/react";
import Card from "../../components/minor/Card";

const DashboardIndex = () => {
  // console.log(following, followers);
  // const DashboardIndex = () => {
  const data = [
    {
      title: "Followers",
      number: "10,637",
      color: "rgba(240, 161, 244, 0.5)",
    },
    {
      title: "Following",
      number: "12,383",
      color: "rgba(56, 105, 255, 0.5)",
    },
    {
      title: "Total Page Views",
      number: "10,234",
      color: "rgba(219, 213, 30, 0.5)",
    },
    {
      title: "Total Donations",
      number: "1,234",
      color: "rgba(239, 105, 38, 0.5)",
    },
  ];
  return (
    <>
      <DashboardLayout>
        <Flex>
          {data.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              number={item.number}
              color={item.color}
            />
          ))}
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default DashboardIndex;
