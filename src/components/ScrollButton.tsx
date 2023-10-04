import { useState } from "react";
const ScrollButton = () =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <button
        onClick={scrollToTop}
        className="fixed bottom-0 right-0 mb-8 mr-8 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
        style={{display: visible ? 'inline' : 'none'}}>
        <i className="fa fa-arrow-up" aria-hidden="true"></i>
    </button>
  );
}
  
export default ScrollButton;