/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { UMLClass, UMLRelationship, ThemeMode } from './types/uml';
import { INITIAL_CLASSES, INITIAL_RELATIONSHIPS } from './data/umlData';
import { UMLCanvas } from './components/UMLCanvas';
import { RuleInspector } from './components/RuleInspector';
import { ElementInspector } from './components/ElementInspector';
import { CodeExportModal } from './components/CodeExportModal';
import { UMLQuizModal } from './components/UMLQuizModal';
import { AuthorSignatureModal } from './components/AuthorSignatureModal';
import { 
  Download, 
  HelpCircle, 
  FileCode2, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Award,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export default function App() {
  const [classes, setClasses] = useState<UMLClass[]>(INITIAL_CLASSES);
  const [relationships] = useState<UMLRelationship[]>(INITIAL_RELATIONSHIPS);
  const [activeRule, setActiveRule] = useState<1 | 2 | 3 | 4 | null>(null);
  const [selectedClass, setSelectedClass] = useState<UMLClass | null>(null);
  const [selectedRelationship, setSelectedRelationship] = useState<UMLRelationship | null>(null);
  const [theme, setTheme] = useState<ThemeMode>('minimal');
  const [isDetailed, setIsDetailed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Modals state
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 text-slate-900 select-none">
      {/* Universal Top Bar Contract: 3 Zones (Wordmark, Nav Links, 1 Primary Action) */}
      <header className="shrink-0 flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200 z-30">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title={isSidebarOpen ? 'Madde Panelini Gizle' : 'Madde Panelini Aç'}
          >
            {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
          </button>
          <a
            href="/"
            className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            <span>Üniversite UML Sınıf Modeli</span>
          </a>
        </div>

        {/* Zone 2: 4-5 single-line nav links with clean typography */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <button
            onClick={() => {
              setActiveRule(null);
              setSelectedClass(null);
              setSelectedRelationship(null);
            }}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
          >
            Tüm Sınıflar
          </button>
          <button
            onClick={() => setIsExportOpen(true)}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>PlantUML & Kodlar</span>
          </button>
          <button
            onClick={() => setIsQuizOpen(true)}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>UML Bilgi Testi</span>
          </button>
          <button
            onClick={() => setIsSignatureOpen(true)}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-slate-700 font-bold"
          >
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Hazırlayan: Enes Öztürk</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsExportOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Dışa Aktar (PNG / SVG)</span>
          </button>
        </div>
      </header>

      {/* Main Two-Zone Work Area */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Left Drawer / Sidebar: Scenario Rule Analysis */}
        {isSidebarOpen && (
          <aside className="w-80 md:w-96 shrink-0 h-full border-r border-slate-200 z-10">
            <RuleInspector
              activeRule={activeRule}
              onSelectRule={setActiveRule}
              relationships={relationships}
            />
          </aside>
        )}

        {/* Center / Right: Interactive Canvas Stage */}
        <main className="relative flex-1 h-full overflow-hidden">
          <UMLCanvas
            classes={classes}
            relationships={relationships}
            onUpdateClasses={setClasses}
            activeRule={activeRule}
            onSelectRule={setActiveRule}
            selectedClass={selectedClass}
            onSelectClass={(cls) => {
              setSelectedClass(cls);
              if (cls) setSelectedRelationship(null);
            }}
            selectedRelationship={selectedRelationship}
            onSelectRelationship={(rel) => {
              setSelectedRelationship(rel);
              if (rel) setSelectedClass(null);
            }}
            theme={theme}
            onChangeTheme={setTheme}
            isDetailed={isDetailed}
            onToggleDetailed={() => setIsDetailed(!isDetailed)}
            canvasRef={canvasRef}
          />

          {/* Element Inspector Overlay (Class or Relationship Details) */}
          <ElementInspector
            selectedClass={selectedClass}
            selectedRelationship={selectedRelationship}
            classes={classes}
            relationships={relationships}
            onClose={() => {
              setSelectedClass(null);
              setSelectedRelationship(null);
            }}
            onSelectClass={(cls) => {
              setSelectedClass(cls);
              setSelectedRelationship(null);
            }}
          />
        </main>
      </div>

      {/* Modals */}
      <CodeExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        classes={classes}
        relationships={relationships}
        theme={theme}
        canvasRef={canvasRef}
      />

      <UMLQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      <AuthorSignatureModal
        isOpen={isSignatureOpen}
        onClose={() => setIsSignatureOpen(false)}
      />
    </div>
  );
}
