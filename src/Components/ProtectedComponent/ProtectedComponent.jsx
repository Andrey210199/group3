import { useSelector } from "react-redux";
import { Navigate, useHref, useSearchParams } from "react-router-dom";
import { URLEDITUSER, URLLOGIN, URLREGISTRATION } from "../../Constants/Constant";
import { NAMEUSERSLICE } from "../../Constants/StorageConstants";

export default function ProtectedComponent({ isProtected, children }) {

    const user = true; //Временно
    const isLoading = useSelector(state => state[NAMEUSERSLICE].loading);
    const href = useHref();
    const [search] = useSearchParams();

    function isNotPopap(url) {
        return (search.get(url) !== null && !search.get(url))
    }

    function isPopap(url) {
        return (search.get(url) !== null && search.get(url))
    }


    switch (true) {

        case isLoading && isProtected:
            return <></> //временно

        case (isNotPopap(URLLOGIN) || isNotPopap(URLREGISTRATION) || isPopap(URLEDITUSER)) && (isProtected && !user): //временно
            return <Navigate to={`?${URLLOGIN}=true`} replace />


        case (isPopap(URLLOGIN) || isPopap(URLREGISTRATION)) && (isProtected && user): //временно
            return <Navigate to={href} replace />


        default:
            return <>{children}</>


    }
}