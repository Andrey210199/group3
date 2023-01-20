import { useSelector } from "react-redux";
import { Navigate, useHref } from "react-router-dom";
import { URLLOGIN } from "../../Constants/Constant";
import { NAMEUSERSLICE } from "../../Constants/StorageConstants";
import { getToken } from "../../Utilites/Cookie";
import { Spinner } from "../Spinner/spinner";

export default function ProtectedComponent({ isProtected = true, children }) {

    const user = getToken();
    const isLoading = useSelector(state => state[NAMEUSERSLICE].loading);
    const href = useHref();


    switch (true) {

        case isLoading && isProtected:
            return <Spinner />

        case isProtected && !user:
            return <Navigate to={`/?${URLLOGIN}=true`} replace />

        case isProtected && user:
            return <Navigate to={href} replace />

        default:
            return <>{children}</>
    }
}