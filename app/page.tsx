"use client";
import { useState, useEffect } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div style={{
      width: '100%',
      maxWidth: 390,
      margin: '0 auto',
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #FFE8DC 0%, #FFDDD0 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Emojis décoratifs */}
      <div style={{ position: 'absolute', top: 100, left: 24, fontSize: 40, opacity: 0.2 }}>🍔</div>
      <div style={{ position: 'absolute', top: 200, right: 20, fontSize: 32, opacity: 0.2 }}>🌮</div>
      <div style={{ position: 'absolute', bottom: 250, right: 20, fontSize: 32, opacity: 0.2 }}>🍕</div>
      <div style={{ position: 'absolute', bottom: 180, left: 20, fontSize: 28, opacity: 0.2 }}>🍛</div>

      {/* Grand cercle blanc avec logo */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.8)',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 32
      }}>
        <div style={{
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 48px rgba(255,90,31,0.15)',
          marginBottom: 28
        }}>
          <img
            src="/logo.png"
            alt="LivrUp"
            style={{
              width: 180,
              height: 180,
              objectFit: 'contain',
              borderRadius: '50%'
            }}
          />
        </div>

        <p style={{
          color: '#FF5A1F',
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: 3,
          textTransform: 'uppercase',
          margin: 0
        }}>DON'T COOK, JUST CLICK</p>
      </div>

      {/* Bouton Commencer */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s ease 0.3s',
        width: '78%',
        textAlign: 'center'
      }}>
        <button
          onClick={() => window.location.href = '/onboarding'}
          style={{
            width: '100%',
            padding: '18px 24px',
            background: 'linear-gradient(135deg, #FF5A1F, #E02D1B)',
            color: 'white',
            border: 'none',
            borderRadius: 18,
            fontSize: 17,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(255,90,31,0.4)',
            letterSpacing: 0.5
          }}
        >
          Commencer
        </button>
        <p style={{
          color: '#B0B0B0',
          fontSize: 13,
          marginTop: 14
        }}>Votre repas à portée de main</p>
      </div>

    </div>
  );
}