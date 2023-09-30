"use client";

import Image from "next/image";
import Carousel from "nuka-carousel";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

import { Screenshot } from "@/services/types";

import { styled } from "../../../styled-system/jsx";
import { token } from "../../../styled-system/tokens";

const ControlButton = styled("button", {
  base: {
    p: 3,
    cursor: "pointer",
    "&:disabled": {
      cursor: "auto",
      opacity: 0.3,
    },
    "& svg": {
      fill: "slate.300",
      width: 6,
      height: 6,
    },
  },
});

type ScreenshotsGalleryProps = {
  screenshots: Screenshot[];
  game: string;
};

export default function ScreenshotsGallery(props: ScreenshotsGalleryProps) {
  const { game, screenshots = [] } = props;
  const maxWidth = token("breakpoints.2xl");

  return (
    <styled.div
      css={{
        "& svg.paging-dot": {
          fill: "white",
          width: 2,
          height: 2,
        },
        "& li.paging-item.active > button > svg": {
          width: 2.5,
          height: 2.5,
        },
        "& li.active svg.paging-dot": {
          fill: "primary",
        },
      }}
    >
      <Carousel
        autoplay
        autoplayInterval={6000}
        wrapAround
        defaultControlsConfig={{
          pagingDotsStyle: {
            alignItems: "center",
            margin: "0 4px",
          },
        }}
        renderCenterLeftControls={(props) => (
          <ControlButton
            onClick={props.previousSlide}
            disabled={props.previousDisabled}
          >
            <FaChevronCircleLeft />
          </ControlButton>
        )}
        renderCenterRightControls={(props) => (
          <ControlButton
            onClick={props.nextSlide}
            disabled={props.nextDisabled}
          >
            <FaChevronCircleRight />
          </ControlButton>
        )}
        renderBottomRightControls={(props) => (
          <styled.p
            color="white"
            p={3}
            fontWeight="semibold"
            bg="rgba(0,0,0,0.2)"
            backdropFilter="blur(2px)"
            borderTopLeftRadius="lg"
          >
            {props.currentSlide + 1} / {props.slideCount}
          </styled.p>
        )}
        style={{ maxWidth }}
      >
        {screenshots.map((screenshot, index) => (
          <Image
            alt={`${game} screen #${index + 1}`}
            key={screenshot.id}
            src={screenshot.image}
            width={screenshot.width}
            height={screenshot.height}
            style={{
              width: "100%",
              aspectRatio: "16/9",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        ))}
      </Carousel>
    </styled.div>
  );
}
