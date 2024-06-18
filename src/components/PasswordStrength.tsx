export type Strength = "" | "TOO WEAK!" | "WEAK" | "MEDIUM" | "STRONG";
type PasswordStrnegthProps = {
  strength: Strength;
};

export default function PasswordStrength({ strength }: PasswordStrnegthProps) {
  const strengthBarClass =
    strength === "TOO WEAK!" ? "too-weak" : strength.toLowerCase();

  return (
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
  );
}
