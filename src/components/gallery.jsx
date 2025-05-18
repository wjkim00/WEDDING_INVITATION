import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Divider, Modal } from "antd";
import styled from "styled-components";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Controller, Zoom } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

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

  .ant-modal-close {
    display: none !important;
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
  const [mainSwiper, setMainSwiper]     = useState(null);
  const [modalSwiper, setModalSwiper]   = useState(null);
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
            modules={[FreeMode, Thumbs, Controller]}
            onSwiper={setMainSwiper}
            controller={{ control: modalSwiper || undefined }}
            loop={true}
            spaceBetween={8}
            slidesPerView={1}
            navigation={false}
            thumbs={{ swiper: thumbsSwiper }}
            onSlideChange={({ activeIndex }) => setCurrentIndex(activeIndex)}
            className="main-swiper"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={nodes[idx].id}>
                <Slide>
                  <GatsbyImage
                    image={img}
                    alt={nodes[idx].name}
                    loading="lazy"
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
                loading="lazy"
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
        footer={null}
        onCancel={() => setModalVisible(false)}
        closable={false}
        maskClosable
        width="100%"
        style={{ top: 0, padding: 0 }}
        centered
        keyboard
        className="modal-swiper"
      >
        <Swiper
          modules={[FreeMode, Thumbs, Controller, Zoom]}
          onSwiper={setModalSwiper}
          controller={{ control: mainSwiper || undefined }}
          loop={true}
          spaceBetween={8}
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper }}
          initialSlide={currentIndex}
          onSlideChange={({ activeIndex }) => setCurrentIndex(activeIndex)}
          zoom={true}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={nodes[idx].id}>
              <div className="swiper-zoom-container">
                <GatsbyImage
                  image={img}
                  loading="lazy"
                  alt={nodes[idx].name}
                  style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                  imgStyle={{ objectFit: 'contain', objectPosition: 'center', borderRadius: '16px' }}
                  className="swiper-zoom-target"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </StyledModal>
    </>
  );
};

export default Gallery;