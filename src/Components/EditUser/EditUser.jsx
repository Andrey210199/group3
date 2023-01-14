import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NAMEUSERSLICE } from "../../Constants/StorageConstants";
import { fetchUpdatAvatar, fetchUpdateUser } from "../../Storage/Slices/UserSlice";
import FormInput from "../FormInput/FormInput";
import Modal from "../Modal/Modal";

export default function EditUser() {

    const [url] = useSearchParams();
    const navigate = useNavigate();
    const user = useSelector(state => state[NAMEUSERSLICE].data);
    const [errorName, setErrorName] = useState(null);

    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });

    const name = register("name",
        {
            required: {
                value: true,
                message: "Это поля обязательное"
            }
        }

    );

    const avatar = register("avatar",
        {
            required: {
                value: true,
                message: "Это поля обязательное"
            },

            pattern: {
                value: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g,
                message: "Неверный url"
            }

        }
    );

    function handleFormSubmit(data) {

        if (!/[\/,.\\№%\[\]{}&$\^<>#@!()]/g.test(data.name)) {
            dispatch(fetchUpdateUser(data.name))
            .then(()=>{
                dispatch(fetchUpdatAvatar(data.avatar));
            });
            reset();
            navigate(-1);
        }
        else {
            setErrorName("Поле содержит недопустимые символы");
        }
    }

    return (
        url.get("userEdit") &&
        <Modal>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <FormInput type="text" {...name} value={user?.name} placeholder="Введите имя" />
                {errorName && <p>{errorName}</p>}

                <FormInput type="text" {...avatar} value={user?.avatar} placeholder="Введите url картинки" />
                {errors?.avatar && <p>{errors.avatar.message}</p>}

                <button>Изменить</button>
            </form>

        </Modal>
    )
}