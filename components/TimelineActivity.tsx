import React, { useState } from 'react';
import { TimelineEvent, AiInsight } from '../types';
import { analyzeTimeline } from '../services/geminiService';
import { ArrowLeft, Plus, TrendingUp, TrendingDown, Trash2, Sparkles, Loader2, Calendar } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const TimelineActivity: React.FC<Props> = ({ onBack }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([
    { id: '1', type: 'peak', date: '2023-08', title: 'Lançamento do novo projeto', action: 'Liderei a equipe com reuniões diárias' },
    { id: '2', type: 'valley', date: '2023-11', title: 'Perda de um membro chave', action: 'Tentei reter, mas reagi tarde demais' }
  ]);
  
  const [newEvent, setNewEvent] = useState<Partial<TimelineEvent>>({ type: 'peak', date: '', title: '', action: '' });
  const [insight, setInsight] = useState<AiInsight>({ loading: false, content: null, error: null });

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.action) return;
    const event: TimelineEvent = {
      id: Date.now().toString(),
      type: newEvent.type as 'peak' | 'valley',
      date: newEvent.date!,
      title: newEvent.title!,
      action: newEvent.action!
    };
    // Sort by date
    const updatedEvents = [...events, event].sort((a, b) => a.date.localeCompare(b.date));
    setEvents(updatedEvents);
    setNewEvent({ type: 'peak', date: '', title: '', action: '' });
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const handleAnalyze = async () => {
    setInsight({ loading: true, content: null, error: null });
    const result = await analyzeTimeline(events);
    setInsight({ loading: false, content: result, error: null });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-brand-600 p-4 text-white flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 hover:bg-brand-700 px-3 py-1 rounded transition">
          <ArrowLeft size={20} /> Voltar
        </button>
        <h2 className="text-xl font-bold">Linha do Tempo da Gestão</h2>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Input Form */}
          <div className="lg:col-span-1 space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200 h-fit">
            <h3 className="font-bold text-slate-700 mb-2">Adicionar Evento</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Data (Mês/Ano)</label>
              <input 
                type="month" 
                value={newEvent.date} 
                onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Tipo de Momento</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => setNewEvent({...newEvent, type: 'peak'})}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded border ${newEvent.type === 'peak' ? 'bg-green-100 border-green-500 text-green-700 font-bold' : 'bg-white border-slate-300 text-slate-500'}`}
                >
                  <TrendingUp size={16} /> Pico
                </button>
                <button 
                  onClick={() => setNewEvent({...newEvent, type: 'valley'})}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded border ${newEvent.type === 'valley' ? 'bg-red-100 border-red-500 text-red-700 font-bold' : 'bg-white border-slate-300 text-slate-500'}`}
                >
                  <TrendingDown size={16} /> Vale
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">O que aconteceu?</label>
              <input 
                type="text" 
                placeholder="Ex: Conflito na equipe..." 
                value={newEvent.title} 
                onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Qual foi sua ação?</label>
              <textarea 
                placeholder="Ex: Chamei para conversar..." 
                value={newEvent.action} 
                onChange={e => setNewEvent({...newEvent, action: e.target.value})}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-500 outline-none"
                rows={3}
              />
            </div>

            <button 
              onClick={addEvent}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 rounded flex items-center justify-center gap-2 transition"
            >
              <Plus size={18} /> Adicionar à Linha
            </button>
          </div>

          {/* Timeline Display */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-700">Histórico de Atuação (Últimos 12 Meses)</h3>
              <button
                onClick={handleAnalyze}
                disabled={events.length < 2 || insight.loading}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white px-4 py-2 rounded shadow flex items-center gap-2 transition"
              >
                {insight.loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                Analisar Padrões
              </button>
            </div>

            {insight.content && (
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-purple-900 animate-fade-in shadow-sm">
                 <h4 className="font-bold flex items-center gap-2 mb-2"><Sparkles size={16} /> Feedback de IA</h4>
                 <p className="whitespace-pre-wrap text-sm">{insight.content}</p>
              </div>
            )}

            <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-8">
              {events.length === 0 && (
                <div className="ml-8 text-slate-400 italic">Nenhum evento registrado ainda.</div>
              )}
              {events.map((event) => (
                <div key={event.id} className="relative ml-8">
                  {/* Dot */}
                  <span className={`absolute -left-[41px] top-0 flex items-center justify-center w-8 h-8 rounded-full border-4 border-white shadow-sm ${event.type === 'peak' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {event.type === 'peak' ? <TrendingUp size={14} className="text-white" /> : <TrendingDown size={14} className="text-white" />}
                  </span>
                  
                  {/* Card */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition group">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                        <Calendar size={12} />
                        {event.date}
                      </div>
                      <button onClick={() => removeEvent(event.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <h4 className={`font-bold text-lg ${event.type === 'peak' ? 'text-green-700' : 'text-red-700'}`}>
                      {event.title}
                    </h4>
                    <div className="mt-2 bg-slate-50 p-2 rounded text-sm text-slate-700 border-l-2 border-slate-300">
                      <span className="font-semibold text-xs text-slate-500 block mb-1">SUA AÇÃO:</span>
                      {event.action}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineActivity;
