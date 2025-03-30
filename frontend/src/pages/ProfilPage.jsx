import { useState } from "react";
import { updateEmail, updatePassword } from "../services/userService";

function ProfilPage() {
  const [form, setForm] = useState({
    isEditingEmail: false,
    oldEmail: "", // Plus nécessaire
    newEmail: "",
    emailError: "",
    isEditingPassword: false,
    oldPassword: "",
    newPassword: "",
    passwordError: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmailUpdate = async () => {
    try {
      await updateEmail({ newEmail: form.newEmail });
      setForm({ ...form, isEditingEmail: false, emailError: "" });
      alert("Adresse email mise à jour !");
    } catch (error) {
      setForm({
        ...form,
        emailError: error.response?.data?.message || "Erreur inconnue.",
      });
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      await updatePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      setForm({ ...form, isEditingPassword: false, passwordError: "" });
      alert("Mot de passe mis à jour !");
    } catch (error) {
      setForm({
        ...form,
        passwordError: error.response?.data?.message || "Erreur inconnue.",
      });
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Profil</h2>

      {!form.isEditingEmail ? (
        <button
          onClick={() => setForm({ ...form, isEditingEmail: true })}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Modifier votre adresse mail
        </button>
      ) : (
        <div className="space-y-2 mb-4">
          <input
            type="email"
            name="newEmail"
            placeholder="Nouvelle adresse mail"
            value={form.newEmail}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {form.emailError && <p className="text-red-500">{form.emailError}</p>}
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleEmailUpdate}
            >
              Confirmer
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setForm({ ...form, isEditingEmail: false })}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {!form.isEditingPassword ? (
        <button
          onClick={() => setForm({ ...form, isEditingPassword: true })}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Modifier le mot de passe
        </button>
      ) : (
        <div className="space-y-2 mt-4">
          <input
            type="password"
            name="oldPassword"
            placeholder="Ancien mot de passe"
            value={form.oldPassword}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            type="password"
            name="newPassword"
            placeholder="Nouveau mot de passe"
            value={form.newPassword}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {form.passwordError && (
            <p className="text-red-500">{form.passwordError}</p>
          )}
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handlePasswordUpdate}
            >
              Confirmer
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setForm({ ...form, isEditingPassword: false })}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilPage;
