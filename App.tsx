import React, { useState } from 'react';
import { ViewState } from './types';
import CompassActivity from './components/CompassActivity';
import TimelineActivity from './components/TimelineActivity';
import ThermometerActivity from './components/ThermometerActivity';
import { Compass, CalendarDays, Thermometer, BrainCircuit } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');

  const renderContent = () => {
    switch (view) {
      case 'compass':
        return <CompassActivity onBack={() => setView('dashboard')} />;
      case 'timeline':
        return <TimelineActivity onBack={() => setView('dashboard')} />;
      case 'thermometer':
        return <ThermometerActivity onBack={() => setView('dashboard')} />;
      default:
        return (
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4 pt-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Gestão em <span className="text-brand-600">Foco AI</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Dinâmicas rápidas e interativas para líderes escolares e corporativos.
                Amplie sua visão estratégica com auxílio de Inteligência Artificial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              
              {/* Card 1: Bússola */}
              <div 
                onClick={() => setView('compass')}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-slate-100 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition duration-300">
                  <Compass size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Bússola da Gestão</h3>
                <p className="text-slate-600 mb-6">
                  Identifique prioridades e desalinhamentos entre suas ações atuais e o ideal.
                </p>
                <span className="text-sm font-semibold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Iniciar Dinâmica <span className="text-lg">→</span>
                </span>
              </div>

              {/* Card 2: Timeline */}
              <div 
                onClick={() => setView('timeline')}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-slate-100 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition duration-300">
                  <CalendarDays size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Linha do Tempo</h3>
                <p className="text-slate-600 mb-6">
                  Avalie sua evolução, picos de sucesso e vales de desafio nos últimos 12 meses.
                </p>
                <span className="text-sm font-semibold text-purple-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Iniciar Dinâmica <span className="text-lg">→</span>
                </span>
              </div>

              {/* Card 3: Thermometer */}
              <div 
                onClick={() => setView('thermometer')}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-slate-100 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition duration-300">
                  <Thermometer size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Termômetro de Skills</h3>
                <p className="text-slate-600 mb-6">
                  Autoavaliação visual de competências chave com planos de desenvolvimento.
                </p>
                <span className="text-sm font-semibold text-orange-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Iniciar Dinâmica <span className="text-lg">→</span>
                </span>
              </div>
            </div>

            <div className="text-center pt-8 pb-12 opacity-60 flex items-center justify-center gap-2">
              <BrainCircuit size={18} />
              <span className="text-sm font-medium">Powered by Gemini 2.5 Flash</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-100 selection:text-brand-900">
      <main className="container mx-auto h-screen p-4 md:p-6 flex flex-col">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
