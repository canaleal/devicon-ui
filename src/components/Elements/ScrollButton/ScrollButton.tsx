import { useState } from "react";

const positions = {
  topLeft: 'top-0 left-0',
  topRight: 'top-0 right-0',
  bottomLeft: 'bottom-0 left-0',
  bottomRight: 'bottom-0 right-0',
}

export interface ScrollButtonProps {
  position?: keyof typeof positions;
}

const ScrollButton = ({position}: ScrollButtonProps) =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    scrolled > 300 ? setVisible(true) : setVisible(false)
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'     
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <button
        onClick={scrollToTop}
        className={`fixed ${position} bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md`}
        style={{display: visible ? 'inline' : 'none'}}>
        <i className="fa fa-arrow-up" aria-hidden="true"></i>
    </button>
  );
}
  
export default ScrollButton;