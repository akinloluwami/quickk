import { Button } from "@chakra-ui/react";

 const Buttons = ({width , value , onChange , border, borderRadius, variant,bg, color}) => {

    return (
        <>

            <Button width={width} onChange={onChange} border={border}
                bg={'var(--primary-color)'}  variant={variant}
                 borderRadius={borderRadius} color={color}
                 colorScheme={'blue'}
                 py='1.5em'
            >
                {value}
            </Button>
        
        </>
    )

}

    export default Buttons;


