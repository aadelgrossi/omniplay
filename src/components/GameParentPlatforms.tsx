import { cloneElement } from "react";
import { BsAndroid2 } from "react-icons/bs";
import {
  FaApple,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from "react-icons/fa";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { SiNintendo, SiSega } from "react-icons/si";
import { TbWorld } from "react-icons/tb";

import { Game } from "@/services/types";

import { HStack } from "../../styled-system/jsx";
import { token } from "../../styled-system/tokens";

const platformIconLookup: { [key: string]: JSX.Element } = {
  android: <BsAndroid2 />,
  pc: <FaWindows />,
  mac: <FaApple />,
  linux: <FaLinux />,
  playstation: <FaPlaystation />,
  nintendo: <SiNintendo />,
  xbox: <FaXbox />,
  sega: <SiSega />,
  ios: <MdOutlinePhoneIphone />,
  web: <TbWorld />,
};

type GameParentPlatformsProps = Pick<Game, "parent_platforms"> & {
  size?: "sm" | "md" | "lg";
};

const sizeLookup = {
  sm: token("sizes.3.5"),
  md: token("sizes.5"),
  lg: token("sizes.8"),
};

export default function GameParentPlatforms({
  parent_platforms,
  size = "sm",
}: GameParentPlatformsProps) {
  const fill = token("colors.slate.300");
  return (
    <HStack gap={2.5} mb={1}>
      {parent_platforms?.map(({ platform }) => (
        <>
          {cloneElement(platformIconLookup[platform.slug], {
            title: platform.name,
            style: {
              width: sizeLookup[size],
              height: sizeLookup[size],
              fill,
            },
          })}
        </>
      ))}
    </HStack>
  );
}
