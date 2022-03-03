import React from "react";
import styled from "styled-components";

const ImagesSection = (props) => {
  const { name, description, stars, reviews, images } = props;

  return (
    <section style={{ position: "relative" }}>
      <ImagesContainer>
        <BigImageContainer>
          <MainServiceProviderDetailsMainSection>
            <MainServiceProviderDetailsSubSection>
              <ServiceProviderName>{name}</ServiceProviderName>
            </MainServiceProviderDetailsSubSection>
            <RestaurantTitleDescription>
              <div>{description}</div>
            </RestaurantTitleDescription>
            <br />
            <RestaurantTitleDescription>
              <div>Contact Info of the Service Provider</div>
              <div>Phone Number</div>
            </RestaurantTitleDescription>

            <div style={{ position: "absolute", bottom: 0 }}>
              <RatingSection>
                <RatingBoxDiv>
                  <div style={{ display: "block" }}>
                    <RatingBoxSubDiv>
                      <RatingNumber>{stars}</RatingNumber>
                    </RatingBoxSubDiv>
                  </div>
                </RatingBoxDiv>
                <ReviewView>
                  <NumberReviews>{reviews}</NumberReviews>
                  <ReviewsText>Reviews</ReviewsText>
                </ReviewView>
              </RatingSection>

              <AddReviewSection>
                <AddReviewSubSection>
                  <AddAReviewButton>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="black"
                      width="15"
                      height="15"
                      viewBox="0 0 20 20"
                      aria-labelledby="icon-svg-title- icon-svg-desc-"
                      role="img"
                      style={{
                        backgrounddisplay: "inline-block",
                        verticalAlign: "middle",
                        lineHeight: 1,
                      }}
                    >
                      <path d="M10 3.28l1.9 4.12 0.32 0.7 0.76 0.1 4.5 0.68-3.3 3.38-0.46 0.54 0.1 0.7 0.78 4.66-3.9-2.14-0.7-0.36-0.7 0.38-3.88 2.1 0.76-4.66 0.1-0.68-0.5-0.52-3.3-3.38 5.26-0.8 0.32-0.7 1.94-4.12zM6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z"></path>
                    </svg>
                    <AddReviewText>Add Review</AddReviewText>
                  </AddAReviewButton>
                </AddReviewSubSection>
              </AddReviewSection>
            </div>
          </MainServiceProviderDetailsMainSection>
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


const AddReviewText = styled.span`
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
  font-size: inherit;
  transition: transform 0.4s ease 0s;
`;

const AddAReviewButton = styled.button`
  min-width: auto;
  min-height: 36px;
  display: inline-flex;
  border-radius: 0.6rem;
  border: none;
  cursor: pointer;
  vertical-align: middle;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  line-height: 36px;
  margin-top: 0px;
  margin-left: 0px;
  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 300;
  color: black;
  opacity: 1;
  background: border-box transparent;
  border: solid 1px black;
  padding: 0px 1.6rem;
  transition: transform 0.25s ease 0s, opacity 0.25s ease 0s,
    box-shadow 0.25s ease 0s;
  outline: none !important;
`;

const ReviewView = styled.div`
  display: block;
  font-size: inherit;
  margin-left: 0.8rem;
`;

const NumberReviews = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.8rem;
  padding-bottom: 0px;
  border-bottom: unset;
  color: rgb(54, 54, 54);
`;

const ReviewsText = styled.div`
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.6rem;
  padding-bottom: 0.2rem;
  border-bottom: 0.5px dashed rgb(181, 181, 181);
  color: rgb(54, 54, 54);
`;

const RatingBoxSubDiv = styled.div`
  display: flex;
  box-align: center;
  align-items: center;
  font-size: inherit;
  cursor: unset;
`;

const RatingNumber = styled.div`
  margin-right: 0.2rem;
  font-weight: 600;
  font-size: inherit;
  padding-bottom: 0.1rem;
`;

const ServiceProviderName = styled.h1`
  line-height: 1.2;
  color: rgb(28, 28, 28);
  margin: 0px;
  font-weight: 500;
  font-size: 3.6rem;
  cursor: pointer;
`;

const MainServiceProviderDetailsMainSection = styled.section`
  width: calc(100%);
  padding: 1rem;
`;

const RestaurantTitleDescription = styled.section`
  font-size: 1.8rem;
  line-height: 1.5;
  color: rgb(130, 130, 130);
  margin-top: 0.5rem;
`;

const AddReviewSection = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: center;
`;

const AddReviewSubSection = styled.section`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 1.5rem;
  padding-bottom: 1rem;
  pointer-events: all;
  opacity: 1;
  transition: opacity 0.2s ease-in-out 0s;
`;

const MainServiceProviderDetailsSubSection = styled.section`
  display: flex;
  -moz-box-pack: justify;
  justify-content: space-between;
  width: 100%;
`;

const RatingSection = styled.section`
  display: flex;
  box-align: center;
  align-items: center;
`;

const RatingBoxDiv = styled.div`
  display: flex;
  box-align: center;
  align-items: center;
  box-pack: center;
  justify-content: center;
  background-color: rgb(38, 126, 62);
  color: rgb(255, 255, 255);
  height: 2.6rem;
  min-width: 3rem;
  padding: 0px 0.4rem;
  font-size: 17px;
  border-radius: 0.6rem;
  border: 1px solid rgb(38, 126, 62);
`;

const PageBase = styled.div`
  position: relative;
  max-width: 110rem;
  align-self: center;
  max-height: initial;
  margin: 0 auto;
  font-size: 1.6rem;
  box-sizing: inherit;
  font-weight: 300;
  padding: 50px;
`;

export default ImagesSection;
