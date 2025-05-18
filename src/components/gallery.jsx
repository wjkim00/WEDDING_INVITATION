import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Divider, Modal } from "antd";
import styled from "styled-components";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

// const CDN_BASE = "https://cdn.jsdelivr.net/gh/wjkim00/WEDDING_INVITATION/src/assets/imgs/";
const ResponsiveWrapper = styled.div`
  /* 기본: 화면 전체 너비 */
  width: 90%;
  max-width: 1200px;   /* 너무 커지지 않도록 제한 */
  margin: 0 auto;      /* 가운데 정렬 */

  /* 중간 크기 이상부터: 2단 레이아웃 */
  @media (min-width: 768px) {
    width: 50%;
  }

  /* 데스크탑 크기 이상: 3단 레이아웃 */
  @media (min-width: 1024px) {
    width: 33.33%;
  }
`;

const Wrapper = styled.div`
  padding-top: 4rem;
  width: 90%;
  margin: 0 auto;
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


const SlideContainer = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: .5rem;
  cursor: pointer;
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Slide = styled.div`
  width: 100%;
  aspect-ratio: 4 / 6;
  position: relative;
  & > div {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: var(--background-color) !important;
    box-shadow: none !important;
    border: none !important;
    padding: 0 !important;
  }
`;


// Nav button base
const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
`;

// Prev/Next specific
const PrevButton = styled(NavButton)`
  left: 1rem;
`;

const NextButton = styled(NavButton)`
  right: 1rem;
`;

// Container to show buttons on hover
const ModalContent = styled.div`
  position: relative;
  &:hover ${NavButton} {
    opacity: 1;
  }
`;


const Gallery = () => {
  const data = useStaticQuery(graphql`
    query GalleryImages {
      allFile(
        filter: {
          sourceInstanceName: { eq: "imgs" }
          extension: { regex: "/(webp)$/" }
        }
        sort: { name: ASC }
      ) {
        nodes {
          id
          name
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              width: 800
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              quality: 80
            )
          }
        }
      }
    }
  `);

  const nodes = data.allFile.nodes;
  const images = nodes.map(node => getImage(node.childImageSharp.gatsbyImageData));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainSwiper,   setMainSwiper]   = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Wrapper>
        <Divider style={{ marginTop: 0, marginBottom: 32 }} plain>
          <Title>GALLERY</Title>
        </Divider>
      </Wrapper>

      <ResponsiveWrapper>
        <SlideContainer onClick={() => setModalVisible(true)}>
          <Swiper
            modules={[FreeMode, Thumbs]}
            onSwiper={setMainSwiper}
            loop={true}
            spaceBetween={8}
            slidesPerView={1}
            slidesPerGroup={1}
            navigation={false}
            thumbs={{ swiper: thumbsSwiper }}
            onSlideChange={({ realIndex }) => setCurrentIndex(realIndex)}
            className="main-swiper"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={nodes[idx].id}>
                <Slide>
                  <GatsbyImage
                    image={img}
                    alt={nodes[idx].name}
                    style={{ width: '100%', height: '100%' }}
                    imgStyle={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </Slide>
              </SwiperSlide>
            ))}
          </Swiper>
        </SlideContainer>

        <Swiper
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={8}
          slidesPerView={6}
          slidesPerGroup={1}
          freeMode={true}
          watchSlidesProgress={true}
          style={{ marginTop: 8 }}
          className="thumbs-swiper"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={`thumb-${nodes[idx].id}`}>
              <GatsbyImage
                image={img}
                alt={nodes[idx].name}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                imgStyle={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ResponsiveWrapper>


      <StyledModal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        closable={false}
        maskClosable
        width="100%"
        style={{ top: 0, padding: 0 }}
        centered
      >
        <ModalContent>
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={3}
            wheel={{ step: 0.1 }}           // 마우스 휠 줌 속도
            pinch={{ step: 5 }}             // 터치 핀치 줌 민감도
            doubleClick={{ disabled: false }} // 더블클릭 줌 허용
            panning={{ disabled: true }}
          >
            <TransformComponent>
              <GatsbyImage
                image={images[currentIndex]}
                alt={nodes[currentIndex].name}
                style={{ width: '100%', height: 'auto' }}
                imgStyle={{ objectFit: 'contain' }}
              />
            </TransformComponent>
          </TransformWrapper>

          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              transform: 'translateY(-50%)',
            }}
          >
            <PrevButton onClick={() => mainSwiper?.slidePrev()}>
              {"<"}
            </PrevButton>
            <NextButton onClick={() => mainSwiper?.slideNext()}>
              {">"}
            </NextButton>
          </div>
        </ModalContent>
      </StyledModal>
    </>
  );
};

export default Gallery;