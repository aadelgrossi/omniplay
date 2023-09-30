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
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDz6iiius5wooooAKKKKACiiigD/9k="
            src={screenshot.image}
            width={screenshot.width}
            height={screenshot.height}
            style={{
              minHeight: "300px",
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
