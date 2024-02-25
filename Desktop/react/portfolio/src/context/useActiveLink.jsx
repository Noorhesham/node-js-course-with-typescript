import { createContext,useContext,useEffect,useRef,useState } from "react";
const LinkContext=createContext();
function ActiveLinkProvider({children}){
    //we are going to make an array of refs to connect these refs to different dom elements we will retrive the array in each
    //component usein the usecontext then we attach it to the element we want and we push it to the array 
    const refs=useRef([]);
    //to add the elements here
    function addRef(el){
        refs.current.push(el)
      }
  
    //to determine the active section and link it with the active link we need a state than responds to the changes of ui
    const [active, setActive] = useState("");
    //intersection observer in the effect that loops on each recieved entry that is going to be the refs array
    //if the current entry isIntersecting we are going to set the active state to that active section id
    // in the header we retrive the active section from here and compare it to the link ref if equal we add active class

    useEffect(function () {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              else setActive(`#${entry.target.id}`);
            });
          },
          { rootMargin: "-200px" }
        );
        refs.current.forEach((ref) => observer.observe(ref));
      }, []);
      //return the provider with the values that we will need to use to put it in the app component to provide those vals to children
    return <LinkContext.Provider value={{refs,addRef,active}}>
    {children}
    </LinkContext.Provider>
}
function useActive(){
    //to use the provided values in the children 
    const context=useContext(LinkContext);
    if(context===undefined) throw new Error('context was used out of scope')
    return context;
}
export {useActive,ActiveLinkProvider}