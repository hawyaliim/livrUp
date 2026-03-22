"use client";

export default function RolePage() {
  const roles = [
    {
      key: "client",
      emoji: "🍽️",
      title: "Client",
      sub: "Je commande",
      color: "#FFF0EB",
      border: "#FF5A1F",
      href: "/login?role=client"
    },
    {
      key: "chef",
      emoji: "👨‍🍳",
      title: "Chef de Restaurant",
      sub: "Je gère mon resto",
      color: "#EFF6FF",
      border: "#2196F3",
      href: "/login?role=chef"
    },
    {
      key: "livreur",
      emoji: "🛵",
      title: "Livreur",
      sub: "Je livre",
      color: "#F0FFF4",
      border: "#00C853",
      href: "/login?role=livreur"
    },
  ];

  return (
    <div style={{
      width: '100%',
      maxWidth: 390,
      margin: '0 auto',
      minHeight: '100vh',
      background: '#F9FAFB',
      fontFamily: "'Syne', 'DM Sans', sans-serif",
    }}>

      {/* Header rectangle plein */}
      <div style={{
        background: 'linear-gradient(135deg, #FF5A1F, #E02D1B)',
        padding: '60px 24px 32px',
      }}>
        <h1 style={{
          color: 'white',
          fontSize: 34,
          fontWeight: 900,
          margin: '0 0 8px',
          letterSpacing: -0.5,
          fontFamily: 'Syne, sans-serif'
        }}>LivrUP</h1>
        <p style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: 15,
          margin: 0,
          fontFamily: 'DM Sans, sans-serif'
        }}>Comment souhaitez-vous utiliser l'app ?</p>
      </div>

      {/* Cartes rôles */}
      <div style={{ padding: '24px 20px' }}>
        {roles.map(r => (
          <div
            key={r.key}
            onClick={() => window.location.href = r.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '18px 16px',
              borderRadius: 20,
              border: `2px solid ${r.border}33`,
              background: 'white',
              marginBottom: 14,
              cursor: 'pointer',
            }}
          >
            {/* Icône */}
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: r.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              flexShrink: 0
            }}>{r.emoji}</div>

            {/* Texte */}
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 16, color: '#1A1A2E', margin: 0, fontFamily: 'Syne, sans-serif' }}>{r.title}</p>
              <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0', fontFamily: 'DM Sans, sans-serif' }}>{r.sub}</p>
            </div>

            {/* Flèche */}
            <div style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              background: r.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: r.border,
              fontWeight: 700,
              fontSize: 16
            }}>→</div>
          </div>
        ))}

        {/* Bouton S'inscrire */}
        <button
          onClick={() => window.location.href = '/signup'}
          style={{
            width: '100%',
            padding: '18px',
            background: 'linear-gradient(135deg, #FF5A1F, #E02D1B)',
            color: 'white',
            border: 'none',
            borderRadius: 18,
            fontSize: 17,
            fontWeight: 800,
            cursor: 'pointer',
            marginTop: 8,
            boxShadow: '0 8px 24px rgba(255,90,31,0.4)',
            fontFamily: 'Syne, sans-serif'
          }}
        >
          S'inscrire
        </button>

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14, color: '#6B7280', fontFamily: 'DM Sans, sans-serif' }}>
          Déjà un compte ?{' '}
          <span
            onClick={() => window.location.href = '/login'}
            style={{ color: '#FF5A1F', fontWeight: 700, cursor: 'pointer' }}
          >
            Se connecter
          </span>
        </p>
      </div>
    </div>
  );
}
