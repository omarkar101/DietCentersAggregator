import React from "react";
import styled from "styled-components";
import serviceProviderBigImg from "./serviceProviderBigImg.jpg";
import StarImg from './star.svg';

const ServiceProviderPage = () => {

  const serviceProviderName = 'Mr. Brown';
  return (
    <PageBase>
      {/* images section */}
      <section style={{ position: "relative" }}>
        <h1>Hello</h1>
        <ImagesContainer>
          <BigImageContainer>
            <BigImage src={serviceProviderBigImg} />
          </BigImageContainer>
          <SmallImagesSection>
            <SmallImageContainer>
              <SmallImage src={serviceProviderBigImg} />
            </SmallImageContainer>
            <SmallImageContainer>
              <SmallImage src={serviceProviderBigImg} />
            </SmallImageContainer>
          </SmallImagesSection>
          <SmallImagesSection>
            <SmallImageContainer>
              <SmallImage src={serviceProviderBigImg} />
            </SmallImageContainer>
            <SmallImageContainer>
              <SmallImage src={serviceProviderBigImg} />
            </SmallImageContainer>
          </SmallImagesSection>
        </ImagesContainer>
      </section>

      <MainServiceProviderDetailsMainSection>
        <MainServiceProviderDetailsSubSection>
          <MainServiceProviderDetailsDiv>
            <MainServiceProviderTitleDiv>
              <ServiceProviderName>{serviceProviderName}</ServiceProviderName>
              <RatingSection>
                <RatingDiv>
                  <RatingBoxDiv>
                    <div style={{display: 'block'}}>
                      <RatingBoxSubDiv>
                        <RatingNumber>4.2</RatingNumber>
                        <StarSvg>
                          {/* <StarImg style={{'display': 'inline-block', 'vertical-align': 'middle', 'line-height': 1}} /> */}
                        </StarSvg>
                      </RatingBoxSubDiv>
                    </div>
                  </RatingBoxDiv>
                  <ReviewView>
                    <NumberReviews>1,123</NumberReviews>
                    <ReviewsText>People Reviewed</ReviewsText>
                  </ReviewView>
                </RatingDiv>
              </RatingSection>
            </MainServiceProviderTitleDiv>
          </MainServiceProviderDetailsDiv>
        </MainServiceProviderDetailsSubSection>
      </MainServiceProviderDetailsMainSection>
    </PageBase>
  );
};

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

const StarSvg = styled.i`
  display: flex;
  box-align: center;
  align-items: center;
  cursor: inherit;
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
  width: calc(100% + 1rem);
  padding-right: 1rem;
`;

const MainServiceProviderDetailsSubSection = styled.section`
  display: flex;
  -moz-box-pack: justify;
  justify-content: space-between;
  width: 100%;
`;

const MainServiceProviderDetailsDiv = styled.div`
  display: flex;
  box-align: center;
  align-items: center;
  width: 100%;
  box-pack: justify;
  justify-content: space-between;
`;

const MainServiceProviderTitleDiv = styled.div`
  display: flex;
  box-align: center;
  align-items: center;
  width: 100%;
  box-pack: justify;
  justify-content: space-between;
`;

const RatingSection = styled.section`
  display: flex;
  box-align: end;
  align-items: end;
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

const RatingDiv = styled.div`
  display: flex;
  box-align: center;
  align-items: center;
  font-size: inherit;
  cursor: pointer;
`;

const PageBase = styled.div`
  position: relative;
  max-width: 110rem;
  max-height: initial;
  margin: 1rem 20px 0px;
  font-size: 1.6rem;
  box-sizing: inherit;
  font-weight: 300;
`;

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
  transition: transform 0.4s cubic-bezier(0.73, -0.53, 0.58, 1) 0s, opacity 1.63s ease 0s, filter 0.4s ease 0s;
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
  margin: 0px 0px 0.3rem;
  overflow: hidden;
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
  transition: transform 0.4s cubic-bezier(0.73, -0.53, 0.58, 1) 0s, opacity 1.63s ease 0s, filter 0.4s ease 0s;
`;

export default ServiceProviderPage;
