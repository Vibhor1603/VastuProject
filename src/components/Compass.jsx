import React, { useState, useRef, useEffect } from "react";

const Compass = ({
  imageUrl,
  onNeedleAngleChange = () => {},
  onCompassAngleChange = () => {},
  compassSize = 400,
}) => {
  const [compassAngle, setCompassAngle] = useState(0);
  const [indicatorAngle, setIndicatorAngle] = useState(0);
  const [isRotatingCompass, setIsRotatingCompass] = useState(false);
  const [isRotatingIndicator, setIsRotatingIndicator] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const compassRef = useRef(null);
  const indicatorRef = useRef(null);
  const containerRef = useRef(null);

  const startAngleRef = useRef(0);
  const startMouseAngleRef = useRef(0);

  const degreeMarks = Array.from({ length: 72 }, (_, i) => i * 5);

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

  const getAngleFromCenter = (x, y, centerX, centerY) => {
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    let angleDeg = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    return (angleDeg + 360) % 360;
  };

  // Returns the needle's true angle relative to north
  const getTrueAngle = (rawAngle) => {
    return (rawAngle - compassAngle + 360) % 360;
  };

  // When rotating the compass, the indicator doesn't change.
  // Therefore, the needle's absolute angle is the indicator's angle relative to north:
  //   trueNeedleAngle = (indicatorAngle - newCompassAngle + 360) % 360
  const getNewAngle = (newCompassAngle) => {
    return (indicatorAngle - newCompassAngle + 360) % 360;
  };

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
      const trueAngle = getNewAngle(newCompassAngle);
      onCompassAngleChange(newCompassAngle);
      onNeedleAngleChange(trueAngle);
    } else if (isRotatingIndicator) {
      const newIndicatorAngle =
        (startAngleRef.current + deltaAngle + 360) % 360;
      setIndicatorAngle(newIndicatorAngle);
      const trueAngle = getTrueAngle(newIndicatorAngle);
      onNeedleAngleChange(trueAngle);
    }
  };

  const handleMouseUp = () => {
    setIsRotatingCompass(false);
    setIsRotatingIndicator(false);
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (event) => {
      handleMouseMove(event);
    };

    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    if (isRotatingCompass || isRotatingIndicator) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isRotatingCompass, isRotatingIndicator]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <div
        ref={compassRef}
        className="compass relative"
        style={{
          width: `${compassSize}px`,
          height: `${compassSize}px`,
          cursor: isRotatingCompass ? "grabbing" : "grab",
          userSelect: "none",
          touchAction: "none",
          backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
          backgroundSize: "cover",
        }}
        onMouseDown={handleCompassMouseDown}
      >
        <div
          className="inner-ring absolute"
          style={{
            top: `${compassSize * 0.125}px`,
            left: `${compassSize * 0.125}px`,
            width: `${compassSize * 0.75}px`,
            height: `${compassSize * 0.75}px`,
            borderRadius: "50%",
            transform: `rotate(${compassAngle}deg)`,
            transition: isRotatingCompass ? "none" : "transform 0.1s ease-out",
          }}
        >
          {/* Render degree marks */}
          {degreeMarks.map((degree) => (
            <div
              key={`degree-${degree}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: degree % 30 === 0 ? "2px" : "1px",
                height:
                  degree % 30 === 0
                    ? `${compassSize * 0.03}px`
                    : `${compassSize * 0.015}px`,
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

          {/* Render numbers at specified degrees */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
            (degree) => {
              const radius = compassSize * 0.3125;
              const angleInRad = (degree - 90) * (Math.PI / 180);
              const x = compassSize * 0.375 + radius * Math.cos(angleInRad);
              const y = compassSize * 0.375 + radius * Math.sin(angleInRad);
              return (
                <div
                  key={`num-${degree}`}
                  style={{
                    position: "absolute",
                    top: `${y}px`,
                    left: `${x}px`,
                    transform: `translate(-50%, -50%) rotate(-${compassAngle}deg)`,
                    fontSize: `${compassSize * 0.025}px`,
                    color: "#333",
                  }}
                >
                  {degree}°
                </div>
              );
            }
          )}

          {/* Render directional labels */}
          {directions.map((dir, idx) => {
            const radius = compassSize * 0.45;
            const angleInRad = (dir.angle - 90) * (Math.PI / 180);
            const x = compassSize * 0.375 + radius * Math.cos(angleInRad);
            const y = compassSize * 0.375 + radius * Math.sin(angleInRad);
            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  top: `${y}px`,
                  left: `${x}px`,
                  transform: `translate(-50%, -50%) rotate(-${compassAngle}deg)`,
                  fontWeight: dir.label.length <= 2 ? "bold" : "normal",
                  fontSize:
                    dir.label.length <= 2
                      ? `${compassSize * 0.04}px`
                      : `${compassSize * 0.03}px`,
                  color: dir.label === "N" ? "red" : "black",
                }}
              >
                {dir.label}
              </div>
            );
          })}

          {/* Render direction lines */}
          {directions.map((dir, idx) => (
            <div
              key={`line-${idx}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: dir.label.length <= 2 ? "2px" : "1px",
                height:
                  dir.label.length <= 2
                    ? `${compassSize * 0.35}px`
                    : `${compassSize * 0.325}px`,
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

        {/* Outer ring */}
        <div
          className="outer-ring absolute"
          style={{
            top: `${compassSize * 0.125}px`,
            left: `${compassSize * 0.125}px`,
            width: `${compassSize * 0.75}px`,
            height: `${compassSize * 0.75}px`,
            borderRadius: "50%",
            border: "2px solid black",
            pointerEvents: "none",
          }}
        />

        {/* Center point */}
        <div
          style={{
            position: "absolute",
            top: `${compassSize * 0.5}px`,
            left: `${compassSize * 0.5}px`,
            width: `${compassSize * 0.025}px`,
            height: `${compassSize * 0.025}px`,
            backgroundColor: "black",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />

        {/* The indicator (needle) */}
        <div
          ref={indicatorRef}
          className="indicator"
          style={{
            position: "absolute",
            top: `${compassSize * 0.5}px`,
            left: `${compassSize * 0.5}px`,
            width: `${compassSize * 0.01}px`,
            height: `${compassSize * 0.35}px`,
            backgroundColor: "red",
            transformOrigin: "center bottom",
            transform: `translate(-50%, -100%) rotate(${indicatorAngle}deg)`,
            transition: isRotatingIndicator
              ? "none"
              : "transform 0.1s ease-out",
            cursor: "grab",
            pointerEvents: "auto",
          }}
          onMouseDown={handleIndicatorMouseDown}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
              width: `${compassSize * 0.03}px`,
              height: `${compassSize * 0.03}px`,
              backgroundColor: "red",
            }}
          />
        </div>

        {/* Display the current needle angle */}
      </div>
    </div>
  );
};

export default Compass;
