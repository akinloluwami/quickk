import PostBox from "../../components/Post/PostBox";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Flex } from "@chakra-ui/react";
import DashboardCard from "../../components/minor/Card";
import {FiUsers , FiUser, FiGlobe  , FiGift} from 'react-icons/fi';

const DashboardIndex = () => {
  // console.log(following, followers);
  // const DashboardIndex = () => {
  const data = [
    {
      title: "Followers",
      number: "10,637",
      color: "rgb(34, 197, 94)",
      icon: <FiUsers size={'1.5em'} fill={'rgb(34, 197, 94)'}/>,
    },
    {
      title: "Following",
      number: "12,383",
      color: "rgb(14, 165, 233)",
      icon: <FiUser size={'1.5em'} fill={'rgb(14, 165, 233)'}/>
    },
    {
      title: "Total Page Views",
      number: "10,234",
      color: " rgb(168, 85, 247)",
      icon: <FiGlobe size={'1.5em'} fill={' rgb(168, 85, 247)'}/>

    },
    {
      title: "Total Donations",
      number: "1,234",
      color: "rgba(239, 105, 38, 0.5)",
      icon: <FiGift size={'1.5em'} fill={'rgba(239, 105, 38, 0.5)'}/>
    },
  ];
  return (
    <>
      <DashboardLayout>
        <Flex gap={'1em'} flexDir={['column' , 'row']}>
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
