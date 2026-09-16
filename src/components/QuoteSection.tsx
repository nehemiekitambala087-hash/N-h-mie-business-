import React, { useState } from 'react';
import { Send, CheckCircle, FileText, ArrowRight, MessageCircle } from 'lucide-react';
import { ServiceItem } from '../types';

interface QuoteSectionProps {
  services: ServiceItem[];
  prefilledService?: string;
  prefilledItem?: string;
  setCurrentTab: (tab: string) => void;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  services,
  prefilledService = '',
  prefilledItem = '',
  setCurrentTab
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: prefilledService || services[0]?.title || 'Création de sites web',
    item: prefilledItem || '',
    description: '',
    budget: '100$ - 500$',
    attachment: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState<{ trackingNumber: string; name: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessResult({ trackingNumber: data.trackingNumber, name: data.name });
      } else {
        setErrorMessage(data.error || 'Une erreur est survenue.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Erreur réseau. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppLink = () => {
    if (!successResult) return '';
    const text = encodeURIComponent(`Bonjour GM Tech, voici ma demande de devis n° ${successResult.trackingNumber} au nom de ${successResult.name}. Je souhaite un suivi.`);
    return `https://wa.me/243978885682?text=${text}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="text-center space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          DEVIS GRATUIT & RAPIDE
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Parlez-nous de votre projet
        </h2>
        <p className="text-slate-300 text-base max-w-xl mx-auto">
          Remplissez le formulaire ci-dessous. Votre numéro de demande unique est généré instantanément et notre équipe vous répondra rapidement.
        </p>
      </div>

      {successResult ? (
        <div className="bg-slate-950 border border-amber-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Demande enregistrée avec succès !</h3>
            <p className="text-slate-300 text-sm">
              Félicitations <span className="text-amber-400 font-semibold">{successResult.name}</span>, votre dossier a été transmis à notre équipe technique.
            </p>
          </div>

          <div className="inline-block px-6 py-4 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-inner">
            <div className="text-xs text-slate-400 uppercase tracking-wide">Numéro de demande</div>
            <div className="text-3xl font-black text-amber-400 tracking-wider mt-1">{successResult.trackingNumber}</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Envoyer sur WhatsApp</span>
            </a>
            <button
              onClick={() => {
                setSuccessResult(null);
                setCurrentTab('client-portal');
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-amber-600 text-white hover:bg-amber-500 transition-all shadow-lg"
            >
              Suivre dans mon Espace Client
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-sm">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Nom complet *</label>
              <input
                type="text"
                required
                placeholder="Ex. Jean Dupont"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Téléphone (WhatsApp) *</label>
              <input
                type="text"
                required
                placeholder="+243 970 000 000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Email *</label>
              <input
                type="email"
                required
                placeholder="exemple@domaine.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Service demandé *</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Produit ou option spécifique (optionnel)</label>
              <input
                type="text"
                placeholder="Ex. Site Vitrine / Logo Pro..."
                value={formData.item}
                onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Budget approximatif</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="Moins de 100$">Moins de 100 $</option>
                <option value="100$ - 300$">100 $ - 300 $</option>
                <option value="300$ - 600$">300 $ - 600 $</option>
                <option value="600$ - 1500$">600 $ - 1 500 $</option>
                <option value="Plus de 1500$">Plus de 1 500 $</option>
                <option value="Sur devis">Sur devis / À discuter</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Description du projet *</label>
            <textarea
              required
              rows={4}
              placeholder="Décrivez votre projet, vos objectifs et vos attentes techniques..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Pièces jointes ou cahier des charges (optionnel)</label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFormData({ ...formData, attachment: e.target.files[0].name });
                }
              }}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-300 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-500 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-amber-600 to-amber-600 text-white hover:from-amber-500 hover:to-amber-500 shadow-xl shadow-amber-500/25 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            {submitting ? (
              <span>Traitement en cours...</span>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Soumettre la demande de devis</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
