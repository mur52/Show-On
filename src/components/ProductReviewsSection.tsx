import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MessageSquarePlus,
  Filter,
  Camera,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, ProductReview } from '../types';

interface ProductReviewsSectionProps {
  product: Product;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ product }) => {
  const {
    getProductReviews,
    getProductRatingStats,
    addReview,
    likeReview,
    currentUser,
    openUserAuth,
  } = useShop();

  const reviews = getProductReviews(product.id);
  const stats = getProductRatingStats(product.id);

  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState(currentUser?.fullName || '');
  const [newLocation, setNewLocation] = useState(currentUser?.city ? `${currentUser.city}, Bangladesh` : 'Dhaka, Bangladesh');
  const [newFitFeedback, setNewFitFeedback] = useState<'True to Size' | 'Perfect Oversized Fit' | 'Runs Small' | 'Runs Large'>('True to Size');
  const [newSizePurchased, setNewSizePurchased] = useState(product.sizes[0] || 'M');

  const filteredReviews = reviews.filter((r) => {
    if (filterRating !== 'all' && r.rating !== filterRating) return false;
    if (filterVerifiedOnly && !r.verifiedPurchase) return false;
    return true;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addReview({
      productId: product.id,
      author: newAuthor.trim() || 'Verified Customer',
      rating: newRating,
      title: newTitle.trim() || 'Verified Purchase Feedback',
      comment: newComment.trim(),
      location: newLocation.trim() || 'Dhaka, Bangladesh',
      fitFeedback: newFitFeedback,
      sizePurchased: newSizePurchased,
    });

    setIsWriteModalOpen(false);
    setNewTitle('');
    setNewComment('');
  };

  return (
    <div id="product-reviews-section" className="mt-10 pt-8 border-t border-[#DED7D0] space-y-8">
      {/* Reviews Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif-editorial text-2xl font-bold text-[#292725]">
              Customer Reviews
            </h3>
            <span className="text-xs font-bold text-[#817870] bg-[#F7F3EE] px-2.5 py-0.5 rounded-full border border-[#DED7D0]">
              {reviews.length} Verified
            </span>
          </div>
          <p className="text-xs text-[#817870] mt-1 font-sans-body">
            Real feedback from Bangladeshi fashion enthusiasts on fit, drape, and fabric quality.
          </p>
        </div>

        <button
          id="write-review-btn"
          onClick={() => setIsWriteModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#292725] text-[#FCFAF7] hover:bg-[#1F1D1B] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Ratings & Fit Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F7F3EE] p-5 sm:p-6 rounded-2xl border border-[#DED7D0]">
        {/* Left: Overall Score (4 cols) */}
        <div className="md:col-span-4 flex flex-col justify-center items-center text-center p-2 border-b md:border-b-0 md:border-r border-[#DED7D0]">
          <span className="font-serif-editorial text-5xl font-bold text-[#292725]">
            {stats.averageRating.toFixed(1)}
          </span>

          <div className="flex items-center gap-1 my-2 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(stats.averageRating)
                    ? 'fill-amber-500 text-amber-500'
                    : 'text-[#DED7D0]'
                }`}
              />
            ))}
          </div>

          <p className="text-xs font-medium text-[#292725]">
            Based on {reviews.length || product.reviewsCount} customer ratings
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1">
            ✓ 98% Recommend this piece
          </span>
        </div>

        {/* Center: Star Rating Breakdown Bars (5 cols) */}
        <div className="md:col-span-5 space-y-2 flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats.starCounts[star] || (star === 5 ? reviews.length || 18 : 0);
            const total = reviews.length || 20;
            const pct = Math.round((count / total) * 100);

            return (
              <div
                key={star}
                onClick={() => setFilterRating(filterRating === star ? 'all' : star)}
                className={`flex items-center gap-3 text-xs cursor-pointer p-1 rounded-lg transition-colors ${
                  filterRating === star ? 'bg-[#FCFAF7] font-bold' : 'hover:bg-[#EAE3D9]'
                }`}
              >
                <div className="flex items-center gap-1 w-12 text-[#292725] shrink-0 font-medium">
                  <span>{star}</span>
                  <Star className="w-3 h-3 fill-[#292725]" />
                </div>

                <div className="flex-1 h-2 bg-[#DED7D0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#292725] rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <span className="w-8 text-right text-[11px] text-[#817870] font-mono">
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Fit Satisfaction Profile (3 cols) */}
        <div className="md:col-span-3 flex flex-col justify-center bg-[#FCFAF7] p-3.5 rounded-xl border border-[#DED7D0] space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#817870] block">
            Fit Feedback
          </span>

          <div className="space-y-1.5 text-xs text-[#292725]">
            <div className="flex items-center justify-between">
              <span>True to Size</span>
              <span className="font-bold">{stats.fitSummary.trueToSizePct}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Oversized Drape</span>
              <span className="font-bold">{stats.fitSummary.oversizedPct}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Runs Small</span>
              <span className="font-bold">{stats.fitSummary.runsSmallPct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterRating('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterRating === 'all'
                ? 'bg-[#292725] text-[#FCFAF7]'
                : 'bg-[#F7F3EE] text-[#817870] hover:text-[#292725] border border-[#DED7D0]'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setFilterRating(5)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterRating === 5
                ? 'bg-[#292725] text-[#FCFAF7]'
                : 'bg-[#F7F3EE] text-[#817870] hover:text-[#292725] border border-[#DED7D0]'
            }`}
          >
            5 Stars Only
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs text-[#817870] cursor-pointer">
          <input
            type="checkbox"
            checked={filterVerifiedOnly}
            onChange={(e) => setFilterVerifiedOnly(e.target.checked)}
            className="rounded border-[#DED7D0] text-[#292725] focus:ring-0"
          />
          <span>Verified Purchases Only</span>
        </label>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-8 bg-[#F7F3EE] rounded-2xl border border-[#DED7D0] p-6">
            <p className="text-sm text-[#817870]">
              No reviews match this filter. Be the first to share your experience!
            </p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FCFAF7] p-5 rounded-2xl border border-[#DED7D0] hover:border-[#292725]/40 transition-all space-y-3 shadow-2xs"
            >
              {/* Reviewer Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#292725] text-[#FCFAF7] font-serif-editorial font-bold text-xs flex items-center justify-center">
                    {rev.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2) || 'BD'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif-editorial text-sm font-bold text-[#292725]">
                        {rev.author}
                      </span>
                      {rev.verifiedPurchase && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified Buyer</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#817870]">
                      {rev.location} • {rev.date}
                    </span>
                  </div>
                </div>

                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-[#DED7D0]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Fit Meta Pill */}
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="px-2 py-0.5 bg-[#F7F3EE] text-[#292725] rounded-md border border-[#DED7D0] font-medium">
                  Fit: <strong>{rev.fitFeedback}</strong>
                </span>
                <span className="px-2 py-0.5 bg-[#F7F3EE] text-[#292725] rounded-md border border-[#DED7D0] font-medium">
                  Size Purchased: <strong>{rev.sizePurchased}</strong>
                </span>
              </div>

              {/* Review Title & Content */}
              <div>
                <h4 className="text-sm font-bold text-[#292725] font-serif-editorial mb-1">
                  {rev.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#817870] leading-relaxed font-sans-body">
                  {rev.comment}
                </p>
              </div>

              {/* Helpful Counter Button */}
              <div className="pt-2 flex items-center justify-between border-t border-[#DED7D0]/60">
                <button
                  onClick={() => likeReview(rev.id)}
                  className={`inline-flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                    rev.likedByCurrentUser
                      ? 'text-emerald-700 font-bold'
                      : 'text-[#817870] hover:text-[#292725]'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>

                <span className="text-[10px] text-[#B8ACA1]">Verified Show On Customer</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Write a Review Modal Form */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-60 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
          <div
            className="fixed inset-0 bg-[#292725]/70 backdrop-blur-xs"
            onClick={() => setIsWriteModalOpen(false)}
          />

          <div className="relative bg-[#FCFAF7] rounded-2xl md:rounded-3xl border border-[#DED7D0] shadow-2xl max-w-lg w-full p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[#DED7D0] mb-5">
              <div>
                <h3 className="font-serif-editorial text-xl font-bold text-[#292725]">
                  Write a Customer Review
                </h3>
                <p className="text-xs text-[#817870]">{product.name}</p>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1.5 text-[#817870] hover:text-[#292725] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Picker */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#292725] block mb-2">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNewRating(num)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          num <= newRating
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-[#DED7D0]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#292725] ml-2">
                    {newRating === 5 ? '5.0 - Masterpiece' : `${newRating}.0 Stars`}
                  </span>
                </div>
              </div>

              {/* Fit Feedback */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#292725] block mb-1">
                    Fit Impression
                  </label>
                  <select
                    value={newFitFeedback}
                    onChange={(e) => setNewFitFeedback(e.target.value as any)}
                    className="w-full bg-[#F7F3EE] border border-[#DED7D0] rounded-xl px-3 py-2 text-xs text-[#292725]"
                  >
                    <option value="True to Size">True to Size</option>
                    <option value="Perfect Oversized Fit">Perfect Oversized Fit</option>
                    <option value="Runs Small">Runs Small</option>
                    <option value="Runs Large">Runs Large</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#292725] block mb-1">
                    Size You Bought
                  </label>
                  <select
                    value={newSizePurchased}
                    onChange={(e) => setNewSizePurchased(e.target.value)}
                    className="w-full bg-[#F7F3EE] border border-[#DED7D0] rounded-xl px-3 py-2 text-xs text-[#292725]"
                  >
                    {product.sizes.map((sz) => (
                      <option key={sz} value={sz}>
                        {sz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Headline */}
              <div>
                <label className="text-xs font-bold text-[#292725] block mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Incredible fabric weight & perfect drape"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#F7F3EE] border border-[#DED7D0] rounded-xl px-3 py-2.5 text-xs text-[#292725] focus:outline-none focus:border-[#292725]"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="text-xs font-bold text-[#292725] block mb-1">
                  Detailed Experience & Comments
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the fabric texture, comfort in Dhaka weather, shoulder drape, and stitching..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-[#F7F3EE] border border-[#DED7D0] rounded-xl p-3 text-xs text-[#292725] focus:outline-none focus:border-[#292725]"
                />
              </div>

              {/* Name & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#292725] block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Hossain"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-[#F7F3EE] border border-[#DED7D0] rounded-xl px-3 py-2 text-xs text-[#292725]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#292725] block mb-1">
                    Location / Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Banani, Dhaka"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-[#F7F3EE] border border-[#DED7D0] rounded-xl px-3 py-2 text-xs text-[#292725]"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#292725] text-[#FCFAF7] hover:bg-[#1F1D1B] rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Verified Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
