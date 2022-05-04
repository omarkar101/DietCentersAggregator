import React from "react";
import styled from "styled-components";

const PackageCard = (props) => {
  const { plan } = props;

  return (
    <PackageCardWrapper>
      <ItemTextWrapper>
        <ItemNameContanier>{plan.name}</ItemNameContanier>
        <ItemPriceContainer>{plan.price}</ItemPriceContainer>
        <ItemCounterContainer>{plan.meal_plan_uses}</ItemCounterContainer>
        <ItemDescriptionParagraph>{plan.description}</ItemDescriptionParagraph>
      </ItemTextWrapper>
      <PackageAvailabilityContainer>{plan.isavailable? "Available" : "Not Available"}</PackageAvailabilityContainer>
    </PackageCardWrapper>
  );
};

const PackageCardWrapper = styled.div`
  font-size: 1.6rem;
  padding: 10px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: 100%;
  justify-content: space-between;
  position: relative;
`;

const ItemNameContanier = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: rgb(28, 28, 28);
  line-height: 150%;
  margin: 0;
`;

const ItemPriceContainer = styled.div`
  margin: 0.7rem 0px;
  font-size: 1.4rem;
  color: rgb(28, 28, 28);
`;
const ItemCounterContainer = styled.div`
  margin: 0.7rem 0px;
  font-size: 1.4rem;
  color: rgb(28, 28, 28);
`;

const ItemDescriptionParagraph = styled.p`
  margin: 0.5rem 0px;
  font-size: 1.4rem;
  color: rgb(79, 79, 79);
  max-width: 75%;
  overflow-wrap: break-word;
`;

const PackageAvailabilityContainer = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: rgb(28, 28, 28);
  position: absolute;
  bottom: 10px;
  right: 20px;
`;

const ItemTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 95%;
`;

export default PackageCard;
