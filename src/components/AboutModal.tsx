import React from 'react';
import { X, Award, Feather, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutModal: React.FC = () => {
  const { isAboutOpen, setIsAboutOpen, setCurrentView } = useShop();

  if (!isAboutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-[#292725]/75 backdrop-blur-xs">
      <div className="relative bg-[#FCFAF7] rounded-2xl md:rounded-3xl border border-[#DED7D0] shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-[#DED7D0]">
          <div>
            <span className="font-serif-editorial text-2xl font-bold tracking-wider text-[#292725]">
              OUR STORY
            </span>
            <span className="text-xs text-[#817870] ml-2 font-sans-body">About Show On</span>
          </div>
          <button
            onClick={() => setIsAboutOpen(false)}
            className="p-1.5 text-[#292725] hover:bg-[#F7F3EE] rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 space-y-8 text-[#817870] font-sans-body leading-relaxed text-sm">
          {/* Editorial Banner */}
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-[#D8CEC3]">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85"
              alt="Show On Tailoring Philosophy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292725]/80 via-transparent to-transparent flex items-end p-6">
              <p className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white leading-tight">
                "Style That Speaks For You Without Saying A Word."
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-serif-editorial text-2xl font-bold text-[#292725] mb-3">
              Crafted in Bangladesh, Designed for the Modern World
            </h3>
            <p className="mb-4">
              Founded with the vision to redefine contemporary menswear, <strong>Show On</strong> creates refined, durable wardrobe staples that blend timeless tailoring with relaxed modern proportions.
            </p>
            <p>
              We bypass fast-fashion shortcuts in favor of long-staple combed cottons, sustainable French flax linen, and artisanal leather craftsmanship rooted in Dhaka's historic heritage of garment excellence.
            </p>
          </div>

          {/* 3 Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#DED7D0]">
            <div className="p-4 bg-[#F7F3EE] rounded-xl border border-[#DED7D0]">
              <Feather className="w-5 h-5 text-[#292725] mb-2" />
              <h4 className="font-serif-editorial text-lg font-bold text-[#292725] mb-1">
                Natural Fabrics
              </h4>
              <p className="text-xs text-[#817870]">
                100% organic cotton, breathable linens, and hypoallergenic blends engineered for warm climates.
              </p>
            </div>

            <div className="p-4 bg-[#F7F3EE] rounded-xl border border-[#DED7D0]">
              <Award className="w-5 h-5 text-[#292725] mb-2" />
              <h4 className="font-serif-editorial text-lg font-bold text-[#292725] mb-1">
                Precision Fits
              </h4>
              <p className="text-xs text-[#817870]">
                Every pattern undergoes multiple fit trials for optimal shoulder drape and natural movement.
              </p>
            </div>

            <div className="p-4 bg-[#F7F3EE] rounded-xl border border-[#DED7D0]">
              <HeartHandshake className="w-5 h-5 text-[#292725] mb-2" />
              <h4 className="font-serif-editorial text-lg font-bold text-[#292725] mb-1">
                Ethical Production
              </h4>
              <p className="text-xs text-[#817870]">
                Fair wages, safe Dhaka atelier working environments, and zero compromise on craft.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DED7D0] flex justify-end">
            <button
              onClick={() => {
                setIsAboutOpen(false);
                setCurrentView('shop');
              }}
              className="px-8 py-3.5 bg-[#292725] text-[#FCFAF7] text-xs uppercase tracking-widest font-semibold rounded-xl hover:bg-[#1F1D1B] cursor-pointer"
            >
              Explore Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
