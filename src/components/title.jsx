import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  WEDDING_DATE,
  WEDDING_LOCATION,
  GROOM_NAME,
  BRIDE_NAME,
} from "../../config.js";

import BackgroundVideoStiilCut from "../assets/BackgroundVideo_stillcut.webp";
// import BackgroundVideo from "../assets/BackgroundVideo.webm";
const BackgroundVideo = "https://cdn.jsdelivr.net/gh/wjkim00/WEDDING_INVITATION/src/assets/BackgroundVideo.webm"

function VerticalLine() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        columnGap: '20px',
        padding: '20px',
        height: '200px',
      }}
    >
      <div></div>
      {/* auto 칸에 width:1px 짜리 배경색으로 선을 만듭니다 */}
      <div
        style={{
          width: '1px',
          backgroundColor: '#ccc',
          height: '100%',
        }}
      />
      <div></div>
    </div>
  );
}

function DateWithLine({ month, day, lineWidth = '28px', lineColor = '#333', font = 'WONbatang', fontSize = '2.5rem' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        gap: '0px',
        lineHeight: '1',
      }}
    >
      <span style={{ fontSize: fontSize, fontFamily: font }}>{month}</span>
      <span
        style={{
          display: 'block',
          width: lineWidth,
          borderBottom: `2px solid ${lineColor}`,
          margin: '4px 0',
        }}
      />
      <span style={{ fontSize: fontSize, fontFamily: font }}>{day}</span>
    </div>
  );
}

const Layout = styled.div`
  font-family: "WONbatang";
  width: 80%;
  overflow: hidden;
  font-size: 2.5rem;
  margin: 0 auto;
  text-align: center;
`;

const TitleLayout = styled.div`
  font-family: "WONbatang";
  font-size: 2.5rem;
  width: 90%;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  animation: fadein 3s;
  -moz-animation: fadein 3s; /* Firefox */
  -webkit-animation: fadein 3s; /* Safari and Chrome */
  -o-animation: fadein 3s; /* Opera */
`

const TitleWrapper = styled.div`
  font-family: "WONbatang";
  text-align: left;
  font-weight: 500 !important;
  color: black;
  flex: 1;
  padding: 10px 0px;
`;

const VideoBackground = styled.video`
  width: 100%;
`;

const WeddingInvitation = styled.p`
  font-family: "WONbatang";
  font-size: 1.3rem;
  opacity: 0.45;
  margin-bottom: 10px;
`;

const GroomBride = styled.p`
  font-family: "WONbatang";
  font-weight: bold;
  margin-bottom: 4px;
`;

const Schedule = styled.p`
  font-family: "MaruBuri";
  font-size: .9rem;
  opacity: 0.65;
  margin-bottom: 24px;
`;

const WelcomeMessage = styled.div`
  font-size: 15px;
  font-family: "WONbatang";
  color:rgb(99, 99, 99);
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`
const Title = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.load();      // 실제 소스 다운로드 시작
          v.play();
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <TitleLayout>
        <TitleWrapper width="90%">
          <DateWithLine month="09" day="07" fontSize="1.5rem" />
        </TitleWrapper>
        <WelcomeMessage>
          welcome to.
        </WelcomeMessage>
      </TitleLayout>
      <VideoBackground ref={videoRef} loop muted playsInline={true} preload="none" poster={BackgroundVideoStiilCut}>
        <source src={BackgroundVideo} type="video/webm" />
      </VideoBackground>
      <Layout>
        <GroomBride>
          {GROOM_NAME.slice(1)} <span style={{fontSize: '1.5rem', fontWeight: "normal", color: "#757575"}}>&#38;</span> {BRIDE_NAME.slice(1)}
        </GroomBride>
        <WeddingInvitation>결혼합니다.</WeddingInvitation>
        <VerticalLine />
        <Schedule>
          {WEDDING_DATE}
          <br />
          {WEDDING_LOCATION}
        </Schedule>
      </Layout>
    </>
  );
};

export default Title;
