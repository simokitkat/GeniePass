import arrow from "../assets/images/bx_arrow-to-left.png";
export default function GenerateBtn() {
  return (
    <button className="generate">
      GENERATE{" "}
      <span>
        <img src={arrow} alt="arrow" />
      </span>
    </button>
  );
}
