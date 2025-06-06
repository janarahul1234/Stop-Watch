const Stepper = ({ number, height }) => {
  const numbers = [...new Array(10)];

  return (
    <div
      className={`stepper flex flex-col relative transition ease-in-out`}
      data-number={number}
    >
      {numbers.map((_, index) => (
        <span
          key={index}
          style={{ height, lineHeight: height }}
          className="tracking-tight text-center"
        >
          {index}
        </span>
      ))}
    </div>
  );
};

export default Stepper;
