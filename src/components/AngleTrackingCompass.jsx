import React, { useState, useRef, useEffect } from "react";

const AngleTrackingCompass = ({
  imageUrl,
  onNeedleAngleChange = () => {},
  onCompassAngleChange = () => {},
  onRangeChange = () => {},
  compassSize = 400,
}) => {
  const role = localStorage.getItem("ROLE");
  const compass_angle = localStorage.getItem("compass_angle");
  const indicator_angle = localStorage.getItem("indicator_angle");

  const [compassAngle, setCompassAngle] = useState(
    role === "CONSULTANT" ? Number(compass_angle) : 0
  );
  const initValue = Number(compass_angle) + Number(indicator_angle);
  const [indicatorAngle, setIndicatorAngle] = useState(
    role === "CONSULTANT" ? initValue : 0
  );
  const [isRotatingCompass, setIsRotatingCompass] = useState(false);
  const [isRotatingIndicator, setIsRotatingIndicator] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [endAngle, setEndAngle] = useState(0);
  const [isNeedleDragging, setIsNeedleDragging] = useState(false);
  const [dragPath, setDragPath] = useState([]);
  const [persistentPath, setPersistentPath] = useState([]);

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

  const getAbsoluteAngle = (relativeAngle) => {
    return (relativeAngle - compassAngle + 360) % 360;
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

    const absoluteStartAngle = getAbsoluteAngle(indicatorAngle);
    startAngleRef.current = indicatorAngle;
    startMouseAngleRef.current = mouseAngle;
    setIsRotatingIndicator(true);
    setIsNeedleDragging(true);
    setStartAngle(absoluteStartAngle);
    setEndAngle(absoluteStartAngle);
    setPersistentPath([]);
    setDragPath([{ angle: absoluteStartAngle, time: Date.now() }]);
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
      onCompassAngleChange(newCompassAngle);
    } else if (isRotatingIndicator) {
      const newIndicatorAngle =
        (startAngleRef.current + deltaAngle + 360) % 360;
      setIndicatorAngle(newIndicatorAngle);
      const absoluteAngle = getAbsoluteAngle(newIndicatorAngle);
      setEndAngle(absoluteAngle);
      setDragPath((prev) => [
        ...prev,
        { angle: absoluteAngle, time: Date.now() },
      ]);
      onNeedleAngleChange(absoluteAngle);
    }
  };

  const handleMouseUp = () => {
    if (isRotatingIndicator) {
      setIsNeedleDragging(false);
      setPersistentPath(dragPath);
      setDragPath([]);

      // Pass range values to the parent component
      onRangeChange({
        startAngle,
        endAngle,
        angleDifference: (endAngle - startAngle + 360) % 360,
      });
    }
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

  const renderDragPath = () => {
    const radius = compassSize * 0.35;
    const center = compassSize * 0.5;

    const generatePath = (points) => {
      return points
        .map(({ angle }) => {
          const angleRad = (angle - 90) * (Math.PI / 180);
          const x = center + radius * Math.cos(angleRad);
          const y = center + radius * Math.sin(angleRad);
          return `${x},${y}`;
        })
        .join(" L ");
    };

    return (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {(persistentPath.length > 0 || dragPath.length > 0) && (
          <path
            d={`M ${center},${center} L ${generatePath(
              persistentPath.length > 0 ? persistentPath : dragPath
            )} L ${center},${center} Z`}
            fill="rgba(255, 0, 0, 0.1)"
            stroke="none"
          />
        )}
        {(persistentPath.length > 0 || dragPath.length > 0) && (
          <path
            d={`M ${generatePath(
              persistentPath.length > 0 ? persistentPath : dragPath
            )}`}
            stroke="rgba(255, 0, 0, 0.4)"
            strokeWidth={compassSize * 0.005}
            fill="none"
          />
        )}
      </svg>
    );
  };

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
        {renderDragPath()}

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

        <div
          ref={indicatorRef}
          className="indicator"
          style={{
            position: "absolute",
            top: `${compassSize * 0.5}px`,
            left: `${compassSize * 0.5}px`,
            width: `${
              isNeedleDragging ? compassSize * 0.02 : compassSize * 0.01
            }px`,
            height: `${compassSize * 0.35}px`,
            backgroundColor: isNeedleDragging ? "#ff4444" : "red",
            transformOrigin: "center bottom",
            transform: `translate(-50%, -100%) rotate(${indicatorAngle}deg)`,
            transition: isRotatingIndicator ? "none" : "all 0.1s ease-out",
            cursor: "grab",
            pointerEvents: "auto",
            boxShadow: isNeedleDragging
              ? "0 0 12px rgba(255,0,0,0.6), 0 0 20px rgba(255,0,0,0.4)"
              : "0 0 4px rgba(255,0,0,0.3)",
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
              backgroundColor: isNeedleDragging ? "#ff4444" : "red",
              boxShadow: isNeedleDragging
                ? "0 0 12px rgba(255,0,0,0.6)"
                : "0 0 4px rgba(255,0,0,0.3)",
              transition: "all 0.1s ease-out",
            }}
          />
        </div>
      </div>

      <div className="mt-4 text-lg font-medium bg-gray-100 p-2 rounded-lg shadow-sm">
        <span className="text-blue-600">{Math.round(startAngle)}°</span>
        {" → "}
        <span className="text-green-600">{Math.round(endAngle)}°</span>
        {" ("}
        <span className="text-purple-600">
          {Math.round((endAngle - startAngle + 360) % 360)}°
        </span>
        {")"}
      </div>
    </div>
  );
};

export default AngleTrackingCompass;
