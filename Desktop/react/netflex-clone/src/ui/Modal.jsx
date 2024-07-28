
import {HiXMark} from "react-icons/hi2";
import {createPortal} from "react-dom"
import { cloneElement, createContext , useContext} from "react";
import {useState} from "react";
import { useCloseModal } from "../hooks/useCloseModal";

const ModalContext = createContext();

function Modal({ children }) {
  //we make the parent component that has the state the nwe retur nthe context.provicder with values as the state and state mutation fns
  //we render children inside this provider after we make the children a props of the parent so we  import only 1 time in the component

  const [openName, setOpenName] = useState("");

  const close = () =>{
    setOpenName('');
  }
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  //we get the state function of open here so we can manipulate the state 
  //this open child component recieves 3 things the button itself as child and the name of what we will open as a prob from the component we will use this child in it
  //we clone the child cause it is a button and we want to pass to all children here the onclick
  //THIS TECHNIQUE IS USED TO PASS A PROP TO A PROGRAMTICALLY ADDED PROP OR CHILDREN AND CAN GO TO TAILWIND STYLES AS WELL 
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  //we retireve the name of the clicked here through the context and the close window so we can close it through X whe nwe open it
  //if the name of the window that we passed as a prop is differint from the state then we wont open and return null else we will
  //CREATE a portal to the document.body so the modal becomes on top of everything in the app and we clone the window content so 
  //we can pass the close function to it 
  const ref=useCloseModal(close,true,false)

  if (name !== openName) return null;
  return createPortal(
    <div className=" fixed top-0 left-0 w-[100%] h-[100vh] backdrop-blur-md transition-all duration-75 ">
      <div ref={ref} className=" fixed top-[50%] left-[50%] translate-x-[-50%] z-10  translate-y-[-50%] bg-gray-0 rounded-lg shadow-lg py-14 px-16 ">
      <button onClick={close} className=" focus:ring-2 ring-cyan-500 bg-none border-none p-2 rounded-sm translate-x-2 transition-all duration-75 absolute top-[1.2rem] right-[1.9rem] hover:bg-gray-100">
        <HiXMark className=" w-10 h-10 fill-gray-500 text-gray-500"/>
      </button>
       <div> {cloneElement(children,{CloseForm:close})}</div>
      </div>
    </div>,document.body
  );
}
Modal.Open=Open
Modal.Window=Window
export default Modal;
