import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { URLLOGIN, URLREGISTRATION } from "../../../Constants/Constant";
import { fetchUserAutch } from "../../../Storage/Slices/UserSlice";
import Authorization from "../Authorization/Authorization";


export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSubmit({value, reset}) {
       dispatch(fetchUserAutch(value))
       .then(()=>{
            reset();
            navigate(-1);
       })
    }

    function handleClick(e) {
        navigate(`?${URLREGISTRATION}=true`, { replace: true });
    }

    return (
        <Authorization title={"Вход"} oneBtn="Вход" twoBtn="Регистрация"
            find={URLLOGIN} onClick={handleClick} onSubmit={handleSubmit} />
    );
}