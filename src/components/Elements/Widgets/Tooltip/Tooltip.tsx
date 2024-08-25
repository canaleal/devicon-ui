import { useState, ReactNode, useEffect } from 'react';
import './styles/tooltip.css';
import { TooltipPosition, TOOLTIP_POSITIONS } from './tooltipPositions';

export interface TooltipProps {
  children: ReactNode;
  content: string;
  position: TooltipPosition;
  flashMessage?: string;
}

export const Tooltip = ({ children, content, position, flashMessage }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [flashVisible, setFlashVisible] = useState(false);
  
  useEffect(() => {
    if (flashVisible) {
      const timeoutId = setTimeout(() => setFlashVisible(false), 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [flashVisible]);

  const toggleVisibility = (isVisible: boolean) => setVisible(isVisible);
  const showFlashMessage = () => flashMessage && setFlashVisible(true);

  return (
    <div
      className="tooltip__container"
      onMouseEnter={() => toggleVisibility(true)}
      onMouseLeave={() => toggleVisibility(false)}
      onClick={showFlashMessage}
    >
      {(visible || flashVisible) && (
        <div className={`tooltip__popup fade-in ${TOOLTIP_POSITIONS[position]}`}>
          <span className="whitespace-nowrap">
            {flashVisible ? flashMessage : content}
          </span>
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
