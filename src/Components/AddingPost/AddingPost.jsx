import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import { useState } from "react";
import MenuBar from "../MenuBar/MenuBar";
import s from "./index.module.css";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";

const limit = 1000;

export default function AddingPost(){
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
          }),
          CharacterCount.configure({
            limit: limit
          })
        ],
        content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
          </p>
          <ul>
            <li>
              That’s a bullet list with one …
            </li>
            <li>
              … or two list items.
            </li>
          </ul>
          <p>
            Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
          </p>
          <pre><code class="language-css">body {
      display: none;
    }</code></pre>
          <p>
            I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
          </p>
          <blockquote>
            Wow, that’s amazing. Good work, boy! 👏
            <br />
            — Mom
          </blockquote>
        `,
      })

    return(
        <form className={s.form}>

            <input type="text"/>
            <MenuBar editor={editor}/>
            <EditorContent editor={editor}/>
            <div className="character-count">
                {editor?.storage?.characterCount?.characters()}/{limit} characters
                <br />
                {editor?.storage?.characterCount?.words()} words
            </div>
        </form>
    )
}