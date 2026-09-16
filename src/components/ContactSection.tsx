import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Globe, Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          RESTONS EN CONTACT
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Contactez-nous à Kinshasa & sur nos Réseaux
        </h2>
        <p className="text-slate-300 text-base">
          Notre équipe est toujours à votre écoute sur WhatsApp, Facebook, TikTok, YouTube et par téléphone pour concrétiser vos projets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-amber-400">Coordonnées Officielles</h3>

            <div className="space-y-5">
              <a
                href="https://wa.me/243978885682?text=Bonjour%20GM Tech%20Business,%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services."
                target="_blank"
                rel="noreferrer"
                className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">WhatsApp Officiel</div>
                  <div className="text-base font-bold text-white mt-0.5">+243 97 888 5682</div>
                  <div className="text-xs text-emerald-400 mt-1">Discuter directement sur WhatsApp →</div>
                </div>
              </a>

              <a
                href="tel:+243841069748"
                className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-[#0A192F] transition-all shadow-md">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">Téléphone Appel Normal</div>
                  <div className="text-base font-bold text-white mt-0.5">+243 841 069 748</div>
                  <div className="text-xs text-amber-400 mt-1">Appeler directement →</div>
                </div>
              </a>

              <a
                href="mailto:nehemiekitambala087@gmail.com"
                className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-md">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">Adresse Gmail</div>
                  <div className="text-base font-bold text-white mt-0.5">nehemiekitambala087@gmail.com</div>
                  <div className="text-xs text-amber-400 mt-1">Envoyer un email →</div>
                </div>
              </a>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">Adresse</div>
                  <div className="text-base font-bold text-white mt-0.5">Kinshasa, RDC</div>
                  <div className="text-xs text-slate-400 mt-1">Intervention sur toute la ville province.</div>
                </div>
              </div>
            </div>

            {/* Social Links / Plateformes */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">Retrouvez-nos plateformes</div>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://wa.me/243978885682"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/80 hover:bg-emerald-600 text-slate-300 hover:text-white transition-all group border border-slate-700"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:text-white" />
                  <span className="text-xs font-bold">WhatsApp</span>
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/80 hover:bg-pink-600 text-slate-300 hover:text-white transition-all group border border-slate-700"
                >
                  <svg className="w-5 h-5 fill-current text-pink-400 group-hover:text-white" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <span className="text-xs font-bold">TikTok</span>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/80 hover:bg-red-600 text-slate-300 hover:text-white transition-all group border border-slate-700"
                >
                  <Youtube className="w-5 h-5 text-red-400 group-hover:text-white" />
                  <span className="text-xs font-bold">YouTube</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/80 hover:bg-pink-600 text-slate-300 hover:text-white transition-all group border border-slate-700"
                >
                  <Instagram className="w-5 h-5 text-pink-400 group-hover:text-white" />
                  <span className="text-xs font-bold">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl">
            {submitted ? (
              <div className="text-center py-16 space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Message bien envoyé !</h3>
                  <p className="text-slate-300 text-sm">
                    Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="px-6 py-3 rounded-xl font-bold bg-amber-500 text-[#0A192F] hover:bg-amber-400 transition-all shadow-md"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-2">Formulaire de contact direct</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Nom complet *</label>
                    <input
                      type="text"
                      required
                      placeholder="Votre nom"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3.5 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Téléphone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+243..."
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3.5 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3.5 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Sujet *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex. Projet site web / Application"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3.5 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Message *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Décrivez votre besoin..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3.5 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">* Champs obligatoires</span>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 rounded-xl font-bold bg-amber-500 text-[#0A192F] hover:bg-amber-400 transition-all shadow-lg flex items-center space-x-2"
                  >
                    <span>{loading ? 'Envoi en cours...' : 'Envoyer le message'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
