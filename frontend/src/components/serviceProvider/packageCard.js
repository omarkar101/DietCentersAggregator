import React from "react";
import styled from "styled-components";

const PackageCard = (props) => {
  const { plan } = props;

  return (
    <PackageCardWrapper>
      <ImageWrapper>
            <ImageStyle src={plan.image} alt='No Image' />
          </ImageWrapper>
      <ItemTextWrapper>
        <ItemNameContanier>{plan.name}</ItemNameContanier>
        <ItemPriceContainer>{plan.price} $</ItemPriceContainer>
        <ItemCounterContainer>Days: {plan.meal_plan_uses}</ItemCounterContainer>
        <ItemDescriptionParagraph>{plan.description}</ItemDescriptionParagraph>
      </ItemTextWrapper>
      <PackageAvailabilityContainer>{plan.isavailable? "" : "Not Available"}</PackageAvailabilityContainer>
    </PackageCardWrapper>
  );
};

const ImageWrapper = styled.div`
  height: 8rem;
  width: 10rem;
  position: relative;
  margin-right: 2rem;
  visibility: visible;
`;

const ImageStyle = styled.img`
  width: 100%;
  height: 100%;
`;

const PackageCardWrapper = styled.div`
  font-size: 1.6rem;
  padding: 10px;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: row;
  border: 2px solid #1f9370;
  border-radius: 12px;
  width: 100%;
  background-color: rgba(31, 147, 112, 0.04);
`;

const ItemNameContanier = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: rgb(28, 28, 28);
  line-height: 150%;
  margin: 0;
`;

const ItemPriceContainer = styled.div`
  margin-top: 0.7rem; 
  font-size: 1rem;
  color: rgb(28, 28, 28);
`;
const ItemCounterContainer = styled.div`
  font-size: 1rem;
  color: rgb(28, 28, 28);
`;

const ItemDescriptionParagraph = styled.p`
  font-size: 1rem;
  color: rgb(79, 79, 79);
  max-width: 75%;
`;

const PackageAvailabilityContainer = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: #d10000;
`;

const ItemTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 95%;
`;

export default PackageCard;
