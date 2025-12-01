import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CompassDataPoint, AiInsight } from '../types';
import { analyzeCompass } from '../services/geminiService';
import { Loader2, ArrowLeft, Sparkles } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const CompassActivity: React.FC<Props> = ({ onBack }) => {
  const [data, setData] = useState<CompassDataPoint[]>([
    { subject: 'Pedagógica/Técnica', current: 5, ideal: 8, fullMark: 10 },
    { subject: 'Administrativa', current: 8, ideal: 4, fullMark: 10 },
    { subject: 'Relacional', current: 6, ideal: 9, fullMark: 10 },
    { subject: 'Normativa', current: 7, ideal: 6, fullMark: 10 },
  ]);

  const [insight, setInsight] = useState<AiInsight>({ loading: false, content: null, error: null });

  const handleSliderChange = (index: number, field: 'current' | 'ideal', value: number) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  const handleAnalyze = async () => {
    setInsight({ loading: true, content: null, error: null });
    const result = await analyzeCompass(data);
    setInsight({ loading: false, content: result, error: null });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-brand-600 p-4 text-white flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 hover:bg-brand-700 px-3 py-1 rounded transition">
          <ArrowLeft size={20} /> Voltar
        </button>
        <h2 className="text-xl font-bold">Bússola da Gestão</h2>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart Section */}
          <div className="h-[400px] w-full bg-slate-50 rounded-xl border border-slate-200 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar name="Hoje (Atual)" dataKey="current" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.5} />
                <Radar name="Desejado (Ideal)" dataKey="ideal" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Controls Section */}
          <div className="space-y-6">
            <p className="text-slate-600 text-sm">
              Ajuste os controles abaixo para refletir onde você gasta sua energia <strong>hoje</strong> versus onde você <strong>gostaria</strong> de gastar.
            </p>

            <div className="space-y-4">
              {data.map((item, index) => (
                <div key={item.subject} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-2">{item.subject}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-brand-600 mb-1">Atual: {item.current}</label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={item.current}
                        onChange={(e) => handleSliderChange(index, 'current', Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-emerald-600 mb-1">Ideal: {item.ideal}</label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={item.ideal}
                        onChange={(e) => handleSliderChange(index, 'ideal', Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={insight.loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition flex items-center justify-center gap-2"
            >
              {insight.loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
              Analisar Alinhamento com IA
            </button>
          </div>
        </div>

        {/* Insight Section */}
        {insight.content && (
          <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg animate-fade-in">
            <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <Sparkles className="text-indigo-500" size={20} />
              Diagnóstico do Mentor Virtual
            </h3>
            <div className="text-indigo-800 prose prose-indigo max-w-none whitespace-pre-wrap">
              {insight.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompassActivity;
