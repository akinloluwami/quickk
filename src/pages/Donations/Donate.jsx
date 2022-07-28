import { Box, Flex, Text } from "@chakra-ui/react";
import DonationBox from "../Profile/Components/DonationBox";
import { useState, useEffect } from "react";
import { fetchData, postData } from "../../utils/Request";

const Donate = () => {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const response = fetchData("/payment/get-donations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    response
      .then((data) => {
        setDonations(data.data.donations);
        console.log(data.data.donations);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Box maxW={["100%", "70%"]} mx={"auto"} py={"2em"}>
        <Text></Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : donations.length > 0 ? (
          <Flex flexWrap={"wrap"} justifyContent={"space-evenly"}>
            {donations.map((donation) => (
              <DonationBox
                key={donation.id}
                amount={donation.amount}
                date={donation.donatedAt}
                message={donation.donationMessage}
              />
            ))}
          </Flex>
        ) : (
          <Text>No donations yet</Text>
        )}
      </Box>
    </>
  );
};

export default Donate;
