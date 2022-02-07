import React from "react";
import styled from "styled-components";
import serviceProviderBigImg from "./serviceProviderBigImg.jpg";
// import StarImg from './star.svg';
import MenuCards from './MenuCards';

const ServiceProviderPage = () => {
  const serviceProviderName = "Mr. Brown";
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
          <ServiceProviderName>{serviceProviderName}</ServiceProviderName>

          <RatingSection>
            <RatingDiv>
              <RatingBoxDiv>
                <div style={{ display: "block" }}>
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
                <ReviewsText>Reviews</ReviewsText>
              </ReviewView>
            </RatingDiv>
          </RatingSection>
        </MainServiceProviderDetailsSubSection>
        <RestaurantTitleDescription>
          <div>American, Italian, Salad, Burger, Sandwich, Pizza</div>
        </RestaurantTitleDescription>
      </MainServiceProviderDetailsMainSection>
      <AddReviewSection>
        <AddReviewSubSection>
          <AddAReviewButton>
            <AddAReviewSpan>
              <i
                style={{ transition: "transform 0.4s ease 0s" }}
                color="#FFFFFF"
                size="10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#FFFFFF"
                  width="10"
                  height="10"
                  viewBox="0 0 20 20"
                  aria-labelledby="icon-svg-title- icon-svg-desc-"
                  role="img"
                  style={{
                    backgrounddisplay: "inline-block",
                    verticalAlign: "middle",
                    lineHeight: 1,
                    width: 10,
                    height: 10,
                  }}
                >
                  <title>star-empty</title>
                  <path d="M10 3.28l1.9 4.12 0.32 0.7 0.76 0.1 4.5 0.68-3.3 3.38-0.46 0.54 0.1 0.7 0.78 4.66-3.9-2.14-0.7-0.36-0.7 0.38-3.88 2.1 0.76-4.66 0.1-0.68-0.5-0.52-3.3-3.38 5.26-0.8 0.32-0.7 1.94-4.12zM6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z"></path>
                </svg>
              </i>

              <AddReviewText>Add Review</AddReviewText>
            </AddAReviewSpan>
          </AddAReviewButton>
        </AddReviewSubSection>
      </AddReviewSection>

      <article
        style={{
          backgroundposition: "sticky",
          top: 196,
          alignSelf: "flex-start",
          zIndex: 2,
          width: "100%",
          paddingRight: "1rem",
          backgroundColor: "rgb(255, 255, 255)",
          transform: "translateZ(0px)",
          transition: "transform 0.2s ease-in-out 0s",
        }}
      >
        <div
          style={{
            position: "relative",
            overflowY: "auto",
            backgroundColor: "white",
          }}
        >
          <section
            style={{
              width: "100%",
              maxWidth: "110rem",
              overflow: "auto hidden",
              minHeight: "6.2rem",
              position: "relative",
            }}
          >
            <section
              role="tablist"
              style={{
                marginLeft: 0,
                paddingLeft: 0,
              }}
            >
              <div
                id="TabLink__0"
                tabindex="0"
                role="tab"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  webkitBoxPackAlign: "center",
                  justifyContent: "center",
                  webkitBoxAlign: "center",
                  alignItems: "center",
                  maxHeight: "100%",
                  marginRight: "2rem",
                  cursor: "pointer",
                }}
              >
                <h2
                  id="TabLink__0"
                  tabindex="-1"
                  style={{
                    marginLeft: "1rem",
                    paddingLeft: "0.8rem",
                  }}
                >
                  <div
                    style={{
                      textDecoration: "none",
                      fontSize: "1.8rem",
                      fontWeight: 500,
                      color: "rgb(239, 79, 95)",
                    }}
                  >
                    Orde Online
                  </div>
                </h2>
                <hr
                  style={{
                    alignSelf: "flex-start",
                    width: "100%",
                  }}
                />
              </div>
            </section>
          </section>
        </div>
      </article>

      <section style={{ width: "100%" }}>
        <section style={{ display: "flex" }}>
          <section style={{ width: "21rem" }}>
            <p
              color="#363636"
              selected=""
              style={{
                backgroundfontSize: "inherit",
                lineHeight: 1.5,
                margin: 0,
                cursor: "pointer",
                padding: "0.8rem 2rem",
                fontWeight: 500,
                color: "rgb(239, 79, 95)",
                borderRight: "3px solid rgb(239, 79, 95)",
                background:
                  "linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 237, 239))",
              }}
            >
              Recommended (12)
            </p>
            <ParagraphStyled>Sizzler (1)</ParagraphStyled>
            <ParagraphStyled color="#363636">
              Soups and Salads (15)
            </ParagraphStyled>
            <ParagraphStyled color="#363636">Starters (29)</ParagraphStyled>
            <ParagraphStyled>Shakahari Pakwan (62)</ParagraphStyled>
            <ParagraphStyled>Main Course (15)</ParagraphStyled>
            <ParagraphStyled>Breads (30)</ParagraphStyled>
            <ParagraphStyled>Rice and Biryani (23)</ParagraphStyled>
            <ParagraphStyled>South Indian (37)</ParagraphStyled>
            <ParagraphStyled>Fried Rice and Noodles (20)</ParagraphStyled>
            <ParagraphStyled>Sandwiches (6)</ParagraphStyled>
            <ParagraphStyled>Wonton (1)</ParagraphStyled>
            <ParagraphStyled>Snacks and Chaat (41)</ParagraphStyled>
            <ParagraphStyled>Accompaniments (8)</ParagraphStyled>
            <ParagraphStyled>Desserts and Beverages (57)</ParagraphStyled>
          </section>

          <section
            style={{
              paddingLeft: "2rem",
              flex: "1 1 0%",
              minWidth: "50%",
              borderLeft: "1px solid rgb(232, 232, 232)",
              paddingRight: "1rem",
            }}
          >
            <SectionHeaderContainer>
              <HeaderStyled>Order Online</HeaderStyled>
            </SectionHeaderContainer>

            <section style={{ position: "relative" }}>
              <MenuSectionTitle>Recommended</MenuSectionTitle>
            </section>

            <MenuCards/>
            <MenuCards/>
            <MenuCards/>
            <MenuCards/>
            <MenuCards/>



          </section>
        </section>
      </section>
    </PageBase>
  );
};

