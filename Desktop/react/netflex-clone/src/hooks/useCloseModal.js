import { useEffect, useRef } from "react";
export function useCloseModal(close, listenCapturing = true,hover=true) {
  //by default we are listening in the capturing phase ,true soo when we click on toggle it closes from the outside click we want to detect
  //then it opens and stay opened ... when we click again it closes for a milsecond the opens again
  //we need to listen in the bubble phase so when we click it opens for a milisecond then closes immediatley so we stop propagation
  //we stop the travel up so it opens and stops and when we click again we open but the condition that we wont open if the id is the same as open id will close it
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        //we want to make sure that the ref is the list component i mean it is opened !
        if (ref.current && !ref.current.contains(e.target) ) close();
      }
      hover&&document.addEventListener("mouseover", handleClick, listenCapturing);
      document.addEventListener("click", handleClick, listenCapturing);
      document.addEventListener("scroll", close, listenCapturing);
      return () => {
        hover&&document.removeEventListener("mouseover", handleClick, listenCapturing);
        document.addEventListener("click", handleClick, listenCapturing);
        document.removeEventListener("scroll", close, listenCapturing);

      };
    },
    [close, listenCapturing,hover]
  );
  return ref;
}
