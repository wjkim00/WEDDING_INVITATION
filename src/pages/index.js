import React, { useEffect, Suspense } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";
import 'antd/dist/reset.css';
import Greeting from "../components/greeting";
import Title from "../components/title";
import "../styles/index.css";

import loadable from "@loadable/component"

import GroovePaper from "../assets/GroovePaper.png";
import AutoPlayAudio from "../utils/song";

import AOS from "aos";
import "aos/dist/aos.css";

import { Helmet } from 'react-helmet-async';

// Lazy Loading
const Gallery = loadable(() => import("../components/gallery"));
const CongratulatoryMoney = loadable(() => import("../components/congratulatoryMoney"));
const Location = loadable(() => import("../components/location"));
const Share = loadable(() => import("../components/share"));
const Quote = loadable(() => import("../components/quote"));

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
      <Helmet>
        <title>원진 ♥ 연진 Wedding Invitation</title>
        <link rel="icon" href="../assets//favicon.png" />
        <meta property="og:url" content="https://ttokka-wedding.netlify.app" />
        <meta property="og:title" content="원진 ♥ 연진 결혼식에 초대합니다." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://cdn.jsdelivr.net/gh/wjkim00/WEDDING_INVITATION/src/assets/Thumbnails.webp/" />
        <meta property="og:description" content="9월 7일 일요일 11시 JK아트컨벤션" />
      </Helmet>
      <Wrapper>
        {AutoPlayAudio()}
        <Title />
        <Greeting />

        <Suspense fallback={<div>로딩 중...</div>}>
          <Gallery />
          <Location />
          <Quote />
          <CongratulatoryMoney />
          <Share />
        </Suspense>
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
