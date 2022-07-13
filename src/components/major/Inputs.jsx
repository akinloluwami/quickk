import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

const Inputs = ({
  placeholder,
  icon,
  type,
  label,
  onChange,
  onKeyPress,
  autoComplete,
}) => {
  return (
    <>
      <FormControl my="1em">
        <FormLabel></FormLabel>

        <InputGroup>
          <InputLeftElement children={icon} py="1.5em" color={"gray"} />
          <Input
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            focusBorderColor="blue.500"
            variant={"filled"}
            py="1.4em"
            onKeyPress={onKeyPress}
            autoComplete={autoComplete}
          />
        </InputGroup>
      </FormControl>
    </>
  );
};

export default Inputs;
