import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Divider, message } from "antd";
import { MessageFilled, LinkOutlined } from "@ant-design/icons";
import styled from "styled-components";

import {
  KAKAOTALK_API_TOKEN,
  KAKAOTALK_SHARE_IMAGE,
  WEDDING_INVITATION_URL,
  GROOM_NAME,
  BRIDE_NAME,
} from "../../config";

const Wrapper = styled.div`
  padding-top: 4rem;
  width: 100%;
  text-align: center;
`;

const Title = styled.span`
  font-family: "MaruBuri";
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
`;

const KakaoTalkShareButton = styled(Button)`
  background: #fee500;
  border-color: #fee500;
  color: #181600;
  width: 100%;
  &:hover {
    background-color: #fcf07e !important;
    border-color: #fcf07e !important;
    color: #17160b !important;
  }
  &:focus {
    background-color: #fcf07e !important;
    border-color: #fcf07e !important;
    color: #17160b !important;
  }
`;

const LinkShareButton = styled(Button)`
  background-color: rgba(217, 125, 131, 0.2);
  border-color: rgba(217, 125, 131, 0.2) !important;
  color: var(--title-color) !important;
  font-weight: 400 !important;
  align-item: center;
  width: 100%;
  &:hover {
    background-color: rgb(217 125 131 / 48%) !important;
    border-color: rgb(217 125 131 / 48%) !important;
    color: var(--title-color) !important;
  }
`;

const description_kakao = `

2025년 9월 7일 일요일 오전 11시
JK아트컨벤션 엠버루체홀
`
const Share = () => {
  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;

      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(KAKAOTALK_API_TOKEN);
      }

      kakao.Link.createDefaultButton({
        objectType: "feed",
        container: "#sendKakao",
        content: {
          title: `${GROOM_NAME.slice(1)}❤${BRIDE_NAME.slice(1)} 결혼식에 초대합니다.`,
          description: description_kakao,
          imageUrl: KAKAOTALK_SHARE_IMAGE,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "청첩장 열기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
        installTalk: true,
      });

      setTimeout(() => {
        document.getElementById("sendKakao")?.click();
        message.success("카카오톡으로 청첩장을 공유합니다!");
      }, 100);
    }
  };

  return (
    <Wrapper>
      <Divider
        data-aos="fade-up"
        plain
        style={{ marginTop: 0, marginBottom: 32 }}
      >
        <Title>청첩장 공유하기</Title>
      </Divider>
      <KakaoTalkShareButton
        style={{ margin: 0 }}
        icon={<MessageFilled />}
        id="sendKakao"
        size="large"
        onClick={createKakaoButton}
      >
        <span style={{fontFamily: "MaruBuri"}}>카카오톡으로 공유하기</span>
      </KakaoTalkShareButton>
      <CopyToClipboard text={WEDDING_INVITATION_URL}>
        <LinkShareButton
          style={{ margin: 0 }}
          icon={<LinkOutlined />}
          size="large"
          onClick={() => message.success("청첩장 링크가 복사되었습니다.")}
        >
          <span style={{fontFamily: "MaruBuri"}}>링크로 공유하기</span>
        </LinkShareButton>
      </CopyToClipboard>
    </Wrapper>
  );
};

export default Share;
