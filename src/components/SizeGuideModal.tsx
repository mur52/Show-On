import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [activeType, setActiveType] = useState<'shirts' | 'blazers' | 'pants'>('shirts');

  if (!isSizeGuideOpen) return null;

  const shirtsData = [
    { size: 'S', chestIn: '38', lengthIn: '28', shoulderIn: '17.5', sleeveIn: '24.5', chestCm: '96', lengthCm: '71', shoulderCm: '44', sleeveCm: '62' },
    { size: 'M', chestIn: '40', lengthIn: '29', shoulderIn: '18.2', sleeveIn: '25.0', chestCm: '101', lengthCm: '73', shoulderCm: '46', sleeveCm: '63' },
    { size: 'L', chestIn: '42', lengthIn: '30', shoulderIn: '19.0', sleeveIn: '25.5', chestCm: '106', lengthCm: '76', shoulderCm: '48', sleeveCm: '65' },
    { size: 'XL', chestIn: '44', lengthIn: '31', shoulderIn: '19.8', sleeveIn: '26.0', chestCm: '112', lengthCm: '78', shoulderCm: '50', sleeveCm: '66' },
    { size: 'XXL', chestIn: '46', lengthIn: '31.5', shoulderIn: '20.5', sleeveIn: '26.5', chestCm: '117', lengthCm: '80', shoulderCm: '52', sleeveCm: '67' },
  ];

  const blazersData = [
    { size: '38 (S)', chestIn: '39', lengthIn: '29.5', shoulderIn: '17.8', waistIn: '34', chestCm: '99', lengthCm: '75', shoulderCm: '45', waistCm: '86' },
    { size: '40 (M)', chestIn: '41', lengthIn: '30.0', shoulderIn: '18.5', waistIn: '36', chestCm: '104', lengthCm: '76', shoulderCm: '47', waistCm: '91' },
    { size: '42 (L)', chestIn: '43', lengthIn: '30.5', shoulderIn: '19.2', waistIn: '38', chestCm: '109', lengthCm: '77', shoulderCm: '49', waistCm: '96' },
    { size: '44 (XL)', chestIn: '45', lengthIn: '31.0', shoulderIn: '20.0', waistIn: '40', chestCm: '114', lengthCm: '78', shoulderCm: '51', waistCm: '101' },
  ];

  const pantsData = [
    { size: '30', waistIn: '30-31', hipIn: '38', inseamIn: '31', thighIn: '23', waistCm: '76-78', hipCm: '96', inseamCm: '78', thighCm: '58' },
    { size: '32', waistIn: '32-33', hipIn: '40', inseamIn: '32', thighIn: '24', waistCm: '81-84', hipCm: '101', inseamCm: '81', thighCm: '61' },
    { size: '34', waistIn: '34-35', hipIn: '42', inseamIn: '32', thighIn: '25', waistCm: '86-89', hipCm: '106', inseamCm: '81', thighCm: '63' },
    { size: '36', waistIn: '36-37', hipIn: '44', inseamIn: '33', thighIn: '26', waistCm: '91-94', hipCm: '111', inseamCm: '84', thighCm: '66' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-[#292725]/75 backdrop-blur-xs">
      <div className="relative bg-[#FCFAF7] rounded-2xl md:rounded-3xl border border-[#DED7D0] shadow-2xl max-w-2xl w-full p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DED7D0]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#292725]" />
            <h2 className="font-serif-editorial text-2xl font-bold text-[#292725]">
              Show On Fitting & Size Guide
            </h2>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1 text-[#292725] hover:bg-[#F7F3EE] rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toggle Controls: Category & Unit */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 my-6">
          <div className="flex items-center gap-1 bg-[#F7F3EE] p-1 rounded-xl border border-[#DED7D0]">
            <button
              onClick={() => setActiveType('shirts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeType === 'shirts' ? 'bg-[#292725] text-[#FCFAF7]' : 'text-[#817870] hover:text-[#292725]'
              }`}
            >
              Shirts & Polos
            </button>
            <button
              onClick={() => setActiveType('blazers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeType === 'blazers' ? 'bg-[#292725] text-[#FCFAF7]' : 'text-[#817870] hover:text-[#292725]'
              }`}
            >
              Blazers & Suits
            </button>
            <button
              onClick={() => setActiveType('pants')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeType === 'pants' ? 'bg-[#292725] text-[#FCFAF7]' : 'text-[#817870] hover:text-[#292725]'
              }`}
            >
              Trousers & Chinos
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[#F7F3EE] p-1 rounded-xl border border-[#DED7D0]">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                unit === 'in' ? 'bg-[#292725] text-[#FCFAF7]' : 'text-[#817870]'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                unit === 'cm' ? 'bg-[#292725] text-[#FCFAF7]' : 'text-[#817870]'
              }`}
            >
              Centimeters
            </button>
          </div>
        </div>

        {/* Size Table */}
        <div className="overflow-x-auto border border-[#DED7D0] rounded-xl bg-[#F7F3EE] mb-6">
          <table className="w-full text-xs text-left text-[#292725]">
            <thead className="bg-[#EAE3D9] text-[#292725] uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="p-3">Size</th>
                <th className="p-3">Chest</th>
                <th className="p-3">Length</th>
                <th className="p-3">Shoulder</th>
                <th className="p-3">{activeType === 'blazers' ? 'Waist' : activeType === 'pants' ? 'Inseam' : 'Sleeve'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DED7D0]">
              {(activeType === 'shirts' ? shirtsData : activeType === 'blazers' ? blazersData : pantsData).map((row: any, rIdx) => (
                <tr key={rIdx} className="hover:bg-[#FCFAF7] transition-colors">
                  <td className="p-3 font-bold">{row.size}</td>
                  <td className="p-3">{unit === 'in' ? `${row.chestIn || row.waistIn}"` : `${row.chestCm || row.waistCm} cm`}</td>
                  <td className="p-3">{unit === 'in' ? `${row.lengthIn || row.hipIn}"` : `${row.lengthCm || row.hipCm} cm`}</td>
                  <td className="p-3">{unit === 'in' ? `${row.shoulderIn || row.thighIn}"` : `${row.shoulderCm || row.thighCm} cm`}</td>
                  <td className="p-3">{unit === 'in' ? `${row.sleeveIn || row.waistIn || row.inseamIn}"` : `${row.sleeveCm || row.waistCm || row.inseamCm} cm`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-xs text-[#817870] bg-[#FCFAF7] p-4 rounded-xl border border-[#DED7D0] space-y-1.5">
          <p className="font-semibold text-[#292725]">💡 Fitting Recommendation:</p>
          <p>• If you prefer a relaxed or layered boxy fit, order your exact standard size.</p>
          <p>• We provide free exchanges across Bangladesh if the size isn't 100% ideal.</p>
        </div>
      </div>
    </div>
  );
};
