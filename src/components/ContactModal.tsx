import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactModal: React.FC = () => {
  const { isContactOpen, setIsContactOpen, showToast } = useShop();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  if (!isContactOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Message sent! Our support team will reply within 2 hours.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-[#292725]/75 backdrop-blur-xs">
      <div className="relative bg-[#FCFAF7] rounded-2xl md:rounded-3xl border border-[#DED7D0] shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-[#DED7D0]">
          <div>
            <span className="font-serif-editorial text-2xl font-bold tracking-wider text-[#292725]">
              CUSTOMER CONCIERGE
            </span>
            <span className="text-xs text-[#817870] ml-2 font-sans-body">Contact Show On</span>
          </div>
          <button
            onClick={() => setIsContactOpen(false)}
            className="p-1.5 text-[#292725] hover:bg-[#F7F3EE] rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Info & Showrooms */}
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#292725] mb-2">
                We're Here To Help
              </h3>
              <p className="text-xs sm:text-sm text-[#817870] leading-relaxed">
                Have questions about sizing, fabric care, bespoke corporate orders, or order status? Get in touch with our team.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-3 text-xs text-[#292725]">
              <a
                href="tel:+8801711000888"
                className="flex items-center gap-3 p-3.5 bg-[#F7F3EE] rounded-xl border border-[#DED7D0] hover:border-[#292725] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#817870]" />
                <div>
                  <div className="font-bold">Hotline & Telephone</div>
                  <div className="text-[#817870]">+880 1711 000 888 (10AM – 10PM)</div>
                </div>
              </a>

              <a
                href="https://wa.me/8801711000888"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 bg-[#F7F3EE] rounded-xl border border-[#DED7D0] hover:border-[#292725] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <div>
                  <div className="font-bold">WhatsApp Direct Stylist</div>
                  <div className="text-[#817870]">Instant chat for sizing & photos</div>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3.5 bg-[#F7F3EE] rounded-xl border border-[#DED7D0]">
                <MapPin className="w-4 h-4 text-[#817870] mt-0.5" />
                <div>
                  <div className="font-bold">Flagship Showrooms in Dhaka</div>
                  <div className="text-[#817870]">1. Banani: Level 3, Road 11, Block D</div>
                  <div className="text-[#817870]">2. Dhanmondi: House 18, Road 27 (Old)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="bg-[#F7F3EE] p-6 rounded-2xl border border-[#DED7D0]">
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h4 className="font-serif-editorial text-lg font-bold text-[#292725]">
                  Send an Inquiry
                </h4>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#292725] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asif Chowdhury"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FCFAF7] border border-[#DED7D0] rounded-xl text-[#292725] focus:outline-none focus:border-[#292725]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#292725] mb-1">
                    Phone (+880)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01712-345678"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FCFAF7] border border-[#DED7D0] rounded-xl text-[#292725] focus:outline-none focus:border-[#292725]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#292725] mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="How can our style concierge assist you?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FCFAF7] border border-[#DED7D0] rounded-xl text-[#292725] focus:outline-none focus:border-[#292725]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#292725] text-[#FCFAF7] font-semibold uppercase tracking-widest rounded-xl hover:bg-[#1F1D1B] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="font-serif-editorial text-xl font-bold text-[#292725]">
                  Thank You, {form.name}!
                </h4>
                <p className="text-xs text-[#817870]">
                  Your inquiry has been received. Our concierge team will contact you shortly via phone/SMS.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', phone: '', email: '', message: '' });
                  }}
                  className="text-xs text-[#292725] underline pt-2"
                >
                  Send another inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
