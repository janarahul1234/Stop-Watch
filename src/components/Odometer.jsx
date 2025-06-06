import { useEffect } from "react";
import Stepper from "./Stepper";

const Odometer = ({ number, height, fontSize }) => {
  const numbers = String(number).split("");

  const animation = () => {
    const elements = document.querySelectorAll(".stepper");

    [...elements].forEach((e) => {
      const stop = e.dataset.number;
      e.style.transform = `translateY(calc(-${height} * ${Number(stop)}))`;
      e.style.transitionDuration = "100ms";
    });
  };

  useEffect(() => {
    requestAnimationFrame(animation);
  }, [number]);

  return (
    <div style={{ height, fontSize }} className="flex overflow-hidden">
      {numbers.map((value, index) => (
        <Stepper key={index} number={value} />
      ))}
    </div>
  );
};

export default Odometer;
