import React from 'react';
import { Instagram, Heart, ExternalLink } from 'lucide-react';
import { SOCIAL_POSTS } from '../data/products';

export const SocialGallery: React.FC = () => {
  return (
    <section id="social-gallery-section" className="py-12 sm:py-16 lg:py-20 bg-[#F7F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-[#817870] mb-2">
            <Instagram className="w-3.5 h-3.5" />
            <span>Community Looks</span>
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#292725]">
            FOLLOW THE SHOW ON STYLE
          </h2>
          <p className="text-sm text-[#817870] mt-1 font-sans-body">
            Tag <span className="font-semibold text-[#292725]">#ShowOnMen</span> and <span className="font-semibold text-[#292725]">@showon.bd</span> on Instagram to be featured.
          </p>
        </div>

        {/* 6 Images Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SOCIAL_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#EAE3D9] border border-[#DED7D0] shadow-2xs cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay with Instagram details */}
              <div className="absolute inset-0 bg-[#292725]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-[#FCFAF7]">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-[#D8CEC3]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold line-clamp-2 text-[#FCFAF7] leading-snug">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-[#D8CEC3]">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social CTA Button */}
        <div className="mt-8 sm:mt-10 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FCFAF7] border border-[#DED7D0] hover:border-[#292725] text-[#292725] rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:shadow-sm"
          >
            <Instagram className="w-4 h-4" />
            <span>FOLLOW @SHOWON</span>
          </a>
        </div>
      </div>
    </section>
  );
};
