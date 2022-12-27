
import AvatarInfo from "../AvatarInfo/AvatarInfo";

import s from "./index.module.css";

export default function Comment({ author, created_at, text: comment }) {

    return (
        <div className={s.comment}>

            <AvatarInfo created={created_at} author={author} s={s} />
            
            <div className={s.comment__content}>
                <div className={s.comment__text}>{comment}</div>

            </div>
        </div>
    )
}