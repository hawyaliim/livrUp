"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function TestPage() {
  const [status, setStatus] = useState("Connexion en cours...");

  useEffect(() => {
    async function test() {
      const { data, error } = await supabase.from("users").select("*").limit(1);
      if (error) {
        setStatus("❌ Erreur : " + error.message);
      } else {
        setStatus("✅ Connexion réussie ! Supabase fonctionne.");
      }
    }
    test();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      fontSize: 24,
      fontWeight: 700
    }}>
      {status}
    </div>
  );
}
