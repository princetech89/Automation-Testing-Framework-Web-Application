
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Rocket, 
  Code2, 
  ClipboardCheck, 
  ChevronRight, 
  Cpu, 
  FileCode,
  Terminal,
  Activity,
  Workflow,
  Sparkles,
  Info
} from 'lucide-react';
import { PHASES, LAYERS } from './constants';
import { LayerType, Phase, Layer } from './types';
import { generateFrameworkSnippet, generateScenarios } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'layers' | 'ai-lab'>('blueprint');
  const [selectedPhase, setSelectedPhase] = useState<Phase>(PHASES[0]);
  const [selectedLayer, setSelectedLayer] = useState<Layer>(LAYERS[0]);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiAction = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    const result = await generateFrameworkSnippet(selectedLayer.id, aiPrompt);
    setAiOutput(result);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-50">SDET Architect</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Enterprise Java Framework Designer</p>
            </div>
          </div>

          <nav className="flex gap-1 bg-slate-900/50 p-1 rounded-full border border-slate-800">
            {[
              { id: 'blueprint', label: 'Framework Blueprint', icon: Workflow },
              { id: 'layers', label: 'Layer Architecture', icon: Layers },
              { id: 'ai-lab', label: 'AI Code Lab', icon: Sparkles }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8 pb-20">
        {/* Intro Hero Section (Conditional) */}
        {activeTab === 'blueprint' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                <h2 className="text-2xl font-bold mb-4 text-white">Platform over Scripts</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  In modern enterprise QA, we don't just "write test scripts"—we design testing platforms that are maintainable, scalable, and business-driven.
                </p>
                <div className="space-y-3">
                  {['Readable (BDD)', 'Maintainable (POM)', 'Reusable (Utils)', 'Scalable (Parallel)'].map((p) => (
                    <div key={p} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 px-2">Development Roadmap</h3>
                <div className="space-y-2">
                  {PHASES.map((phase) => (
                    <button
                      key={phase.id}
                      onClick={() => setSelectedPhase(phase)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl text-left border transition-all ${
                        selectedPhase.id === phase.id 
                          ? 'bg-slate-900 border-indigo-500/50 shadow-xl' 
                          : 'bg-transparent border-slate-800 hover:bg-slate-900/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        selectedPhase.id === phase.id ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {phase.id}
                      </div>
                      <span className="font-medium text-slate-200">{phase.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Rocket className="w-32 h-32 text-indigo-500" />
                </div>
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <Rocket className="text-indigo-400 w-6 h-6" />
                    <h3 className="text-2xl font-bold text-white">Phase {selectedPhase.id}: {selectedPhase.title}</h3>
                  </div>
                  <p className="text-lg text-slate-300">{selectedPhase.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                        <Info className="w-4 h-4" /> Core Requirements
                      </h4>
                      <ul className="space-y-3">
                        {selectedPhase.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-200">
                            <ChevronRight className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                        <Cpu className="w-4 h-4" /> Tech Stack Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPhase.tools.map((tool) => (
                          <span key={tool} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-medium text-indigo-400">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/40 p-6 rounded-2xl border border-dashed border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-slate-400">Framework Visualization</h4>
                  <div className="flex gap-2">
                    <div className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 text-[10px] font-bold">STABLE</div>
                    <div className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[10px] font-bold">SCALABLE</div>
                  </div>
                </div>
                <div className="h-48 flex items-center justify-center gap-1">
                   {[40, 70, 100, 80, 50, 90, 60, 30, 80, 100, 40, 20, 60].map((h, i) => (
                     <div key={i} className="w-full bg-indigo-500/20 rounded-t-sm relative group overflow-hidden" style={{ height: `${h}%` }}>
                        <div className="absolute inset-x-0 bottom-0 bg-indigo-600 transition-all duration-700 ease-out group-hover:h-full" style={{ height: '20%' }} />
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Layers Explorer Section */}
        {activeTab === 'layers' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {LAYERS.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayer(layer)}
                  className={`relative p-4 rounded-2xl transition-all border text-center ${
                    selectedLayer.id === layer.id
                      ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-600/20 -translate-y-1'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className={`mb-3 flex justify-center ${selectedLayer.id === layer.id ? 'text-white' : 'text-indigo-400'}`}>
                    {layer.id === LayerType.BUSINESS && <ClipboardCheck className="w-6 h-6" />}
                    {layer.id === LayerType.LOGIC && <Workflow className="w-6 h-6" />}
                    {layer.id === LayerType.PAGE && <FileCode className="w-6 h-6" />}
                    {layer.id === LayerType.UTILITY && <Cpu className="w-6 h-6" />}
                    {layer.id === LayerType.EXECUTION && <Rocket className="w-6 h-6" />}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider block">{layer.id}</span>
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="text-indigo-500"><Layers className="w-6 h-6" /></span>
                    {selectedLayer.id}
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-slate-300 text-lg leading-relaxed">{selectedLayer.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Primary Purpose</span>
                        <p className="text-sm text-slate-300">{selectedLayer.purpose}</p>
                      </div>
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Hard Design Rule</span>
                        <p className="text-sm text-slate-300">{selectedLayer.designRule}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Layer Artifacts</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLayer.content.map(item => (
                          <span key={item} className="px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-slate-200 border border-slate-700">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-full">
                  <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 ml-2">ExampleImplementation.java</span>
                    </div>
                    <Terminal className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="p-6 flex-1 bg-slate-950 overflow-auto">
                    <pre className="mono text-sm leading-relaxed text-indigo-300 whitespace-pre-wrap">
                      <code>{selectedLayer.example}</code>
                    </pre>
                  </div>
                  <div className="p-4 bg-slate-900/50 border-t border-slate-800 flex items-center justify-center">
                    <p className="text-xs text-slate-500 italic">This demonstrates a standard enterprise-level structure for this layer.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Code Lab Section */}
        {activeTab === 'ai-lab' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
            <div className="text-center space-y-4">
              <div className="inline-flex p-3 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-600/20 mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-black text-white">AI Framework Lab</h2>
              <p className="text-slate-400 max-w-lg mx-auto">
                Select a layer and describe a scenario. Gemini will generate high-quality, professional Java code snippets following your architecture.
              </p>
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                 {Object.values(LayerType).map(type => (
                   <button
                    key={type}
                    onClick={() => setSelectedLayer(LAYERS.find(l => l.id === type) || LAYERS[0])}
                    className={`text-[10px] font-bold uppercase p-2 rounded-lg border transition-all ${
                      selectedLayer.id === type ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                   >
                     {type.split(' ')[0]}
                   </button>
                 ))}
              </div>

              <div className="relative group">
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder={`Describe a scenario for the ${selectedLayer.id}... e.g., 'A login page with dynamic wait for an error message'`}
                  className="w-full h-32 bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                />
                <button
                  onClick={handleAiAction}
                  disabled={isGenerating || !aiPrompt}
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isGenerating ? (
                    <Activity className="w-5 h-5 animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                  Generate Snippet
                </button>
              </div>
            </div>

            {aiOutput && (
              <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden animate-in slide-in-from-top-4 duration-500">
                <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-mono text-indigo-400">Generated Solution</span>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                  </div>
                </div>
                <div className="p-8 bg-slate-950">
                  <pre className="mono text-sm leading-relaxed text-indigo-100 whitespace-pre-wrap">
                    <code>{aiOutput}</code>
                  </pre>
                </div>
                <div className="p-4 bg-slate-900 text-center">
                  <p className="text-xs text-slate-500">Always review and refactor generated code to fit your specific project style guides.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Action Bar */}
      <footer className="fixed bottom-0 inset-x-0 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800 p-4 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium text-slate-500">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span>Framework Engine v2.4</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>Java 17 / Selenium 4</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span>Parallel Ready</span>
            </div>
          </div>
          <div className="hidden md:block">
            Architecting high-reliability automation since 2024
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
