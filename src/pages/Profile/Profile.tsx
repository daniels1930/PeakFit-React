import "./Profile.css";

function Profile() {
  return (
    <main className="profile-page">
      <section className="profile-hero">
        <div className="profile-avatar" aria-hidden="true">
          <span>M</span>
        </div>

        <h1 className="profile-name">Mateo Rojas</h1>

        <button type="button" className="profile-edit-btn">
          <span>Edit profile</span>
          <span aria-hidden="true">✎</span>
        </button>

        <div className="profile-actions">
          <button type="button" className="profile-action">
            <span>Wishlist</span>
            <img
              src="/assets/images/pages/Profile/Fav.png"
              alt=""
              aria-hidden="true"
            />
          </button>

          <button type="button" className="profile-action">
            <span>My Orders</span>
            <img
              src="/assets/images/pages/Profile/Truck.png"
              alt=""
              aria-hidden="true"
            />
          </button>

          <button type="button" className="profile-action">
            <span>My purchases</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default Profile;