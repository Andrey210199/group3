export const MAXCHARACTERS = 500;
export const MAXADDTAGS = 5;

export const URLLOGIN = "login";
export const URLREGISTRATION = "registration";
export const URLEDITUSER = "userEdit";

export const NAMEMASSAGEERROR = "Поле содержит недопустимые символы";

export const EMAILVALIDATE = {
    required: {
        value: true,
        message: "Email обязателен"
    },

    pattern: {
        value: /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,})\.([A-z]{2,8})/gm,
        message: "Неверно указан Email"
    }
}

export const PASSWORDVALIDATE = {
    required: {
        value: true,
        message: "Пароль обязателен"
    },
    pattern: {
        value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g,
        message: "Пароль должен содержать минимум 6 символов, цифру, строчные и прописные буквы"
    }
}

export const NAMEVALIDATE = {
    required: {
        value: true,
        message: "Nickname обязателен"
    },

    pattern: {
        value: /.{2,}/g,
        message: 'Nickname должен содержать минимум 2 символа, строчные и прописные буквы'
    }
}

export const AVATARVALIDATE = {
    required: {
        value: true,
        message: "Это поля обязательное"
    },

    pattern: {
        value: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g,
        message: "Неверный url"
    }

}