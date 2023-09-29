import { Stack, styled } from "../../styled-system/jsx";

type InfoCardProps = {
  icon: JSX.Element;
  label: string;
  value?: string | number;
};

const Wrapper = styled(Stack, {
  base: {
    width: "100%",
    p: 5,
    gap: 1,
    bgColor: "rgba(0,0,0,0.3)",
    backdropFilter: "blur(3px)",
    borderRadius: "md",
    "& p": {
      lineHeight: "0.9",
    },
    "& svg": {
      fill: "primary",
      width: 6,
      height: 6,
    },
  },
});

const InfoCard = (props: InfoCardProps) => {
  const { icon, label, value } = props;
  return (
    <Wrapper>
      {icon}
      <styled.p mt={1} fontSize="sm" color="gray.400">
        {label}
      </styled.p>
      <styled.p
        width="max-content"
        fontWeight="semibold"
        fontSize="lg"
        color="gray.300"
      >
        {value}
      </styled.p>
    </Wrapper>
  );
};

export default InfoCard;
