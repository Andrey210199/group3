import { useSelector } from "react-redux";
import { Navigate, useHref, useSearchParams } from "react-router-dom";
import { URLLOGIN, URLREGISTRATION } from "../../Constants/Constant";
import { NAMEUSERSLICE } from "../../Constants/StorageConstants";

export default function ProtectedComponent({ isProtected, children }) {

    const user = false; //Временно
    const isLoading = useSelector(state => state[NAMEUSERSLICE].loading);
    const href = useHref();
    const [search] = useSearchParams();


    switch (true) {

        case isLoading && isProtected:
            console.log("1")
            return <></> //временно

        case isProtected && !user:
            console.log("2")
            if (search.get(URLLOGIN) || search.get(URLREGISTRATION)) {
                console.log("2.5")
                return <Navigate to={`?=${URLLOGIN}`} replace />
            }
            break;

        case isProtected && user: //временно
            console.log("3")
            if (search.get(URLLOGIN) || search.get(URLREGISTRATION)) {
                console.log("3.5")
                return <Navigate to={href} replace />
            }

            break;

        default: return <>{children}</>


    }
}