export const Buttons = ({width , value , onChange , border}) => {

    const styles = {
        width: width,
        border: border,
        borderRadius: borderRadius,
        backgroundColor: backgroundColor,

    }
    return (
        <>

            <button style={styles}>
                {value}
            </button>
        
        </>
    )

}