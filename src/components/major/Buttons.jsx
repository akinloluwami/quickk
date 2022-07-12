import { Button } from "@chakra-ui/react";

const Buttons = ({
  width,
  value,
  border,
  borderRadius,
  variant,
  bg,
  color,
  onClick,
}) => {
  return (
    <>
      <Button
        width={width}
        border={border}
        bg={"var(--primary-color)"}
        variant={variant}
        borderRadius={borderRadius}
        color={color}
        colorScheme={"blue"}
        py="1.5em"
        onClick={onClick}
      >
        {value}
      </Button>
    </>
  );
};

export default Buttons;
