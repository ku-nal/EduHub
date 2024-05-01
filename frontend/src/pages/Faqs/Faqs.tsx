// Rahul Goswami
import { Box } from "@mui/material";
import Faq from "react-faq-component";
import faqimage from "../../Assests/faq.svg";
import Navbar from "../../Components/NavBar";
import React from "react";

const FAQS: React.FC = () => {
  const data = {
    title: "FAQ (How it works)",
    rows: [
      {
        title: "How does EduHub work?",
        content: `Signup for the courses you are interested in and then complete the quizes attend the live lectures finish the course`,
      },
      {
        title: "Can you get refund?",
        content:
          "Yes you can get a refund with in 30 days of enrolling",
      },
      {
        title: "How long do I have access to a course after enrolling?",
        content: `The access to the course is lifetime until you drop it.`,
      },
      {
        title: "What is the package version",
        content: <p>Version Number 0.0.1</p>,
      },
    ],
  };

  const styles = {
    bgColor: "white",
    titleTextColor: "#4a5cfb",
    titleTextSize: "48px",
    rowTitleColor: "#53577a",
    rowTitleTextSize: "medium",
    rowContentColor: "#0e5a9b",
    //     rowContentTextSize: "16px",
    //     rowContentPaddingTop: '10px',
    //     rowContentPaddingBottom: "10px",
    //     rowContentPaddingLeft: "50px",
    //     rowContentPaddingRight: '150px',
    arrowColor: "#4a5cfb",
    transitionDuration: "1s",
    timingFunc: "ease",
  };

  const config = {
    animate: true,
    //     arrowIcon: "V",
    tabFocus: true,
  };
  return (
    <>
    <Navbar></Navbar>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* FAQ Section */}
        <Box sx={{ flex: 1, backgroundColor: "rgba(255,255,255,0.8)", padding: "20px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <Faq data={data} styles={styles} config={config} />
        </Box>
        {/* Image Section */}
        <Box sx={{ flex: 1, backgroundImage: `url(${faqimage})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }} />
      </Box>
    </>
  );
};
export default FAQS;
