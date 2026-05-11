import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <main className="profile-page">
      <section className="profile-hero">
        <div className="profile-avatar" aria-hidden="true">
          <span>{user.name.trim().charAt(0).toUpperCase() || "U"}</span>
        </div>

        <h1 className="profile-name">{user.name}</h1>

        <button
          type="button"
          className="profile-edit-btn"
          onClick={() => navigate("/profile/edit")}
        >
          <span>Edit profile</span>
          <span aria-hidden="true">✎</span>
        </button>

        <div className="profile-actions">
          <button
            type="button"
            className="profile-action"
            onClick={() => navigate("/wishlist")}
          >
            <span>Wishlist</span>
            <img
              src="/assets/images/pages/Profile/Fav.png"
              alt=""
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            className="profile-action"
            onClick={() => navigate("/my-orders")}
          >
            <span>My Orders</span>
            <img
              src="/assets/images/pages/Profile/Truck.png"
              alt=""
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            className="profile-action"
            onClick={() => navigate("/my-products")}
          >
            <span>My products</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default Profile;