import React from "react";
import styled from "styled-components";
import QuotePaper from "../assets/Quote.png";
import Flower from "../assets/flower1.png";

const Wrapper = styled.div`
  padding-top: 42px;
  padding-left: 22px;
  padding-right: 22px;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
`;

const Content = styled.span`
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  font-family: "mom_to_daughter";
  text-align: center;
  color: var(--title-color);
  line-height: 2.25rem;
  opacity: 0.75;
  background-image: url(${QuotePaper});
  background-repeat: no-repeat;
  background-position: center;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 1.375rem;
  padding-bottom: 42px;
`;

const Quote = () => {
  return (
    <Wrapper>
      <Image src={Flower} data-aos="fade-up" />
      <Content data-aos="fade-up">
        나는 좋아한다는 한마디 말 이후에
        <br />
        우리에게 일어난 일들을 생각했다.
        <br />
        내 일과의 빈틈마다 밀려왔다 밀려나가는 잔물결 같은 것
        <br />
        <br />
        좋아한다는 말이 가진 주술적 힘.
        <br />
        나는 네 들려준 노래에, 함께 본 그림에,
        <br />
        나눈 말과 말 사이 시 같은 것들에
        <br />
        그 감정의 조각이 있었음을 기억했다.
        <br />
        나는 네가 말하는 의미들이 너무 좋다.
        <br />
        <br />
        - 조소담 	&#60;당신이라는 보통명사&#62; 중 -
        <br />
        <br />
      </Content>
    </Wrapper>
  );
};

export default Quote;
