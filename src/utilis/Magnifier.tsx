import React, { useRef, useState } from "react";

interface MagnifierProps {
  src: string;
  width?: number;
  height?: number;
  zoomLevel?: number; // Magnification factor
  showLens?: boolean; // Lens on main image
  showZoomBox?: boolean; // Zoom box to the side
}

const Magnifier: React.FC<MagnifierProps> = ({
  src,
  width = 500,
  height = 500,
  zoomLevel = 2,
  showLens = true,
  showZoomBox = true,
}) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [backgroundPos, setBackgroundPos] = useState("0% 0%");
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width: w, height: h } = imgRef.current!.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / w) * 100;
    const y = ((e.pageY - top - window.scrollY) / h) * 100;
    setBackgroundPos(`${x}% ${y}%`);

    if (showLens) {
      const lensWidth = 100;
      const lensHeight = 100;
      const posX = e.pageX - left - lensWidth / 2 - window.scrollX;
      const posY = e.pageY - top - lensHeight / 2 - window.scrollY;
      setLensPos({ x: posX, y: posY });
    }
  };

  return (
    <div
      ref={imgRef}
      style={{ position: "relative", width, height, cursor: "crosshair" }}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt="product"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Lens Zoom */}
      {showLens && showMagnifier && (
        <div
          style={{
            position: "absolute",
            left: lensPos.x,
            top: lensPos.y,
            width: 100,
            height: 100,
            border: "2px solid rgba(255,0,0,0.5)",
            backgroundImage: `url(${src})`,
            backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
            backgroundPosition: backgroundPos,
            pointerEvents: "none",
            borderRadius: 8,
          }}
        />
      )}

      {/* Side Zoom Box */}
      {showZoomBox && showMagnifier && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: width + 10,
            width: width,
            height: height,
            backgroundImage: `url(${src})`,
            backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
            backgroundPosition: backgroundPos,
            border: "1px solid #ccc",
            zIndex: 100,
          }}
        />
      )}
    </div>
  );
};

export default Magnifier;
