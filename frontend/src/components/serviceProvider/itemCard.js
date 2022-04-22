import React from "react";
import styled from "styled-components";

const ItemCard = (props) => {
    const { item } = props;
    return (
        <ItemWrapper>
          <ImageWrapper>
            <ImageStyle src={item.image_url} alt='No Image' />
          </ImageWrapper>
          <ItemTextAndButtonWrapper>
            <ItemTextWrapper>
              <ItemNameContanier>{item.name}</ItemNameContanier>
              <ItemPriceContainer>{item.category}</ItemPriceContainer>
              <ItemDescriptionParagraph>
                {item.description}
              </ItemDescriptionParagraph>
            </ItemTextWrapper>
          </ItemTextAndButtonWrapper>
        </ItemWrapper>
    );
}

const ItemWrapper = styled.div`
  font-size: 1.6rem;
  padding: 20px 10px 20px 10px;
  margin-bottom: 3.5rem;
  display: flex;
  flex-direction: row;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid rgb(232, 232, 232);
`;

const ImageWrapper = styled.div`
  height: 9rem;
  width: 9rem;
  position: relative;
  margin-right: 2rem;
  margin-bottom: 0px;
  flex-shrink: 0px;
  border-radius: 0.8rem;
  visibility: visible;
  transition: all 0.12s ease 0s;
`;

const ImageStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: none;
  opacity: 1;
  will-change: transform, opacity;
  border-radius: inherit;
  filter: unset;
  transition: opacity 0.25s ease 0s, transform 0.25s ease 0s;
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

const ItemDescriptionParagraph = styled.p`
  margin: 0.5rem 0px;
  font-size: 1.4rem;
  color: rgb(79, 79, 79);
  max-width: 75%;
  overflow-wrap: break-word;
`;

const ItemTextAndButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ItemTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 95%;
`;


export default ItemCard;
