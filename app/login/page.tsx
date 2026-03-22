"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconEye = ({ open }: { open: boolean }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return setError("Remplissez tous les champs !");
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email ou mot de passe incorrect");
    } else {
      const { data: userData } = await supabase
        .from("users").select("role").eq("id", data.user.id).single();
      const role = userData?.role;
      if (role === "chef") window.location.href = "/chef";
      else if (role === "livreur") window.location.href = "/livreur";
      else window.location.href = "/home";
    }
    setLoading(false);
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: 390,
      margin: '0 auto',
      minHeight: '100vh',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      boxSizing: 'border-box'
    }}>

      {/* Icône utilisateur */}
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: '#FFF0EB',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20
      }}>
        <IconUser />
      </div>

      {/* Titre */}
      <h1 style={{
        fontSize: 30, fontWeight: 800, color: '#1A1A2E',
        margin: '0 0 8px', fontFamily: 'Syne, sans-serif', textAlign: 'center'
      }}>Bon retour !</h1>

      <p style={{
        color: '#6B7280', fontSize: 14, margin: '0 0 36px',
        textAlign: 'center', fontFamily: 'DM Sans, sans-serif'
      }}>Connectez-vous en tant que Client</p>

      {/* Email */}
      <div style={{ width: '100%', marginBottom: 16 }}>
        <label style={{
          fontSize: 13, fontWeight: 600, color: '#374151',
          display: 'block', marginBottom: 8, fontFamily: 'DM Sans, sans-serif'
        }}>Email</label>
        <div style={{
          display: 'flex', alignItems: 'center',
          border: '2px solid #E5E7EB', borderRadius: 14,
          padding: '0 16px', background: 'white', gap: 10
        }}>
          <IconUser />
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(""); }}
            style={{
              flex: 1, border: 'none', outline: 'none',
              padding: '14px 0', fontSize: 15,
              fontFamily: 'DM Sans, sans-serif', color: '#1A1A2E', background: 'transparent'
            }}
          />
        </div>
      </div>

      {/* Mot de passe */}
      <div style={{ width: '100%', marginBottom: 8 }}>
        <label style={{
          fontSize: 13, fontWeight: 600, color: '#374151',
          display: 'block', marginBottom: 8, fontFamily: 'DM Sans, sans-serif'
        }}>Mot de passe</label>
        <div style={{
          display: 'flex', alignItems: 'center',
          border: '2px solid #E5E7EB', borderRadius: 14,
          padding: '0 16px', background: 'white', gap: 10
        }}>
          <IconLock />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(""); }}
            style={{
              flex: 1, border: 'none', outline: 'none',
              padding: '14px 0', fontSize: 15,
              fontFamily: 'DM Sans, sans-serif', color: '#1A1A2E', background: 'transparent'
            }}
          />
          <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
            <IconEye open={showPassword} />
          </span>
        </div>
      </div>

      {/* Mot de passe oublié */}
      <div style={{ width: '100%', textAlign: 'right', marginBottom: 24 }}>
        <span style={{
          color: '#FF5A1F', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'DM Sans, sans-serif'
        }}>Mot de passe oublié ?</span>
      </div>

      {/* Erreur */}
      {error && (
        <div style={{
          width: '100%', background: '#FFF0EB',
          border: '1px solid #FF5A1F', borderRadius: 12,
          padding: '12px 16px', fontSize: 14, color: '#C2410C',
          marginBottom: 16, fontFamily: 'DM Sans, sans-serif'
        }}>⚠️ {error}</div>
      )}

      {/* Bouton */}
      <button onClick={handleLogin} disabled={loading} style={{
        width: '100%', padding: '18px',
        background: loading ? '#D1D5DB' : 'linear-gradient(135deg, #FF5A1F, #E02D1B)',
        color: 'white', border: 'none', borderRadius: 18,
        fontSize: 16, fontWeight: 700,
        cursor: loading ? 'not-allowed' : 'pointer',
        boxShadow: loading ? 'none' : '0 8px 24px rgba(255,90,31,0.4)',
        fontFamily: 'Syne, sans-serif', marginBottom: 20
      }}>
        {loading ? 'Connexion...' : 'Se connecter →'}
      </button>

      {/* Lien inscription */}
      <p style={{
        fontSize: 14, color: '#6B7280',
        textAlign: 'center', fontFamily: 'DM Sans, sans-serif'
      }}>
        Pas encore de compte ?{' '}
        <span
          onClick={() => window.location.href = '/signup'}
          style={{ color: '#FF5A1F', fontWeight: 700, cursor: 'pointer' }}
        >S'inscrire</span>
      </p>

    </div>
  );
}