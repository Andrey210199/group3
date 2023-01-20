import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { EMAILVALIDATE, NAMEMASSAGEERROR, NAMEVALIDATE, PASSWORDVALIDATE, URLREGISTRATION } from "../../../Constants/Constant";
import validateName from "../../../Utilites/ValidateName";
import ButtonForm from "../../Buttons/ButtonForm/ButtonForm";
import FormInput from "../../FormInput/FormInput";
import Modal from "../../Modal/Modal";
import ProtectedComponent from "../../ProtectedComponent/ProtectedComponent";
import s from "./index.module.css";

export default function Authorization({ title, onSubmit, oneBtn, twoBtn, find, onClick, children }) {

    const [url] = useSearchParams();
    const [errorName, setErrorName] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });

    const name = find === URLREGISTRATION && register("name", NAMEVALIDATE);

    const email = register("email", EMAILVALIDATE);

    const password = register("password", find === URLREGISTRATION ? PASSWORDVALIDATE
        : {
            required: {
                value: true,
                message: PASSWORDVALIDATE.required.message
            }
        }

    );

    function handleFormSubmit(value) {

        if (validateName(value.name)) {
            setErrorName(null);
            onSubmit({ value, reset });
        }
        else {
            setErrorName(NAMEMASSAGEERROR);
        }
    }

    function handleClear(name) {
        reset({ [name]: "" });

    }


    return (
        url.get(find) &&
        <ProtectedComponent isProtected={false}>
            <Modal>

                <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
                    <h2 className={s.title}>{title}</h2>
                    {find === URLREGISTRATION && <FormInput {...name} placeholder="Введите nickname" />}
                    {(errors?.name && <p className={s.error}>{errors.name.message}</p>) || (errorName && <p className={s.error}>{errorName}</p>)}

                    <FormInput {...email} placeholder="Введите email" />
                    {errors?.email && <p className={s.error}>{errors.email.message}</p>}

                    <FormInput {...password} type="password" placeholder="Введите пароль" />
                    {errors?.password && <p className={s.error}>{errors.password.message}</p>}
                    <div className={s.btns}>

                        <ButtonForm type="submit">{oneBtn}</ButtonForm>
                        <ButtonForm onClick={onClick}>{twoBtn}</ButtonForm>
                    </div>

                </form>

            </Modal>
        </ProtectedComponent>

    );
}