"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    if (!role) return setMessage("⚠️ Choisis un rôle !");
    if (!name || !email || !password) return setMessage("⚠️ Remplis tous les champs !");
    
    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role }
      }
    });

    if (error) {
      setMessage("❌ " + error.message);
    } else {
      // Ajouter dans notre table users
      await supabase.from("users").insert({
        id: data.user?.id,
        email,
        name,
        role
      });
      setMessage("✅ Compte créé ! Vérifie ton email pour confirmer.");
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
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🛵</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#FF5A1F', margin: '8px 0 4px' }}>
            Créer un compte
          </h1>
          <p style={{ color: '#6B7280', fontSize: 14 }}>Rejoins LivrUp !</p>
        </div>

        {/* Choix rôle */}
        <p style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E', marginBottom: 12 }}>Tu es... ?</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {[
            { key: 'client', emoji: '🍽️', label: 'Client' },
            { key: 'chef', emoji: '👨‍🍳', label: 'Restaurant' },
            { key: 'livreur', emoji: '🛵', label: 'Livreur' },
          ].map(r => (
            <div key={r.key} onClick={() => setRole(r.key)} style={{
              flex: 1,
              padding: '12px 8px',
              borderRadius: 14,
              border: `2px solid ${role === r.key ? '#FF5A1F' : '#E5E7EB'}`,
              background: role === r.key ? '#FFF0EB' : 'white',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <div style={{ fontSize: 24 }}>{r.emoji}</div>
              <p style={{ fontSize: 12, fontWeight: 600, color: role === r.key ? '#FF5A1F' : '#6B7280', margin: '4px 0 0' }}>
                {r.label}
              </p>
            </div>
          ))}
        </div>

        {/* Nom */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E', display: 'block', marginBottom: 6 }}>
            Nom complet
          </label>
          <input
            type="text"
            placeholder="Ton nom"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px',
              border: '2px solid #E5E7EB', borderRadius: 14,
              fontSize: 15, outline: 'none', boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E', display: 'block', marginBottom: 6 }}>
            Email
          </label>
          <input
            type="email"
            placeholder="ton@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px',
              border: '2px solid #E5E7EB', borderRadius: 14,
              fontSize: 15, outline: 'none', boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Mot de passe */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E', display: 'block', marginBottom: 6 }}>
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
        <button onClick={handleSignup} disabled={loading} style={{
          width: '100%', padding: '16px',
          background: loading ? '#D1D5DB' : 'linear-gradient(135deg, #FF5A1F, #E02D1B)',
          color: 'white', border: 'none', borderRadius: 16,
          fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer'
        }}>
          {loading ? 'Création...' : "S'inscrire 🚀"}
        </button>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#6B7280' }}>
          Déjà un compte ?{' '}
          <a href="/login" style={{ color: '#FF5A1F', fontWeight: 600 }}>
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}