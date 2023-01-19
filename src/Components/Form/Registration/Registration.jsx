import { useNavigate } from "react-router";
import { URLLOGIN, URLREGISTRATION } from "../../../Constants/Constant";
import validateName from "../../../Utilites/ValidateName";
import Authorization from "../Authorization/Authorization";

export default function Registration() {

    const navigate = useNavigate();

    function handleformSubmit(value) {

        if (validateName(value.name)) {
            console.log({ ...value });
        }

    }

    function handleClick(e) {
        navigate(`?${URLLOGIN}=true`, { replace: true });
    }

    return (
        <Authorization title="Регистрация" oneBtn="Зарегистрироваться"
            twoBtn="Войти" find={URLREGISTRATION} onClick={handleClick} onSubmit={handleformSubmit} />
    )
}