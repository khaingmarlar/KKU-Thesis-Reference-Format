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
  HelpCircle,
  Clock
} from "lucide-react";

import {
  marginData,
  typographyData,
  pageNumberRules,
  assembleSteps,
  ethicsArticles,
  inlineCitationsData,
  AssembleStep
} from "./data/thesisData";

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<string>("margins");

  // Margin visualizer states
  const [marginPageType, setMarginPageType] = useState<"odd" | "even">("odd");
  const [selectedMarginGuide, setSelectedMarginGuide] = useState<string>("left");

  // Typography state
  const [typoLang, setTypoLang] = useState<number>(0); // 0 for English, 1 for Thai
  const [customTypoText, setCustomTypoText] = useState<string>(
    "This is an interactive typography preview. You can type anything here to see how proper line height, font size, and spacing feel under the Khon Kaen University official formatting handbook regulations."
  );

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
    let response = "";

    if (query.includes("margin") || query.includes("ဘေးသား") || query.includes("လက်မ")) {
      response = "📌 Margins (ဘေးသားသတ်မှတ်ချက်) အကျဉ်းချုပ်- မဂဏန်းစာမျက်နှာများတွင် ခေါင်းပုံနှိပ်ခေါင်ချုပ်ရန် ဘယ်ဘက် (Left) 1.5 လက်မ၊ အပေါ်ဘက် (Top) 1.5 လက်မ၊ ညာဘက် (Right) 1.0 လက်မ နှင့် အောက်ခြေ (Bottom) 1.0 လက်မ ချန်ရပါမည်။ စုံဂဏန်းစာမျက်နှာများတွင် ညာဘက် (Right) 1.5 လက်မ၊ ဘယ်ဘက် (Left) 1.0 လက်မ၊ အပေါ် 1.5 လက်မ နှင့် အောက်ခြေ 1.0 လက်မ ဖြစ်သည်။ 'Margins' tab တွင် အသေးစိတ် ဝင်ရောက်ကြည့်ရှုပါ။";
    } else if (query.includes("font") || query.includes("စာလုံး") || query.includes("နံပါတ်") || query.includes("size")) {
      response = "📌 Fonts (စာလုံးအရွယ်အစား) အကျဉ်းချုပ်- အင်္ဂလိပ်ကျမ်းစာအုပ်ဖြစ်ပါက Times New Roman စာလုံးပုံစံ အသုံးပြုရမည်ဖြစ်ပြီး၊ သာမန်စာကိုယ်အတွက် Size 12 (Regular), ခေါင်းစဉ်ခွဲအတွက် Size 12-14 (Bold)၊ အခန်းခေါင်းစဉ်အတွက် Size 14 (Bold) သတ်မှတ်ရပါမည်။ ထိုင်းကျမ်းဖြစ်ပါက Angsana New (Body: 14-16, Title: 18 Bold) အသုံးပြုရပါမည်။ 'Typography' tab ကို နှိပ်ပါ။";
    } else if (query.includes("apa") || query.includes("vancouver") || query.includes("ကိုးကား") || query.includes("cite")) {
      response = "📌 Citations (ကိုးကားရင်းမြစ်ပြာ) အကျဉ်းချုပ်- လူမှုရေးနှင့်ဝိဇ္ဇာကျမ်းပြုသူများသည် First format (APA style) ကို အဓိက အသုံးပြုကြပြီး၊ သိပ္ပံနှင့်နည်းပညာကျမ်းပြုသူများသည် Second format (Vancouver style) ကို သုံးကြသည်။ 'Citations' tab အောက်ရှိ builder တွင် template နှင့် example များကို တိုက်ရိုက်ကူးယူ အသုံးပြုပါ။";
    } else if (query.includes("hidden") || query.includes("ဖျောက်") || query.includes("pagenumber")) {
      response = "📌 Hidden Page Numbers စည်းမျဉ်း- အခန်းတစ်ခုစီ၏ အစဦးဆုံးပထမမျက်နှာစာ (Page 1) များ၊ References စာမျက်နှာပထမစာမျက်နှာနှင့် Appendices ဖုံးများတွင် စာမျက်နှာနံပါတ် တွက်ချက်သွားသော်လည်း အပြင်စာသားတွင် နံပါတ်ရိုက်နှိပ်ဖော်ပြခြင်းကို သိသိသာသာဖျောက်ရပါမည်။ 'Paging' Tab တွင် အစီအစဉ်အပြည့်အစုံဖော်ပြထားသည်။";
    } else if (query.includes("cover") || query.includes("အရောင်") || query.includes("navy") || query.includes("black")) {
      response = "📌 Cover Colors (ကျမ်းအဖုံးအရောင်သတ်မှတ်ချက်)- မဟာဘွဲ့ (Master's) ကျမ်းများအတွက် Navy Blue (အပြာရင့်ရောင်) နှင့် ပါရဂူဘွဲ့ (PhD) ကျမ်းများအတွက် Black (အနက်ရောင်) မာကြောသော အပြင်သားရေဖုံး (Hardcover) ကိုသာ အသုံးပြုချုပ်လုပ်ရပါမည်။";
    } else {
      response = "🔍 ၎င်းရှာဖွေမှုအတွက် မနီးစပ်သော ဝေါဟာရဖြစ်နေပါသည်။ ကျေးဇူးပြု၍ 'Margins, Fonts, Citation, Chapter, Cover, Hidden' စသည့် ဘွဲ့လွန်ကျမ်းဆိုင်ရာ အဓိက သော့ချက်စကားလုံးများကို အင်္ဂလိပ်လို သို့မဟုတ် မြန်မာလို ရှာဖွေနိုင်ပါသည်။";
    }
    setCustomSearchResponse(response);
  };

  const getStepProgress = () => {
    const total = assembleSteps.length;
    const completed = assembleSteps.filter(s => checkedSteps[s.id]).length;
    return {
      percent: Math.round((completed / total) * 100),
      text: `${completed} / ${total} ခု ပြည့်စုံပြီးပါပြီ`
    };
  };

  const progress = getStepProgress();

  return (
    <div id="kku-thesis-app" className="min-h-screen bg-stone-50 font-sans text-slate-800 antialiased selection:bg-sichan-100 selection:text-sichan-500">
      
      {/* Dynamic Header Section */}
      <header id="header-section" className="relative border-b-4 border-kku-gold bg-sichan-500 py-10 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(143,47,26,0.4),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
            
            <div id="header-text" className="flex flex-col items-center text-center md:items-start md:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sichan-600 px-3 py-1 text-xs font-semibold tracking-wider text-kku-gold uppercase">
                <Sparkles className="h-3.5 w-3.5" /> Khon Kaen University Thesis Format Handbook
              </span>
              <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                KKU ကျမ်းပြုစုမှု လမ်းညွှန်ပြစနစ်
              </h1>
              <p className="mt-2 max-w-2xl text-base text-sichan-100">
                ဘွဲ့လွန်ကျောင်းသားများ (Master & Ph.D) အတွက် KKU ၏ အထူးစံနှုန်းသတ်မှတ်ချက်များကို မြန်မာလို တိကျလွယ်ကူစွာ နားလည်နိုင်ရန် စီစဉ်ဖော်ပြထားသော အပြန်အလှန်အထောက်အကူပြု လမ်းညွှန်ဝဘ်ဆိုဒ်။
              </p>
            </div>

            <div id="citation-badge" className="flex flex-col items-center rounded-2xl border border-sichan-600 bg-sichan-600/50 p-5 text-center min-w-[240px] shadow-inner backdrop-blur-xs">
              <Clock className="mb-1 h-5 w-5 text-kku-gold" />
              <div className="text-xs text-sichan-100 font-mono tracking-wider">လက်ရှိ နိုင်ငံ့စံနှုန်းအရ</div>
              <div className="mt-1 font-serif text-lg font-bold text-white">APA & Vancouver Rules</div>
              <div className="mt-0.5 text-xs text-emerald-400 font-medium">မြန်မာလို ပြီးပြည့်စုံစွာ ရှင်းလင်းထားသည်</div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Core View Area */}
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Interactive Search Tool & Notification */}
        <section id="search-section" className="mb-8 rounded-2xl bg-white p-6 shadow-md border border-slate-100">
          <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-slate-900">
            <Search className="h-5 w-5 text-sichan-500" />
            ကျမ်းဖွဲ့စည်းပုံနှင့် စည်းမျဉ်းများကို အမြန်ရှာဖွေရန်
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            ဥပမာ။ ။ <span className="font-mono text-sichan-500 cursor-pointer hover:underline" onClick={() => { setSearchQuery("margins"); }}>margins</span>, 
            {" "}<span className="font-mono text-xs text-sichan-500 cursor-pointer hover:underline" onClick={() => { setSearchQuery("citations"); }}>citations</span>, 
            or <span className="font-mono text-xs text-sichan-500 cursor-pointer hover:underline" onClick={() => { setSearchQuery("ethics"); }}>ethics</span> စသည်တို့ကို အင်္ဂလိပ်လို ရိုက်ထည့်၍ အမြန်ရှာဖွေကြည့်ပါ။
          </p>

          <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = form.elements.namedItem("searchQuery") as HTMLInputElement;
            const query = input.value.toLowerCase().trim();
            if (!query) return;
            
            // Basic custom response resolver
            const matchingResponse = (() => {
              if (query.includes("margin") || query.includes("ဘေးသား") || query.includes("inch") || query.includes("လက်မ")) {
                return "📌 Margins (ဘေးသားသတ်မှတ်ချက်) အကျဉ်းချုပ်- မဂဏန်းစာမျက်နှာများတွင် ခေါင်းပုံနှိပ်ခေါင်ချုပ်ရန် ဘယ်ဘက် (Left) 1.5 လက်မ၊ အပေါ်ဘက် (Top) 1.5 လက်မ၊ ညာဘက် (Right) 1.0 လက်မ နှင့် အောက်ခြေ (Bottom) 1.0 လက်မ ချန်ရပါမည်။ စုံဂဏန်းစာမျက်နှာများတွင် ညာဘက် (Right) 1.5 လက်မ၊ ဘယ်ဘက် (Left) 1.0 လက်မ၊ အပေါ် 1.5 လက်မ နှင့် အောက်ခြေ 1.0 လက်မ ဖြစ်သည်။ 'Margins' tab တွင် အသေးစိတ် ဝင်ရောက်ကြည့်ရှုပါ။";
              }
              if (query.includes("font") || query.includes("size") || query.includes("times") || query.includes("စာလုံး")) {
                return "📌 Fonts (စာလုံးအရွယ်အစား) အကျဉ်းချုပ်- အင်္ဂလိပ်ကျမ်းစာအုပ်ဖြစ်ပါက Times New Roman စာလုံးပုံစံ အသုံးပြုရမည်ဖြစ်ပြီး၊ သာမန်စာကိုယ်အတွက် Size 12 (Regular), ခေါင်းစဉ်ခွဲအတွက် Size 12-14 (Bold)၊ အခန်းခေါင်းစဉ်အတွက် Size 14 (Bold) သတ်မှတ်ရပါမည်။ 'Typography' tab ကို နှိပ်ပါ။";
              }
              if (query.includes("citation") || query.includes("cite") || query.includes("apa") || query.includes("vancouver") || query.includes("ကိုးကား")) {
                return "📌 Citations (ကိုးကားရင်းမြစ်ပြာ) အကျဉ်းချုပ်- လူမှုရေးနှင့်ဝိဇ္ဇาကျမ်းပြုသူများသည် First format (APA style) ကို အဓိက အသုံးပြုကြပြီး၊ သိပ္ပံနှင့်နည်းပညာကျမ်းပြုသူများသည် Second format (Vancouver style) ကို သုံးကြသည်။ 'Citations' tab အောက်ရှိ builder တွင် template နှင့် example များကို တိုက်ရိုက်ကူးယူ အသုံးပြုပါ။";
              }
              if (query.includes("hidden") || query.includes("ဖျောက်") || query.includes("pagenumber")) {
                return "📌 Hidden Page Numbers စည်းမျဉ်း- အခန်းတစ်ခုစီ၏ အစဦးဆုံးပထမမျက်နှာစာ (Page 1) များ၊ References စာမျက်နှာပထမစာမျက်နှာနှင့် Appendices ဖုံးများတွင် စာမျက်နှာနံပါတ် တွက်ချက်သွားသော်လည်း အပြင်စာသားတွင် နံပါတ်ရိုက်နှိပ်ဖော်ပြခြင်းကို သိသိသာသာဖျောက်ရပါမည်။ 'Paging' Tab တွင် အစီအစဉ်အပြည့်အစုံဖော်ပြထားသည်။";
              }
              if (query.includes("ethic") || query.includes("ကျင့်ဝတ်")) {
                return "📌 Researcher Ethics (ကျင့်ဝတ်စံနှုန်းများ)၊ ထိုင်းနိုင်ငံ သုတေသနကောင်စီ (National Research Council of Thailand) ၏ သတ်မှတ်ချက်အရ ၉ ခုမြောက်သော ကျင့်ဝတ်စည်းကမ်းစနစ်များကို စာသားအစုံအလင်အဖြစ် 'Ethics' Tab တွင် ဖတ်ရှုနိုင်ပါသည်။";
              }
              if (query.includes("appendix") || query.includes("နောက်ဆက်တွဲ")) {
                return "📌 Appendices Rule- နောက်ဆက်တွဲစာမျက်နှာများကို သီးခြားထည့်သွင်းရမည်ဖြစ်ပြီး၊ Appendices တစ်ခုချင်းစီ၏ ပထမဖုံးစာမျက်နှာတွင် စာမျက်နှာနံပါတ်များကို ရေတွက်သော်လည်း ဖျောက်ရမည်။";
              }
              return "🔍 မည်သည့်တိုက်ရိုက်အဖြေမျှ မကိုက်ညီသေးပါ။ Margins / Fonts / Citation စသည့် အဓိကအပိုင်းများကို သက်ဆိုင်ရာ Tab အလိုက် နှိပ်၍ အသေးစိတ် အလွယ်တကူ ရှာဖွေနိုင်ပါသည်။";
            })();
            setCustomSearchResponse(matchingResponse);
          }} className="mt-4 flex gap-2">
            <input
              type="text"
              name="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. margins, font size, APA, hidden, cover, etc..."
              className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-sichan-500 focus:bg-white focus:ring-2 focus:ring-sichan-500/20 focus:outline-hidden"
            />
            <button
              type="submit"
              className="rounded-xl bg-sichan-500 px-6 py-3 font-semibold text-sm text-white hover:bg-sichan-600 transition shadow-md shadow-sichan-500/10 cursor-pointer"
            >
              ရှာဖွေပါ
            </button>
          </form>

          {/* Collapsible search result pane */}
          <AnimatePresence>
            {customSearchResponse && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 relative">
                  <button 
                    onClick={() => setCustomSearchResponse(null)}
                    className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    ပိတ်ရန်
                  </button>
                  <p className="text-sm font-medium leading-relaxed pr-6 text-slate-700">
                    {customSearchResponse}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Highlight Stats Row */}
        <section id="stats-row" className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-xs">
            <div className="text-xs text-slate-400 font-semibold uppercase">စာရွက်ဆိုဒ် (Paper)</div>
            <div className="mt-1 font-serif text-lg font-bold text-slate-800">A4 (80 Grams)</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-xs">
            <div className="text-xs text-slate-400 font-semibold uppercase">Line Spacing (အကွာအဝေး)</div>
            <div className="mt-1 font-serif text-lg font-bold text-slate-800">1.5 lines (EN)</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-xs">
            <div className="text-xs text-slate-400 font-semibold uppercase">ကျမ်းအဖုံး (Hardcover)</div>
            <div className="mt-1 font-serif text-lg font-bold text-slate-800">Navy (M) / Black (PhD)</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-xs">
            <div className="text-xs text-slate-400 font-semibold uppercase">စာမျက်နှာအနားသတ်</div>
            <div className="mt-1 font-serif text-lg font-bold text-slate-800">Odd vs Even Dynamic</div>
          </div>
        </section>

        {/* Tab Selection Navigation */}
        <section id="tab-nav" className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          {[
            { id: "margins", label: "ဘေးပတ်ပတ်လည် (Margins)", icon: Layers },
            { id: "fonts", label: "စာလုံးစနစ် (Typography)", icon: Type },
            { id: "paging", label: "စာမျက်နှာနံပါတ် (Paging)", icon: Binary },
            { id: "citations", label: "ကိုးကားရင်းမြစ် (Citations)", icon: BookMarked },
            { id: "assembler", label: "ကျမ်းအုပ်စုစည်းပုံ (Assembler)", icon: CheckCircle2 },
            { id: "ethics", label: "သုတေသီကျင့်ဝတ် (Ethics)", icon: Scale }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  // Auto close any custom search result
                  setCustomSearchResponse(null);
                }}
                className={`
                  flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold text-xs transition duration-150 cursor-pointer
                  ${isSelected
                    ? "bg-sichan-500 text-white shadow-md shadow-sichan-500/10"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }
                `}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </section>

        {/* Core Tab Dynamic Visualizers */}

        {/* -------------------- TAB: MARGINS -------------------- */}
        {activeTab === "margins" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Interactive Simulator Side */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  ဘေးအနားသတ် အပြန်အလှန်အထောက်အကူပြု Simulator
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  အောက်ပါခလုတ်ကို နှိပ်၍ မဂဏန်း (Odd) နှင့် စုံဂဏန်း (Even) စာမျက်နှာများအကြား ချုပ်လုပ်ရန် (Binding spine) နေရာပြောင်းလဲပုံကို ကြည့်ပါ။
                </p>
              </div>

              {/* Selector switcher */}
              <div className="flex gap-2 my-4">
                <button
                  onClick={() => setMarginPageType("odd")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                    marginPageType === "odd"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  မဂဏန်း စာမျက်နှာ (Odd Page)
                </button>
                <button
                  onClick={() => setMarginPageType("even")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                    marginPageType === "even"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  စုံဂဏန်း စာမျက်နှာ (Even Page)
                </button>
              </div>

              {/* Visualized Paper Element */}
              <div className="relative border border-slate-200 bg-slate-100/70 p-6 md:p-8 rounded-xl flex items-center justify-center min-h-[360px] overflow-hidden">
                
                {/* Visual Page Representation */}
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="w-[280px] h-[340px] bg-white rounded-md shadow-lg border border-slate-350 relative p-4 flex flex-col justify-between overflow-hidden"
                >
                  
                  {/* Binding Stitch Texture Indicator */}
                  {marginPageType === "odd" ? (
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-indigo-50 border-r border-indigo-200 flex flex-col items-center justify-center gap-4 text-indigo-400 opacity-80" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, #e0e7ff 10px, #e0e7ff 20px)" }}>
                      <span className="text-[10px] font-bold text-indigo-700 font-mono tracking-wider rotate-90">BINDING (1.5\")</span>
                    </div>
                  ) : (
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-indigo-50 border-l border-indigo-200 flex flex-col items-center justify-center gap-4 text-indigo-400 opacity-80" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, #e0e7ff 10px, #e0e7ff 20px)" }}>
                      <span className="text-[10px] font-bold text-indigo-700 font-mono tracking-wider rotate-90">BINDING (1.5\")</span>
                    </div>
                  )}

                  {/* Header/Page Number space */}
                  <div className={`flex items-center text-[10px] text-slate-400 ${marginPageType === "odd" ? "justify-end pl-12" : "justify-start pr-12"}`}>
                    <span className="font-mono bg-amber-50 text-amber-700 border border-amber-100 px-1 py-0.5 rounded text-[8px] flex items-center gap-0.5">
                      {marginPageType === "odd" ? "Page 3 (Top-Right)" : "Page 4 (Top-Left)"}
                    </span>
                  </div>

                  {/* Main Content simulation */}
                  <div className={`flex-1 my-3 border border-dashed border-red-200 rounded flex flex-col gap-2 p-2 justify-center ${
                    marginPageType === "odd" ? "ml-9" : "mr-9"
                  }`}>
                    <div className="h-2 w-full bg-slate-200 rounded-full animate-pulse"></div>
                    <div className="h-2 w-[90%] bg-slate-200 rounded-full animate-pulse"></div>
                    <div className="h-2 w-full bg-slate-200 rounded-full animate-pulse"></div>
                    <div className="h-2 w-[80%] bg-slate-200 rounded-full animate-pulse"></div>
                    <div className="h-2 w-[85%] bg-slate-200 rounded-full animate-pulse"></div>
                  </div>

                  {/* Footer space */}
                  <div className="text-[8px] text-slate-300 font-mono text-center">
                    Bottom Margin: 1.0 inch
                  </div>

                </motion.div>

              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4 flex gap-3">
                <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Binding spine (စာအုပ်ချုပ်နည်းအနားသတ်)</strong> အဘယ်ကြောင့် အလှည့်ကျပြုလုပ်သနည်း။ ကျမ်းကို နှစ်ဖက် (Double-sided) ပုံနှိပ်ပါက စာအုပ်ချုပ်မည့်နေရာသည် odd/even စာရွက်များတွင် ဆန့်ကျင်ဘက်ဖြစ်နေလိမ့်မည်။ ထို့ကြောင့် ညာဘက်မျက်နှာစာဖြစ်သော မဂဏန်းတွင် ဘယ်ဘက်ကို ချုပ်လုပ်ရန် ၁.၅ လက်မ ချန်ပြီး၊ စုံဂဏန်းစာမျက်နှာများတွင် ညာဘက်ကို ၁.၅ လက်မ ချန်ရပါမည်။
                </p>
              </div>
            </div>

            {/* Specifications Description Side */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                  လက်ရှိသတ်မှတ်ချက်ဘေးသားများ (Selected: {marginPageType === "odd" ? "Odd Page (မဂဏန်း)" : "Even Page (စုံဂဏန်း)"})
                </h4>

                <div className="space-y-3">
                  {Object.entries(marginPageType === "odd" ? marginData.odd : marginData.even).map(([key, value]) => {
                    const isSelected = selectedMarginGuide === key;
                    return (
                      <div 
                        key={key}
                        onClick={() => setSelectedMarginGuide(key)}
                        className={`p-3.5 rounded-xl border transition cursor-pointer flex gap-4 ${
                          isSelected 
                            ? "bg-sichan-50/50 border-sichan-500 text-sichan-700" 
                            : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600"
                        }`}
                      >
                        <div className="font-mono text-xs font-bold h-7 w-7 rounded-lg bg-white border border-slate-350 flex items-center justify-center shadow-xs flex-shrink-0 text-slate-800 uppercase">
                          {key[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 flex justify-between">
                            <span>{value.label}</span>
                            <span className="font-serif bg-slate-900 text-white px-2 py-0.5 rounded text-[10px]">
                              {value.inch} inches ({value.cm} cm)
                            </span>
                          </p>
                          {isSelected && (
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs text-slate-600 mt-1.5 leading-relaxed"
                            >
                              {value.desc}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Paragraph clearance guidelines */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-serif text-lg font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                  အပိုဒ်နှင့် ခေါင်းစဉ်ကြား အကွာအဝေး စည်းမျဉ်းများ
                </h4>
                <ul className="space-y-3 text-xs md:text-sm text-slate-600 list-inside list-disc">
                  <li><strong>အခန်းခေါင်းစဉ်မှ အောက်ဆုံးအထိ:</strong> အခန်းကြီးတစ်ခုကို စာမျက်နှာအပေါ်ဆုံးအလယ်တွင် စာလုံးကြီးဖြင့် ရိုက်နှိပ်ပြီး၊ အောက်သို့ ၂ ကြောင်းစာ (2 blank lines) ချန်ပြီးမှ ပထမဦးဆုံး သီအိုရီ စာသားကို စတင်ဖော်ပြရမည်။</li>
                  <li><strong>ခေါင်းစဉ်အသစ်ကူးခြင်း:</strong> အကြောင်းအရာခေါင်းစဉ်ခွဲအသစ်တစ်ခုကို ဆက်ရေးပါက ယခင်အပိုဒ်၏ နောက်ဆုံးစာကြောင်းမှ အောက်အထိ စာကြောင်းလွတ်တစ်ကြောင်း (1 blank line) ခြားပေးရပါမည်။</li>
                  <li><strong>Indention (စာပိုဒ်အစ ၇ ချက်ကွက်):</strong> စာပိုဒ်တစ်ခုအစပြုတိုင်း စာအုပ်ဘယ်ဘက်အစပ်မှ ၆ ကွက် (6 letter spaces) ချန်လှပ်၍ ၇ ကွက်မြောက်၌ စတင်စာသားရိုက်ရပါမည်။</li>
                </ul>
              </div>
            </div>

          </div>
        )}

        {/* -------------------- TAB: TYPOGRAPHY -------------------- */}
        {activeTab === "fonts" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Left selector and parameters list */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                  ကျမ်းသုံးစာလုံးပုံစံနှင့် သတ်မှတ်ချက်များ
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  KKU စည်းမျဉ်းအရ သုတေသနကျမ်းကို မည်သည့်ဘာသာစကားဖြင့် ပြုစုတင်ပြသည်ပေါ် မူတည်၍ ဖောင့်စနစ် (Times New Roman သို့မဟုတ် Angsana) ကို အတိအကျ သီးခြားစီ ခွဲခြားအသုံးပြုရပါမည်။
                </p>

                {/* Slector pills */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setTypoLang(0)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg border transition ${
                      typoLang === 0
                        ? "bg-sichan-500 text-white border-sichan-500 shadow-md"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    English Thesis (TN Roman)
                  </button>
                  <button
                    onClick={() => setTypoLang(1)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg border transition ${
                      typoLang === 1
                        ? "bg-sichan-500 text-white border-sichan-500 shadow-md"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Thai Thesis (Angsana New)
                  </button>
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-xs uppercase text-slate-400 tracking-wider">
                  အသေးစိတ် စံနှုန်းအရွယ်အစားသတ်မှတ်ချက်များ
                </h4>

                <div className="space-y-3">
                  {typographyData[typoLang].items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-xs font-extrabold text-slate-800">{item.rule}</div>
                      <p className="text-xs text-slate-600 mt-1">{item.myanmarDesc}</p>
                      {item.example && (
                        <div className="mt-2 text-[11px] font-mono bg-white p-2 rounded border border-slate-100 text-slate-400 overflow-x-auto whitespace-pre-line">
                          {item.example}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Live Interaction Typography Sandbox */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
                  အပြန်အလှန်အထောက်အကူပြု Typography Sandbox
                </h3>
                <p className="text-xs text-slate-500">
                  အောက်ပါ သရုပ်ပြစာကိုယ်တွင် ရေးသားစမ်းသပ်၍ စာလုံးစံနှုန်း၊ စာကြောင်းအကွာအဝေး (Line Height) များကို KKU template အတိုင်း တိုက်ရိုက် ကြည့်နိုင်ပါသည်။
                </p>
              </div>

              {/* Interactive editor space */}
              <div className="my-5 flex-1 min-h-[300px] border border-slate-200 rounded-xl p-6 bg-stone-50 flex flex-col justify-between">
                
                {/* Heading representation */}
                <div className="border-b border-slate-200 pb-4 mb-4 text-center">
                  <h2 className={`font-bold text-slate-900 border-dashed border-sky-200 border p-1 rounded ${
                    typoLang === 0 
                      ? "font-serif text-[14pt]" 
                      : "font-thai text-[18pt]"
                  }`}>
                    {typoLang === 0 ? "CHAPTER I - INTRODUCTION (14pt TNR Bold)" : "บทที่ 1 - บทนำ (18pt Angsana Bold)"}
                  </h2>
                  <div className="text-[10px] text-sky-600 font-semibold mt-1 font-mono">Chapter Heading - Center Aligned</div>
                </div>

                {/* Subheading representation */}
                <div className="mb-4">
                  <h3 className={`font-bold text-slate-800 border-dashed border-emerald-250 border p-1 rounded max-w-fit ${
                    typoLang === 0 
                      ? "font-serif text-[12pt]" 
                      : "font-thai text-[16pt]"
                  }`}>
                    {typoLang === 0 ? "1.1 Rationale and Background (12pt Bold)" : "1.1 ความเป็นมาและความสำคัญ (16pt Bold)"}
                  </h3>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-1 font-mono">Section Subheading - Left Aligned</div>
                </div>

                {/* Text area editable content representation */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider font-mono">
                    Editable Body Content (Size Mock: {typoLang === 0 ? "TNR 12pt / 1.5 spacing" : "Angsana 14pt / Single"}):
                  </div>
                  <textarea
                    value={customTypoText}
                    onChange={(e) => setCustomTypoText(e.target.value)}
                    className={`w-full flex-1 rounded bg-transparent p-2 border-0 outline-hidden focus:ring-0 resize-none overflow-y-auto leading-relaxed border-dashed border-amber-250 border ${
                      typoLang === 0 
                        ? "font-serif text-[12pt] leading-[1.8]" 
                        : "font-thai text-[14pt] leading-normal"
                    }`}
                  />
                </div>

              </div>

              {/* Dynamic instruction box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-slate-600 flex gap-2">
                <Info className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <strong>ဖောင့်အားလုံး တပြေးညီအသုံးပြုနည်း</strong>
                  <p className="mt-1 leading-relaxed">
                    ကျမ်းတစ်အုပ်လုံး၏ စာမျက်နှာများအားလုံး (ခေါင်းစဉ်၊ ဇယား၊ နောက်ဆက်တွဲ၊ CV အထိ) ကို သတ်မှတ်ထားသော ဖောင့်တစ်မျိုးတည်းကိုသာ တိကျစွာ သုံးရပါမည်။ ဥပမာ- Times New Roman ကို ရောနှော၍ Arial, Calibri များနှင့် မရောနှောရပါ။
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* -------------------- TAB: PAGING -------------------- */}
        {activeTab === "paging" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                KKU ကျမ်းမျက်နှာ စာမျက်နှာနံပါတ်တပ်ခြင်း အစီအစဉ်များနှင့် လျှို့ဝှက်ချက်များ
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                ကျမ်းနမူနာများကို ကျမ်းစစ်အကြံပေးအဖွဲ့ထံ တင်သွင်းရာတွင် စာမျက်နှာနံပါတ်တပ်ပုံစနစ် မှားယွင်းမှုမှာ အဖြစ်အများဆုံး ကိစ္စရပ်တစ်ခု ဖြစ်သည်။ အောက်ပါစည်းမျဉ်းများကို သေသေချာချာ သတိပြုပါ။
              </p>
            </div>

            {/* Checklist elements of placement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-serif text-base font-bold text-slate-800 flex items-center gap-2">
                  <Binary className="h-5 w-5 text-sichan-500" />
                  စာမျက်နှာနံပါတ်တပ်ရန် နေရာသတ်မှတ်ခြင်း စည်းမျဉ်းများ
                </h4>
                
                <div className="space-y-4">
                  {pageNumberRules.items.map((item, idx) => (
                    <div key={idx} className="pb-4 border-b border-slate-100 last:border-b-0 space-y-1">
                      <div className="text-xs font-bold text-slate-900">{item.rule}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.myanmarDesc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphic Placement Simulator Preview */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-slate-800">
                    နံပါတ်နေရာချပုံ သရုပ်ပြ ပရိယာယ်
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    မဂဏန်းများတွင် ညာဘက်အပေါ်၊ စုံဂဏန်းများတွင် ဘယ်ဘက်အပေါ်သို့ စနစ်တကျ ပြောင်းလဲအသုံးပြုရပါမည်။
                  </p>
                </div>

                {/* Interactive paging boxes layout mockup */}
                <div className="grid grid-cols-2 gap-4 my-6">
                  
                  {/* Odd Page (Page 3) */}
                  <div className="border border-slate-200 rounded-xl bg-slate-50 p-4 font-mono text-[10px] space-y-3 relative overflow-hidden">
                    <div className="absolute right-0.5 top-0.5 bg-amber-50 text-amber-700 px-1.5 py-0.5 font-bold rounded text-[8px] tracking-wider uppercase border border-amber-200">Odd</div>
                    <div className="text-[9px] text-slate-400 font-bold border-b border-slate-200 pb-1 flex justify-between">
                      <span>Odd numbered page</span>
                      <span className="text-sichan-500 bg-sichan-50 border border-sichan-100 px-1 rounded">" 3 "</span>
                    </div>
                    <div className="text-[8px] text-slate-400 text-right font-bold pr-0 whitespace-nowrap">
                      🚩 Top 0.5 inches & Right 1.0 inch
                    </div>
                    <div className="h-10 border border-dashed border-slate-350 rounded flex flex-col justify-center gap-1.5 p-1.5">
                      <div className="h-1.5 w-full bg-slate-200 rounded"></div>
                      <div className="h-1.5 w-[80%] bg-slate-200 rounded"></div>
                    </div>
                  </div>

                  {/* Even Page (Page 4) */}
                  <div className="border border-slate-200 rounded-xl bg-slate-50 p-4 font-mono text-[10px] space-y-3 relative overflow-hidden">
                    <div className="absolute right-0.5 top-0.5 bg-sky-50 text-sky-700 px-1.5 py-0.5 font-bold rounded text-[8px] tracking-wider uppercase border border-sky-200">Even</div>
                    <div className="text-[9px] text-slate-400 font-bold border-b border-slate-200 pb-1 flex justify-between">
                      <span className="text-sichan-500 bg-sichan-50 border border-sichan-100 px-1 rounded">" 4 "</span>
                      <span>Even numbered page</span>
                    </div>
                    <div className="text-[8px] text-slate-400 text-left font-bold pl-0 whitespace-nowrap">
                      🚩 Top 0.5 inches & Left 1.0 inch
                    </div>
                    <div className="h-10 border border-dashed border-slate-350 rounded flex flex-col justify-center gap-1.5 p-1.5">
                      <div className="h-1.5 w-full bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-1.5 w-[85%] bg-slate-200 rounded"></div>
                    </div>
                  </div>

                </div>

                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-800 leading-relaxed">
                  <strong>🚨 ကနဦး အထူးသတိပြုရန် (Thesis Advisory Alert)-</strong> 
                  <p className="mt-1">
                    ဘွဲ့လွန်ကျောင်းစစ်ချက်များတွင် 'Chapter Heading' တပ်ထားသော ပထမဆုံး စာမျက်နှာများ၌ စာမျက်နှာနံပါတ် တမင်တကာ မတပ်ထားပါသော်လည်း စာမျက်နှာ စုစုပေါင်းရေတွက်မှုထဲတွင် ထည့်သွင်းစဉ်းစား ရေတွက်ရပါမည်။ ဥပမာ အခန်း ၁ စတင်သော စာမျက်နှာကို နံပါတ်မရိုက်ရဘဲ (သို့သော် စာမျက်နှာ ၁ ဟု သတ်မှတ်ထားပြီးဖြစ်သည်)၊ နောက်စာမျက်နှာကို ညာဘက်အပေါ်တွင် '၂' သို့မဟုတ် ဘယ်ဘက်အပေါ်တွင် '၂' ဟု သာမန်အတိုင်း တပ်ရပါမည်။
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* -------------------- TAB: CITATIONS -------------------- */}
        {activeTab === "citations" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Left controller sidebar */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  ကိုးကားစနစ် ထုတ်လုပ်မှုကူညီစနစ် (Citation Rules & Sandbox)
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  ဂုဏ်ပြုညွှန်းဆိုမှု ပုံစံဝဘ်ဆိုက်မှ တဆင့် လက်တွေ့ အကိုးအကားပုံစံများကို တိုက်ရိုက် ကြည့်နိုင်ပါသည်။
                </p>
              </div>

              {/* Toggle APA vs Vancouver */}
              <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                <button
                  onClick={() => {
                    setCitationSystem("apa");
                    setSelectedCiteType(0);
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                    citationSystem === "apa"
                      ? "bg-white text-sichan-500 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  APA Style (လူမှုရေး/ဝိဇ္ဇာ)
                </button>
                <button
                  onClick={() => {
                    setCitationSystem("vancouver");
                    setSelectedCiteType(0);
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                    citationSystem === "vancouver"
                      ? "bg-white text-sichan-500 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Vancouver Style (သိပ္ပံ/နည်းပညာ)
                </button>
              </div>

              {/* Source lists dropdown category */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">ရင်းမြစ်အမျိုးအစားကို ရွေးချယ်ပါ-</span>
                <div className="flex flex-col gap-1.5">
                  {(citationSystem === "apa" ? inlineCitationsData.apa.referenceForming : inlineCitationsData.vancouver.referenceForming).map((v, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedCiteType(i);
                        setCopyExampleIdx(null);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs font-semibold transition ${
                        selectedCiteType === i
                          ? "bg-sichan-50 border-sichan-500 text-sichan-700 font-bold"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                      }`}
                    >
                      {v.type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right main visualization / sandbox copy section */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <h4 className="font-serif text-lg font-bold text-slate-900 leading-none">
                    {citationSystem === "apa" ? inlineCitationsData.apa.title : inlineCitationsData.vancouver.title}
                  </h4>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-slate-900 text-white font-mono rounded font-semibold uppercase tracking-wider">
                  Formatting Standard Booked
                </span>
              </div>

              {/* Description of sub selected option */}
              <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100 text-xs text-slate-700 leading-relaxed">
                <strong>💡 ကိုးကားရန် သတ်မှတ်ချက်ပုံစံ-</strong>
                <p className="mt-1">
                  အဓိက သုတေသီ၏ အချက်အလက်များ၊ စာစောင်အမျိုးအစားအလိုက် စာရင်းပြုစုရာတွင် ထောင့်ကွေးလက်သည်းကွင်း၊ ကော်မာနှင့် Bold စာလုံးပုံစံများကို တသဝေမတိမ်း လိုက်နာရပါမည်။
                </p>
              </div>

              {/* Selected Cite Type details */}
              <div className="space-y-4">
                
                {/* 1. Cite formatting rule template card */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs relative">
                  <div className="bg-slate-900 text-white rounded-md text-[8px] font-bold px-2 py-0.5 tracking-wider uppercase absolute left-5 -top-2">
                    ကိုးကားရင်းမြစ် ပုံစံခွက် (Template Format)
                  </div>
                  <div className="mt-2 text-xs font-bold text-slate-900 font-mono tracking-wide leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                    {(citationSystem === "apa" ? inlineCitationsData.apa.referenceForming : inlineCitationsData.vancouver.referenceForming)[selectedCiteType].format}
                  </div>
                </div>

                {/* 2. Concrete Copyable Example section */}
                <div className="rounded-xl border border-sichan-500 bg-white p-5 shadow-sm relative">
                  <div className="bg-sichan-500 text-white rounded-md text-[8px] font-bold px-2 py-0.5 tracking-wider uppercase absolute left-5 -top-2">
                    လက်တွေ့နမူနာ (Real Output Sample)
                  </div>
                  <div className="mt-2 text-xs font-bold text-slate-800 leading-relaxed font-serif tracking-wide bg-sichan-50/20 p-3.5 rounded-lg border border-sichan-100/50 relative group">
                    {(citationSystem === "apa" ? inlineCitationsData.apa.referenceForming : inlineCitationsData.vancouver.referenceForming)[selectedCiteType].example}
                    
                    <button
                      onClick={() => copyToClipboard(
                        (citationSystem === "apa" ? inlineCitationsData.apa.referenceForming : inlineCitationsData.vancouver.referenceForming)[selectedCiteType].example, 
                        selectedCiteType
                      )}
                      className="absolute right-2 top-2 p-1.5 rounded-lg bg-orange-50 border border-orange-100 text-sichan-500 hover:bg-sichan-500 hover:text-white transition duration-150 cursor-pointer"
                      title="Copy to clipboard"
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
                      className="text-[10px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> စာသားကို အောင်မြင်စွာ ကူးယူပြီးပါပြီ (Ready to Paste!)
                    </motion.div>
                  )}
                </div>

                {/* 3. In-text rules cheat sheets summary */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">ကျမ်းတွင်းအကိုးအကား ညွှန်းဆိုနည်း (In-text citations rules):</h5>
                  
                  {citationSystem === "apa" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {inlineCitationsData.apa.rules.map((v, i) => (
                        <div key={i} className="text-xs bg-white p-3 rounded-lg border border-slate-100 space-y-1.5">
                          <div className="font-bold text-slate-900">{v.title}</div>
                          <p className="text-slate-500 text-[11px] leading-relaxed">{v.details}</p>
                          <div className="mt-1 space-y-1">
                            {v.examples?.map((ex, j) => (
                              <div key={j} className="text-[10px] font-mono text-slate-400 bg-stone-50 p-1 rounded border border-stone-100 flex justify-between gap-1 overflow-x-auto">
                                <span className="font-sans font-semibold text-slate-500">{ex.type}:</span>
                                <span className="text-slate-700 text-right">{ex.code}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inlineCitationsData.vancouver.rules.map((rule, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg border border-slate-100 space-y-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div className="flex-1">
                            <div className="font-bold text-xs text-slate-900">{rule.title}</div>
                            <p className="text-[11px] text-slate-600 leading-relaxed">{rule.details}</p>
                          </div>
                          <div className="flex flex-col gap-1 min-w-[200px]">
                            {rule.examples.map((ex, idxEx) => (
                              <div key={idxEx} className="text-[9px] font-mono p-1 bg-stone-50 border border-stone-100 rounded text-slate-500 flex justify-between">
                                <span className="font-sans font-bold">{ex.type}:</span>
                                <span className="text-slate-800 font-semibold">{ex.code}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* -------------------- TAB: ASSEMBLER -------------------- */}
        {activeTab === "assembler" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Progress and instructions */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  ကျမ်းအစီအစဉ် တည်ဆောက်ရေး မာတိကာ (Assembler Checklist)
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  ကျမ်းစာအုပ်၏ အစမှအဆုံး ပါဝင်ချုပ်လုပ်ရမည့် စာမျက်နှာအစီအစဉ်များကို နိုင်ငံ့စံနှုန်းအတိုင်း သတ်မှတ်ဖော်ပြထားခြင်း ဖြစ်သည်။ မိမိပြီးပြည့်စုံသည့် စာအုပ် စာမျက်နှာများကို စစ်ဆေးမှတ်သားထားနိုင်သည်။
                </p>

                {/* Progress bar container */}
                <div className="mt-5 bg-stone-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">တည်းဖြတ်မှုဖြစ်စဉ် တိုးတက်မှု-</span>
                    <span className="text-sichan-500">{progress.percent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sichan-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold text-right font-mono">
                    {progress.text}
                  </div>
                  {progress.percent === 100 && (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 p-2 rounded-lg text-center"
                    >
                      🎉 ဂုဏ်ယူပါသည်! ကျမ်းစုစည်းမှုအကွက်အားလုံး ကို စစ်ဆေးပြီးပါပြီ။
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Reset state helper */}
              <button
                onClick={() => {
                  setCheckedSteps({});
                  localStorage.removeItem("kku_thesis_checklist");
                }}
                className="w-full py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" /> တင်းပလိတ်အမှတ်အသားများကို ပြန်စပတ်စရန်
              </button>
            </div>

            {/* List sequence details and accordion */}
            <div className="lg:col-span-8 space-y-3">
              
              {assembleSteps.map((step, idx) => {
                const isChecked = !!checkedSteps[step.id];
                const isExpanded = expandedStep === step.id;
                
                return (
                  <div 
                    key={step.id} 
                    className={`rounded-2xl border transition bg-white ${
                      isExpanded 
                        ? "border-sichan-500 shadow-sm" 
                        : "border-slate-200 hover:border-slate-300 shadow-xs"
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
                              ? "bg-slate-900 border-slate-900 text-white"
                              : "border-slate-350 bg-slate-50 hover:bg-slate-100"
                          }`}
                        >
                          {isChecked && <Check className="h-3.5 w-3.5 font-bold" />}
                        </div>

                        <div className="font-mono text-slate-300 text-xs font-bold">
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </div>

                        <div className="min-w-0">
                          <div className={`text-xs font-bold ${isChecked ? "text-slate-400 line-through" : "text-slate-800"}`}>
                            {step.title}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {step.myanmarTitle}
                          </div>
                        </div>

                      </div>

                      {/* Right badge labels */}
                      <div className="flex items-center gap-2 flex-shrink-0 text-[9px] font-bold">
                        <span className={`px-2 py-0.5 rounded border uppercase ${
                          step.required 
                            ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
                            : "bg-amber-50 border-amber-100 text-amber-700"
                        }`}>
                          {step.required ? "မဖြစ်မနေလိုအပ်" : "ရွေးချယ်ရန်"}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded font-semibold uppercase tracking-wider">
                          {step.docPageSide === "single" ? "Single-sided (စာရွက်တစ်ဖက်တည်း)" : step.docPageSide === "both" ? "Double-sided (နှစ်ဖက်လုံး)" : "Both"}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400" />
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
                          className="overflow-hidden border-t border-slate-100 bg-slate-50/50 rounded-b-2xl"
                        >
                          <div className="p-4 text-xs md:text-sm leading-relaxed text-slate-600 space-y-2">
                            <p className="font-medium text-slate-800">
                              {step.details}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}

            </div>

          </div>
        )}

        {/* -------------------- TAB: ETHICS -------------------- */}
        {activeTab === "ethics" && (
          <div className="space-y-6 animate-fade-in">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-sichan-500" />
                  ကျမ်းပြုသုတေသီများ လိုက်နာရမည့် ကျင့်ဝတ်စံနှုန်းများ
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed md:max-w-2xl">
                  ထိုင်းနိုင်ငံ အမျိုးသားသုတေသနကောင်စီ (National Research Council of Thailand - NRCT) မှ ၁၉၉၈ ခုနှစ်တွင် တရားဝင် ပြဋ္ဌာန်းခိုင်မာစေခဲ့သော 'သုတေသီ့ကျင့်ဝတ်စံနှုန်း ၉ ရာ' ဖြစ်သည်။ သုတေသနပြုလုပ်ရာတွင် လုံးဝလိုက်နာရမည့် တာဝန်ဝတ္တရားများ ဖြစ်သည်။
                </p>
              </div>

              {/* Graphic stamp avatar illustration */}
              <div className="flex-shrink-0 bg-stone-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3 shadow-xs">
                <Cpu className="h-8 w-8 text-kku-gold animate-bounce" />
                <div className="font-serif">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Responsible Science</div>
                  <div className="text-xs font-bold text-slate-800">NRCT Standard Booked</div>
                </div>
              </div>
            </div>

            {/* Structured articles lists grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ethicsArticles.filter(e => e.englishTitle).map((art, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition duration-150 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-sichan-50 text-sichan-600 font-bold text-xs select-none">
                      {art.id}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-xs tracking-wider uppercase font-mono leading-tight">
                        {art.englishTitle}
                      </h4>
                      <div className="text-xs font-bold text-sichan-500 leading-snug">
                        {art.myanmarTitle}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed pt-1.5 border-t border-slate-100">
                      {art.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* Helpful Quick Instructions footer */}
      <footer id="footer-section" className="bg-slate-900 border-t-2 border-slate-800 text-slate-400 py-10 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center items-center gap-1 text-white font-serif text-lg font-bold">
            <Sparkles className="h-5 w-5 text-kku-gold animate-pulse" /> KKU Postgraduate Thesis Formatting Guide
          </div>
          <p className="max-w-2xl mx-auto text-xs leading-relaxed text-slate-400">
            ဤအက်ပလီကေးရှင်းကို Khon Kaen တက္ကသိုလ်၏ တရားဝင်ဘွဲ့လွန်ကျမ်းစည်းကမ်း လမ်းညွှန်ချက်လက်စွဲစာအုပ် (Chapters 4, 5, & 6) များကို အခြေခံ၍ မြန်မာသုတေသီကျောင်းသားများ သုတေသနဖော်ရွေမှု မြှင့်တင်ရန်အတွက် အထူးပြုစုဖော်ပြခြင်း ဖြစ်သည်။
          </p>
          <div className="flex wrap justify-center gap-4 text-xs font-semibold text-slate-300">
            <a href="https://gs.kku.ac.th" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition duration-100">
              Official KKU Graduate School <ExternalLink className="h-3 w-3" />
            </a>
            <span>•</span>
            <span className="text-slate-500">Optimized Offline-First Design 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
