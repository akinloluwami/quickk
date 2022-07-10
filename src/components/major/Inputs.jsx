import { FormControl, FormLabel, Input, placeholder } from "@chakra-ui/react"

const Inputs = ({placeholder , type , onChange}) => {
    return (
        <>

            <FormControl>
                <FormLabel>
                    <Input placeholder={ placeholder} type={type} onChange={onChange} focusBorderColor = 'blue.500'/>
                </FormLabel>
            </FormControl>
        
        </>
    )
}

export default Inputs 