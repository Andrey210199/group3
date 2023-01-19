import s from "./index.module.css";
import "../../index.css";
import cn from "classnames";
import { Logo } from "../Logo/logo";

import Search from "../Search/Search";


export function Header({children}) {

  return (
    <header className={s.header}>
      <div className={cn("container", s.content)}>
        <Logo />
        <Search/>       
        {children}        
      </div>
        
    </header>
  );
}
