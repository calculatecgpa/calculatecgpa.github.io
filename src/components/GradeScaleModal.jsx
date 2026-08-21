import React, { useState } from 'react';
import { X, RotateCcw, Check, Plus, Trash2, Sliders } from 'lucide-react';

export const DEFAULT_4_SCALE = [
  { grade: 'A+', points: 4.0 },
  { grade: 'A', points: 4.0 },
  { grade: 'A-', points: 3.7 },
  { grade: 'B+', points: 3.3 },
  { grade: 'B', points: 3.0 },
  { grade: 'B-', points: 2.7 },
  { grade: 'C+', points: 2.3 },
  { grade: 'C', points: 2.0 },
  { grade: 'C-', points: 1.7 },
  { grade: 'D+', points: 1.3 },
  { grade: 'D', points: 1.0 },
  { grade: 'F', points: 0.0 },
];

export const PRESET_4_3_SCALE = [
  { grade: 'A+', points: 4.3 },
  { grade: 'A', points: 4.0 },
  { grade: 'A-', points: 3.7 },
  { grade: 'B+', points: 3.3 },
  { grade: 'B', points: 3.0 },
  { grade: 'B-', points: 2.7 },
  { grade: 'C+', points: 2.3 },
  { grade: 'C', points: 2.0 },
  { grade: 'C-', points: 1.7 },
  { grade: 'D+', points: 1.3 },
  { grade: 'D', points: 1.0 },
  { grade: 'F', points: 0.0 },
];

export const PRESET_5_SCALE = [
  { grade: 'A', points: 5.0 },
  { grade: 'B', points: 4.0 },
  { grade: 'C', points: 3.0 },
  { grade: 'D', points: 2.0 },
  { grade: 'E', points: 1.0 },
  { grade: 'F', points: 0.0 },
];

export const PRESET_10_SCALE = [
  { grade: 'O', points: 10.0 },
  { grade: 'A+', points: 9.0 },
  { grade: 'A', points: 8.0 },
  { grade: 'B+', points: 7.0 },
  { grade: 'B', points: 6.0 },
  { grade: 'C', points: 5.0 },
  { grade: 'P', points: 4.0 },
  { grade: 'F', points: 0.0 },
];

