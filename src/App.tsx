import React, { useEffect, useState } from "react";
import "./index.css";
import copyIcon from "./assets/images/icon-copy.svg";
import arrow from "./assets/images/bx_arrow-to-left.png";
import { generatePassword } from "./generatePassword";
type Strength = "" | "TOO WEAK!" | "WEAK" | "MEDIUM" | "STRONG";

export default function App() {
  const [password, setPassword] = useState({ code: "P4$5W0rD!", isSet: false });
  const [copy, setCopy] = useState(false);
  const [passLength, setPassLength] = useState(0);
  const [checkboxState, setCheckboxState] = useState({
    isuppercase: false,
    islowercase: false,
    isnumbers: false,
    issymbols: false,
  });
  const [strength, setStrength] = useState<Strength>("");

  const strengthBarClass =
    strength === "TOO WEAK!" ? "too-weak" : strength.toLowerCase();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(password.code);
      setCopy(true);
    } catch (error) {
      console.log(error);
    }
  }

  function handleLengthchange(event: React.ChangeEvent<HTMLInputElement>) {
    if (
      +event.target.value >=
      Object.values(checkboxState).filter((e) => e).length
    ) {
      setPassLength(+event.target.value);
      setCopy(false);
    }
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCheckboxState((prev) => {
      return { ...prev, [event.target.name]: event.target.checked };
    });

    setCopy(false);
  }

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

    if (passLength === 0) return;

    setPassword({
      code: generatePassword(passLength, checkboxState),
      isSet: true,
    });

    console.log(generatePassword(passLength, checkboxState));
  }

  return (
    <main>
      <form onSubmit={handleFormSubmit}>
        <div className="password">
          <h1 className={!password.isSet ? "hidden" : ""}>{password.code}</h1>
          <div className="copy">
            <span>{copy && "COPIED"}</span>
            <img src={copyIcon} alt="copy-icon" onClick={handleCopy} />
          </div>
        </div>
        <div className="bottom">
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
          <div className="strength">
            <p>STRENGTH</p>
            <div className="strength-bar">
              <div className="strength-status">{strength}</div>
              <div className={`bar ${strengthBarClass}`}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <button>
            GENERATE{" "}
            <span>
              <img src={arrow} alt="arrow" />
            </span>
          </button>
        </div>
      </form>
    </main>
  );
}
