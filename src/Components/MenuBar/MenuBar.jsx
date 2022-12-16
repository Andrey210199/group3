import { useState } from "react";
import ButtonWithPopup from "../ButtonWithPopup/ButtonWithPopup";

export default function MenuBar({editor}){
    
    const [color, setColor] = useState("#000000");
    const [activeModalLink, setActiveModalLink] = useState(false);
    const [activeModalImg, setActiveModalImg] = useState(false);

    function selectHeader(val){
       return editor.chain().focus().toggleHeading({ level: Number(val.target.value)}).run();
    }

    function selectAlign(val){
        return editor.chain().focus().setTextAlign(val.target.value).run();
    }

    function changeLink(value){
     return editor.chain().focus().extendMarkRange("link").toggleLink({ href: value }).run();
    }

    function changeImg(value){
      return editor.chain().focus().setImage({src: value}).run();
    }

    if(!editor){
        return null;
    }
    return(
        <>

        <div  onClick={(e)=>e.preventDefault()}>

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </button>



      <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
        clear style
      </button>
      
      <select onClick={(e)=> e.button===-1 ? selectHeader(e): "" }>
        <option value={1}>h1</option>
        <option value={2}>h2</option>
        <option value={3}>h3</option>
        <option value={4}>h4</option>
        <option value={5}>h5</option>
        <option value={6}>h6</option>
      </select>

     
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>

      <button onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}>underline</button>

  
  <ButtonWithPopup editor={editor} active={activeModalImg} setActive={setActiveModalImg} event ={changeImg} text="image"/>
  <ButtonWithPopup editor={editor} active={activeModalLink} setActive={setActiveModalLink} event ={changeLink} text="link"/>

      <button onClick={()=> editor.chain().focus().toggleHighlight({color: color}).run()}
      className={editor.isActive("highlight") ? "is-active" : ""}
      >Highlight</button>
      <button  onClick={()=>{editor.chain().focus().setColor(color).run()}}>color</button>

      <button value="left" onClick={selectAlign} className={editor.isActive({ textAlign: "left" }) ? 'is-active' : ''}>left</button>
      <button value="right" onClick={selectAlign} className={editor.isActive({ textAlign: "right" }) ? 'is-active' : ''}>right</button>
      <button value="center" onClick={selectAlign} className={editor.isActive({ textAlign: "center" }) ? 'is-active' : ''}>center</button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </button>
    </div>
    <input type="color" 
    onInput={(e)=> setColor(e.target.value)}
    value={color}
    />
        </>
    )

}