export default function GradeScaleModal({
  isOpen,
  onClose,
  gradeScale,
  onSaveGradeScale,
  maxScale,
  onSaveMaxScale,
}) {
  const [selectedPreset, setSelectedPreset] = useState('4.0-standard');
  const [currentScale, setCurrentScale] = useState(gradeScale);
  const [currentMax, setCurrentMax] = useState(maxScale);
  const [newGrade, setNewGrade] = useState('');
  const [newPoints, setNewPoints] = useState('');

  if (!isOpen) return null;

  const handlePresetChange = (presetKey) => {
    setSelectedPreset(presetKey);
    if (presetKey === '4.0-standard') {
      setCurrentScale(DEFAULT_4_SCALE);
      setCurrentMax(4.0);
    } else if (presetKey === '4.3-scale') {
      setCurrentScale(PRESET_4_3_SCALE);
      setCurrentMax(4.3);
    } else if (presetKey === '5.0-scale') {
      setCurrentScale(PRESET_5_SCALE);
      setCurrentMax(5.0);
    } else if (presetKey === '10.0-scale') {
      setCurrentScale(PRESET_10_SCALE);
      setCurrentMax(10.0);
    }
  };

  const handlePointChange = (index, value) => {
    setSelectedPreset('custom');
    const updated = [...currentScale];
    const num = parseFloat(value);
    updated[index] = {
      ...updated[index],
      points: isNaN(num) ? '' : num,
    };
    setCurrentScale(updated);
  };

  const handleGradeNameChange = (index, value) => {
    setSelectedPreset('custom');
    const updated = [...currentScale];
    updated[index] = {
      ...updated[index],
      grade: value.trim().toUpperCase(),
    };
    setCurrentScale(updated);
  };

  const handleDeleteRow = (index) => {
    setSelectedPreset('custom');
    setCurrentScale(currentScale.filter((_, i) => i !== index));
  };

  const handleAddRow = (e) => {
    e.preventDefault();
    if (!newGrade || newPoints === '') return;
    setSelectedPreset('custom');
    setCurrentScale([
      ...currentScale,
      {
        grade: newGrade.trim().toUpperCase(),
        points: parseFloat(newPoints) || 0,
      },
    ]);
    setNewGrade('');
    setNewPoints('');
  };

  const handleReset = () => {
    handlePresetChange('4.0-standard');
  };

  const handleSave = () => {
    const sanitized = currentScale
      .filter((item) => item.grade && !isNaN(parseFloat(item.points)))
      .map((item) => ({
        grade: item.grade,
        points: parseFloat(item.points),
      }));

    onSaveGradeScale(sanitized.length > 0 ? sanitized : DEFAULT_4_SCALE);
    onSaveMaxScale(parseFloat(currentMax) || 4.0);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="scale-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 bg-[#e0f7fc] text-[#0077b6] rounded-xl border border-[#90e0ef]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 id="scale-modal-title" className="text-base sm:text-lg font-bold text-slate-900">
                Grade Scale Settings
              </h3>
              <p className="text-xs text-slate-500">
                Customize grade values for your university
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-sm text-slate-700">
          {/* Presets Selection */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Preset Scale
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: '4.0-standard', label: 'Standard 4.0', desc: 'US / Global' },
                { id: '4.3-scale', label: '4.3 Scale', desc: 'A+ = 4.3' },
                { id: '5.0-scale', label: '5.0 Scale', desc: 'Nigerian/Intl' },
                { id: '10.0-scale', label: '10.0 Scale', desc: 'Indian / UGC' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePresetChange(p.id)}
                  className={`p-2.5 sm:p-3 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                    selectedPreset === p.id
                      ? 'border-[#0096c7] bg-[#e0f7fc] text-[#0077b6] ring-2 ring-[#90e0ef]'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-slate-900 text-xs">{p.label}</div>
                  <div className="text-[10px] text-slate-500 font-normal">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Scale Maximum Value */}
          <div className="flex items-center justify-between p-3 sm:p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <span className="font-bold text-slate-900 text-xs sm:text-sm block">Maximum GPA Scale Base</span>
              <span className="text-[11px] sm:text-xs text-slate-500">GPA Ceiling (e.g. 4.0, 5.0, 10.0)</span>
            </div>
            <input
              type="number"
              step="0.1"
              min="1"
              max="100"
              value={currentMax}
              onChange={(e) => {
                setSelectedPreset('custom');
                setCurrentMax(parseFloat(e.target.value) || 4.0);
              }}
              className="w-18 sm:w-20 px-2 sm:px-3 py-1.5 text-center font-bold text-[#0077b6] bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0096c7] focus:border-[#0096c7]"
            />
          </div>

          {/* Table of Grade Points */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Grade Letter to Point Mapping
              </label>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-[#0077b6] flex items-center gap-1 font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Reset Default</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="grid grid-cols-12 bg-slate-100/80 px-3 sm:px-4 py-2 text-xs font-bold text-slate-600 uppercase border-b border-slate-200">
                <div className="col-span-5">Letter Grade</div>
                <div className="col-span-5">Grade Points</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              <div className="divide-y divide-slate-100 max-h-52 sm:max-h-60 overflow-y-auto">
                {currentScale.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white hover:bg-[#f0fafd] transition-colors">
                    <div className="col-span-5 pr-2">
                      <input
                        type="text"
                        value={item.grade}
                        onChange={(e) => handleGradeNameChange(idx, e.target.value)}
                        className="w-full px-2 py-1 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#0096c7]"
                      />
                    </div>
                    <div className="col-span-5 pr-2">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={item.points}
                        onChange={(e) => handlePointChange(idx, e.target.value)}
                        className="w-full px-2 py-1 text-xs sm:text-sm font-mono text-[#0077b6] font-bold bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#0096c7]"
                      />
                    </div>
                    <div className="col-span-2 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteRow(idx)}
                        className="p-1 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Grade"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Custom Grade Row */}
              <form onSubmit={handleAddRow} className="p-2.5 sm:p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap sm:flex-nowrap items-center gap-2">
                <input
                  type="text"
                  placeholder="New Grade (e.g. S)"
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                  className="flex-1 min-w-[100px] px-2.5 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0096c7]"
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Points (e.g. 4.5)"
                  value={newPoints}
                  onChange={(e) => setNewPoints(e.target.value)}
                  className="w-24 sm:w-28 px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0096c7]"
                />
                <button
                  type="submit"
                  disabled={!newGrade || newPoints === ''}
                  className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-[#0077b6] hover:bg-[#023e8a] disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-bold text-white bg-[#0096c7] hover:bg-[#0077b6] rounded-xl shadow-xs shadow-cyan-200 transition-all active:scale-95 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Apply Scale</span>
          </button>
        </div>
      </div>
    </div>
  );
}
