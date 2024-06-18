import React, { useEffect, useState } from "react";
import "./index.css";
import { generatePassword } from "./generatePassword";
import Password from "./components/Password";
import PasswordLength from "./components/PasswordLength";
import PasswordSettings from "./components/PasswordSettings";
import PasswordStrength, { type Strength } from "./components/PasswordStrength";
import GenerateBtn from "./components/GenerateBtn";

export type CheckBoxSettingsState = {
  isuppercase: boolean;
  islowercase: boolean;
  isnumbers: boolean;
  issymbols: boolean;
};

export default function App() {
  const [password, setPassword] = useState({ code: "P4$5W0rD!", isSet: false });
  const [copy, setCopy] = useState(false);
  const [passLength, setPassLength] = useState(0);
  const [checkboxState, setCheckboxState] = useState<CheckBoxSettingsState>({
    isuppercase: false,
    islowercase: false,
    isnumbers: false,
    issymbols: false,
  });
  const [strength, setStrength] = useState<Strength>("");

  useEffect(() => {
    const countOfTrue = Object.values(checkboxState).filter((e) => e).length;
    setStrength((prev) => {
      prev =
        countOfTrue === 0
          ? ""
          : countOfTrue === 1
          ? "TOO WEAK!"
          : countOfTrue === 2
          ? "WEAK"
          : countOfTrue === 3
          ? "MEDIUM"
          : "STRONG";

      return prev;
    });

    if (countOfTrue >= passLength) {
      setPassLength(countOfTrue);
    }

    console.log(checkboxState);
  }, [checkboxState]);

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const countOfTrue = Object.values(checkboxState).filter((e) => e).length;

    if (passLength === 0 || countOfTrue < 1) {
      alert("Please select at least one option");
      return;
    }

    setPassword({
      code: generatePassword(passLength, checkboxState),
      isSet: true,
    });

    console.log(generatePassword(passLength, checkboxState));
  }

  return (
    <main>
      <h1>Password Generator</h1>
      <form onSubmit={handleFormSubmit}>
        <Password password={password} copy={copy} setCopy={setCopy} />
        <div className="bottom">
          <PasswordLength
            passLength={passLength}
            setPassLength={setPassLength}
            setCopy={setCopy}
            checkboxState={checkboxState}
          />
          <PasswordSettings
            checkboxState={checkboxState}
            setCopy={setCopy}
            setCheckboxState={setCheckboxState}
          />
          <PasswordStrength strength={strength} />
          <GenerateBtn />
        </div>
      </form>
    </main>
  );
}
