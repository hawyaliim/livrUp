"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const restaurants = [
  { id: 1, name: "Daallo Palace", category: "Somali • Traditionnel", emoji: "🍖", rating: 4.8, time: "25-35", fee: 200, badge: "⭐ Populaire" },
  { id: 2, name: "Chez Fatuma", category: "Djiboutien • Fait maison", emoji: "🍛", rating: 4.6, time: "20-30", fee: 150, badge: "🔥 Nouveau" },
  { id: 3, name: "Pizza Roma", category: "Italien • Pizza", emoji: "🍕", rating: 4.5, time: "30-45", fee: 300, badge: null },
  { id: 4, name: "Burger House", category: "Américain • Fast food", emoji: "🍔", rating: 4.3, time: "15-25", fee: 200, badge: "⚡ Rapide" },
  { id: 5, name: "Sushi Zen", category: "Japonais • Sushi", emoji: "🍱", rating: 4.7, time: "35-50", fee: 400, badge: null },
];

const categories = [
  { emoji: "🍖", label: "Viande" },
  { emoji: "🍕", label: "Pizza" },
  { emoji: "🍔", label: "Burger" },
  { emoji: "🍛", label: "Local" },
  { emoji: "🍱", label: "Sushi" },
  { emoji: "🥗", label: "Salade" },
];

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }
      const { data } = await supabase.from("users").select("*").eq("id", user.id).single();
      setUser(data);
    }
    getUser();
  }, []);

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!user) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <p style={{ color: '#FF5A1F', fontWeight: 700 }}>Chargement...</p>
    </div>
  );

  return (
    <div style={{ width: '100%', maxWidth: 390, margin: '0 auto', minHeight: '100vh', background: '#F9FAFB', fontFamily: 'sans-serif', paddingBottom: 90 }}>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #FF5A1F, #E02D1B)', padding: '52px 20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, margin: 0 }}>Bonjour 👋</p>
            <h1 style={{ color: 'white', fontSize: 22, fontWeight: 900, margin: '2px 0 0' }}>{user.name}</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, margin: '4px 0 0' }}>📍 Djibouti-Ville</p>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🔔</div>
        </div>

        {/* Barre de recherche */}
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 18 }}>🔍</span>
          <input
            placeholder="Rechercher un restaurant..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px 14px 44px',
              borderRadius: 14, border: 'none',
              fontSize: 14, outline: 'none',
              boxSizing: 'border-box',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      </div>

      {/* CATEGORIES */}
      <div style={{ padding: '20px 20px 0' }}>
        <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', marginBottom: 14 }}>Catégories</h2>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {['Tous', ...categories.map(c => c.label)].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '8px 16px', borderRadius: 20,
              border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              background: activeCategory === cat ? '#FF5A1F' : 'white',
              color: activeCategory === cat ? 'white' : '#6B7280',
              fontWeight: 600, fontSize: 13,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              {categories.find(c => c.label === cat)?.emoji} {cat}
            </button>
          ))}
        </div>
      </div>

      {/* RESTAURANTS */}
      <div style={{ padding: '20px' }}>
        <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', marginBottom: 14 }}>
          🍽️ Restaurants ({filtered.length})
        </h2>
        {filtered.map(r => (
          <div key={r.id} style={{
            background: 'white', borderRadius: 20,
            marginBottom: 16, overflow: 'hidden',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            cursor: 'pointer'
          }}>
            {/* Image */}
            <div style={{
              height: 140, background: `linear-gradient(135deg, #FF5A1F22, #E02D1B22)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 64, position: 'relative'
            }}>
              {r.emoji}
              {r.badge && (
                <span style={{
                  position: 'absolute', top: 12, left: 12,
                  background: 'white', borderRadius: 20,
                  padding: '4px 10px', fontSize: 11, fontWeight: 700,
                  color: '#FF5A1F', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>{r.badge}</span>
              )}
              <span style={{
                position: 'absolute', top: 12, right: 12,
                background: 'white', borderRadius: 20,
                padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#1A1A2E'
              }}>❤️</span>
            </div>

            {/* Infos */}
            <div style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>{r.name}</h3>
                  <p style={{ fontSize: 12, color: '#6B7280', margin: '2px 0 0' }}>{r.category}</p>
                </div>
                <div style={{
                  background: '#F0FFF4', borderRadius: 10,
                  padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4
                }}>
                  <span style={{ fontSize: 12 }}>⭐</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#065F46' }}>{r.rating}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
                <span style={{ fontSize: 12, color: '#6B7280' }}>🕐 {r.time} min</span>
                <span style={{ fontSize: 12, color: '#6B7280' }}>🛵 {r.fee} DJF</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM NAV */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 390, background: 'white', borderTop: '1px solid #F0F0F0',
        display: 'flex', padding: '10px 0 20px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.06)', zIndex: 100
      }}>
        {[
          { icon: '🏠', label: 'Accueil', active: true },
          { icon: '🔍', label: 'Explorer', active: false },
          { icon: '🛒', label: 'Panier', active: false },
          { icon: '💬', label: 'Messages', active: false },
          { icon: '👤', label: 'Profil', active: false },
        ].map((item, i) => (
          <div key={i} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 4, cursor: 'pointer'
          }}>
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: 600,
              color: item.active ? '#FF5A1F' : '#9CA3AF'
            }}>{item.label}</span>
            {item.active && (
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF5A1F' }} />
            )}
          </div>
        ))}
      </div>

    </div>
  );
}