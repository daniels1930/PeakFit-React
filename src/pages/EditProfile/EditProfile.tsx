import "./EditProfile.css";

function EditProfile() {
  return (
    <main className="edit-profile-page">
      <button type="button" className="edit-profile-back">
  <img
    src="/assets/images/pages/EditProfile/leftArrow.png"
    alt="Back"
  />

  <span>Back</span>
</button>

      <section className="edit-profile-layout">
        <article className="edit-profile-card edit-profile-card-left">
          <div className="edit-profile-avatar-wrap">
            <img
              src="/assets/images/pages/EditProfile/Mateo.png"
              alt="Profile photo"
              className="edit-profile-avatar"
            />

            <button type="button" className="edit-profile-avatar-edit" aria-label="Edit photo">
              ✎
            </button>
          </div>

          <h1 className="edit-profile-name">Mateo Rojas</h1>

          <button type="button" className="edit-profile-logout">
            Log out
          </button>
        </article>

        <article className="edit-profile-card edit-profile-card-right">
          <h2 className="edit-profile-title">INFORMATION PROFILE</h2>

          <form className="edit-profile-form">
            <div className="edit-profile-row">
              <div className="edit-profile-field">
                <label>Name (s)</label>
                <input type="text" defaultValue="Mateo" />
              </div>

              <div className="edit-profile-field">
                <label>Last name</label>
                <input type="text" defaultValue="Rojas" />
              </div>
            </div>

            <div className="edit-profile-field">
              <label>Email adress</label>
              <input type="email" defaultValue="mateorojas@gmail.com" />
            </div>

            <div className="edit-profile-row">
              <div className="edit-profile-field">
                <label>Adress</label>
                <input type="text" defaultValue="Calle 12 # 5 - 20" />
              </div>

              <div className="edit-profile-field">
                <label>Phone number</label>
                <input type="text" defaultValue="313 625 8920" />
              </div>
            </div>

            <div className="edit-profile-actions">
              <button type="button" className="edit-profile-discard">
                Discard changes
              </button>

              <button type="submit" className="edit-profile-save">
                Save changes
              </button>
            </div>
          </form>
        </article>
      </section>
    </main>
  );
}

export default EditProfile;