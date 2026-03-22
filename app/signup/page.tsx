"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconMap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconChef = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/>
  </svg>
);

const icons: any = { user: <IconUser />, lock: <IconLock />, phone: <IconPhone />, mappin: <IconMap />, chef: <IconChef /> };

function InputField({ label, icon, type = "text", value, onChange, placeholder }: any) {
  const [showPass, setShowPass] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#374151', marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #E5E7EB', borderRadius: 14, padding: '0 16px', background: 'white', gap: 10 }}>
        {icons[icon]}
        <input
          type={type === 'password' ? (showPass ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ flex: 1, border: 'none', outline: 'none', padding: '14px 0', fontSize: 15, fontFamily: 'DM Sans, sans-serif', color: '#1A1A2E', background: 'transparent' }}
        />
        {type === 'password' && (
          <span onClick={() => setShowPass(!showPass)} style={{ cursor: 'pointer', color: '#9CA3AF', fontSize: 14 }}>
            {showPass ? '🙈' : '👁️'}
          </span>
        )}
      </div>
    </div>
  );
}

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('client');
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '', restaurantName: '', vehicle: 'Scooter', plate: '', cuisine: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));

  const roles = [
    { id: 'client', label: 'Client', emoji: '👤', grad: 'linear-gradient(135deg,#FF5A1F,#E02D1B)' },
    { id: 'chef', label: 'Restaurant', emoji: '👨‍🍳', grad: 'linear-gradient(135deg,#2196F3,#0D47A1)' },
    { id: 'livreur', label: 'Livreur', emoji: '🛵', grad: 'linear-gradient(135deg,#00C853,#1B5E20)' },
  ];

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) return setError('Remplissez les champs obligatoires');
    if (form.password.length < 6) return setError('Mot de passe trop court (6 min)');
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name, role } }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    await supabase.from("users").insert({
      id: data.user?.id,
      email: form.email,
      name: form.name,
      role,
      phone: form.phone,
      address: form.address
    });

    setLoading(false);
    window.location.href = '/login';
  };

  return (
    <div style={{ width: '100%', maxWidth: 390, margin: '0 auto', minHeight: '100vh', background: 'linear-gradient(160deg, #FF5A1F, #E02D1B)', padding: '0 0 32px', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Header */}
      <div style={{ padding: '48px 24px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => window.location.href = '/role'} style={{ width: 40, height: 40, borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'white' }}>←</button>
        <div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: 'white', margin: 0 }}>Créer un compte</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: 0 }}>Étape {step} sur 2</p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '0 24px', marginBottom: 24 }}>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
          <div style={{ height: '100%', background: 'white', borderRadius: 2, width: step === 1 ? '50%' : '100%', transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* Carte blanche */}
      <div style={{ padding: '0 24px' }}>
        <div style={{ background: 'white', borderRadius: 24, padding: '28px 22px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>

          {step === 1 ? (
            <>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: '#1A1A2E', marginBottom: 6 }}>Votre rôle</h3>
              <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 20 }}>Comment allez-vous utiliser LivrUp ?</p>

              {/* Rôles */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
                {roles.map(r => (
                  <div key={r.id} onClick={() => setRole(r.id)} style={{ flex: 1, borderRadius: 14, padding: '14px 8px', textAlign: 'center', cursor: 'pointer', border: `2px solid ${role === r.id ? '#FF5A1F' : '#E5E7EB'}`, background: role === r.id ? '#FFF0EB' : 'white', transition: 'all 0.2s' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: r.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: 18 }}>{r.emoji}</div>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 11, color: '#1A1A2E', margin: 0 }}>{r.label}</p>
                  </div>
                ))}
              </div>

              {/* Champs selon rôle */}
              {role === 'client' && (
                <>
                  <InputField label="Prénom & Nom *" icon="user" value={form.name} onChange={set('name')} placeholder="Mohamed Abdi" />
                  <InputField label="Email *" type="email" icon="user" value={form.email} onChange={set('email')} placeholder="votre@email.com" />
                  <InputField label="Mot de passe *" type="password" icon="lock" value={form.password} onChange={set('password')} placeholder="Min. 6 caractères" />
                  <InputField label="Téléphone" icon="phone" value={form.phone} onChange={set('phone')} placeholder="+253 77 00 00 00" />
                </>
              )}
              {role === 'chef' && (
                <>
                  <InputField label="Nom du restaurant *" icon="chef" value={form.restaurantName} onChange={set('restaurantName')} placeholder="Mon Restaurant" />
                  <InputField label="Nom du gérant *" icon="user" value={form.name} onChange={set('name')} placeholder="Ahmed Hassan" />
                  <InputField label="Email professionnel *" type="email" icon="user" value={form.email} onChange={set('email')} placeholder="contact@restaurant.com" />
                  <InputField label="Mot de passe *" type="password" icon="lock" value={form.password} onChange={set('password')} placeholder="Min. 6 caractères" />
                  <InputField label="Téléphone du restaurant" icon="phone" value={form.phone} onChange={set('phone')} placeholder="+253 77 00 00 00" />
                </>
              )}
              {role === 'livreur' && (
                <>
                  <InputField label="Prénom & Nom *" icon="user" value={form.name} onChange={set('name')} placeholder="Karim Benali" />
                  <InputField label="Email *" type="email" icon="user" value={form.email} onChange={set('email')} placeholder="votre@email.com" />
                  <InputField label="Mot de passe *" type="password" icon="lock" value={form.password} onChange={set('password')} placeholder="Min. 6 caractères" />
                  <InputField label="Téléphone *" icon="phone" value={form.phone} onChange={set('phone')} placeholder="+253 77 00 00 00" />
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#374151', marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>Moyen de transport *</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[{ v: 'Scooter', e: '🛵' }, { v: 'Vélo', e: '🚲' }, { v: 'Moto', e: '🏍️' }, { v: 'Voiture', e: '🚗' }].map(({ v, e }) => (
                        <button key={v} onClick={() => setForm(f => ({ ...f, vehicle: v }))} style={{ flex: 1, padding: '10px 4px', borderRadius: 12, border: `2px solid ${form.vehicle === v ? '#FF5A1F' : '#E5E7EB'}`, background: form.vehicle === v ? '#FFF0EB' : 'white', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 11, cursor: 'pointer', color: '#1A1A2E', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                          <span style={{ fontSize: 20 }}>{e}</span>{v}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {error && <p style={{ color: '#E02D1B', fontSize: 13, marginBottom: 12 }}>⚠️ {error}</p>}

              <button onClick={() => {
                if (!form.name || !form.email || !form.password) return setError('Remplissez les champs obligatoires');
                if (role === 'chef' && !form.restaurantName) return setError('Indiquez le nom du restaurant');
                setError('');
                setStep(2);
              }} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #FF5A1F, #E02D1B)', color: 'white', border: 'none', borderRadius: 16, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'Syne, sans-serif', boxShadow: '0 8px 24px rgba(255,90,31,0.4)' }}>
                Continuer →
              </button>
            </>
          ) : (
            <>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: '#1A1A2E', marginBottom: 6 }}>
                {role === 'client' ? 'Votre adresse' : role === 'chef' ? 'Infos du restaurant' : 'Votre véhicule'}
              </h3>
              <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 20 }}>
                {role === 'client' ? 'Pour vous livrer au bon endroit' : role === 'chef' ? 'Pour afficher votre établissement' : 'Pour compléter votre profil livreur'}
              </p>

              {role === 'client' && (
                <>
                  <InputField label="Adresse de livraison *" icon="mappin" value={form.address} onChange={set('address')} placeholder="Plateau, Djibouti-ville" />
                  <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 16 }}>💡 Vous pourrez modifier cette adresse à chaque commande</p>
                </>
              )}
              {role === 'chef' && (
                <>
                  <InputField label="Adresse du restaurant *" icon="mappin" value={form.address} onChange={set('address')} placeholder="Rue, Djibouti" />
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#374151', marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>Type de cuisine</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {['🍔 Burgers', '🍕 Pizzas', '🍱 Asiatique', '🥗 Healthy', '🍖 Grillades'].map(v => (
                        <button key={v} onClick={() => setForm(f => ({ ...f, cuisine: v }))} style={{ padding: '8px 12px', borderRadius: 10, border: `2px solid ${form.cuisine === v ? '#FF5A1F' : '#E5E7EB'}`, background: form.cuisine === v ? '#FFF0EB' : 'white', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 11, cursor: 'pointer', color: '#1A1A2E' }}>
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {role === 'livreur' && (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#374151', marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>Type de véhicule</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['Scooter', 'Vélo', 'Moto'].map(v => (
                        <button key={v} onClick={() => setForm(f => ({ ...f, vehicle: v }))} style={{ flex: 1, padding: '10px 6px', borderRadius: 12, border: `2px solid ${form.vehicle === v ? '#FF5A1F' : '#E5E7EB'}`, background: form.vehicle === v ? '#FFF0EB' : 'white', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 12, cursor: 'pointer', color: '#1A1A2E' }}>
                          {v === 'Scooter' ? '🛵' : v === 'Vélo' ? '🚲' : '🏍️'} {v}
                        </button>
                      ))}
                    </div>
                  </div>
                  <InputField label="Plaque d'immatriculation" icon="user" value={form.plate} onChange={set('plate')} placeholder="DJ-0000" />
                  <InputField label="Zone de livraison préférée" icon="mappin" value={form.address} onChange={set('address')} placeholder="Plateau, Arhiba..." />
                </>
              )}

              {error && <p style={{ color: '#E02D1B', fontSize: 13, marginBottom: 12 }}>⚠️ {error}</p>}

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: '14px', borderRadius: 14, border: '2px solid #E5E7EB', background: 'white', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer', color: '#6B7280' }}>← Retour</button>
                <button onClick={handleSubmit} disabled={loading} style={{ flex: 2, padding: '14px', background: loading ? '#D1D5DB' : 'linear-gradient(135deg, #FF5A1F, #E02D1B)', color: 'white', border: 'none', borderRadius: 14, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? 'Création...' : 'Créer mon compte ✨'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}