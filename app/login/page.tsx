"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return setMessage("⚠️ Remplis tous les champs !");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMessage("❌ " + error.message);
    } else {
      // Récupérer le rôle de l'utilisateur
      const { data: userData } = await supabase
        .from("users")
        .select("role, name")
        .eq("id", data.user.id)
        .single();

      const role = userData?.role;
      setMessage(`✅ Bienvenue ${userData?.name} !`);

      // Rediriger selon le rôle
      setTimeout(() => {
        if (role === "chef") window.location.href = "/chef";
        else if (role === "livreur") window.location.href = "/livreur";
        else window.location.href = "/home";
      }, 1000);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F5F5F5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        width: 390,
        background: 'white',
        minHeight: '100vh',
        padding: '60px 24px 40px',
        boxShadow: '0 0 40px rgba(0,0,0,0.1)'
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 56 }}>🛵</div>
          <h1 style={{
            fontSize: 32, fontWeight: 900,
            color: '#FF5A1F', margin: '12px 0 6px'
          }}>LivrUp</h1>
          <p style={{ color: '#6B7280', fontSize: 14 }}>
            Bon retour 👋
          </p>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E', display: 'block', marginBottom: 8 }}>
            Email
          </label>
          <input
            type="email"
            placeholder="ton@email.com"
            value={email}
            onChange={e => { setEmail(e.target.value); setMessage(""); }}
            style={{
              width: '100%', padding: '14px 16px',
              border: '2px solid #E5E7EB', borderRadius: 14,
              fontSize: 15, outline: 'none', boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Mot de passe */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E', display: 'block', marginBottom: 8 }}>
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => { setPassword(e.target.value); setMessage(""); }}
            style={{
              width: '100%', padding: '14px 16px',
              border: '2px solid #E5E7EB', borderRadius: 14,
              fontSize: 15, outline: 'none', boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Message */}
        {message && (
          <div style={{
            background: message.includes('✅') ? '#F0FFF4' : '#FFF0EB',
            border: `1px solid ${message.includes('✅') ? '#00C853' : '#FF5A1F'}`,
            borderRadius: 12, padding: '12px 16px',
            fontSize: 14, marginBottom: 16,
            color: message.includes('✅') ? '#065F46' : '#C2410C'
          }}>
            {message}
          </div>
        )}

        {/* Bouton */}
        <button onClick={handleLogin} disabled={loading} style={{
          width: '100%', padding: '16px',
          background: loading ? '#D1D5DB' : 'linear-gradient(135deg, #FF5A1F, #E02D1B)',
          color: 'white', border: 'none', borderRadius: 16,
          fontSize: 16, fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}>
          {loading ? 'Connexion...' : 'Se connecter 🚀'}
        </button>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#6B7280' }}>
          Pas encore de compte ?{' '}
          <a href="/signup" style={{ color: '#FF5A1F', fontWeight: 600 }}>
            S'inscrire
          </a>
        </p>

      </div>
    </div>
  );
}