"use client";
import { useState } from "react";

const slides = [
  {
    emoji: "🔍",
    color: "#FF5A1F",
    title: "Découvrez les meilleurs restaurants",
    desc: "Explorez des centaines de restaurants près de chez vous et commandez vos plats préférés"
  },
  {
    emoji: "⚡",
    color: "#7C3AED",
    title: "Livraison ultra rapide",
    desc: "Recevez vos plats chauds en moins de 30 minutes directement à votre porte"
  },
  {
    emoji: "💳",
    color: "#00C853",
    title: "Paiement simple et sécurisé",
    desc: "Payez en cash, carte ou mobile money en toute sécurité"
  },
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      window.location.href = "/login";
    }
  };

  const slide = slides[current];

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
      justifyContent: 'space-between',
      padding: '60px 24px 48px',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box'
    }}>

      {/* Passer */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => window.location.href = '/login'} style={{
          background: '#F3F4F6', border: 'none', borderRadius: 20,
          padding: '8px 18px', fontSize: 14, fontWeight: 600,
          color: '#6B7280', cursor: 'pointer'
        }}>Passer</button>
      </div>

      {/* Icône */}
      <div style={{
        width: 160,
        height: 160,
        borderRadius: 40,
        background: slide.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 72,
        boxShadow: `0 16px 48px ${slide.color}44`,
        transition: 'all 0.3s ease'
      }}>
        {slide.emoji}
      </div>

      {/* Texte */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: 28,
          fontWeight: 900,
          color: '#1A1A2E',
          marginBottom: 16,
          lineHeight: 1.3,
          fontFamily: 'sans-serif'
        }}>{slide.title}</h1>
        <p style={{
          fontSize: 15,
          color: '#6B7280',
          lineHeight: 1.6,
          margin: 0
        }}>{slide.desc}</p>
      </div>

      {/* Points indicateurs */}
      <div style={{ display: 'flex', gap: 8 }}>
        {slides.map((_, i) => (
          <div key={i} style={{
            width: i === current ? 24 : 8,
            height: 8,
            borderRadius: 4,
            background: i === current ? '#FF5A1F' : '#E5E7EB',
            transition: 'all 0.3s ease'
          }} />
        ))}
      </div>

      {/* Bouton */}
      <button onClick={handleNext} style={{
        width: '100%',
        padding: '18px',
        background: 'linear-gradient(135deg, #FF5A1F, #E02D1B)',
        color: 'white',
        border: 'none',
        borderRadius: 18,
        fontSize: 17,
        fontWeight: 800,
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(255,90,31,0.4)'
      }}>
        {current < slides.length - 1 ? 'Suivant →' : 'Commencer 🚀'}
      </button>

    </div>
  );
}