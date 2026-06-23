import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Type,
  FileText,
  Binary,
  CheckCircle2,
  Scale,
  BookOpen,
  Info,
  ChevronRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Search,
  Building,
  Cpu,
  BookMarked,
  Award,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  Clock,
  Sun,
  Moon,
  Globe,
  Download,
  FolderDown
} from "lucide-react";

import {
  marginData,
  typographyData,
  pageNumberRules,
  assembleSteps,
  ethicsArticles,
  inlineCitationsData,
  AssembleStep,
  downloadResources,
  DownloadResource
} from "./data/thesisData";

import {
  uiTranslations,
  marginTranslations,
  typographyTranslations,
  pageNumberTranslations,
  assembleStepsTranslations,
  ethicsTranslations,
  citationRulesTranslations
} from "./data/translations";

import { ScrollReveal } from "./components/ScrollReveal";

export default function App() {
  // Localization state
  const [appLanguage, setAppLanguage] = useState<"my" | "th" | "en">("my");

  // Theme mode: true for Dark, false for Light
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Navigation tabs
  const [activeTab, setActiveTab] = useState<string>("margins");

  // Margin visualizer states
  const [marginPageType, setMarginPageType] = useState<"odd" | "even">("odd");
  const [selectedMarginGuide, setSelectedMarginGuide] = useState<string>("left");

  // Typography state
  const [typoLang, setTypoLang] = useState<number>(0); // 0 for English, 1 for Thai
  const [customTypoText, setCustomTypoText] = useState<string>("");

  // Downloads state
  const [downloadCategory, setDownloadCategory] = useState<string>("all");
  const [downloadSearch, setDownloadSearch] = useState<string>("");

  // Set initial text depending on language
  useEffect(() => {
    if (appLanguage === "my") {
      setCustomTypoText(
        "ဤသည်မှာ စာလုံးစံနှုန်း လက်တွေ့စမ်းသပ်ရန် နေရာဖြစ်ပါသည်။ ဤနေရာတွင် စာသားများကို စိတ်ကြိုက် ရေးသားပြင်ဆင်ပြီး Khon Kaen တက္ကသိုလ်၏ တရားဝင် စည်းကမ်းသတ်မှတ်ချက်များနှင့်အညီ စာလုံးအရွယ်အစား၊ စာကြောင်းအကွာအဝေးများကို ကြည့်ရှုနိုင်ပါသည်။"
      );
    } else if (appLanguage === "th") {
      setCustomTypoText(
        "นี่คือพื้นที่ทดสอบระบบตัวอักษรแบบโต้ตอบ คุณสามารถพิมพ์ข้อความเพิ่มลดเพื่อสัมผัสการจัดระยะห่าง บรรทัด ความหนา และขนาดอักษรตามมาตรฐานระเบียบวิทยานิพนธ์ของ มหาวิทยาลัยขอนแก่น จริง"
      );
    } else {
      setCustomTypoText(
        "This is an interactive typography preview. You can type anything here to see how proper line height, font size, and spacing feel under the Khon Kaen University official formatting handbook regulations."
      );
    }
  }, [appLanguage]);

  // Citation states
  const [citationSystem, setCitationSystem] = useState<"apa" | "vancouver">("apa");
  const [selectedCiteType, setSelectedCiteType] = useState<number>(0);
  const [copySuccess, setCopyExampleIdx] = useState<number | null>(null);

  // Search state for quick guides
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [customSearchResponse, setCustomSearchResponse] = useState<string | null>(null);

  // Assembler checklist storage & expand collapse
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [expandedStep, setExpandedStep] = useState<string | null>("cover");

  // Local storage persistence for checklist
  useEffect(() => {
    const saved = localStorage.getItem("kku_thesis_checklist");
    if (saved) {
      try {
        setCheckedSteps(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse checklist", e);
      }
    }
  }, []);

  const toggleStepCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering expand accordion
    const updated = { ...checkedSteps, [id]: !checkedSteps[id] };
    setCheckedSteps(updated);
    localStorage.setItem("kku_thesis_checklist", JSON.stringify(updated));
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopyExampleIdx(idx);
    setTimeout(() => {
      setCopyExampleIdx(null);
    }, 2000);
  };

  // Quick Search engine matching simple triggers
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase();
    const t = uiTranslations[appLanguage];
    let response = "";

    if (query.includes("margin") || query.includes("ဘေးသား") || query.includes("လက်မ") || query.includes("ขอบ") || query.includes("ระยะ")) {
      response = t.search_ans_margins;
    } else if (query.includes("font") || query.includes("စာလုံး") || query.includes("နံပါတ်") || query.includes("size") || query.includes("อักษร") || query.includes("ขนาด")) {
      response = t.search_ans_fonts;
    } else if (query.includes("apa") || query.includes("vancouver") || query.includes("ကိုးကား") || query.includes("cite") || query.includes("อ้างอิง")) {
      response = t.search_ans_cit;
    } else if (query.includes("hidden") || query.includes("ဖျောက်") || query.includes("pagenumber") || query.includes("ซ่อน")) {
      response = t.search_ans_hidden;
    } else if (query.includes("cover") || query.includes("အရောင်") || query.includes("navy") || query.includes("black") || query.includes("สีปก") || query.includes("ปก")) {
      response = t.search_ans_cover;
    } else {
      response = t.search_fail;
    }
    setCustomSearchResponse(response);
  };

  const getStepProgress = () => {
    const total = assembleSteps.length;
    const completed = assembleSteps.filter(s => checkedSteps[s.id]).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    let text = "";
    if (appLanguage === "my") {
      text = `${total} ကွက်တွင် ${completed} ကွက် စစ်ဆေးပြီးပြီ`;
    } else if (appLanguage === "th") {
      text = `ตรวจสอบความถูกต้องแล้ว ${completed} จากปกติ ${total} รายการ`;
    } else {
      text = `Audited ${completed} of ${total} core steps`;
    }
    return { percent, text };
  };

  const progress = getStepProgress();
  const t = uiTranslations[appLanguage];

  // Helper to translate assembler check items
  const getStepText = (stepId: string) => {
    const localized = assembleStepsTranslations[appLanguage];
    const key = stepId as keyof typeof localized;
    if (localized && localized[key]) {
      return localized[key];
    }
    // Fallback to defaults
    const s = assembleSteps.find(item => item.id === stepId);
    return { title: s?.title || stepId, details: s?.details || "" };
  };

  // Helper to resolve specific color palettes depending on mode state
  const sBg = isDarkMode ? "bg-[#0a0a0c] text-white" : "bg-[#f3f4f6]" + " text-slate-900";
  const sCard = isDarkMode ? "bg-[#0f0f12] border-white/10" : "bg-white border-slate-200 shadow-sm";
  const sInner = isDarkMode ? "bg-[#131317] border-white/10" : "bg-[#f8fafc] border-slate-200";
  const sTextPrimary = isDarkMode ? "text-white" : "text-slate-800";
  const sTextMuted = isDarkMode ? "text-zinc-400" : "text-slate-600";
  const sBorder = isDarkMode ? "border-white/10" : "border-slate-200";
  const sBorderSubtle = isDarkMode ? "border-white/5" : "border-slate-100";

  return (
    <div id="kku-thesis-app" className={`min-h-screen font-sans transition-colors duration-200 ${sBg}`}>
      
      {/* Dynamic Header Badge Announcement */}
      <div className={`text-center py-2.5 px-4 text-xs font-sans tracking-wide flex flex-col sm:flex-row items-center justify-center gap-2 border-b border-white/10 bg-gradient-to-r from-amber-600/35 via-yellow-600/25 to-amber-600/35 text-amber-200 leading-relaxed md:leading-normal`}>
        <AlertTriangle className="h-4 w-4 shrink-0 text-[#ffd700] animate-pulse" /> 
        <span className="font-semibold text-center leading-normal">{t.top_tagline}</span>
      </div>

      {/* Main Top Navigation Head Bar */}
      <header className={`border-b ${sBorder} relative backdrop-blur-md`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title / Logo Label Area */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="bg-[#ffd700]/10 border border-[#ffd700]/30 px-2 py-1 rounded text-[#ffd700] text-xs font-mono font-bold tracking-widest leading-none">
                  {t.header_subtitle}
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md px-1.5 py-0.5 uppercase tracking-wide font-extrabold">
                  VER 2026.1
                </span>
              </div>
              <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-kku-gold tracking-tight">
                {t.header_title}
              </h1>
              <p className={`text-xs ${sTextMuted} max-w-2xl leading-relaxed`}>
                {t.header_desc}
              </p>
            </div>

            {/* Quick Controllers: Theme Shift & Language Options */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Language Selector Selector Button Group */}
              <div id="language-options-group" className={`flex rounded-xl p-1 gap-0.5 border ${sBorder} bg-black/10`}>
                <button
                  type="button"
                  id="lang-btn-my"
                  onClick={() => setAppLanguage("my")}
                  className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                    appLanguage === "my"
                      ? "bg-[#ffd700] text-[#0a0a0c] shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                  title="မြန်မာဘာသာ (MM)"
                >
                  MM
                </button>
                <button
                  type="button"
                  id="lang-btn-th"
                  onClick={() => setAppLanguage("th")}
                  className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                    appLanguage === "th"
                      ? "bg-[#ffd700] text-[#0a0a0c] shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                  title="ภาษาไทย (TH)"
                >
                  TH
                </button>
                <button
                  type="button"
                  id="lang-btn-en"
                  onClick={() => setAppLanguage("en")}
                  className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                    appLanguage === "en"
                      ? "bg-[#ffd700] text-[#0a0a0c] shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                  title="English Language (EN)"
                >
                  EN
                </button>
              </div>

              {/* Theme Mode Shift Trigger */}
              <button
                type="button"
                id="theme-mood-trigger"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2.5 rounded-xl border ${sBorder} transition-all duration-150 flex items-center justify-center cursor-pointer ${
                  isDarkMode 
                    ? "bg-[#0f0f12] text-[#ffd700] hover:bg-[#1a1a24] hover:text-white" 
                    : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-sm"
                }`}
                title="Toggle Light/Dark Theme"
              >
                {isDarkMode ? (
                  <Sun className="h-4.5 w-4.5" />
                ) : (
                  <Moon className="h-4.5 w-4.5" />
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Main Core Body Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Core Search and Quick Lookup Engine Area */}
        <ScrollReveal direction="up" delay={0.15}>
          <section className={`p-6 rounded-2xl border ${sBorder} ${sCard} space-y-4 shadow-lg relative overflow-hidden`}>
            <div className="absolute top-0 right-0 h-40 w-40 bg-radial from-[#ffd700]/5 to-transparent rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <h2 className={`font-serif text-lg font-bold ${sTextPrimary} flex items-center gap-2`}>
                  <Globe className="h-5 w-5 text-kku-gold animate-bounce" />
                  {t.search_title}
                </h2>
                <p className={`text-xs ${sTextMuted}`}>
                  {t.search_hint}
                </p>
              </div>
              
              {/* Direct quick badges list */}
              <div className="flex flex-wrap gap-1.5">
                {["margins", "fonts", "citations", "ethics"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSearchQuery(item);
                      // trigger search instantly
                      const t_val = uiTranslations[appLanguage];
                      if (item === "margins") setCustomSearchResponse(t_val.search_ans_margins);
                      if (item === "fonts") setCustomSearchResponse(t_val.search_ans_fonts);
                      if (item === "citations") setCustomSearchResponse(t_val.search_ans_cit);
                      if (item === "ethics") setCustomSearchResponse(t_val.ethics_desc);
                    }}
                    className={`text-[10px] px-2.5 py-1 rounded-md font-mono font-bold uppercase cursor-pointer border ${
                      isDarkMode
                        ? "bg-[#141419] border-white/5 text-zinc-400 hover:text-white"
                        : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    #{item}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-zinc-550 pointer-events-none">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.search_placeholder}
                  className={`w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#ffd700] font-sans ${
                    isDarkMode
                      ? "bg-[#131317] border-white/10 text-white placeholder-zinc-500"
                      : "bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400"
                  }`}
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold rounded-xl bg-[#ffd700] text-[#0a0a0c] hover:bg-[#e6c200] transition cursor-pointer flex-shrink-0"
              >
                {t.search_button}
              </button>
            </form>

            {/* Collapsible search prompt results */}
            <AnimatePresence>
              {customSearchResponse && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`p-4 rounded-xl border relative flex gap-3 text-xs leading-relaxed ${
                    isDarkMode
                      ? "bg-amber-500/5 border-amber-500/20 text-amber-200"
                      : "bg-amber-50 border-amber-500/20 text-amber-900"
                  }`}
                >
                  <div className="flex-1">
                    <strong>💡 Output Lookup Match:</strong>
                    <p className="mt-1 font-serif leading-normal">{customSearchResponse}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomSearchResponse(null);
                      setSearchQuery("");
                    }}
                    className={`text-[10px] font-bold underline cursor-pointer self-start flex-shrink-0 ${
                      isDarkMode ? "text-amber-400 hover:text-white" : "text-amber-700 hover:text-slate-900"
                    }`}
                  >
                    {t.search_close}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </ScrollReveal>

        {/* Quick Spec Stats Row Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ScrollReveal direction="up" delay={0.2} className="h-full">
            <div className={`p-4 rounded-xl border p-full h-full ${sBorder} ${sCard} flex items-center gap-3.5`}>
              <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{t.stat_paper_title}</div>
                <div className={`text-xs font-bold ${sTextPrimary}`}>{t.stat_paper_val}</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.25} className="h-full">
            <div className={`p-4 rounded-xl border p-full h-full ${sBorder} ${sCard} flex items-center gap-3.5`}>
              <div className="h-10 w-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 flex-shrink-0">
                <Type className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{t.stat_spacing_title}</div>
                <div className={`text-xs font-bold ${sTextPrimary}`}>{t.stat_spacing_val}</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3} className="h-full">
            <div className={`p-4 rounded-xl border p-full h-full ${sBorder} ${sCard} flex items-center gap-3.5`}>
              <div className="h-10 w-10 rounded-lg bg-[#ffd700]/10 border border-[#ffd700]/20 flex items-center justify-center text-[#ffd700] flex-shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{t.stat_cover_title}</div>
                <div className={`text-xs font-bold ${sTextPrimary}`}>{t.stat_cover_val}</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.35} className="h-full">
            <div className={`p-4 rounded-xl border p-full h-full ${sBorder} ${sCard} flex items-center gap-3.5`}>
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{t.stat_margin_title}</div>
                <div className={`text-xs font-bold ${sTextPrimary}`}>{t.stat_margin_val}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Tab Controls Menu Bar */}
        <ScrollReveal direction="up" delay={0.4}>
          <section className={`flex overflow-x-auto rounded-2xl p-1.5 gap-1 border ${sBorder} ${sCard} no-scrollbar`}>
            {[
              { id: "margins", label: t.tab_margins, icon: Layers },
              { id: "fonts", label: t.tab_fonts, icon: Type },
              { id: "paging", label: t.tab_paging, icon: FileText },
              { id: "citations", label: t.tab_citations, icon: BookOpen },
              { id: "assembler", label: t.tab_assembler, icon: Binary },
              { id: "ethics", label: t.tab_ethics, icon: Scale },
              { id: "downloads", label: t.tab_downloads || "Downloads", icon: Download }
            ].map((tab) => {
              const IconComp = tab.icon;
              const isTabActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCustomSearchResponse(null);
                  }}
                  className={`px-4 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 select-none transition-all duration-155 flex-shrink-0 cursor-pointer ${
                    isTabActive
                      ? "bg-[#ffd700] text-[#0a0a0c] shadow-md"
                      : isDarkMode 
                        ? "text-zinc-400 hover:bg-white/5 hover:text-white"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <IconComp className="h-4.5 w-4.5" />
                  {tab.label}
                </button>
              );
            })}
          </section>
        </ScrollReveal>

        {/* -------------------- TAB: MARGINS -------------------- */}
        {activeTab === "margins" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Visualizer sidebar controller */}
            <ScrollReveal direction="left" className={`lg:col-span-4 p-6 rounded-2xl border ${sBorder} ${sCard} space-y-6 flex flex-col justify-between`} delay={0.1}>
              <div className="space-y-4">
                <div>
                  <h3 className={`font-serif text-lg font-bold ${sTextPrimary}`}>
                    {t.sim_title}
                  </h3>
                  <p className={`text-xs ${sTextMuted} mt-1 leading-relaxed`}>
                    {t.sim_desc}
                  </p>
                </div>

                {/* Odd/Even Toggle switches */}
                <div className={`flex rounded-xl p-1 gap-1 border ${sBorder} ${sInner}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setMarginPageType("odd");
                      setSelectedMarginGuide("left");
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition duration-150 cursor-pointer ${
                      marginPageType === "odd"
                        ? "bg-[#ffd700] text-[#0a0a0c] shadow-md"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {t.switch_odd}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMarginPageType("even");
                      setSelectedMarginGuide("right");
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition duration-150 cursor-pointer ${
                      marginPageType === "even"
                        ? "bg-[#ffd700] text-[#0a0a0c] shadow-md"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {t.switch_even}
                  </button>
                </div>

                {/* Instruction callout explanation */}
                <div className={`p-4 rounded-xl ${sInner} space-y-2`}>
                  <h4 className={`text-xs font-bold ${sTextPrimary} flex items-center gap-1.5`}>
                    <Info className="h-4 w-4 text-[#ffd700]" />
                    {t.binding_info_title}
                  </h4>
                  <p className={`text-[11px] ${sTextMuted} leading-relaxed`}>
                    {t.binding_info_text}
                  </p>
                </div>
              </div>

              {/* Specific margin details container */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                  {t.spec_top_title}
                </span>

                <div className="flex flex-col gap-2">
                  {Object.entries(marginPageType === "odd" ? marginData.odd : marginData.even).map(([key, value]) => {
                    const isSelected = selectedMarginGuide === key;
                    
                    // Resolve translated strings
                    const resolvedKey = (key === "left" || key === "right") ? `${key}_${marginPageType}` : key;
                    const translated = marginTranslations[appLanguage][resolvedKey as keyof typeof marginTranslations["en"]];
                    const displayLabel = translated ? translated.label : value.label;
                    const displayDesc = translated ? translated.desc : value.desc;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedMarginGuide(key)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition duration-150 cursor-pointer relative ${
                          isSelected
                            ? "bg-[#ffd700]/10 border-[#ffd700] text-[#ffd700] font-bold"
                            : `${sInner} text-zinc-400 hover:bg-zinc-800/20`
                        }`}
                      >
                        <div className="flex justify-between items-center font-serif">
                          <span>{displayLabel}</span>
                          <span className="font-mono text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-white">
                            {value.inch} IN ({value.cm} CM)
                          </span>
                        </div>
                        {isSelected && (
                          <p className={`text-[10px] font-normal leading-relaxed mt-1 text-zinc-300`}>
                            {displayDesc}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Simulated sheet visualization page preview */}
            <ScrollReveal direction="right" className={`lg:col-span-8 p-6 rounded-2xl border ${sBorder} ${sCard} flex flex-col justify-between space-y-6 relative overflow-hidden`} delay={0.25}>
              
              {/* Header inside spec */}
              <div className={`flex items-center justify-between border-b ${sBorderSubtle} pb-3`}>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <h4 className={`font-serif text-lg font-bold ${sTextPrimary}`}>
                    {marginPageType === "odd" ? t.page_odd_badge : t.page_even_badge}
                  </h4>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-[#ffd700]/10 border border-[#ffd700]/20 text-[#ffd700] font-mono rounded font-semibold uppercase tracking-wider">
                  80G A4 Hardbound Layout Verified
                </span>
              </div>

              {/* Dynamic canvas simulating paper with padding measurements */}
              <div className="flex justify-center py-4 bg-black/10 rounded-2xl relative">
                
                {/* Physical paper sheet border */}
                <div className="w-[300px] h-[400px] bg-white border border-slate-300 shadow-2xl rounded p-1.5 relative select-none flex flex-col justify-between">
                  
                  {/* Top Margin Overlay */}
                  <div 
                    onClick={() => setSelectedMarginGuide("top")}
                    className={`absolute left-0 right-0 top-0 bg-amber-500/10 border-b border-dashed border-amber-500 transition cursor-pointer flex items-center justify-center text-[9px] font-mono font-bold text-amber-700`}
                    style={{ height: "70px" }}
                    title="Top Margin: 1.5 inches"
                  >
                    {selectedMarginGuide === "top" && "↑ TOP: 1.5 inch ↑"}
                  </div>

                  {/* Left Margin Overlay */}
                  <div 
                    onClick={() => setSelectedMarginGuide("left")}
                    className={`absolute left-0 top-0 bottom-0 bg-amber-500/10 border-r border-dashed border-amber-500 transition cursor-pointer flex items-center justify-center text-[9px] font-mono font-bold text-amber-700`}
                    style={{ width: marginPageType === "odd" ? "96px" : "64px" }}
                    title={marginPageType === "odd" ? "Binding Left: 1.5\"" : "Outer Left: 1.0\""}
                  >
                    <span className="-rotate-90 origin-center whitespace-nowrap block">
                      {marginPageType === "odd" ? `← ${t.binding_indicator} ←` : "← Left 1.0\" ←"}
                    </span>
                  </div>

                  {/* Right Margin Overlay */}
                  <div 
                    onClick={() => setSelectedMarginGuide("right")}
                    className={`absolute right-0 top-0 bottom-0 bg-amber-500/10 border-l border-dashed border-amber-500 transition cursor-pointer flex items-center justify-center text-[9px] font-mono font-bold text-amber-700`}
                    style={{ width: marginPageType === "even" ? "96px" : "64px" }}
                    title={marginPageType === "even" ? "Binding Right: 1.5\"" : "Outer Right: 1.0\""}
                  >
                    <span className="-rotate-90 origin-center whitespace-nowrap block">
                      {marginPageType === "even" ? `→ ${t.binding_indicator} →` : "→ Right 1.0\" →"}
                    </span>
                  </div>

                  {/* Bottom Margin Overlay */}
                  <div 
                    onClick={() => setSelectedMarginGuide("bottom")}
                    className={`absolute left-0 right-0 bottom-0 bg-amber-500/10 border-t border-dashed border-amber-500 transition cursor-pointer flex items-center justify-center text-[9px] font-mono font-bold text-amber-700`}
                    style={{ height: "48px" }}
                    title="Bottom Margin: 1.0 inch"
                  >
                    {selectedMarginGuide === "bottom" && t.bottom_margin_text}
                  </div>

                  {/* Page Contents Text Mockup representing active guides bounds */}
                  <div 
                    className="flex-1 border border-slate-250 m-2 mt-[66px] mb-[45px] transition-all duration-150 flex flex-col justify-between p-3"
                    style={{
                      marginLeft: marginPageType === "odd" ? "88px" : "56px",
                      marginRight: marginPageType === "even" ? "88px" : "56px"
                    }}
                  >
                    <div className="flex justify-between font-mono text-[6px] tracking-wide text-zinc-400 font-bold border-b pb-1 mb-1">
                      <span>{marginPageType === "odd" ? "" : "4"}</span>
                      <span>{marginPageType === "odd" ? "3" : ""}</span>
                    </div>

                    <div className="space-y-1.5 flex-1 flex flex-col justify-center">
                      <div className="h-2 w-full bg-slate-200 rounded"></div>
                      <div className="h-2 w-[90%] bg-slate-200 rounded"></div>
                      <div className="h-2 w-[85%] bg-slate-200 rounded"></div>
                      <div className="h-2 w-[95%] bg-slate-200 rounded"></div>
                      <div className="h-2 w-[60%] bg-slate-200 rounded"></div>
                    </div>

                    <div className="text-[6px] text-zinc-350 text-center uppercase tracking-widest font-sans font-bold">
                      Khon Kaen Graduate School Sample
                    </div>
                  </div>

                </div>

              </div>

            </ScrollReveal>

          </div>
        )}

        {/* -------------------- TAB: TYPOGRAPHY -------------------- */}
        {activeTab === "fonts" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Typography selector side bar panel */}
            <ScrollReveal direction="left" className={`lg:col-span-4 p-6 rounded-2xl border ${sBorder} ${sCard} space-y-6 flex flex-col justify-between`} delay={0.1}>
              <div className="space-y-4">
                <div>
                  <h3 className={`font-serif text-lg font-bold ${sTextPrimary}`}>
                    {t.fonts_title}
                  </h3>
                  <p className={`text-xs ${sTextMuted} mt-1 leading-relaxed`}>
                    {t.fonts_desc}
                  </p>
                </div>

                {/* English vs Thai typeface toggler switch */}
                <div className={`flex rounded-xl p-1 gap-1 border ${sBorder} ${sInner}`}>
                  <button
                    type="button"
                    onClick={() => setTypoLang(0)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition duration-150 cursor-pointer ${
                      typoLang === 0
                        ? "bg-[#ffd700] text-[#0a0a0c] shadow-md"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    English (Times New Roman)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTypoLang(1)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition duration-150 cursor-pointer ${
                      typoLang === 1
                        ? "bg-[#ffd700] text-[#0a0a0c] shadow-md"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    ไทย (Angsana New)
                  </button>
                </div>
              </div>

              {/* Render dynamic size items rules */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                  {t.fonts_spec_label}
                </span>

                <div className="space-y-3">
                  {typographyTranslations[appLanguage][typoLang].items.map((item, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border ${sBorder} ${sInner}`}>
                      <div className={`text-xs font-extrabold ${sTextPrimary}`}>{item.rule}</div>
                      <p className={`text-xs ${sTextMuted} mt-1`}>{item.desc}</p>
                      {item.example && (
                        <div className={`mt-2 text-[10px] font-mono pad-2 rounded border focus:outline-none ${sBorder} bg-black/20 p-2 text-zinc-400 overflow-x-auto whitespace-pre-line`}>
                          {item.example}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Interactive live sandbox canvas */}
            <ScrollReveal direction="right" className={`lg:col-span-8 p-6 rounded-2xl border ${sBorder} ${sCard} space-y-6 flex flex-col justify-between`} delay={0.25}>
              
              <div className="space-y-1">
                <h4 className={`font-serif text-lg font-bold ${sTextPrimary}`}>
                  {t.sandbox_title}
                </h4>
                <p className={`text-xs ${sTextMuted}`}>
                  {t.sandbox_desc}
                </p>
              </div>

              {/* Physical interactive paper simulator */}
              <div className="bg-white border border-slate-300 shadow-2xl rounded p-6 text-slate-800 space-y-6 select-none font-serif relative">
                
                {/* 1. Chapter Title Box */}
                <div className="text-center space-y-1 relative group border border-dashed border-slate-200 p-2 rounded">
                  <div className="absolute right-1 -top-2 text-[8px] font-mono uppercase bg-slate-100 text-slate-500 rounded px-1 group-hover:block">
                    {t.sandbox_align_center}
                  </div>
                  <h2 className="text-sm font-bold tracking-tight uppercase" style={{ fontFamily: typoLang === 0 ? "Times New Roman" : "Sarabun" }}>
                    {typoLang === 0 ? t.sandbox_header_en : t.sandbox_header_th}
                  </h2>
                </div>

                {/* 2. Subheading Box */}
                <div className="text-left relative group border border-dashed border-slate-200 p-2 rounded">
                  <div className="absolute right-1 -top-2 text-[8px] font-mono uppercase bg-slate-100 text-slate-500 rounded px-1">
                    {t.sandbox_align_left}
                  </div>
                  <h3 className="text-xs font-bold" style={{ fontFamily: typoLang === 0 ? "Times New Roman" : "Sarabun" }}>
                    {typoLang === 0 ? t.sandbox_subheading_en : t.sandbox_subheading_th}
                  </h3>
                </div>

                {/* 3. Textarea mock up paper context */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-450 block font-bold">
                    {t.sandbox_textarea_desc}
                  </label>
                  <textarea
                    rows={6}
                    value={customTypoText}
                    onChange={(e) => setCustomTypoText(e.target.value)}
                    style={{
                      fontFamily: typoLang === 0 ? "Times New Roman" : "Sarabun",
                      fontSize: typoLang === 0 ? "13px" : "15px",
                      lineHeight: typoLang === 0 ? "1.6" : "1.2"
                    }}
                    className="w-full bg-[#f8fafc] border border-slate-250 p-4 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>
              </div>

              {/* Safety alert advice footer */}
              <div className={`p-4 rounded-xl border ${sBorder} ${sInner} space-y-1`}>
                <h5 className={`text-xs font-bold ${sTextPrimary}`}>
                  🛡️ {t.fonts_info_title}
                </h5>
                <p className={`text-[11px] ${sTextMuted} leading-relaxed`}>
                  {t.fonts_info_text}
                </p>
              </div>

            </ScrollReveal>

          </div>
        )}

        {/* -------------------- TAB: PAGING -------------------- */}
        {activeTab === "paging" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Left specifications list */}
            <ScrollReveal direction="left" className={`lg:col-span-5 p-6 rounded-2xl border ${sBorder} ${sCard} space-y-6`} delay={0.1}>
              <div>
                <h3 className={`font-serif text-lg font-bold ${sTextPrimary}`}>
                  {t.paging_title}
                </h3>
                <p className={`text-xs ${sTextMuted} mt-1 leading-relaxed`}>
                  {t.paging_desc}
                </p>
              </div>

              <div id="paging-regulatory-items" className="space-y-4 pt-4 border-t border-white/5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block font-mono">
                  {t.paging_placement_rules}
                </span>

                <div className="space-y-4">
                  {pageNumberTranslations[appLanguage].map((item, idx) => (
                    <div key={idx} className={`pb-4 border-b ${sBorderSubtle} last:border-b-0 space-y-1`}>
                      <div className={`text-xs font-bold ${sTextPrimary}`}>{item.rule}</div>
                      <p className={`text-xs ${sTextMuted} leading-relaxed`}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right structural preview maps */}
            <ScrollReveal direction="right" className={`lg:col-span-7 p-6 rounded-2xl border ${sBorder} ${sCard} space-y-6 flex flex-col justify-between`} delay={0.25}>
              
              <div className="space-y-1">
                <h4 className={`font-serif text-lg font-bold ${sTextPrimary}`}>
                  {t.paging_preview_header}
                </h4>
                <p className={`text-xs ${sTextMuted}`}>
                  {t.paging_preview_desc}
                </p>
              </div>

              {/* Dynamic canvas simulating paper with numbering tags positions */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Odd Page (Page 3) */}
                <div className={`border ${sBorder} rounded-xl ${sInner} p-4 font-mono text-[10px] space-y-3 relative overflow-hidden`}>
                  <div className="absolute right-0.5 top-0.5 bg-[#ffd700]/10 text-[#ffd700] px-1.5 py-0.5 font-bold rounded text-[8px] tracking-wider uppercase border border-[#ffd700]/25">Odd</div>
                  <div className="text-[9px] text-[#ffd750] font-bold border-b border-white/5 pb-1 flex justify-between items-center">
                    <span className="text-zinc-400 font-mono">Odd numbered page</span>
                    <span className="text-[#ffd700] bg-[#ffd700]/15 border border-[#ffd700]/30 px-1 rounded">" 3 "</span>
                  </div>
                  <div className="text-[8px] text-zinc-500 text-right font-bold pr-0 whitespace-nowrap">
                    🚩 Top 0.5 inches & Right 1.0 inch
                  </div>
                  <div className={`h-10 border border-dashed ${sBorder} rounded flex flex-col justify-center gap-1.5 p-1.5`}>
                    <div className="h-1.5 w-full bg-zinc-800 rounded"></div>
                    <div className="h-1.5 w-[90%] bg-zinc-800 rounded"></div>
                  </div>
                </div>

                {/* Even Page (Page 4) */}
                <div className={`border ${sBorder} rounded-xl ${sInner} p-4 font-mono text-[10px] space-y-3 relative overflow-hidden`}>
                  <div className="absolute right-0.5 top-0.5 bg-[#00e1ff]/10 text-[#00e1ff] px-1.5 py-0.5 font-bold rounded text-[8px] tracking-wider uppercase border border-[#00e1ff]/20">Even</div>
                  <div className="text-[9px] text-[#00e1ff] font-bold border-b border-white/5 pb-1 flex justify-between items-center">
                    <span className="text-[#ffd700] bg-[#ffd700]/10 border border-[#ffd700]/30 px-1 rounded">" 4 "</span>
                    <span className="text-zinc-400 font-mono">Even numbered page</span>
                  </div>
                  <div className="text-[8px] text-zinc-500 text-left font-bold pl-0 whitespace-nowrap">
                    🚩 Top 0.5 inches & Left 1.0 inch
                  </div>
                  <div className={`h-10 border border-dashed ${sBorder} rounded flex flex-col justify-center gap-1.5 p-1.5`}>
                    <div className="h-1.5 w-full bg-zinc-800 rounded"></div>
                    <div className="h-1.5 w-[85%] bg-zinc-800 rounded"></div>
                  </div>
                </div>

              </div>

              {/* Crucial Advisory block */}
              <div className="bg-rose-500/5 border border-rose-500/25 rounded-xl p-4 text-xs text-rose-200 leading-relaxed shadow-sm">
                <strong>{t.paging_alert_title}</strong> 
                <p className="mt-1 leading-normal">
                  {t.paging_alert_text}
                </p>
              </div>

            </ScrollReveal>

          </div>
        )}

        {/* -------------------- TAB: CITATIONS -------------------- */}
        {activeTab === "citations" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Left controller sidebar */}
            <ScrollReveal direction="left" className={`lg:col-span-4 p-6 rounded-2xl border ${sBorder} ${sCard} space-y-5`} delay={0.1}>
              <div>
                <h3 className={`font-serif text-lg font-bold ${sTextPrimary}`}>
                  {t.citations_title}
                </h3>
                <p className={`text-xs ${sTextMuted} mt-1 leading-relaxed`}>
                  {t.citations_desc}
                </p>
              </div>

              {/* Toggle APA vs Vancouver */}
              <div className={`flex rounded-xl p-1 gap-1 border ${sBorder} ${sInner}`}>
                <button
                  type="button"
                  onClick={() => {
                    setCitationSystem("apa");
                    setSelectedCiteType(0);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                    citationSystem === "apa"
                      ? "bg-[#ffd700] text-[#0a0a0c] shadow-md"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  APAC Style (Chapter 5)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCitationSystem("vancouver");
                    setSelectedCiteType(0);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                    citationSystem === "vancouver"
                      ? "bg-[#ffd700] text-[#0a0a0c] shadow-md"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  Vancouver Style
                </button>
              </div>

              {/* Source lists dropdown category */}
              <div className="space-y-1 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                  {t.citations_source_label}
                </span>
                <div className="flex flex-col gap-1.5">
                  {(citationSystem === "apa" ? inlineCitationsData.apa.referenceForming : inlineCitationsData.vancouver.referenceForming).map((v, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => {
                        setSelectedCiteType(i);
                        setCopyExampleIdx(null);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                        selectedCiteType === i
                          ? "bg-[#ffd700]/10 border-[#ffd700] text-[#ffd700]"
                          : `${sInner} text-zinc-400 hover:bg-zinc-800/10`
                      }`}
                    >
                      {v.type}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right main visualization / sandbox copy section */}
            <ScrollReveal direction="right" className={`lg:col-span-8 p-6 rounded-2xl border ${sBorder} ${sCard} space-y-6`} delay={0.25}>
              
              <div className={`flex items-center gap-2 border-b ${sBorderSubtle} pb-3 justify-between`}>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <h4 className={`font-serif text-lg font-bold ${sTextPrimary} leading-none`}>
                    {citationSystem === "apa" ? t.citations_apa_badge : t.citations_vancouver_badge}
                  </h4>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-[#ffd700]/10 border border-[#ffd700]/20 text-[#ffd700] font-mono rounded font-semibold uppercase tracking-wider">
                  {t.formatting_standard_badge}
                </span>
              </div>

              {/* Description of sub selected option */}
              <div className={`p-4 rounded-xl border ${sBorder} ${sInner} text-xs leading-relaxed`}>
                <strong>{t.citations_rule_label}</strong>
                <p className={`mt-1 ${sTextMuted}`}>
                  {t.citations_rule_desc}
                </p>
              </div>

              {/* Selected Cite Type details */}
              <div className="space-y-4">
                
                {/* 1. Cite formatting rule template card */}
                <div className={`rounded-xl border ${sBorder} ${sInner} p-5 shadow-inner relative`}>
                  <div className={`text-zinc-300 rounded-md text-[8px] font-bold px-2 py-0.5 tracking-wider uppercase absolute left-5 -top-2 border ${sBorder} ${sInner}`}>
                    {t.citation_template_title}
                  </div>
                  <div className={`mt-2 text-xs font-bold font-mono tracking-wide leading-relaxed p-3 rounded-lg border ${sBorder} bg-black/20`}>
                    {(citationSystem === "apa" ? inlineCitationsData.apa.referenceForming : inlineCitationsData.vancouver.referenceForming)[selectedCiteType].format}
                  </div>
                </div>

                {/* 2. Concrete Copyable Example section */}
                <div className={`rounded-xl border border-[#ffd700]/20 ${sInner} p-5 shadow-inner relative`}>
                  <div className="bg-[#ffd700] text-[#0a0a0c] rounded-md text-[8px] font-bold px-2 py-0.5 tracking-wider uppercase absolute left-5 -top-2">
                    {t.citation_example_title}
                  </div>
                  <div className={`mt-2 text-xs font-bold leading-relaxed font-serif tracking-wide bg-black/20 p-3.5 rounded-lg border ${sBorder} relative group`}>
                    {(citationSystem === "apa" ? inlineCitationsData.apa.referenceForming : inlineCitationsData.vancouver.referenceForming)[selectedCiteType].example}
                    
                    <button
                      type="button"
                      onClick={() => copyToClipboard(
                        (citationSystem === "apa" ? inlineCitationsData.apa.referenceForming : inlineCitationsData.vancouver.referenceForming)[selectedCiteType].example, 
                        selectedCiteType
                      )}
                      className="absolute right-2 top-2 p-1.5 rounded-lg border border-white/5 text-[#ffd700] hover:bg-[#ffd700] hover:text-[#0a0a0c] transition duration-150 cursor-pointer"
                      title="Copy example to clipboard"
                    >
                      {copySuccess === selectedCiteType ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  
                  {copySuccess === selectedCiteType && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-[10px] text-emerald-400 font-bold mt-1.5 flex items-center gap-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> {t.ready_to_paste}
                    </motion.div>
                  )}
                </div>

                {/* 3. In-text rules cheat sheets summary */}
                <div className={`border ${sBorder} rounded-xl p-5 ${sInner}`}>
                  <h5 className={`text-xs font-extrabold ${sTextPrimary} uppercase tracking-wider mb-2`}>
                    {t.intext_rules_header}
                  </h5>
                  
                  {citationSystem === "apa" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {inlineCitationsData.apa.rules.map((v, i) => {
                        const localKey = v.value as keyof typeof citationRulesTranslations["en"];
                        const translatedRule = citationRulesTranslations[appLanguage][localKey] || { title: v.title, details: v.details };
                        return (
                          <div key={i} className={`text-xs p-3 rounded-lg border ${sBorder} bg-black/10 space-y-1.5`}>
                            <div className={`font-bold ${sTextPrimary}`}>{translatedRule.title}</div>
                            <p className={`${sTextMuted} text-[11px] leading-relaxed`}>{translatedRule.details}</p>
                            <div className="mt-1 space-y-1">
                              {v.examples?.map((ex, j) => (
                                <div key={j} className={`text-[10px] font-mono bg-black/35 p-1.5 rounded border ${sBorder} flex justify-between gap-1 overflow-x-auto`}>
                                  <span className="font-sans font-semibold text-zinc-400">{ex.type}:</span>
                                  <span className="text-zinc-200 text-right">{ex.code}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inlineCitationsData.vancouver.rules.map((rule, idx) => {
                        const localKey = (idx === 0 ? "vancouver_intext" : "vancouver_list") as keyof typeof citationRulesTranslations["en"];
                        const translatedRule = citationRulesTranslations[appLanguage][localKey] || { title: rule.title, details: rule.details };
                        return (
                          <div key={idx} className={`p-3 rounded-lg border ${sBorder} bg-black/10 space-y-1 flex flex-col md:flex-row md:items-center justify-between gap-2`}>
                            <div className="flex-1">
                              <div className={`font-bold text-xs ${sTextPrimary}`}>{translatedRule.title}</div>
                              <p className={`text-[11px] ${sTextMuted} leading-relaxed`}>{translatedRule.details}</p>
                            </div>
                            <div className="flex flex-col gap-1 min-w-[200px]">
                              {rule.examples.map((ex, idxEx) => (
                                <div key={idxEx} className={`text-[9.5px] font-mono p-1 bg-black/35 border ${sBorder} rounded text-zinc-500 flex justify-between`}>
                                  <span className="font-sans font-bold">{ex.type}:</span>
                                  <span className="text-zinc-200 font-semibold">{ex.code}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>

              </div>

            </ScrollReveal>

          </div>
        )}

        {/* -------------------- TAB: ASSEMBLER -------------------- */}
        {activeTab === "assembler" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Progress and instructions */}
            <ScrollReveal direction="left" className={`lg:col-span-4 p-6 rounded-2xl border ${sBorder} ${sCard} space-y-5 flex flex-col justify-between`} delay={0.1}>
              <div>
                <h3 className={`font-serif text-lg font-bold ${sTextPrimary}`}>
                  {t.assembler_heading_title}
                </h3>
                <p className={`text-xs ${sTextMuted} mt-1 leading-relaxed`}>
                  {t.assembler_heading_desc}
                </p>

                {/* Progress bar container */}
                <div className={`mt-5 border ${sBorder} rounded-xl p-4 space-y-2 bg-black/25`}>
                  <div className={`flex justify-between text-xs font-bold ${sTextPrimary}`}>
                    <span>{t.assembler_progress}</span>
                    <span className="text-[#ffd700]">{progress.percent}%</span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full overflow-hidden bg-black/25 border ${sBorder}`}>
                    <div 
                      className="h-full bg-[#ffd700] rounded-full transition-all duration-300"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                  <div className={`text-[10px] ${sTextMuted} font-semibold text-right font-mono`}>
                    {progress.text}
                  </div>
                  {progress.percent === 100 && (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-[11px] text-yellow-100 font-bold bg-[#ffd700]/10 border border-[#ffd700]/20 p-2.5 rounded-lg text-center mt-2"
                    >
                      {t.assembler_complete}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Reset state helper */}
              <button
                type="button"
                onClick={() => {
                  setCheckedSteps({});
                  localStorage.removeItem("kku_thesis_checklist");
                }}
                className={`w-full py-2 border ${sBorder} font-bold rounded-lg transition-colors duration-150 cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none text-xs ${
                  isDarkMode 
                    ? "bg-[#131317] text-zinc-350 hover:bg-zinc-800"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                }`}
              >
                <RotateCcw className="h-3.5 w-3.5" /> {t.assembler_reset}
              </button>
            </ScrollReveal>

            {/* List sequence details and accordion */}
            <ScrollReveal direction="right" className="lg:col-span-8 space-y-3" delay={0.25}>
              
              {assembleSteps.map((step, idx) => {
                const isChecked = !!checkedSteps[step.id];
                const isExpanded = expandedStep === step.id;
                const localTexts = getStepText(step.id);
                
                return (
                  <div 
                    key={step.id} 
                    className={`rounded-2xl border transition duration-150 ${
                      isExpanded 
                        ? "border-[#ffd700] shadow-md shadow-[#ffd700]/5 bg-black/5" 
                        : `${sBorder} hover:border-[#ffd700]/30 shadow-lg ${sCard}`
                    }`}
                  >
                    
                    {/* Header bar triggers expanded */}
                    <div 
                      onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                      className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        
                        {/* Custom checkbox */}
                        <div 
                          onClick={(e) => toggleStepCheck(step.id, e)}
                          className={`h-5 w-5 rounded-md border flex items-center justify-center transition cursor-pointer flex-shrink-0 ${
                            isChecked
                              ? "bg-[#ffd700] border-[#ffd700] text-[#0a0a0c]"
                              : "border-white/20 bg-[#131317] hover:bg-zinc-900"
                          }`}
                        >
                          {isChecked && <Check className="h-3.5 w-3.5 font-bold" />}
                        </div>

                        <div className="font-mono text-zinc-650 text-xs font-bold leading-none">
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </div>

                        <div className="min-w-0">
                          <div className={`text-xs font-bold ${isChecked ? "text-zinc-500 line-through" : sTextPrimary}`}>
                            {localTexts.title}
                          </div>
                          {appLanguage !== "en" && (
                            <div className="text-[10px] text-zinc-500 mt-0.5">
                              {step.title}
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Right badge labels */}
                      <div className="flex items-center gap-2 flex-shrink-0 text-[9px] font-bold">
                        <span className={`px-2 py-0.5 rounded border uppercase ${
                          step.required 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                            : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        }`}>
                          {step.required ? t.step_req_yes : t.step_req_no}
                        </span>
                        <span className={`px-2 py-0.5 border text-zinc-350 rounded font-semibold uppercase tracking-wider ${sInner}`}>
                          {step.docPageSide === "single" ? "Single Page" : "Double Sided"}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-zinc-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-zinc-500" />
                        )}
                      </div>

                    </div>

                    {/* Collapsible content area */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className={`overflow-hidden border-t rounded-b-2xl ${sBorderSubtle} ${sInner}`}
                        >
                          <div className={`p-4 text-xs leading-relaxed space-y-2`}>
                            <p className="font-medium text-zinc-350">
                              {localTexts.details}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}

            </ScrollReveal>

          </div>
        )}
        
        {/* -------------------- TAB: ETHICS -------------------- */}
        {activeTab === "ethics" && (
          <div className="space-y-6 animate-fade-in">
            
            <ScrollReveal direction="up" delay={0.1}>
              <div className={`p-6 rounded-2xl border ${sBorder} ${sCard} flex flex-col md:flex-row md:items-center justify-between gap-6`}>
                <div className="space-y-1">
                  <h3 className={`font-serif text-xl font-bold ${sTextPrimary} flex items-center gap-2`}>
                    <ShieldCheck className="h-6 w-6 text-[#ffd700]" />
                    {t.ethics_title}
                  </h3>
                  <p className={`text-xs ${sTextMuted} leading-relaxed md:max-w-2xl`}>
                    {t.ethics_desc}
                  </p>
                </div>

                {/* Graphic stamp avatar illustration */}
                <div className={`flex-shrink-0 border ${sBorder} rounded-xl px-4 py-3 flex items-center gap-3 shadow-md ${sInner}`}>
                  <Cpu className="h-8 w-8 text-[#ffd700] animate-pulse" />
                  <div className="font-serif">
                    <div className="text-[10px] text-zinc-500 uppercase font-semibold">{t.ethics_responsible}</div>
                    <div className="text-xs font-bold text-kku-gold">{t.ethics_standards}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Structured articles lists grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ethicsTranslations[appLanguage].map((art, idx) => (
                <ScrollReveal key={idx} direction="up" delay={0.15 + (idx * 0.05)} className="h-full">
                  <div 
                    className={`rounded-2xl p-5 border h-full ${sBorder} shadow-lg transition duration-155 flex flex-col justify-between ${sCard}`}
                  >
                    <div className="space-y-3">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-[#ffd700]/10 text-[#ffd700] border border-[#ffd700]/25 font-bold text-xs select-none">
                        {art.id}
                      </span>
                      <div className="space-y-1">
                        <h4 className={`font-extrabold ${sTextPrimary} text-xs tracking-wider uppercase font-mono leading-tight`}>
                          {art.title}
                        </h4>
                      </div>
                      <p className={`text-xs ${sTextMuted} leading-relaxed pt-2.5 border-t ${sBorderSubtle}`}>
                        {art.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        )}
        
        {/* -------------------- TAB: DOWNLOADS -------------------- */}
        {activeTab === "downloads" && (
          <div className="space-y-6 animate-fade-in text-left">
            {/* Header intro panel */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className={`p-6 rounded-2xl border ${sBorder} ${sCard} flex flex-col md:flex-row md:items-center justify-between gap-6`}>
                <div className="space-y-1">
                  <h3 className={`font-serif text-xl font-bold ${sTextPrimary} flex items-center gap-2`}>
                    <FolderDown className="h-6 w-6 text-kku-gold" />
                    {t.downloads_title || "Official KKU Thesis Reference Files & Templates"}
                  </h3>
                  <p className={`text-xs ${sTextMuted} leading-relaxed md:max-w-2xl`}>
                    {t.downloads_desc || "Direct and secure downloads for the official KKU handbook files, pre-configured MS Word template drafts, and chapter reference examples."}
                  </p>
                </div>

                {/* Quick stats on files */}
                <div className={`flex-shrink-0 border ${sBorder} rounded-xl px-4 py-3 flex items-center gap-3 shadow-md ${sInner}`}>
                  <BookMarked className="h-8 w-8 text-[#ffd700]" />
                  <div className="font-serif">
                    <div className="text-[10px] text-zinc-500 uppercase font-semibold">10 Verified Sheets</div>
                    <div className="text-xs font-bold text-kku-gold">A4 PDF & Word Doc</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Filters and search controller */}
            <ScrollReveal direction="up" delay={0.15}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Category filters */}
                <div id="downloads-categories" className={`flex flex-wrap rounded-xl p-1 gap-1 border ${sBorder} ${sCard} self-start`}>
                  {[
                    { key: "all", label: t.downloads_cat_all || "All Files" },
                    { key: "handbook", label: t.downloads_cat_handbook || "Handbook & Templates" },
                    { key: "chapters", label: t.downloads_cat_chapters || "Chapters Guides" },
                    { key: "appendices", label: t.downloads_cat_appendices || "Appendix Elements" }
                  ].map((cat) => {
                    const isActive = downloadCategory === cat.key;
                    const count = cat.key === "all" 
                      ? downloadResources.length 
                      : downloadResources.filter(r => r.category === cat.key).length;

                    return (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => setDownloadCategory(cat.key)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition duration-150 cursor-pointer flex items-center gap-1.5 ${
                          isActive
                            ? "bg-[#ffd700] text-[#0a0a0c] shadow-md"
                            : `text-zinc-500 hover:text-white`
                        }`}
                      >
                        {cat.label}
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans font-bold ${
                          isActive 
                            ? "bg-[#0a0a0c]/10 text-[#0a0a0c]" 
                            : "bg-white/5 border border-white/10 text-zinc-400"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Search bar inside downloads */}
                <div className="relative w-full md:max-w-xs">
                  <span className="absolute inset-y-0 left-3 flex items-center text-zinc-500 pointer-events-none">
                    <Search className="h-3.5 w-3.5" />
                  </span>
                  <input
                    type="text"
                    value={downloadSearch}
                    onChange={(e) => setDownloadSearch(e.target.value)}
                    placeholder={t.downloads_search || "Search resources..."}
                    className={`w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#ffd700] font-sans ${
                      isDarkMode
                        ? "bg-[#131317] border-white/10 text-white placeholder-zinc-500"
                        : "bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400"
                    }`}
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Resources List Cards */}
            {(() => {
              const query = downloadSearch.toLowerCase().trim();
              const filtered = downloadResources.filter((item) => {
                // Category filter
                if (downloadCategory !== "all" && item.category !== downloadCategory) {
                  return false;
                }
                // Text search filter
                if (query) {
                  const titleMatch = (item.title[appLanguage] || item.title["en"] || "").toLowerCase().includes(query) ||
                                     item.fileName.toLowerCase().includes(query);
                  const descMatch = (item.desc[appLanguage] || item.desc["en"] || "").toLowerCase().includes(query);
                  return titleMatch || descMatch;
                }
                return true;
              });

              if (filtered.length === 0) {
                return (
                  <div className={`p-12 rounded-2xl border text-center ${sBorder} ${sCard} space-y-3`}>
                    <div className="mx-auto h-12 w-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                      <HelpCircle className="h-6 w-6" />
                    </div>
                    <p className={`text-xs ${sTextMuted}`}>
                      {t.downloads_no_results || "No resources match your query."}
                    </p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filtered.map((resource, fIdx) => {
                    const rTitle = resource.title[appLanguage] || resource.title["en"];
                    const rDesc = resource.desc[appLanguage] || resource.desc["en"];
                    const isPDF = resource.format === "PDF";

                    return (
                      <ScrollReveal key={resource.id} direction="up" delay={0.2 + (fIdx * 0.05)} className="h-full">
                        <div
                          className={`p-5 rounded-2xl border h-full ${sBorder} ${sCard} shadow-lg flex flex-col justify-between transition-all duration-150 hover:scale-[1.01]`}
                        >
                          <div className="space-y-3">
                            {/* Top Row branding and meta details */}
                            <div className="flex items-center justify-between">
                              <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                                resource.category === "handbook" 
                                  ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                                  : resource.category === "chapters"
                                    ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
                                    : "bg-emerald-500/10 border border-emerald-500/10 text-emerald-400"
                              }`}>
                                {resource.category === "handbook" ? (t.downloads_cat_handbook || "Handbook") : resource.category === "chapters" ? (t.downloads_cat_chapters || "Chapters") : (t.downloads_cat_appendices || "Appendix")}
                              </span>

                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] uppercase font-bold font-mono px-1.5 py-0.5 rounded leading-none ${
                                  isPDF 
                                    ? "bg-rose-500/15 text-rose-400 border border-rose-500/25" 
                                    : "bg-cyan-500/15 text-cyan-400 border border-cyan-500/25"
                                }`}>
                                  {resource.format}
                                </span>
                                <span className="text-[10px] font-mono font-bold text-zinc-500">
                                  {resource.fileSize}
                                </span>
                              </div>
                            </div>

                            {/* Resource Name and Description */}
                            <div className="space-y-1.5 text-left">
                              <h4 className={`font-serif text-sm font-extrabold ${sTextPrimary}`}>
                                {rTitle}
                              </h4>
                              <p className="font-mono text-[10px] text-[#ffd700]/75 truncate">
                                {resource.fileName}
                              </p>
                              <p className={`text-xs ${sTextMuted} leading-relaxed pt-2 border-t ${sBorderSubtle}`}>
                                {rDesc}
                              </p>
                            </div>
                          </div>

                          {/* Action buttons footer inside card */}
                          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                            <span className="text-[9px] text-zinc-500 font-mono italic">
                              Supabase Cloud Link
                            </span>

                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-[#ffd700] text-[#0a0a0c] hover:bg-[#e6c200] transition cursor-pointer shadow-sm select-none"
                              referrerPolicy="no-referrer"
                            >
                              <Download className="h-3.5 w-3.5" />
                              {t.downloads_btn || "Download File"}
                            </a>
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              );
            })()}

            {/* Note alert callout */}
            <div className={`p-4 rounded-xl border ${sBorder} ${sInner} text-xs leading-relaxed text-zinc-400 text-left`}>
              <p className="font-medium">
                {t.downloads_note || "💡 Download Notice: These resources are hosted securely on a public storage bucket in Supabase. You can click to open and download them directly inside your browser without any configuration."}
              </p>
            </div>
          </div>
        )}
        
      </main>

      {/* Unofficial Instructions and disclaimer footer */}
      <footer id="footer-section" className={`border-t ${sBorder} py-10 mt-12 bg-black/35 text-center`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className={`flex justify-center items-center gap-1.5 ${sTextPrimary} font-serif text-base font-bold`}>
            <Sparkles className="h-5 w-5 text-kku-gold animate-pulse" /> KKU Postgraduate Thesis Formatting Guide
          </div>
          <p className="max-w-2xl mx-auto text-xs leading-relaxed text-zinc-500">
            {t.unofficial_desc}
          </p>
          <div className="flex wrap justify-center gap-4 text-[11px] font-semibold text-zinc-400 pt-1">
            <a href="https://gs.kku.ac.th" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#ffd700] transition duration-100 text-kku-gold">
              Official KKU Graduate School <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-zinc-600">•</span>
            <span>{t.all_rights}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
