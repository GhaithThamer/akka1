"use client";

import { useEffect, useRef, useState } from "react";

export interface MovablePlateProps {
  children: React.ReactNode;
  buttons?: { buttonName: string; onClick: () => void }[];
  upperBar?: React.ReactNode;
  x?: number;
  y?: number;
  z?: number;
  onHide?: () => void;
}

const MovablePlate: React.FC<MovablePlateProps> = ({
  children,
  buttons,
  upperBar,
  x = 600,
  y = 200,
  z = 1000,
}) => {
  const [popoverPosition, setPopoverPosition] = useState({ x, y });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  useEffect(() => {
    setPopoverPosition({ x, y });
  }, [x, y]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    offset.current = {
      x: e.clientX - popoverPosition.x,
      y: e.clientY - popoverPosition.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setPopoverPosition({
        x:
          moveEvent.clientX - offset.current.x < 0
            ? 0
            : moveEvent.clientX - offset.current.x,
        y:
          moveEvent.clientY - offset.current.y < 0
            ? 0
            : moveEvent.clientY - offset.current.y,
      });
    };

    const handleMouseUp = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    const touch = e.touches[0];
    offset.current = {
      x: touch.clientX - popoverPosition.x,
      y: touch.clientY - popoverPosition.y,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;

    const touch = e.touches[0];
    // console.log("13.05.2025 18:03 touch.clientY - offset.current.y", touch.clientY - offset.current.y);
    setPopoverPosition({
      x: touch.clientX - offset.current.x,
      y:
        touch.clientY - offset.current.y < 0
          ? 0
          : touch.clientY - offset.current.y,
    });
  };

  const handleTouchEnd = () => {
    dragging.current = false;
  };

  const renderedButtons = buttons?.map((button) => (
    <button key={button.buttonName} onClick={button.onClick}>
      {button.buttonName}
    </button>
  ));

  return (
    <div
      style={{
        position: "absolute",
        top: popoverPosition.y,
        left: popoverPosition.x,
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "8px",
        zIndex: z,
        minWidth: "150px",
      }}
    >
      <div className="flex items-center ml-1 gap-4 mb-2">
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="flex items-center justify-center rounded-full bg-yellow-100 w-8 h-8 min-w-0 border-yellow-500 border select-none"
          style={{ fontSize: "20px" }}
        >
          ✥
        </div>
        {upperBar}
        {renderedButtons}
      </div>

      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default MovablePlate;
