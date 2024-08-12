type StarProps = {
  marked: boolean;
  starid: number;
};

const Star = ({ marked, starid }: StarProps) => {
  return (
    <span
      data-star-id={starid}
      className="text-3xl cursor-pointer "
      role="button"
    >
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};

Star.displayName = "Star";
export default Star;
