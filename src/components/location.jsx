import React, { useEffect } from "react";
import { Divider } from "antd";
import styled from "styled-components";
import Flower from "../assets/flower2.png";
import Emoji from "react-emoji-render";
import { Spacer } from "../utils/tags";

const Wrapper = styled.div`
  font-family: "MaruBuri";
  padding-top: 42px;
  width: 80%;
  margin: 0 auto;
`;

const Title = styled.span`
  font-family: "MaruBuri";
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 1.375rem;
  padding-bottom: 42px;
`;

const Content = styled.p`
  font-family: "MaruBuri";
  font-size: 0.875rem;
  line-height: 1.75;
  opacity: 0.75;
  width: 100%;
  text-align: left;
  padding-top: 42px;
  padding-bottom: 10px;
  margin: 0;
`;

const Map = styled.div`
  width: 100%;
  padding: 0;
`;

const TextStyle = styled.span`
  font-family: "MaruBuri";
  font-weight: bold;
`;

// <!-- * 카카오맵 - 지도퍼가기 -->
// <!-- 1. 지도 노드 -->
// <div id="daumRoughmapContainer1746867156702" class="root_daum_roughmap root_daum_roughmap_landing"></div>
//
// <!--
// 	2. 설치 스크립트
// 	* 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다.
// -->
// <script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>
//
// <!-- 3. 실행 스크립트 -->
// <script charset="UTF-8">
// 	new daum.roughmap.Lander({
// 		"timestamp" : "1746867156702",
// 		"key" : "2ny3n",
// 		"mapWidth" : "640",
// 		"mapHeight" : "360"
// 	}).render();
// </script>

//

const Location = () => {
  // 카카오 맵 불러오기

  // <!-- 3. 실행 스크립트 -->
  const executeScript = () => {
    const scriptTag = document.createElement("script");
    const inlineScript = document.createTextNode(`new daum.roughmap.Lander({
      "timestamp" : "1746867156702",
      "key" : "2ny3n",
      "mapWidth" : "640",
      "mapHeight" : "360"
    }).render();`);
    scriptTag.appendChild(inlineScript);
    document.body.appendChild(scriptTag);
  };

  // <!-- 2. 설치 스크립트 * 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다. -->
  // document.write 문제가 발생해서 해당 파일을 직접 가져온다음 수정했음
  const InstallScript = () => {
    (function() {
      var c = (window.location.protocol=="https:") ? "https:" : "http:";
      var a = "7a65d0c7";
      var p = "prod";

      if (window.daum && window.daum.roughmap && window.daum.roughmap.cdn) {
        return;
      }
      window.daum = window.daum || {};
      window.daum.roughmap = {
        phase : p,
        cdn : a,
        URL_KEY_DATA_LOAD_PRE : c + "//t1.daumcdn.net/roughmap/",
        url_protocal : c,
        url_cdn_domain: "//t1.daumcdn.net"
       };
       var b = c
             + "//t1.daumcdn.net/kakaomapweb/roughmap/place/"
             + p
             + "/"
             + a
             +"/roughmapLander.js";

      const scriptTag = document.createElement("script");
      scriptTag.charset = "UTF-8";
      scriptTag.src = b;
      document.body.appendChild(scriptTag);
      scriptTag.onload = () => {
        executeScript();
      };
    })();
  };

  useEffect(() => {
    InstallScript();
  }, [InstallScript]);

  return (
    <Wrapper>
      <Divider plain style={{ marginTop: 0, marginBottom: 32 }}>
        <Title>LOCATION</Title>
      </Divider>
      <Image src={Flower} />
      <Map
        id="daumRoughmapContainer1746867156702"
        className="root_daum_roughmap root_daum_roughmap_landing"
      ></Map>
      <Content>
        서울특별시 영등포구 문래로 164
        <br />
        SK리더스뷰 JK아트컨벤션 4층 엠버루체홀
        <br />
        <br />
        <Title>
          <Emoji text=":metro: 지하철 이용 시" style={{ fontFamily: 'MaruBuri'}} />
        </Title>
        <Spacer />
        <span style={{ color: 'green', fontWeight: 'bold', fontFamily: 'MaruBuri'}}>2호선 문래역 </span>하차
        <br />
        [셔틀] 4번 출구 (뒷편)
        <br />
        [도보] 5번 출구에서 전방 직진 300m
        <br />
        <br />
        <span style={{ color: 'blue', fontWeight: 'bold' , fontFamily: 'MaruBuri'}}>1호선 영등포역 </span>하차
        <br />
        [도보] 6번 출구에서 950m
        <br />
        <br />
        <Title>
          <Emoji text=":oncoming_bus: 버스 이용 시" style={{ fontFamily: 'MaruBuri'}}/>
        </Title>
        <Spacer />
        <TextStyle>문래역 정류장 하차</TextStyle>
        <br />
        [지선] 6211, 6625
        <br />
        [간선] 641
        <br />
        [마을] 영등포12
        <br />
        <br />
        <TextStyle>문래주민센터 / 영일시장.록스 정류장 하차</TextStyle>
        <br />
        [마을] 영등포05
        <br />
        <br />
        <TextStyle>벽산메가트리움APT 정류장 하차</TextStyle>
        <br />
        [지선] 6516
        <br />
        <br />
        <Title>
          <Emoji text=":oncoming_automobile: 자가 이용 시" style={{ fontFamily: 'MaruBuri'}}/>
        </Title>
        <Spacer />
        네비게이션에 "JK아트컨벤션"
        <br />
        또는 "문래동 SK리더스뷰" 검색
        <Spacer />
        웨딩홀 주차장 이용 시 2시간 무료 주차
        <br />
      </Content>
    </Wrapper>
  );
};

export default Location;
