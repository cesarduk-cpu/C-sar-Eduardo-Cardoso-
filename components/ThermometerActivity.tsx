import React, { useState } from 'react';
import { Skill, AiInsight } from '../types';
import { analyzeSkills } from '../services/geminiService';
import { ArrowLeft, BookOpen, Sparkles, Loader2, Plus, X } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const ThermometerActivity: React.FC<Props> = ({ onBack }) => {
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'Tomada de Decisão', level: 70 },
    { id: '2', name: 'Comunicação Clara', level: 45 },
    { id: '3', name: 'Resiliência', level: 80 },
    { id: '4', name: 'Delegação', level: 30 },
  ]);
  const [newSkillName, setNewSkillName] = useState('');
  const [insight, setInsight] = useState<AiInsight>({ loading: false, content: null, error: null });

  const handleLevelChange = (id: string, newLevel: number) => {
    setSkills(skills.map(s => s.id === id ? { ...s, level: newLevel } : s));
  };

  const addSkill = () => {
    if (!newSkillName.trim()) return;
    setSkills([...skills, { id: Date.now().toString(), name: newSkillName, level: 50 }]);
    setNewSkillName('');
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const handleAnalyze = async () => {
    setInsight({ loading: true, content: null, error: null });
    const result = await analyzeSkills(skills);
    setInsight({ loading: false, content: result, error: null });
  };

  const getColor = (level: number) => {
    if (level < 40) return 'bg-red-500';
    if (level < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-brand-600 p-4 text-white flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 hover:bg-brand-700 px-3 py-1 rounded transition">
          <ArrowLeft size={20} /> Voltar
        </button>
        <h2 className="text-xl font-bold">Termômetro de Competências</h2>
      </div>

      <div className="flex-1 overflow-auto p-6 bg-slate-50">
        
        {/* Top Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-end md:items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="flex gap-2 w-full md:w-auto">
            <input 
              type="text" 
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Nova competência..."
              className="border border-slate-300 rounded px-3 py-2 outline-none focus:border-brand-500"
            />
            <button onClick={addSkill} className="bg-slate-800 text-white px-3 py-2 rounded hover:bg-slate-900">
              <Plus size={20} />
            </button>
          </div>
          
          <button
            onClick={handleAnalyze}
            disabled={skills.length === 0 || insight.loading}
            className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded font-bold shadow flex items-center justify-center gap-2 transition"
          >
            {insight.loading ? <Loader2 className="animate-spin" /> : <BookOpen />}
            Gerar Plano de Desenvolvimento
          </button>
        </div>

        {/* Insight Box */}
        {insight.content && (
          <div className="mb-8 bg-orange-50 border-l-4 border-orange-500 p-6 rounded shadow-sm animate-fade-in">
             <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2"><Sparkles /> Plano de Ação Sugerido</h3>
             <p className="whitespace-pre-wrap text-orange-800">{insight.content}</p>
          </div>
        )}

        {/* Thermometers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center">
          {skills.map(skill => (
            <div key={skill.id} className="flex flex-col items-center group relative">
              <button 
                onClick={() => removeSkill(skill.id)}
                className="absolute top-0 right-0 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
              >
                <X size={16} />
              </button>

              <h4 className="font-semibold text-center text-slate-700 mb-2 min-h-[40px] flex items-center justify-center text-sm">{skill.name}</h4>
              
              {/* Thermometer UI */}
              <div className="relative w-16 h-64 bg-slate-200 rounded-full border-4 border-slate-300 shadow-inner overflow-hidden flex items-end justify-center mb-4">
                {/* Hash marks */}
                <div className="absolute w-full h-full z-10 pointer-events-none opacity-20 flex flex-col justify-between py-4 px-2">
                   {[...Array(9)].map((_, i) => <div key={i} className="w-full h-[1px] bg-slate-800"></div>)}
                </div>

                {/* Liquid */}
                <div 
                  className={`w-full transition-all duration-500 ease-out ${getColor(skill.level)}`}
                  style={{ height: `${skill.level}%` }}
                ></div>
                
                {/* Value Text */}
                <span className="absolute bottom-4 font-bold text-white drop-shadow-md z-20 text-lg">
                  {skill.level}%
                </span>
              </div>

              {/* Slider Control */}
              <input 
                type="range"
                min="0"
                max="100"
                step="5"
                value={skill.level}
                onChange={(e) => handleLevelChange(skill.id, Number(e.target.value))}
                className="w-24 h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-slate-600"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThermometerActivity;
