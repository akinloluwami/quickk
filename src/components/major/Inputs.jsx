import { FormControl, FormLabel, Input ,  } from "@chakra-ui/react"

const Inputs = ({placeholder , type , label , onChange}) => {
    return (
        <>

            <FormControl my='1em'>
                <FormLabel>
                    
                    
                </FormLabel>

                <Input placeholder ={placeholder} type={type} onChange={onChange}
                     focusBorderColor = 'blue.500'
                     py='1.4em'
                     />
            </FormControl>
        
        </>
    )
}

export default Inputs 