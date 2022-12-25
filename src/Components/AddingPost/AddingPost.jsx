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

import cn from "classnames";
import { useEffect, useState } from "react";
import MenuBar from "../MenuBar/MenuBar";

import img from "./placeholder.png"
import s from "./index.module.css";
import api from "../../Utilites/Api";

export default function AddingPost() {

  const [text, setText] = useState({ title: "", image: "" });

  function handleSubmit(e) {
    e.preventDefault();
    api.actionPosts("POST", "", { ...text, text: editor.getHTML() })
  }

  function handleInput(event, type) {
    setText({ ...text, [type]: event.target.value })
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      Highlight.configure({
        multicolor: true
      }),
      TextStyle,
      Color,
      Underline,
      Image,
      Link,
      Placeholder.configure({
        placeholder: 'My Custom Placeholder',
      })
    ]
  })

  //Проверка на получения с сервера 639df2b959b98b038f77a0c2, 638251d059b98b038f779d51
 /*  useEffect(()=>{
    api.actionPosts("","638251d059b98b038f779d51")
    .then((posts)=>{
      editor?.commands.setContent(posts.text)
    })
  },[editor]) */

  return (
    <form className={s.form} onSubmit={handleSubmit}>

      <h1>Добавления поста</h1>

      <div className={s.post__title}>
        <h2>Заголовок поста</h2>
        <input type="text" className={s.input} value={text.title} onChange={(e) => handleInput(e, "title")} placeholder="Введите заголовок поста" required />
      </div>


      <div className={s.img}>
        <h2>Картинка для превью поста</h2>
        <img className={s.img__image} src={text.image === "" ? img : text.image} alt="Превью" />
        <input className={cn(s.input, s.img__text)} type="text" value={text.image} onChange={(e) => handleInput(e, "image")} placeholder="Введите ссылку на картинку поста" required />
      </div>

      <MenuBar editor={editor} />
      <EditorContent editor={editor} />

      <button>Опубликовать</button>
    </form>
  )
}