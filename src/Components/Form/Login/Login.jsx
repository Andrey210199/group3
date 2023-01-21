import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { URLLOGIN, URLREGISTRATION } from "../../../Constants/Constant";
import { NAMEUSERSLICE } from "../../../Constants/StorageConstants";
import { fetchUserAutch } from "../../../Storage/Slices/UserSlice";
import Authorization from "../Authorization/Authorization";


export default function Login() {

    const error = useSelector(state => state[NAMEUSERSLICE].error);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSubmit({ value, reset }) {
        dispatch(fetchUserAutch(value))
            .then((ans) => {
                if (!ans.error) {
                    reset();
                    navigate(-1);
                }
            })
    }

    function handleClick(e) {
        navigate(`?${URLREGISTRATION}=true`, { replace: true });
    }

    return (
        <Authorization title={"Вход"} oneBtn="Войти" twoBtn="Регистрация"
            find={URLLOGIN} onClick={handleClick} onSubmit={handleSubmit} error={error} />
    );
}