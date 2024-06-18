import copyIcon from "../assets/images/icon-copy.svg";

type PasswordProps = {
  password: {
    code: string;
    isSet: boolean;
  };
  copy: boolean;
  setCopy: (arg: boolean) => void;
};

export default function Password({ password, copy, setCopy }: PasswordProps) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(password.code);
      setCopy(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="password">
      <h2 className={!password.isSet ? "hidden" : ""}>{password.code}</h2>
      <div className="copy">
        <span>{copy && "COPIED"}</span>
        <img src={copyIcon} alt="copy-icon" onClick={handleCopy} />
      </div>
    </div>
  );
}
