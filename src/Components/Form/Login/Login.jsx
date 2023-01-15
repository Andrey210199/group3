import { useNavigate } from "react-router";
import { URLLOGIN, URLREGISTRATION } from "../../../Constants/Constant";
import Authorization from "../Authorization/Authorization";


export default function Login() {

    const navigate = useNavigate();

    function handleSubmit(value) {
        console.log(value);
    }

    function handleClick(e) {
        navigate(`?${URLREGISTRATION}=true`, { replace: true });
    }

    return (
        <Authorization title={"Вход"} oneBtn="Вход" twoBtn="Регистрация"
            find={URLLOGIN} onClick={handleClick} onSubmit={handleSubmit} />
    );
}