import { Button } from "@chakra-ui/react";

 const Buttons = ({width , value , onChange , border, borderRadius, variant,bg, color}) => {

    return (
        <>

            <Button width={width} onChange={onChange} border={border}
                bg={bg}  variant={variant}
                 borderRadius={borderRadius} color={color}
            >
                {value}
            </Button>
        
        </>
    )

}

    export default Buttons;


