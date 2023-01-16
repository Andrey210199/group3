import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { EMAILVALIDATE, NAMEMASSAGEERROR, NAMEVALIDATE, PASSWORDVALIDATE, URLREGISTRATION } from "../../../Constants/Constant";
import validateName from "../../../Utilites/ValidateName";
import ButtonForm from "../../Buttons/ButtonForm/ButtonForm";
import FormInput from "../../FormInput/FormInput";
import Modal from "../../Modal/Modal";
import ProtectedComponent from "../../ProtectedComponent/ProtectedComponent";

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


    return (
        url.get(find) &&
       // <ProtectedComponent isProtected={false}>
            <Modal>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <h2>{title}</h2>
                    {find === URLREGISTRATION && <FormInput {...name} placeholder="Введите nickname" />}
                    {(errors?.name && <p>{errors.name.message}</p>) || (errorName && <p>{errorName}</p>)}

                    <FormInput {...email} placeholder="Введите email" />
                    {errors?.email && <p>{errors.email.message}</p>}

                    <FormInput {...password} type="password" placeholder="Введите пароль" />
                    {errors?.password && <p>{errors.password.message}</p>}

                    <ButtonForm type="submit">{oneBtn}</ButtonForm>
                    <ButtonForm onClick={onClick}>{twoBtn}</ButtonForm>

                </form>

            </Modal>
      //  </ProtectedComponent>

    );
}