import axois from 'axios';


//function to make post request 
export const postRequest = async ( url, payloads ) => {

    try {

        //make Api request here 
        const config =  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ``
            }
        } 
        
        const response = await axois.post( url, payloads , config );
    

    } catch (error) {

        console.log( error.message)

    }

    //return response and error 
    return response;
  
}



//function to make get resquest 

export const getRequest = async ( url ) => {

    try {

        //make Api request here 
        const config =  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ``
            }
        } 
        
        const response = await axois.get( url, config );
    

    } catch (error) {

        console.log( error.message)

    }

    //return response and error 
    return response;
  

}


//this is for put request 
export const putRequest = async ( url, payloads ) => {

    try {

        //make Api request here 
        const config =  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ``
            }
        } 
        
        const response = await axois.put( url, payloads , config );
    

    } catch (error) {

        console.log( error.message)

    }

    //return response and error 
    return response;
  

}




