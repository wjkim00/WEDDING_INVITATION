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

const Wrapper = styled.div`
  padding-top: 42px;
  margin: 0 auto;
  width: 70%;
`;

const Title = styled.p`
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
  text-align: center;
`;

const Content = styled.p`
  font-size: 0.72rem;
  line-height: 1.75;
  opacity: 0.75;
  margin-bottom: 16px;
  width: 100%;
  text-align: center;
`;

const GroomBride = styled.p`
  font-size: 0.875rem;
  line-height: 1.75;
  opacity: 0.85;
  margin-bottom: 0px;
  width: 100%;
  text-align: center;
`;

const Naming = styled.span`
  font-weight: bold;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 1.375rem;
  padding-bottom: 42px;
`;

const GroomText = () => {
  return (
    <>
      {GROOM_FATHER_NAME && GROOM_MOTHER_NAME ? (
        <>
          <Naming>{GROOM_FATHER_NAME}</Naming> 님과 <Naming>{GROOM_MOTHER_NAME}</Naming> 님
        </>
      ) : (
        GROOM_FATHER_NAME ? (
          <>
            <Naming>{GROOM_FATHER_NAME}</Naming> 님
          </>
        ) : (
          <>
            <Naming>{GROOM_MOTHER_NAME}</Naming> 님
          </>
        )
      )}
        <>
          의 아들
          <br />
          <Naming>{GROOM_NAME}</Naming>
          <br />
        </>
    </>
  );
}

const BrideText = () => {
  return (
    <>
      {BRIDE_FATHER_NAME && BRIDE_MOTHER_NAME ? (
        <>
          <Naming>{BRIDE_FATHER_NAME}</Naming> 님과 <Naming>{BRIDE_MOTHER_NAME}</Naming> 님
        </>
      ) : (
        BRIDE_FATHER_NAME ? (
          <>
            <Naming>{BRIDE_FATHER_NAME}</Naming> 님
          </>
        ) : (
          <>
            <Naming>{BRIDE_MOTHER_NAME}</Naming> 님
          </>
        )
      )}
        <>
          의 딸
          <br />
          <Naming>{BRIDE_NAME}</Naming>
          <br />
        </>
    </>
  );
}

const Greeting = () => {
  return (
    <Wrapper>
      <Divider style={{ marginTop: 32, marginBottom: 32 }} plain>
        <Title data-aos="fade-up">초대합니다</Title>
      </Divider>
      <Image data-aos="fade-up" src={Flower} />
      <Content data-aos="fade-up">
        서로 마주 보며 다져온 사랑을
        <br />
        <br />
        이제 함께 한곳을 바라보며 걸어갈 수 있는
        <br />
        <br />
        큰 사랑으로 키우고자 합니다.
        <br />
        <br />
        저희 두 사람이 사랑의 이름으로 지켜나갈 수 있게
        <br />
        <br />
        앞날을 축복해 주시면 감사하겠습니다.
      </Content>
      <GroomBride data-aos="fade-up">
        {GroomText()}
        <br />
        {BrideText()}
      </GroomBride>
    </Wrapper>
  );
};

export default Greeting;
