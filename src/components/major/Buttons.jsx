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
  isLoading,
  disabled,
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
        isLoading={isLoading}
        disabled={disabled}
      >
        {value}
      </Button>
    </>
  );
};

export default Buttons;
