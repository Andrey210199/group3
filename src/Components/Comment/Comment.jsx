
import AvatarInfo from "../AvatarInfo/AvatarInfo";

import s from "./index.module.css";

export default function Comment({ author, created_at, updated_at, comment }) {

    return (
        <div className={s.comment}>

            <AvatarInfo {...author} created={created_at} updated={updated_at} s={s} />
            
            <div className={s.comment__content}>
                <div className={s.comment__text}>{comment}</div>

            </div>
        </div>
    )
}