const MenuSectionTitle = styled.h4`
  font-size: 2.4rem;
  line-height: 1.2;
  color: rgb(28, 28, 28);
  margin: 0px;
  margin-block-end: 0px;
  position: sticky;
  top: 149px;
  padding: 1.4rem 0px;
  background: rgb(255, 255, 255);
  font-weight: 500;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
`;

const HeaderStyled = styled.h2`
  line-height: 1.2;
  color: rgb(28, 28, 28);
  margin: 0px;
  font-weight: 500;
  font-size: 2.4rem;
`;

const SectionHeaderContainer = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

const ParagraphStyled = styled.p`
  font-size: inherit;
  line-height: 1.5;
  margin: 0px;
  cursor: pointer;
  padding: 0.8rem 2rem;
  font-weight: 300;
  color: rgb(28, 28, 28);
  border-right: none;
  background: none;
  color: #363636;
`;

const AddReviewText = styled.span`
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
  font-size: inherit;
  transition: transform 0.4s ease 0s;
`;

const AddAReviewSpan = styled.span`
  display: inline-flex;
  vertical-align: middle;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  min-width: auto;
  min-height: 36px;
  line-height: 36px;
  margin-top: 0px;
  margin-left: 0px;
  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 300;
  color: rgb(255, 255, 255);
  opacity: 1;
  background: border-box rgb(239, 79, 95);
  border-color: rgb(239, 79, 95);
  border-width: 0px;
  border-style: solid;
  border-radius: 0.6rem;
  padding: 0px 1.6rem;
  transition: transform 0.25s ease 0s, opacity 0.25s ease 0s,
    box-shadow 0.25s ease 0s;
  outline: none !important;
`;

const AddAReviewButton = styled.button`
  min-width: auto;
  min-height: 36px;
  display: inline-flex;
  -webkit-box-align: stretch;
  align-items: stretch;
  border-radius: 0.6rem;
  background: transparent;
  padding: 0px;
  border: none;
  cursor: pointer;
  margin-right: 1rem;
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
  -webkit-box-align: center;
  align-items: center;
  padding: 1rem;
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
  padding: 50px;
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
  transition: transform 0.4s cubic-bezier(0.73, -0.53, 0.58, 1) 0s,
    opacity 1.63s ease 0s, filter 0.4s ease 0s;
`;

export default ServiceProviderPage;
