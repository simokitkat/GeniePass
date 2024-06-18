import { type CheckBoxSettingsState } from "../App";

type PasswordLengthProps = {
  passLength: number;
  checkboxState: CheckBoxSettingsState;
  setPassLength: (arg: number) => void;
  setCopy: (arg: boolean) => void;
};

export default function PasswordLength({
  passLength,
  checkboxState,
  setCopy,
  setPassLength,
}: PasswordLengthProps) {
  //change length logic
  function handleLengthchange(event: React.ChangeEvent<HTMLInputElement>) {
    if (
      +event.target.value >=
      Object.values(checkboxState).filter((e) => e).length
    ) {
      setPassLength(+event.target.value);
      setCopy(false);
    }
  }

  return (
    <div className="length">
      <div className="length-details">
        <p>Character Length</p>
        <p>{passLength}</p>
      </div>
      <div className="length-slider">
        <input
          type="range"
          name="length"
          id="length"
          max={20}
          min={0}
          onChange={handleLengthchange}
          value={passLength}
        />
        <div
          className="slider"
          style={{ width: `${(passLength * 100) / 20}%` }}
        ></div>
      </div>
    </div>
  );
}
