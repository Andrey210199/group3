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

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(text, inputTags, editor.getHTML());
  }

  function handleInput(event, type) {
    setText({ ...text, [type]: event.target.value });
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
    editorProps:{
      attributes:{
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


    enabled ? (
      <form className={cn(s.form, s.form_edit)} onSubmit={handleSubmit}>
        <div className={cn(s.img, s.post_image)}>
          <h2>Картинка для превью поста</h2>
          <img
            className={s.img__image}
            src={text.image === "" ? img : text.image}
            alt="Превью"
          />
          <input
            className={cn(s.input, s.img__text)}
            type="text"
            value={text.image}
            onChange={(e) => handleInput(e, "image")}
            placeholder="Введите ссылку на картинку поста"
            required
          />
        </div>
        <div className={s.post__title}>
          <h2 className={s.title}>Заголовок поста</h2>
          <input
            type="text"
            className={s.input}
            value={text.title}
            onChange={(e) => handleInput(e, "title")}
            placeholder="Введите заголовок поста"
            required
          />
        </div>

        
        <div className={s.wrapper}>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
        </div>

        <Tags setInputTags={setInputTags} tags={tags} />
        <button className={cn("btn", s.btn_publish)}>Опубликовать</button>
      </form>
    ) : (
      <form className={s.form} onSubmit={handleSubmit}>
        

        <div className={s.post_image}>
          <img
            src={postImage}
            className={s.img__image}
            alt="postImage"
            decoding="async"
          />
        </div>

       
          <h2 className={s.header__title}>{postTitle}</h2>
       
          
   
        <EditorContent editor={editor} />
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
      </form>
    )
  );
}
