import { useRef, useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useSplitPanes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, number>>({
    vertical: 60, // Default vertical split percentage
    horizontal: 50, // Default horizontal split percentage
  });
  const dragStartPos = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('resize-handle')) {
        const direction = target.dataset.direction;
        if (direction) {
          setIsDragging(direction);
          dragStartPos.current = { x: e.clientX, y: e.clientY };
          document.body.style.cursor = direction === 'vertical' ? 'row-resize' : 'col-resize';
        }
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(null);
        document.body.style.cursor = '';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !container) return;

      const containerRect = container.getBoundingClientRect();
      
      if (isDragging === 'vertical') {
        const deltaY = e.clientY - dragStartPos.current.y;
        const newPosition = (positions.vertical * containerRect.height + deltaY) / containerRect.height * 100;
        setPositions(prev => ({
          ...prev,
          vertical: Math.min(Math.max(newPosition, 20), 80),
        }));
      } else {
        const deltaX = e.clientX - dragStartPos.current.x;
        const newPosition = (positions.horizontal * containerRect.width + deltaX) / containerRect.width * 100;
        setPositions(prev => ({
          ...prev,
          horizontal: Math.min(Math.max(newPosition, 20), 80),
        }));
      }
      
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, positions]);

  return { containerRef, isDragging, positions };
}