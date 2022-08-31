import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Function: account verification API
const accountActivateAPI = async (guid) => {
    const requestOptions = {
        method: 'POST'
    };
    
    const resp = await fetch(`https://easysplit.rocket-coding.com/api/User/AuthMail/AccountActivation?guid=${guid}`, requestOptions);
    const result = await resp.json();
    console.log(result);
    return result;
}

export default function AccountActivationPage () {
    const [isVerified, setIsVerified] = useState(false);
    const [message, setMessage] = useState("")

    // Get the params from the URL
    const [searchParams, setSearchParams] = useSearchParams();
    let guid = searchParams.get("guid");
    console.log("guid", guid);
    //

    // trigger accountActivation API
    const accountActivate = async () => {
        const resp = await accountActivateAPI(guid);
        let status = resp.Status;
        setIsVerified(status);
        let message = resp.Message;
        setMessage(message);
    };
    accountActivate();
    //

    useEffect(()=> {
        console.log(isVerified);
    },[isVerified]);

    return(
        <div>
            <p>Verification Status: {isVerified ? "true": "false"}</p>
            <p>Message: {message}</p>
        </div>
    )
}