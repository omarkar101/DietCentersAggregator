import React from "react";
import { useCallback, useReducer, useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const PackageCard = (props) => {
    const { plan, openModal } = props;

    const onClickPackage = useCallback(() => {
      openModal(plan.id);
    }, []);

    return (
        <PackageCardWrapper>
            {/* <ItemTextAndButtonWrapper> */}
            <ItemTextWrapper>
                <ItemNameContanier>{plan.name}</ItemNameContanier>
                <ItemPriceContainer>{plan.price}</ItemPriceContainer>
                <ItemCounterContainer>{plan.meal_plan_uses}</ItemCounterContainer>
                <ItemDescriptionParagraph>
                {plan.description}
                </ItemDescriptionParagraph>
            </ItemTextWrapper>
            {/* <ButtonContainer>
                <AddSpanStyle>ADD</AddSpanStyle>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#CFCFCF" width="16" height="16" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img">
                <path d="M15.5 9.42h-4.5v-4.5c0-0.56-0.44-1-1-1s-1 0.44-1 1v4.5h-4.5c-0.56 0-1 0.44-1 1s0.44 1 1 1h4.5v4.5c0 0.54 0.44 1 1 1s1-0.46 1-1v-4.5h4.5c0.56 0 1-0.46 1-1s-0.44-1-1-1z"></path>
                </svg>
            </ButtonContainer> */}
            {/* </ItemTextAndButtonWrapper> */}
            <Button onClick={onClickPackage}
            
            style={{backgroundColor: 'transparent', border: 'solid 1px #114f3cd9', height: '3.2rem', color: "#114f3cd9"}}>
              details
            </Button>
        </PackageCardWrapper>
    );

}

const PackageCardWrapper = styled.div`
  font-size: 1.6rem;
  padding: 10px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: 100%;
  justify-content: space-between;
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
  fontsize: 1.4rem;
  color: rgb(28, 28, 28);
`;
const ItemCounterContainer = styled.div`
  margin: 0.7rem 0px;
  fontsize: 1.4rem;
  color: rgb(28, 28, 28);
`;

const ItemDescriptionParagraph = styled.p`
  margin: 0.5rem 0px;
  font-size: 1.4rem;
  color: rgb(79, 79, 79);
  max-width: 75%,
  overflow-wrap: break-word;
`;

const AddSpanStyle = styled.span`
  color: rgb(207, 207, 207);
  font-size: 1.4rem;
  margin: 0px 0.5rem;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  webkit-box-align: center;
  align-items: center;
  webkit-box-pack: center;
  justify-content: center;
  width: 8.2rem;
  height: 3.2rem;
  border: 0.5px solid rgb(232, 232, 232);
  border-radius: 0.8rem;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  background: rgb(248, 248, 248);
  position: relative;
`;

const ItemTextAndButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  webkit-box-pack: justify;
  justify-content: space-between;
`;

const ItemTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 95%;
`;


export default PackageCard;
