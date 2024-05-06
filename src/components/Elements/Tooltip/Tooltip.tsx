import { useState, ReactNode, useEffect } from 'react';

type TooltipPosition = 'left' | 'right' | 'top' | 'bottom';
const positionClasses: Record<TooltipPosition, string> = {
  top: '-top-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
};

export interface TooltipProps {
  children: ReactNode;
  content: string;
  position: TooltipPosition;
  flashMessage?: string;
}

export const Tooltip = ({
  children,
  content,
  position,
  flashMessage,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [flashVisible, setFlashVisible] = useState(false);

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  let timeoutId: number | null = null; // Change the type to number

  const handleClick = () => {
    if (flashMessage) {
      setFlashVisible(true);
      timeoutId = window.setTimeout(() => {
        // Use window.setTimeout for clarity, though it's optional
        setFlashVisible(false);
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div
      className="flex relative w-fit"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {visible && !flashVisible && (
        <div
          className={`absolute z-10 px-2 py-1 bg-dark-900 text-white rounded max-w-xs break-words ${positionClasses[position]}`}
        >
          <p className="whitespace-nowrap">{content}</p>
        </div>
      )}
      {flashVisible && (
        <div
          className={`absolute z-10 px-2 py-1 bg-primary-600 text-white rounded max-w-xs break-words ${positionClasses[position]}`}
        >
          <p>{flashMessage}</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
