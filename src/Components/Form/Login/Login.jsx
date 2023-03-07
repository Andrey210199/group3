import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { URLLOGIN, URLREGISTRATION } from "../../../Constants/Constant";
import { NAMEUSERSLICE } from "../../../Constants/StorageConstants";
import { fetchUserAutch } from "../../../Storage/Slices/UserSlice";
import urlParams from "../../../Utilites/UrlParams";
import Authorization from "../Authorization/Authorization";


export default function Login() {

    const error = useSelector(state => state[NAMEUSERSLICE].error);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [url, serUrl] = useSearchParams();

    function handleSubmit({ value, reset }) {
        dispatch(fetchUserAutch(value))
            .then((ans) => {
                if (!ans.error) {
                    reset();
                    navigate(-1);
                }
            })
    }

    function handleClick() {
        url.delete(URLLOGIN);
        serUrl(url, {replace: true});
        navigate(urlParams(url,URLREGISTRATION), {replace: true});
    }

    return (
        <Authorization title={"Вход"} oneBtn="Войти" twoBtn="Регистрация"
            find={URLLOGIN} onClick={handleClick} onSubmit={handleSubmit} error={error} />
    );
}