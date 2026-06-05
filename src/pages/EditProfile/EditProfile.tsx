import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PageBackButton from "../../components/PageBackButton/PageBackButton";
import "./EditProfile.css";

function EditProfile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [photo, setPhoto] = useState(user?.photo ?? "");

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const nextPhoto = reader.result as string;
      setPhoto(nextPhoto);
      await updateUser({ name, email, photo: nextPhoto });
    };
    reader.readAsDataURL(file);
  }

  async function clearPhoto() {
    setPhoto("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    await updateUser({ name, email, photo: null });
  }

  function handleSave() {
    updateUser({ name, email, photo: photo || null });
  }

  function handleDiscard() {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPhoto(user?.photo ?? "");
  }

  const initial = name.trim().charAt(0).toUpperCase() || "U";

  return (
    <main className="edit-profile-page">
      <PageBackButton />

      <section className="edit-profile-layout">
        <article className="edit-profile-card edit-profile-card-left">
          <div className="edit-profile-avatar-wrap">
            {photo ? (
              <img src={photo} alt="Profile photo" className="edit-profile-avatar" />
            ) : (
              <div className="edit-profile-avatar edit-profile-avatar--placeholder" aria-hidden="true">
                {initial}
              </div>
            )}

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

            <button
              type="button"
              className="edit-profile-avatar-clear"
              aria-label="Remove photo"
              onClick={clearPhoto}
              disabled={!photo}
            >
              ×
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
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="edit-profile-field">
                <label>Last name</label>
                <input type="text" placeholder="Last name" />
              </div>
            </div>

            <div className="edit-profile-field">
              <label>Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="edit-profile-row">
              <div className="edit-profile-field">
                <label>Address</label>
                <input type="text" placeholder="Address" />
              </div>

              <div className="edit-profile-field">
                <label>Phone number</label>
                <input type="text" placeholder="Phone number" />
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
