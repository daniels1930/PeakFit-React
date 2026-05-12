import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PageBackButton from "../../components/PageBackButton/PageBackButton";
import "./EditProfile.css";

const DEFAULT_PHOTO = "/assets/images/pages/EditProfile/Mateo.png";

function EditProfile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [photo, setPhoto] = useState(user?.photo ?? DEFAULT_PHOTO);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSave() {
    updateUser({ name, email, photo });
  }

  function handleDiscard() {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPhoto(user?.photo ?? DEFAULT_PHOTO);
  }

  return (
    <main className="edit-profile-page">
      <PageBackButton />

      <section className="edit-profile-layout">
        <article className="edit-profile-card edit-profile-card-left">
          <div className="edit-profile-avatar-wrap">
            <img
              src={photo}
              alt="Profile photo"
              className="edit-profile-avatar"
            />

            {/* Input file oculto */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />

            <button
              type="button"
              className="edit-profile-avatar-edit"
              aria-label="Edit photo"
              onClick={() => fileInputRef.current?.click()}
            >
              ✎
            </button>
          </div>

          <h1 className="edit-profile-name">{user?.name}</h1>

          <button type="button" className="edit-profile-logout" onClick={() => navigate("/logout")}>
            Log out
          </button>
        </article>

        <article className="edit-profile-card edit-profile-card-right">
          <h2 className="edit-profile-title">INFORMATION PROFILE</h2>

          <div className="edit-profile-form">
            <div className="edit-profile-row">
              <div className="edit-profile-field">
                <label>Name (s)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="edit-profile-field">
                <label>Last name</label>
                <input type="text" defaultValue="Rojas" />
              </div>
            </div>

            <div className="edit-profile-field">
              <label>Email adress</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
              <button type="button" className="edit-profile-discard" onClick={handleDiscard}>
                Discard changes
              </button>

              <button type="button" className="edit-profile-save" onClick={handleSave}>
                Save changes
              </button>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

export default EditProfile;