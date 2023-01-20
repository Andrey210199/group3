import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TagIcon from "@mui/icons-material/Tag";
import cn from "classnames";
import { useEffect, useState } from "react";
import MenuBar from "../MenuBar/MenuBar";

import img from "./placeholder.png";
import s from "./index.module.css";

import Tags from "../Tags/Tags";
import FormInput from "../FormInput/FormInput";
import { LIMITMESSAGE, MAXTITLE } from "../../Constants/Constant";
import Button from "../Buttons/Button/Button";
import { getToken } from "../../Utilites/Cookie";

export default function AddingPost({
  children,
  image: postImage,
  title: postTitle,
  text: postText,
  enabled = false,
  tags,
  handleSubmit: onSubmit,
}) {
  const [text, setText] = useState({ title: "", image: "" });
  const [inputTags, setInputTags] = useState([]);

  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    getToken() &&
    onSubmit(text, inputTags, editor.getHTML());
  }

  function handleInput(value, type) {
    if ((type === "title" && value.length <= MAXTITLE) || type !== "title") {
      setMessage("");
      setText({ ...text, [type]: value });
    }
    else {
      setMessage(LIMITMESSAGE);
    }
  }


  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
      }),

      TextStyle,
      Color,
      Underline,
      Image,
      Link,
      Placeholder.configure({
        placeholder: "Текст вашего поста",
      }),
    ],
    editorProps: {
      attributes: {
        class: s.post_text
      }
    }
  });

  useEffect(() => {
    editor?.setEditable(enabled);
    editor?.commands.setContent(postText);
    postTitle && setText({ title: postTitle, image: postImage })
    setInputTags(tags);
  }, [editor, enabled, postText, postImage, postTitle, tags])

  return (

    <form className={cn(s.form, { [s.form_edit]: enabled })} onSubmit={handleSubmit}>
      
      <div className={cn(s.post_image, { [s.img]: enabled })}>
        {enabled && <h2>Картинка для превью поста</h2>}
        <img
          src={text.image === "" ? img : text.image}
          className={s.img__image}
          alt={enabled ? "Превью" : "postImage"}
          decoding="async"
        />
        {enabled && <div className={s.img__text}>
          <FormInput
            className={s.input}
            type="text"
            value={text.image}
            name="image"
            change={(e) => handleInput(e, "image")}
            placeholder="Введите ссылку на картинку поста"
            required />
        </div>}

      </div>

      {enabled ? <div className={s.post__title}>
        <h2 className={s.title}>Заголовок поста</h2>
        <FormInput
          type="text"
          name="title"
          className={s.input}
          val={text.title}
          change={(e) => handleInput(e, "title")}
          placeholder="Введите заголовок поста"
          clear={(name) => {
            setText({ ...text, [name]: "" });
            setMessage("");
          }
          }
          required
        />
        {message && <p>{message}</p>}
      </div>
        : <h2 className={s.header__title}>{postTitle}</h2>
      }


      <div className={s.wrapper}>
        {enabled && <MenuBar editor={editor} />}
        <EditorContent editor={editor} />
      </div>

      {enabled ? <>
        <Tags setInputTags={setInputTags} tags={tags} />
        <Button className={s.btn_publish}>Опубликовать</Button>
      </>
        : <>
          <div className={s.post_tags}>
            {tags &&
              tags.map((tag) => (
                <a href="/#" key={tag} className={s.tag}>
                  <TagIcon fontSize="small" />
                  {tag}
                </a>
              ))}
          </div>
          {children && children}
        </>
      }
    </form>
  );
}
