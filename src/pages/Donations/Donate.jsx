import { Box, Button, Flex, Text, Center } from "@chakra-ui/react";
import DonationBox from "../Profile/Components/DonationBox";
import { useState, useEffect } from "react";
import { fetchData, postData } from "../../utils/Request";
import RequestPayout from "./RequestPayout";
// import { Helmet } from "react-helmet";
import {GrMoney} from 'react-icons/gr'

const Donate = () => {

  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reversed, setReversed] = useState();
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    if (donations.length > 0) {
      setReversed(donations.reverse());
    }
  }, [donations]);

  useEffect(() => {
    document.title = "Donations | Quickk Dashboard";
  }, []);

  return (
    <>
      {/* <Helmet>
        <title>Donations | Quickk Dashboard</title>
      </Helmet> */}
      <Box maxW={["100%", "70%"]} mx={"auto"} py={"2em"}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : donations.length > 0 ? (
          <Box position={"relative"}>
            <RequestPayout isOpen={isOpen} />
            <Center my={"2em"}>
              <Button onClick={() => setIsOpen(true)}>Request Payout</Button>
            </Center>
            <Flex flexWrap={"wrap"} justifyContent={"space-evenly"}>
              {reversed?.map((donation) => (
                <DonationBox
                  key={donation.id}
                  amount={donation.amount}
                  date={donation.donatedAt}
                  message={donation.donationMessage}
                />
              ))}
            </Flex>
          </Box>
        ) : (
          <Box my={'2em'} color={'gray'}>

            <center>
              <GrMoney size={'2em'} fill={'gray'}/>
              <Text my={'1em'}> No Donations Yet </Text>

            </center>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Donate;
