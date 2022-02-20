import React from "react";
import styled from "styled-components";

const ImagesSection = (props) => {
  const {
    images
  } = props;

  return (
    <section style={{ position: "relative" }}>
        <ImagesContainer>
          <BigImageContainer>
            <BigImage src={images[0]} />
          </BigImageContainer>
          <SmallImagesSection>
            <SmallImageContainer>
              <SmallImage src={images[1]} />
            </SmallImageContainer>
            <SmallImageContainer>
              <SmallImage src={images[2]} />
            </SmallImageContainer>
          </SmallImagesSection>
          <SmallImagesSection>
            <SmallImageContainer>
              <SmallImage src={images[3]} />
            </SmallImageContainer>
            <SmallImageContainer>
              <SmallImage src={images[4]} />
            </SmallImageContainer>
          </SmallImagesSection>
        </ImagesContainer>
      </section>
  );
};

const ImagesContainer = styled.div`
  width: 100%;
  display: flex;
  height: 37rem;
`;

const BigImageContainer = styled.div`
  min-width: 62.4%;
  max-width: 100%;
  width: 62.4%;
  height: 100%;
  position: relative;
  cursor: pointer;
  margin: 0px;
  overflow: hidden;
`;

const BigImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: none;
  opacity: 1;
  will-change: transform, opacity;
  alt: "img";
  transition: transform 0.4s cubic-bezier(0.73, -0.53, 0.58, 1) 0s,
    opacity 1.63s ease 0s, filter 0.4s ease 0s;
`;

const SmallImagesSection = styled.section`
  width: 100%;
  height: 100%;
  margin-left: 0.6rem;
  display: flex;
  flex-direction: column;
`;

const SmallImageContainer = styled.div`
  min-width: 62.4%;
  max-width: 100%;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  margin: 0px 0px 0.3rem;
`;

const SmallImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: none;
  opacity: 1;
  will-change: transform, opacity;
  border-radius: inherit;
  filter: brightness(0.95);
  transition: transform 0.4s cubic-bezier(0.73, -0.53, 0.58, 1) 0s,
    opacity 1.63s ease 0s, filter 0.4s ease 0s;
`;


export default ImagesSection;