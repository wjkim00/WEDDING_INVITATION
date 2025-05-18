import React from "react";
import styled from "styled-components";
import { Divider } from "antd";
import {
  GROOM_NAME,
  GROOM_FATHER_NAME,
  GROOM_MOTHER_NAME,
  BRIDE_NAME,
  BRIDE_FATHER_NAME,
  BRIDE_MOTHER_NAME,
} from "../../config";
import Flower from "../assets/flower1.png";
import { Spacer } from "../utils/tags";

const Wrapper = styled.div`
  padding-top: 12rem;
  margin: 0 auto;
  width: 80%;
  margin-bottom: 42px;
`;

const Title = styled.p`
  font-family: "MaruBuri";
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
  text-align: center;
`;

const Content = styled.div`
  font-size: 0.9rem;
  font-family: "MaruBuri";
  line-height: 1.75;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  color: black;
`;

const GroomBride = styled.div`
  font-family: "MaruBuri";
  font-size: 0.75rem;
  line-height: 1.75;
  opacity: 0.85;
  margin: 0 auto;
  width: 70%;
  text-align: center;
`;

const Naming = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  font-family: "MaruBuri";
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 1.375rem;
  padding-bottom: 20px;
`;

const GroomText = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        {GROOM_FATHER_NAME && GROOM_MOTHER_NAME ? (
          <>
            <Naming>{GROOM_FATHER_NAME}</Naming> · <Naming>{GROOM_MOTHER_NAME}</Naming>
          </>
        ) : (
          GROOM_FATHER_NAME ? (
            <>
              <Naming>{GROOM_FATHER_NAME}</Naming>
            </>
          ) : (
            <>
              <Naming>{GROOM_MOTHER_NAME}</Naming>
            </>
          )
        )}
        의 차남
      </div>
      <div>
          <Naming> {GROOM_NAME}</Naming>
          <br />
      </div>
    </div>
  );
}

const BrideText = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ fontFamily: "MaruBuri" }}>
        {BRIDE_FATHER_NAME && BRIDE_MOTHER_NAME ? (
          <>
            <Naming>{BRIDE_FATHER_NAME}</Naming> · <Naming>{BRIDE_MOTHER_NAME}</Naming>
          </>
        ) : (
          BRIDE_FATHER_NAME ? (
            <>
              <Naming>{BRIDE_FATHER_NAME}</Naming>
            </>
          ) : (
            <>
              <Naming>{BRIDE_MOTHER_NAME}</Naming>
            </>
          )
        )}
          의 차녀
      </div>
      <div>
        <Naming> {BRIDE_NAME}</Naming>
        <br />
      </div>
    </div>
  );
}

const Greeting = () => {
  return (
    <Wrapper>
      <Divider data-os="fade-up" style={{ marginTop: 32, marginBottom: 32 }} plain>
        <Title>INVITATION</Title>
      </Divider>
      <Image data-os="fade-up"  src={Flower} />
      <Content>
        우연으로 만나, 인연이 된 사람과
        <br />
        필연을 맺고자 합니다.
        <Spacer size="2rem" />
        저희가 디딘 개별적인 걸음걸음이
        <br />
        오늘의 일부가 되었습니다.
        <Spacer size="2rem" />
        사랑이 다 지기 전에 저희들이 같은 수로
        <br />
        해와 달의 운행을 다시 셀 수 있도록
        <Spacer size="2rem"/>
        새로운 인생을 시작하는 자리에 오셔서
        <br />
        축하해 주시면 감사하겠습니다.
        <Spacer size="2rem"/>
      </Content>
      <GroomBride>
        {GroomText()}
        <br />
        {BrideText()}
      </GroomBride>
    </Wrapper>
  );
};

export default Greeting;
