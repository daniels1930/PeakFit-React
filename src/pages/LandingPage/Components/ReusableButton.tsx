import "../styles/ReusableButton.css";
import type { ReusableButtonProps } from "../types/button.types";

const ReusableButton = ({
  text,
  onClick,
  width = "250px",
  height = "60px",
  fontSize = "1rem",
}: ReusableButtonProps) => {
  return (
    <button
      className="reusable-button"
      onClick={onClick}
      style={{
        width,
        height,
        fontSize,
      }}
    >
      {text}
      <span>→</span>
    </button>
  );
};

export default ReusableButton;