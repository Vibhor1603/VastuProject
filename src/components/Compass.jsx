import React, { useState, useRef, useEffect } from "react";

const Compass = ({ imageUrl, onNeedleAngleChange = () => {} }) => {
  const [compassAngle, setCompassAngle] = useState(0);
  const [indicatorAngle, setIndicatorAngle] = useState(0);
  const [isRotatingCompass, setIsRotatingCompass] = useState(false);
  const [isRotatingIndicator, setIsRotatingIndicator] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const compassRef = useRef(null);
  const indicatorRef = useRef(null);
  const compassHandleRef = useRef(null);

  // Reference values for rotation calculations
  const startAngleRef = useRef(0);
  const startMouseAngleRef = useRef(0);
  const startDragPosRef = useRef({ x: 0, y: 0 });

  // Generate degree markings (every 5 degrees)
  const degreeMarks = Array.from({ length: 72 }, (_, i) => i * 5);

  // Direction markers
  const directions = [
    { label: "N", angle: 0 },
    { label: "NNE", angle: 22.5 },
    { label: "NE", angle: 45 },
    { label: "ENE", angle: 67.5 },
    { label: "E", angle: 90 },
    { label: "ESE", angle: 112.5 },
    { label: "SE", angle: 135 },
    { label: "SSE", angle: 157.5 },
    { label: "S", angle: 180 },
    { label: "SSW", angle: 202.5 },
    { label: "SW", angle: 225 },
    { label: "WSW", angle: 247.5 },
    { label: "W", angle: 270 },
    { label: "WNW", angle: 292.5 },
    { label: "NW", angle: 315 },
    { label: "NNW", angle: 337.5 },
  ];

  // Calculate angle between two points
  const getAngleFromCenter = (x, y, centerX, centerY) => {
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    let angleDeg = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    return (angleDeg + 360) % 360;
  };

  // Calculate the true angle relative to compass orientation
  const getTrueAngle = (rawAngle) => {
    return (rawAngle - compassAngle + 360) % 360;
  };

  // Handle mouse down for compass rotation
  const handleCompassMouseDown = (event) => {
    if (isDragging || isRotatingIndicator) return;

    const compass = compassRef.current;
    const rect = compass.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseAngle = getAngleFromCenter(
      event.clientX,
      event.clientY,
      centerX,
      centerY
    );

    startAngleRef.current = compassAngle;
    startMouseAngleRef.current = mouseAngle;
    setIsRotatingCompass(true);
  };

  // Handle mouse down for indicator rotation
  const handleIndicatorMouseDown = (event) => {
    event.stopPropagation();
    if (isDragging || isRotatingCompass) return;

    const compass = compassRef.current;
    const rect = compass.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseAngle = getAngleFromCenter(
      event.clientX,
      event.clientY,
      centerX,
      centerY
    );

    startAngleRef.current = indicatorAngle;
    startMouseAngleRef.current = mouseAngle;
    setIsRotatingIndicator(true);
  };

  // Handle mouse move for rotation
  const handleMouseMove = (event) => {
    if ((!isRotatingCompass && !isRotatingIndicator) || isDragging) return;

    const compass = compassRef.current;
    const rect = compass.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseAngle = getAngleFromCenter(
      event.clientX,
      event.clientY,
      centerX,
      centerY
    );

    let deltaAngle = mouseAngle - startMouseAngleRef.current;

    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;

    if (isRotatingCompass) {
      const newCompassAngle = (startAngleRef.current + deltaAngle + 360) % 360;
      setCompassAngle(newCompassAngle);
    } else if (isRotatingIndicator) {
      const newIndicatorAngle =
        (startAngleRef.current + deltaAngle + 360) % 360;
      setIndicatorAngle(newIndicatorAngle);
      // Calculate and notify the true angle considering compass rotation
      const trueAngle = getTrueAngle(newIndicatorAngle);
      onNeedleAngleChange(trueAngle);
    }
  };

  // Handle dragging of compass
  const handleDragStart = (event) => {
    event.stopPropagation();
    setIsDragging(true);
    startDragPosRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleDragMove = (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - startDragPosRef.current.x;
    const deltaY = event.clientY - startDragPosRef.current.y;

    const compass = compassRef.current;
    compass.style.left = `${compass.offsetLeft + deltaX}px`;
    compass.style.top = `${compass.offsetTop + deltaY}px`;

    startDragPosRef.current = { x: event.clientX, y: event.clientY };
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setIsRotatingCompass(false);
    setIsRotatingIndicator(false);
    setIsDragging(false);
  };

  // Add global mouse event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (event) => {
      handleMouseMove(event);
      handleDragMove(event);
    };

    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    if (isRotatingCompass || isRotatingIndicator || isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isRotatingCompass, isRotatingIndicator, isDragging]);

  return (
    <div
      ref={compassRef}
      className="compass"
      style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
        backgroundSize: "cover",
        cursor: isRotatingCompass ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none",
      }}
      onMouseDown={handleCompassMouseDown}
    >
      <div
        className="inner-ring"
        style={{
          position: "absolute",
          top: "50px",
          left: "50px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          transform: `rotate(${compassAngle}deg)`,
          transition: isRotatingCompass ? "none" : "transform 0.1s ease-out",
        }}
      >
        {/* Degree markings */}
        {degreeMarks.map((degree) => (
          <div
            key={`degree-${degree}`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: degree % 30 === 0 ? "2px" : "1px",
              height: degree % 30 === 0 ? "12px" : "6px",
              backgroundColor:
                degree % 90 === 0
                  ? "black"
                  : degree % 30 === 0
                  ? "#444"
                  : "#666",
              transformOrigin: "top",
              transform: `rotate(${degree}deg) translateX(-50%)`,
            }}
          />
        ))}

        {/* Degree numbers */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
          (degree) => {
            const radius = 125;
            const angleInRad = (degree - 90) * (Math.PI / 180);
            const x = 150 + radius * Math.cos(angleInRad);
            const y = 150 + radius * Math.sin(angleInRad);

            return (
              <div
                key={`num-${degree}`}
                style={{
                  position: "absolute",
                  top: `${y}px`,
                  left: `${x}px`,
                  transform: `translate(-50%, -50%) rotate(-${compassAngle}deg)`,
                  fontSize: "10px",
                  color: "#333",
                }}
              >
                {degree}°
              </div>
            );
          }
        )}

        {/* Direction labels */}
        {directions.map((dir, idx) => {
          const radius = 180;
          const angleInRad = (dir.angle - 90) * (Math.PI / 180);
          const x = 150 + radius * Math.cos(angleInRad);
          const y = 150 + radius * Math.sin(angleInRad);

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                top: `${y}px`,
                left: `${x}px`,
                transform: `translate(-50%, -50%) rotate(-${compassAngle}deg)`,
                fontWeight: dir.label.length <= 2 ? "bold" : "normal",
                fontSize: dir.label.length <= 2 ? "16px" : "12px",
                color: dir.label === "N" ? "red" : "black",
              }}
            >
              {dir.label}
            </div>
          );
        })}

        {/* Direction lines */}
        {directions.map((dir, idx) => (
          <div
            key={`line-${idx}`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: dir.label.length <= 2 ? "2px" : "1px",
              height: `${dir.label.length <= 2 ? 140 : 130}px`,
              backgroundColor:
                dir.label === "N"
                  ? "red"
                  : dir.label.length <= 2
                  ? "black"
                  : "#666",
              transformOrigin: "top",
              transform: `rotate(${dir.angle}deg) translateX(-50%)`,
            }}
          />
        ))}
      </div>

      {/* Drag handle */}
      <div
        ref={compassHandleRef}
        className="compass-handle"
        style={{
          position: "absolute",
          top: "30px",
          left: "50%",
          width: "40px",
          height: "20px",
          backgroundColor: "black",
          transform: "translateX(-50%)",
          cursor: "grab",
          borderRadius: "5px 5px 0 0",
        }}
        onMouseDown={handleDragStart}
      />

      {/* Outer ring */}
      <div
        className="outer-ring"
        style={{
          position: "absolute",
          top: "50px",
          left: "50px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: "2px solid black",
          pointerEvents: "none",
        }}
      />

      {/* Center point */}
      <div
        style={{
          position: "absolute",
          top: "200px",
          left: "200px",
          width: "10px",
          height: "10px",
          backgroundColor: "black",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Indicator needle */}
      <div
        ref={indicatorRef}
        className="indicator"
        style={{
          position: "absolute",
          top: "200px",
          left: "200px",
          width: "4px",
          height: "140px",
          backgroundColor: "red",
          transformOrigin: "center bottom",
          transform: `translate(-50%, -100%) rotate(${indicatorAngle}deg)`,
          transition: isRotatingIndicator ? "none" : "transform 0.1s ease-out",
          cursor: "grab",
          pointerEvents: "auto",
        }}
        onMouseDown={handleIndicatorMouseDown}
      >
        {/* Needle head */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(45deg)",
            width: "12px",
            height: "12px",
            backgroundColor: "red",
          }}
        />
      </div>

      {/* True angle display */}
      <div
        style={{
          position: "absolute",
          top: "320px",
          left: "200px",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        Angle: {Math.round(getTrueAngle(indicatorAngle))}°
      </div>
    </div>
  );
};

export default Compass;
