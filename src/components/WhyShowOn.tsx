import React from 'react';
import { Award, ShoppingBag, Truck, HeadphonesIcon, RefreshCw, CheckCircle2 } from 'lucide-react';

export const WhyShowOn: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Carefully selected long-staple cottons, pure linen, and refined hand-finishing in every seam.',
    },
    {
      icon: ShoppingBag,
      title: 'Easy Shopping',
      description: 'Simple browsing, accurate sizing charts, and hassle-free 1-click checkout with Cash on Delivery.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Reliable nationwide delivery across Bangladesh. 24–48 hours in Dhaka, 3–4 days for other districts.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Customer Support',
      description: 'Friendly assistance via phone and WhatsApp (+880 1711 000 888) whenever you need guidance.',
    },
  ];

  return (
    <section id="why-show-on-section" className="py-12 sm:py-16 lg:py-20 bg-[#FCFAF7] border-y border-[#DED7D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#817870]">
            The Show On Promise
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#292725] mt-1.5">
            WHY SHOW ON
          </h2>
          <p className="text-sm text-[#817870] mt-2 font-sans-body">
            Built on craftsmanship, contemporary aesthetics, and an uncompromising commitment to customer satisfaction.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-start p-6 rounded-2xl bg-[#F7F3EE] border border-[#DED7D0] hover:border-[#817870] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#292725] text-[#FCFAF7] flex items-center justify-center mb-4 transition-transform group-hover:scale-105 shadow-2xs">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h3 className="font-serif-editorial text-xl font-bold text-[#292725] mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#817870] leading-relaxed font-sans-body">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
