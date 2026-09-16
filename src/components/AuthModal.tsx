import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, ArrowRight, Shield } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onLoginSuccess: (user: UserType) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin ? { email, password } : { name, email, phone };
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.user) {
        onLoginSuccess(data.user);
        onClose();
      } else {
        setError(data.error || 'Erreur d’authentification.');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur réseau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-950 border border-amber-500/40 rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-600 flex items-center justify-center mx-auto text-white font-black text-xl shadow-md">
            GM
          </div>
          <h3 className="text-2xl font-bold text-white">
            {isLogin ? 'Connexion Espace Client' : 'Créer un compte'}
          </h3>
          <p className="text-xs text-slate-400">
            {isLogin ? 'Accédez à vos demandes et suivez vos projets' : 'Rejoignez GM Tech et profitez de nos services'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase">Nom complet</label>
                <input
                  type="text"
                  required
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm mt-1 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase">Téléphone</label>
                <input
                  type="text"
                  required
                  placeholder="+243..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm mt-1 focus:outline-none focus:border-amber-500"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase">Email ou identifiant</label>
            <input
              type="email"
              required
              placeholder="exemple@domaine.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm mt-1 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase">Mot de passe</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm mt-1 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold bg-amber-600 text-white hover:bg-amber-500 shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? <span>Patientez...</span> : <span>{isLogin ? 'Se connecter' : 'S’inscrire'}</span>}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-amber-400 hover:underline font-medium"
          >
            {isLogin ? 'Pas encore de compte ? S’inscrire' : 'Déjà un compte ? Se connecter'}
          </button>
        </div>
      </div>
    </div>
  );
};
