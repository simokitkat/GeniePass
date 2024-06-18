import { type CheckBoxSettingsState } from "../App";

type PasswordSettingsProps = {
  checkboxState: CheckBoxSettingsState;
  setCopy: (arg: boolean) => void;
  setCheckboxState: (arg: CheckBoxSettingsState) => void;
};

export default function PasswordSettings({
  checkboxState,
  setCopy,
  setCheckboxState,
}: PasswordSettingsProps) {
  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCheckboxState({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    });

    setCopy(false);
  }

  return (
    <div className="settings">
      <div>
        <input
          type="checkbox"
          name="isuppercase"
          id="uppercase"
          checked={checkboxState.isuppercase}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="uppercase">Include Uppercase Letters</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="islowercase"
          id="lowercase"
          checked={checkboxState.islowercase}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="lowercase">Include Lowercase Letters</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="isnumbers"
          id="numbers"
          checked={checkboxState.isnumbers}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="numbers">Include Numbers</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="issymbols"
          id="symbols"
          checked={checkboxState.issymbols}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="symbols">Include Symbols</label>
      </div>
    </div>
  );
}
