"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const RESTAURANTS = [
  { id:'r1', name:'Burger Palace', emoji:'🍔', cat:'Burgers', rating:4.8, time:'20-30 min', fee:2.50, img:'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80', desc:'Burgers artisanaux & frites maison', open:true },
  { id:'r2', name:'Pizza Napoli', emoji:'🍕', cat:'Pizza', rating:4.9, time:'25-35 min', fee:2.99, img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', desc:'Pizzas au feu de bois depuis 1987', open:true },
  { id:'r3', name:'Sushi Tokyo', emoji:'🍱', cat:'Japonais', rating:4.7, time:'30-40 min', fee:3.50, img:'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80', desc:'Sashimi frais, rolls & chirashi', open:true },
  { id:'r4', name:'Tacos Fiesta', emoji:'🌮', cat:'Mexicain', rating:4.5, time:'15-25 min', fee:1.99, img:'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80', desc:'Saveurs mexicaines authentiques', open:true },
  { id:'r5', name:'Green Bowl', emoji:'🥗', cat:'Healthy', rating:4.6, time:'15-20 min', fee:1.50, img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', desc:'Bowls santé & salades fraîches', open:false },
  { id:'r6', name:'Pasta Bella', emoji:'🍝', cat:'Italien', rating:4.7, time:'20-30 min', fee:2.49, img:'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80', desc:'Pâtes fraîches maison chaque jour', open:true },
];

const CATEGORIES = ['Tous','Burgers','Pizza','Japonais','Mexicain','Healthy','Italien'];

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconCart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('Tous');
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }
      const { data } = await supabase.from("users").select("*").eq("id", user.id).single();
      setUser(data);
    }
    getUser();
  }, []);

  const filtered = RESTAURANTS.filter(r =>
    (cat === 'Tous' || r.cat === cat) &&
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  if (!user) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9FAFB' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🛵</div>
        <p style={{ color: '#FF5A1F', fontWeight: 700, fontFamily: 'Syne, sans-serif' }}>Chargement...</p>
      </div>
    </div>
  );

  return (
    <div style={{ width: '100%', maxWidth: 390, margin: '0 auto', minHeight: '100vh', background: '#F9FAFB', fontFamily: 'DM Sans, sans-serif', paddingBottom: 90 }}>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #FF5A1F, #E02D1B)', padding: '48px 20px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 4 }}>📍 Djibouti, DJ</p>
            <img src="/logo.png" alt="LivrUP" style={{ height: 28, marginBottom: 4, filter: 'brightness(10)' }} />
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: 0 }}>Que souhaitez-vous manger ?</p>
          </div>
          <button onClick={() => window.location.href = '/cart'} style={{ position: 'relative', width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconCart />
            {cartCount > 0 && (
              <div style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', background: 'white', color: '#FF5A1F', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartCount}
              </div>
            )}
          </button>
        </div>

        {/* Recherche */}
        <div style={{ background: 'white', borderRadius: 16, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
          <IconSearch />
          <input
            style={{ flex: 1, border: 'none', outline: 'none', padding: '14px 0', fontSize: 14, fontFamily: 'DM Sans, sans-serif' }}
            placeholder="Rechercher un restaurant..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>

        {/* PROMO */}
        <div style={{ background: 'linear-gradient(135deg, #1A1A2E, #16213E)', borderRadius: 20, padding: '18px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,90,31,0.15)' }} />
          <div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 4 }}>🔥 Offre spéciale</p>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: 'white', marginBottom: 4 }}>-20% sur votre 1ère commande</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>Code: LIVRUP20</p>
          </div>
          <div style={{ fontSize: 36, flexShrink: 0 }}>🎁</div>
        </div>

        {/* CATEGORIES */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 20, paddingBottom: 4 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '8px 16px', borderRadius: 20, border: 'none',
              cursor: 'pointer', whiteSpace: 'nowrap',
              background: cat === c ? '#FF5A1F' : 'white',
              color: cat === c ? 'white' : '#6B7280',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600, fontSize: 13,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>{c}</button>
          ))}
        </div>

        {/* TITRE */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#1A1A2E', margin: 0 }}>
            {filtered.length} restaurants
          </h2>
        </div>

        {/* LISTE RESTAURANTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map((r, i) => (
            <div key={r.id} onClick={() => window.location.href = `/restaurant/${r.id}`} style={{
              background: 'white', borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)', cursor: 'pointer',
              animation: `fadeUp 0.5s ease forwards`,
              animationDelay: `${i * 0.05}s`, opacity: 0
            }}>
              <div style={{ position: 'relative' }}>
                <img src={r.img} alt={r.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 12, left: 12 }}>
                  <span style={{ background: 'white', borderRadius: 20, padding: '4px 10px', fontSize: 12, fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', color: '#1A1A2E' }}>⭐ {r.rating}</span>
                </div>
                {!r.open && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px 20px 0 0' }}>
                    <span style={{ color: 'white', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>Fermé</span>
                  </div>
                )}
                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                  <span style={{ background: '#FF5A1F', color: 'white', borderRadius: 20, padding: '4px 10px', fontSize: 12, fontWeight: 700 }}>{r.cat}</span>
                </div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: '#1A1A2E', marginBottom: 6 }}>{r.emoji} {r.name}</h3>
                <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 10 }}>{r.desc}</p>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#6B7280', fontSize: 12 }}>
                    <IconClock /> {r.time}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#6B7280', fontSize: 12 }}>
                    🛵 {r.fee.toFixed(2)} €
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#9CA3AF' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>Aucun restaurant trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 390, background: 'white', borderTop: '1px solid #F0F0F0',
        display: 'flex', padding: '10px 0 20px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.06)', zIndex: 100
      }}>
        {[
          { icon: '🏠', label: 'Accueil', href: '/home', active: true },
          { icon: '🔍', label: 'Explorer', href: '/home', active: false },
          { icon: '🛒', label: 'Panier', href: '/cart', active: false },
          { icon: '💬', label: 'Messages', href: '/messages', active: false },
          { icon: '👤', label: 'Profil', href: '/profile', active: false },
        ].map((item, i) => (
          <div key={i} onClick={() => window.location.href = item.href} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 4, cursor: 'pointer'
          }}>
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: item.active ? '#FF5A1F' : '#9CA3AF', fontFamily: 'DM Sans, sans-serif' }}>{item.label}</span>
            {item.active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF5A1F' }} />}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}