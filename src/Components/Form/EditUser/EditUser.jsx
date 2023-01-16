import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AVATARVALIDATE, NAMEMASSAGEERROR, NAMEVALIDATE, URLEDITUSER } from "../../../Constants/Constant";
import { NAMEUSERSLICE } from "../../../Constants/StorageConstants";
import { fetchUpdatAvatar, fetchUpdateUser } from "../../../Storage/Slices/UserSlice";
import FormInput from "../../FormInput/FormInput";
import Modal from "../../Modal/Modal";
import ValidateName from "../../../Utilites/ValidateName";

export default function EditUser() {

    const [url] = useSearchParams();
    const navigate = useNavigate();
    const user = useSelector(state => state[NAMEUSERSLICE].data);
    const [errorName, setErrorName] = useState(null);

    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });

    const name = register("name", NAMEVALIDATE);

    const avatar = register("avatar", AVATARVALIDATE);

    function handleFormSubmit(data) {

        if (ValidateName(data.name)) {
            setErrorName(null);

            dispatch(fetchUpdateUser(data.name))
                .then(() => {
                    dispatch(fetchUpdatAvatar(data.avatar));
                });
            reset();
            navigate(-1);
        }
        else {
            setErrorName(NAMEMASSAGEERROR);
        }
    }

    return (
        url.get(URLEDITUSER) &&
        <Modal>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <h2>Изменение данных пользователя</h2>
                <FormInput type="text" {...name} value={user?.name} placeholder="Введите имя" />
                {(errors?.name && <p>{errors.name.message}</p>) || (errorName && <p>{errorName}</p>)}

                <FormInput type="text" {...avatar} value={user?.avatar} placeholder="Введите url картинки" />
                {errors?.avatar && <p>{errors.avatar.message}</p>}

                <button>Изменить</button>
            </form>

        </Modal>
    )
}