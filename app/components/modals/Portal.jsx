import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [portalElement] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(portalElement);
    setMounted(true);
    return () => {
      if (portalElement.parentNode === document.body) {
        document.body.removeChild(portalElement);
      }
    };
  }, [portalElement]);

  return mounted ? ReactDOM.createPortal(children, portalElement) : null;
};

export default Portal;
