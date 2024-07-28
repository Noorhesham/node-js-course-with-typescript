import { createContext, useContext, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useCloseModal } from "../hooks/useCloseModal";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import UserAvatar from "../features/authentication/UserAvatar";
const MenuContext = createContext();

function DropMenu({ children }) {
  const [isOpen, setIsOpen] = useState("");
  const closeMenu = () => setIsOpen("");
  const openMenu = (id) => setIsOpen(id);
  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen, closeMenu, openMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id }) {
  const { isOpen, closeMenu, openMenu } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();
    //we do not want the document or any parent to recieve this event we want it to only belong to this button no bubbling no capturing down
    //cause we do not want to check on the click on the document if the clicked is button so we do not close
    //it is easier to not read this event by document at all
    isOpen === "" || isOpen !== id ? openMenu(id) : closeMenu();
  }
  function handleMouseEnter(e) {
    e.stopPropagation();
    openMenu(id);
  }
  return (
    <section
      className=" cursor-pointer select-none flex items-center gap-[.1rem] text-xl relative"
      onMouseOver={(e) => handleMouseEnter(e)}
    >
      <UserAvatar />
      {
        <IoMdArrowDropdown
          style={{ transition: "100ms" }}
          className={`${isOpen && "rotate-180 transition-all duration-100"}`}
          onClick={(e) => handleClick(e)}
        />
      }
    </section>
  );
}
function Menu({ children, id }) {
  const { isOpen, closeMenu } = useContext(MenuContext);
  const ref = useCloseModal(closeMenu, false);

  if (isOpen !== id) return;
  return createPortal(
    <div ref={ref} className="fixed right-6 top-10 z-[99999999999999] flex flex-col  ">
      <IoMdArrowDropup className=" text-center text-xl items-center m-auto" />
      <motion.ul
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={` mt-2 flex flex-col bg-black bg-opacity-40 py-2 px-6 gap-2 text-lg text-gray-200
      z-50  shadow-md   `}
      >
        {children}
      </motion.ul>
    </div>,
    document.body
  );
}
DropMenu.Toggle = Toggle;
DropMenu.Menu = Menu;

export default DropMenu;
