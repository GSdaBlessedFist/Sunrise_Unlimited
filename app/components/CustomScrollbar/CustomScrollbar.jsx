import React, { useState, useRef, useEffect } from 'react';

const styles = {
  container: {
    position: 'relative',
    overflowY: 'auto',
    scrollbarWidth: 'none', // Hide native scrollbar
    msOverflowStyle: 'none', // Hide native scrollbar for IE/Edge
    '&::-webkit-scrollbar': {
      display: 'none', // Hide native scrollbar for Chrome, Safari, WebKit
    },
  },
  scrollbar: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '6px',
    backgroundColor: 'blue',
    borderRadius: '3px',
  },
  thumb: {
    backgroundColor: 'red',
    borderRadius: '3px',
    display: 'none'
  },
};

const CustomScrollbar = ({ children }) => {
  const [thumbHeight, setThumbHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current; 
    if (container) { 
      setContainerHeight(container.clientHeight);
      setThumbHeight(
        (container.clientHeight / container.scrollHeight) * container.clientHeight
      );
    }
  }, [containerRef.current]); 

  const handleScroll = () => {
    const container = containerRef.current; // Get the container within the handler
    if (container) {
      setScrollTop(container.scrollTop); 
    }
  };

  const handleThumbDrag = (e) => {
    e.preventDefault();
    const container = containerRef.current; 
    if (!container) return; // Exit if container is not available

    const deltaY = e.clientY - e.offsetY;
    const scrollAmount =
      (deltaY * (container.scrollHeight - containerHeight)) / containerHeight;
    container.scrollTop = scrollTop + scrollAmount;
  };

  const calculateThumbPosition = () => {
    const container = containerRef.current; 
    if (!container) return 0; // Return 0 if container is not available

    return (scrollTop / (container.scrollHeight - containerHeight)) * 
           (containerHeight - thumbHeight);
  };

  return (
    <div style={styles.container} ref={containerRef} onScroll={handleScroll}>
      {children}
      <div style={styles.scrollbar}>
        <div 
          style={{ 
            ...styles.thumb, 
            height: `${thumbHeight}px`, 
            top: `${calculateThumbPosition()}px` 
          }} 
          onMouseDown={handleThumbDrag} 
        />
      </div>
    </div>
  );
};

export default CustomScrollbar;