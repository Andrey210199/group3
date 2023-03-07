import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { URLLOGIN, URLREGISTRATION } from "../../../Constants/Constant";
import { NAMEUSERSLICE } from "../../../Constants/StorageConstants";
import { fetchRegistration } from "../../../Storage/Slices/UserSlice";
import urlParams from "../../../Utilites/UrlParams";
import validateName from "../../../Utilites/ValidateName";
import Authorization from "../Authorization/Authorization";

export default function Registration() {

    const error = useSelector(state => state[NAMEUSERSLICE].error);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [url, setUrl] = useSearchParams();

    function handleformSubmit({ value, reset }) {

        if (validateName(value.name)) {
            dispatch(fetchRegistration({ ...value }))
                .then((ans) => {
                    if (!ans.error) {
                        reset();
                        navigate(-1);
                    }
                });
        }

    }

    function handleClick() {
        url.delete(URLREGISTRATION);
        setUrl(url, {replace: true});
        navigate(urlParams(url, URLLOGIN), {replace: true});
    }

    return (
        <Authorization title="Регистрация" oneBtn="Зарегистрироваться"
            twoBtn="Войти" find={URLREGISTRATION} onClick={handleClick} onSubmit={handleformSubmit} error={error} />
    )
}