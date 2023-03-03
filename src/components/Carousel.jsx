import { Typography } from "@mui/material";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import styled from "styled-components";
import bitcoin from "../assets/bitcoin.png";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
  1324: { items: 4 },
  1824: { items: 5 },
};

const Div = styled.div`
  width: 250px;
  height: 250px;
  text-align: center;
  margin-top: 1rem;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
`;

const items = [
  <Div className="Carousel_item-box" data-value="1">
    <Img src={bitcoin} />
    <Typography variant="h5">
      BTC
      <Typography level="h5" component="p" color={"red"} display={"inline"}>
        +0.20%
      </Typography>
    </Typography>
    <Typography variant="h5">$1,932,546.00</Typography>
  </Div>,
  <Div className="Carousel_item-box" data-value="1">
    <Img src={bitcoin} />
    <Typography variant="h5">
      BTC
      <Typography level="h5" component="p" color={"red"} display={"inline"}>
        +0.20%
      </Typography>
    </Typography>
    <Typography variant="h5">$1,932,546.00</Typography>
  </Div>,
  <Div className="Carousel_item-box" data-value="1">
    <Img src={bitcoin} />
    <Typography variant="h5">
      BTC
      <Typography level="h5" component="p" color={"red"} display={"inline"}>
        +0.20%
      </Typography>
    </Typography>
    <Typography variant="h5">$1,932,546.00</Typography>
  </Div>,
  <Div className="Carousel_item-box" data-value="1">
    <Img src={bitcoin} />
    <Typography variant="h5">
      BTC
      <Typography level="h5" component="p" color={"red"} display={"inline"}>
        +0.20%
      </Typography>
    </Typography>
    <Typography variant="h5">$1,932,546.00</Typography>
  </Div>,
  <Div className="Carousel_item-box" data-value="1">
    <Img src={bitcoin} />
    <Typography variant="h5">
      BTC
      <Typography level="h5" component="p" color={"red"} display={"inline"}>
        +0.20%
      </Typography>
    </Typography>
    <Typography variant="h5">$1,932,546.00</Typography>
  </Div>,
];

const Carousel = () => (
  <AliceCarousel
    autoPlay
    autoPlayStrategy="none"
    autoPlayInterval={1000}
    animationDuration={1000}
    animationType="fadeout"
    infinite
    touchTracking={false}
    disableDotsControls
    disableButtonsControls
    items={items}
    responsive={responsive}
    controlsStrategy="alternate"
  />
);
export default Carousel;
