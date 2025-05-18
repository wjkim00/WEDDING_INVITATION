import React, { useEffect } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";
import 'antd/dist/reset.css';
import Greeting from "../components/greeting";
import Title from "../components/title";
import "../styles/index.css";


import GroovePaper from "../assets/GroovePaper.png";
import AutoPlayAudio from "../utils/song";

import AOS from "aos";
import "aos/dist/aos.css";

// Lazy Loading
// const Gallery = loadable(() => import("../components/gallery"));
// const CongratulatoryMoney = loadable(() => import("../components/congratulatoryMoney"));
// const Location = loadable(() => import("../components/location"));
// const Share = loadable(() => import("../components/share"));
// const Quote = loadable(() => import("../components/quote"));
import Gallery from  "../components/gallery";
import CongratulatoryMoney from "../components/congratulatoryMoney";
import Location from "../components/location";
import Share from "../components/share";
import Quote from "../components/quote";

// markup
const { Footer } = Layout;

const Wrapper = styled.div`
  font-family: "HANDotum";
  background: #efebe9;
  background-image: url(${GroovePaper});
  width: 100%;
`;

const IndexPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    document.body.appendChild(script);

    return () => {
      document.body.romoveChile(script);
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  });
  return (
    <>
      <Wrapper>
        {AutoPlayAudio()}
        <Title />
        <Greeting />

        <Gallery />
        <Location />
        <Quote />
        <CongratulatoryMoney />
        <Share />
        <Footer
          style={{
            background: "#D7CCC8",
            backgroundImage: `url(${GroovePaper})`,
            opacity: 0.6,
            textAlign: "center",
          }}
        >
          Made by Kim Wonjin
        </Footer>
      </Wrapper>
    </>
  );
};

export default IndexPage;
