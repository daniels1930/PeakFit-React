import { useNavigate } from "react-router-dom";
import "./PageBackButton.css";

type PageBackButtonProps = {
  /** Si no se define, usa `navigate(-1)`. */
  onClick?: () => void;
  className?: string;
};

export default function PageBackButton({ onClick, className }: PageBackButtonProps) {
  const navigate = useNavigate();

  function handleClick() {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  }

  return (
    <button
      type="button"
      className={["page-back-btn", className].filter(Boolean).join(" ")}
      onClick={handleClick}
    >
      <img src="/assets/images/pages/EditProfile/leftArrow.png" alt="" />
      <span>Back</span>
    </button>
  );
}
