export interface DetailItem {
  rule: string;
  myanmarDesc: string;
  example?: string;
}

export interface SpecificationSection {
  title: string;
  myanmarTitle: string;
  icon: string;
  items: DetailItem[];
}

export interface CitationFormat {
  type: string;
  title: string;
  desc: string;
  textCiteTemplate: string;
  textCiteExample: string;
  refTemplate: string;
  refExample: string;
  subCategories?: string[];
}

export interface AssembleStep {
  id: string;
  title: string;
  myanmarTitle: string;
  required: boolean;
  docPageSide: "single" | "double" | "both";
  details: string;
}

export interface EthicsArticle {
  id: number;
  englishTitle: string;
  myanmarTitle: string;
  desc: string;
}

export const marginData = {
  odd: {
    top: { inch: 1.5, cm: 3.8, label: "Top Margin (အပေါ်ဘက်ဘေးသား)", desc: "ခေါင်းစီးနှင့် စာမျက်နှာနံပါတ်တပ်ရန် နေရာချန်ရန်အတွက် 1.5 လက်မ ချန်ရပါမည်။" },
    bottom: { inch: 1.0, cm: 2.5, label: "Bottom Margin (အောက်ခြေဘေးသား)", desc: "စာမျက်နှာ၏အောက်ခြေအနားသတ်အတွက် 1.0 လက်မ ချန်ရပါမည်။" },
    left: { inch: 1.5, cm: 3.8, label: "Left Margin (ဘယ်ဘက်ဘေးသား - Binding Wood)", desc: "စာအုပ်ချုပ်ရန် (Binding) အတွက် ဘယ်ဘက်ခြမ်းတွင် ခပ်ကျယ်ကျယ် 1.5 လက်မ ချန်ပေးရပါမည်။" },
    right: { inch: 1.0, cm: 2.5, label: "Right Margin (ညာဘက်ဘေးသား)", desc: "ညာဘက်အနားသတ်အတွက် 1.0 လက်မ လုံလောက်ပါသည်။" }
  },
  even: {
    top: { inch: 1.5, cm: 3.8, label: "Top Margin (အပေါ်ဘက်ဘေးသား)", desc: "ခေါင်းစီးနှင့် စာမျက်နှာနံပါတ်တပ်ရန် နေရာချန်ရန်အတွက် 1.5 လက်မ ချန်ရပါမည်။" },
    bottom: { inch: 1.0, cm: 2.5, label: "Bottom Margin (အောက်ခြေဘေးသား)", desc: "စာမျက်နှာ၏အောက်ခြေအနားသတ်အတွက် 1.0 လက်မ ချန်ရပါမည်။" },
    left: { inch: 1.0, cm: 2.5, label: "Left Margin (ဘယ်ဘက်ဘေးသား)", desc: "စာအုပ်၏ ညာဘက်မျက်နှာစာဖြစ်သဖြင့် ဘယ်ဘက်တွင် 1.0 လက်မသာ ချန်ရန်လိုသည်။" },
    right: { inch: 1.5, cm: 3.8, label: "Right Margin (ညာဘက်ဘေးသား - Binding Wood)", desc: "စာအုပ်ချုပ်ရန် (Binding) အတွက် ညာဘက်ခြမ်းတွင် ခပ်ကျယ်ကျယ် 1.5 လက်မ ချန်ပေးရပါမည်။" }
  }
};

export const typographyData: SpecificationSection[] = [
  {
    title: "English Thesis (Times New Roman)",
    myanmarTitle: "အင်္ဂလိပ်ကျမ်းပြုစုခြင်းအတွက် စာလုံးစနစ်",
    icon: "Type",
    items: [
      {
        rule: "Body Content (စာသားအဆင့်)",
        myanmarDesc: "Times New Roman, Size 12, Regular (သာမန်စာလုံးပုံစံ)",
        example: "The study was motivated by the number of deaths from eating poisonous..."
      },
      {
        rule: "Subheadings (ခေါင်းစဉ်ခွဲအဆင့်)",
        myanmarDesc: "Times New Roman, Size 12 to 14, Bold (စာလုံးအထူပုံစံ)",
        example: "1.1 Introduction and Background"
      },
      {
        rule: "Chapter Headings (အခန်းခေါင်းစဉ်အဆင့်)",
        myanmarDesc: "Times New Roman, Size 14, Bold (စာလုံးအထူပုံစံ၊ စာမျက်နှာအလယ်တည့်တည့် တင်ရမည်)",
        example: "CHAPTER I\nINTRODUCTION"
      },
      {
        rule: "Line Spacing (စာကြောင်းအကွာအဝေး)",
        myanmarDesc: "အင်္ဂလိပ်ကျမ်းစာအုပ်တစ်ခုလုံးအတွက် စာကြောင်းအကွာအဝေးကို 1.5 lines သတ်မှတ်ရမည်။",
        example: "Line Spacing: 1.5"
      },
      {
        rule: "Heading Spacing (ခေါင်းစဉ်ကြားအကွာအဝေး)",
        myanmarDesc: "အခန်းခေါင်းစဉ်နှင့် ပထမဦးဆုံးစာသားအကြားတွင် စာကြောင်းကာကွယ်ရန် ၂ ကြောင်းစာ (2 black lines) ချန်ရမည်။ ခေါင်းစဉ်အသစ်တစ်ခုမစတင်မီ ၁ ကြောင်းစာ (1 blank line) ချန်ရမည်။"
      }
    ]
  },
  {
    title: "Thai Thesis (Angsana New / Angsana UPC)",
    myanmarTitle: "ထိုင်းကျမ်းပြုစုခြင်းအတွက် စာလုံးစနစ် (ထိုင်း+အင်္ဂလိပ် ရောနှောကျမ်းများအပါအဝင်)",
    icon: "Languages",
    items: [
      {
        rule: "Body Content (ထိုင်းစာသားအဆင့်)",
        myanmarDesc: "Angsana New/UPC, Size 14 to 16, Regular (သာမန်စာလုံးပုံစံ)",
        example: "การจัดการศึกษาระดับบัณฑิตศึกษาเป็นการจัดการศึกษาที่แตกต่าง..."
      },
      {
        rule: "Subheadings (ထိုင်းခေါင်းစဉ်ခွဲအဆင့်)",
        myanmarDesc: "Angsana New/UPC, Size 16 to 18, Bold (စာလုံးအထူပုံစံ)",
        example: "1.1 ความเป็นมาและความสำคัญ"
      },
      {
        rule: "Chapter Headings (ထိုင်းအခန်းခေါင်းစဉ်အဆင့်)",
        myanmarDesc: "Angsana New/UPC, Size 18, Bold (စာလုံးအထူပုံစံ၊ အလယ်တည့်တည့် တင်ရမည်)",
        example: "บทที่ 1\nบทนำ"
      },
      {
        rule: "Line Spacing (ထိုင်းစာကြောင်းအကွာအဝေး)",
        myanmarDesc: "ထိုင်းကျမ်းများအတွက် စာကြောင်းအကွာအဝေးကို Single space (စာကြောင်းကပ်လျက်) သတ်မှတ်ရမည်။",
        example: "Line Spacing: Single"
      }
    ]
  }
];

export const pageNumberRules: SpecificationSection = {
  title: "Paging & Placement Rules",
  myanmarTitle: "စာမျက်နှာနံပါတ်တပ်ခြင်းနှင့် တည်နေရာသတ်မှတ်ချက်များ",
  icon: "Binary",
  items: [
    {
      rule: "Frontage Section (အစပျိုးအပိုင်း - Abstract မှ Table of Contents အထိ)",
      myanmarDesc: "စာမျက်နှာနံပါတ်ကို ရောမဂဏန်းအသေးစနစ် (i, ii, iii, ...) သုံး၍ စာမျက်နှာညာဘက်အပေါ်ထောင့် (အပေါ်မှ 0.5 လက်မ၊ ညာဘက်မှ 1.0 လက်မအကွာ) တွင် တပ်ရပါမည်။ သို့သော် ရေးထုံးအရ Abstract, Acknowledgements, Table of Contents တို့၏ အစဦးဆုံးမျက်နှာစာများတွင် စာမျက်နှာနံပါတ်ကို ထင်သာမြင်သာမတပ်ရပါ (ရေတွက်သော်လည်း နံပါတ်မရိုက်ရပါ)။"
    },
    {
      rule: "Content Section (ကျမ်းစာသားအပိုင်း - Chapter 1 မှ Vitae အထိ)",
      myanmarDesc: "အာရပ်ဂဏန်းပုံစံ (1, 2, 3, ...) ကို သုံးရပါမည်။ မဂဏန်းစာမျက်နှာ (Odd Pages) များတွင် စာမျက်နှာညာဘက်အပေါ်ထောင့်နှင့် စုံဂဏန်းစာမျက်နှာ (Even Pages) များတွင် စာမျက်နှာဘယ်ဘက်အပေါ်ထောင့် (အနားသတ်များမှ အပေါ် 0.5 လက်မ၊ ဘေး ၁ လက်မအကွာ) တို့တွင် ရိုက်နှိပ်ဖော်ပြရပါမည်။"
    },
    {
      rule: "Hidden Page Numbers (စာမျက်နှာနံပါတ် ဖျောက်ထားရမည့် စာမျက်နှာများ)",
      myanmarDesc: "အလွန်အရေးကြီးပါသည်! Chapter တစ်ခုစီ၏ အစဦးဆုံးမျက်နှာစင် (ပထမစာမျက်နှာ)၊ Bibliography/References ၏ ပထမဦးဆုံးစာမျက်နှာ၊ Appendices ၏ ဖုံးမျက်နှာစင် စာမျက်နှာများတွင် စာမျက်နှာနံပါတ်ကို လုံးဝ (လုံးဝ) ရိုက်နှိပ်ဖော်ပြခြင်း မပြုရပါ! (နောက်ကွယ်၌ ရေတွက်သွားသော်လည်း အပြင်၌ ကနဦးဖျောက်ထားရပါမည်။)"
    },
    {
      rule: "Sub-serial Numbers Forbidden (ခေါင်းစဉ်ငယ်ခွဲ နံပါတ်တပ်ခြင်း ပိတ်ပင်ချက်)",
      myanmarDesc: "စာမျက်နှာနံပါတ်များကို ၂.၁၊ ၂.၂ သို့မဟုတ် 2(1), 2(2) ပုံစံမျိုး လုံးဝတပ်ခွင့်မရှိပါ။ အစဉ်လိုက် ၁၊ ၂၊ ၃ သာ တောက်လျှောက်တပ်ရပါမည်။"
    }
  ]
};

export const assembleSteps: AssembleStep[] = [
  {
    id: "cover",
    title: "Outer Cover (Hard Cover)",
    myanmarTitle: "ကျမ်းအုပ်အပြင်ဖုံး (မာကြောသောသားရေဖုံး)",
    required: true,
    docPageSide: "single",
    details: "စာအုပ်အပြင်ဖုံး အရောင်သတ်မှတ်ချက်- မဟာဘွဲ့ (Master Degree) အတွက် Navy Blue (အပြာပုပ်ရောင်) ဖုံးရမည်ဖြစ်ပြီး၊ ပါရဂူဘွဲ့ (Doctoral Degree) အတွက် Black (အနက်ရောင်) သုံးရပါမည်။ ကျမ်းအမည်၊ စာရေးသူအမည်နှင့် တက္ကသိုလ်တံဆိပ်များကို ရွှေရောင်စာလုံးများဖြင့် ရိုက်နှိပ်ရမည်။"
  },
  {
    id: "title_page",
    title: "Title Page",
    myanmarTitle: "ကျမ်းတွင်းမျက်နှာဖုံးစင်",
    required: true,
    docPageSide: "single",
    details: "အပြင်ဖုံးအတိုင်း စာသားများကို တစ်ထပ်တည်း စာမျက်နှာတစ်ခုချင်းစီအလိုက် သေသပ်စွာ ရေးသားရမည်။"
  },
  {
    id: "approval",
    title: "Thesis Approval / Certification",
    myanmarTitle: "ကျမ်းအတည်ပြုချက် လက်မှတ်ရေးထိုးလွှာ",
    required: true,
    docPageSide: "single",
    details: "ကျမ်းစစ်ဆေးရေးကော်မတီဥက္ကဋ္ဌ၊ အဖွဲ့ဝင်များနှင့် ဘွဲ့လွန်ကျောင်းဌာနမှူးတို့၏ လက်မှတ်များပါဝင်သော လက်မှတ်ထိုးလွှာ စာမျက်နှာဖြစ်သည်။"
  },
  {
    id: "abstract_th",
    title: "Thai Abstract",
    myanmarTitle: "ထိုင်းဘာသာပြန် အကျဉ်းချုပ်",
    required: true,
    docPageSide: "single",
    details: "ထိုင်းဘာသာစကားဖြင့် ကျမ်းတစ်ခုလုံး၏ အကျဉ်းချုပ်ကို ရေးသားဖော်ပြရမည်။ စာမျက်နှာနံပါတ် စတင်ရေတွက်သော်လည်း စာလုံးဖျောက်ထားလေ့ရှိသည်။"
  },
  {
    id: "abstract_en",
    title: "English Abstract",
    myanmarTitle: "အင်္ဂလိပ်ဘာသာ အကျဉ်းချုပ်",
    required: true,
    docPageSide: "single",
    details: "အင်္ဂလိပ်ဘာသာဖြင့် ကျမ်းတစ်ခုလုံး၏ သုတေသနတွေ့ရှိချက်များကို လိုရင်းတိုရှင်း အကျဉ်းချုပ်ရေးသားတင်ပြရမည်။"
  },
  {
    id: "dedication",
    title: "Dedication (Optional)",
    myanmarTitle: "ကျေးဇူးတင်ဂုဏ်ပြုလွှာ (ထည့်လိုက ထည့်နိုင်သည်)",
    required: false,
    docPageSide: "single",
    details: "မိဘများ သို့မဟုတ် ဆရာသမားများအား အမှတ်တရ ဂုဏ်ပြုအပ်နှံလိုက စာတိုလေးတစ်ကြောင်း သတ်သတ်စီရေးသားနိုင်သည်။"
  },
  {
    id: "acknowledgements",
    title: "Acknowledgements",
    myanmarTitle: "သုတေသနကျေးဇူးတင်လွှာ",
    required: true,
    docPageSide: "single",
    details: "သုတေသနလုပ်ငန်းစဉ်တစ်လျှောက် ပံ့ပိုးကူညီခဲ့ကြသော ပညာရှင်များ၊ အကြံပေးဆရာများနှင့် အဖွဲ့အစည်းများအား တရားဝင်ကျေးဇူးတင်စကား ရေးသားသောအပိုင်း။"
  },
  {
    id: "table_of_contents",
    title: "Table of Contents",
    myanmarTitle: "မာတိကာ",
    required: true,
    docPageSide: "single",
    details: "အခန်းအလိုက်၊ ခေါင်းစဉ်အလိုက် စာမျက်နှာနံပါတ်စာရင်းဇယား။ ခေါင်းစဉ်များ ညာဘက်ညီအောင် ညှိရမည်။"
  },
  {
    id: "list_tables",
    title: "List of Tables",
    myanmarTitle: "ဇယားများစာရင်း",
    required: true,
    docPageSide: "single",
    details: "ကျမ်းတွင်းပါဝင်သော ဇယားများအားလုံးကို အစဉ်လိုက် စာမျက်နှာနှင့်တကွ ပြန်လည်လမ်းညွှန်ပြသခြင်း။"
  },
  {
    id: "list_figures",
    title: "List of Figures",
    myanmarTitle: "ပုံဖော်ပြချက်များစာရင်း",
    required: true,
    docPageSide: "single",
    details: "ကျမ်းတွင်းပါဝင်သော ပုံများ၊ ပုံဖော်ရပ်များအားလုံးကို အစဉ်လိုက် စာမျက်နှာနှင့်တကွ ဖော်ပြခြင်း။"
  },
  {
    id: "abbreviations",
    title: "List of Abbreviations",
    myanmarTitle: "အတိုကောက်စာလုံးများစာရင်း",
    required: true,
    docPageSide: "single",
    details: "ကျမ်းတွင်းအသုံးပြုထားသော သိပ္ပံနည်းကျ အတိုကောက်စကားလုံးများ၏ အဓိပ္ပာယ်ဖွင့်ဆိုချက်များ။"
  },
  {
    id: "chapters",
    title: "Body Chapters (Chapters I - V)",
    myanmarTitle: "ကျမ်းစာကိုယ် အခန်းများ (အခန်း ၁ မှ ၅ အထိ)",
    required: true,
    docPageSide: "both",
    details: "သုတေသနစာကိုယ်အပိုင်းဖြစ်ပြီး၊ စာမျက်နှာ ၁၇၀ အောက်ဖြစ်ပါက စာမျက်နှာတစ်ဖက်တည်း (Single-sided) ရိုက်နှိပ်ရန် အကြံပြုပြီး၊ ၁၇၀ ကျော်ပါက နှစ်ဖက်စလုံး (Double-sided) အသုံးပြုခွင့်ရှိသည်။ အခန်းသစ်များကို စာမျက်နှာသစ်မှ အမြဲအစပြုရမည်။"
  },
  {
    id: "references",
    title: "References / Bibliography",
    myanmarTitle: "ကိုးကားစုစည်းချက်စာရင်း (References)",
    required: true,
    docPageSide: "both",
    details: "ကျမ်းတစ်ကိုယ်လုံးတွင် လေ့လာကိုးကားခဲ့သမျှသော စာပေအချက်အလက်အားလုံး၏ အကိုးကားရင်းမြစ်စာရင်း ဖြစ်သည်။ APA သို့မဟုတ် Vancouver စနစ် တစ်မျိုးတည်းကိုသာ တသတ်မတ်တည်း ကိုးကားရမည်။"
  },
  {
    id: "appendices",
    title: "Appendices",
    myanmarTitle: "နောက်ဆက်တွဲ ဖြည့်သွင်းချက်များ (Appendices)",
    required: false,
    docPageSide: "both",
    details: "ကျမ်းစာကိုယ်ထဲတွင် အချက်အလက်ရှုပ်ထွေးမည်စိုး၍ သီးခြားခွဲထုတ်ဖော်ပြသော ဇယားကြီးများ၊ ဓာတ်ပုံများနှင့် မူရင်းစံနှုန်းလက်မှတ်များ ထည့်သွင်းရမည့် အပိုင်း။"
  },
  {
    id: "vitae",
    title: "Curriculum Vitae (Vitae / Biography)",
    myanmarTitle: "ကျမ်းပြုသုတေသီ၏ အတ္ထုပ္ပတ္တိအကျဉ်း (Vitae)",
    required: true,
    docPageSide: "single",
    details: "ကျမ်းပြုသူ၏ အမည်၊ မွေးသက္ကရာဇ်၊ မွေးရပ်မြေ၊ ပညာရေးနောက်ခံ၊ သုတေသနဆုတံဆိပ်များနှင့် လက်ရှိအလုပ်အကိုင်တို့ကို ဖော်ပြရမည်ဖြစ်ပြီး စာမျက်နှာ ၁ ခုသာ ကန့်သတ်ရေးသားရပါမည်။"
  }
];

export const ethicsArticles: EthicsArticle[] = [
  {
    id: 1,
    englishTitle: "Researcher must exhibit academic honesty",
    myanmarTitle: "၁။ ပညာရပ်ဆိုင်ရာ ရိုးသားဖြောင့်မတ်မှု ရှိရမည်",
    desc: "သုတေသီသည် မိမိကိုယ်မိမိ ရိုးသားရမည်။ အခြားသူများ၏ သုတေသနတွေ့ရှိချက် သို့မဟုတ် ရေးသားချက်များကို မိမိတွေ့ရှိချက်ကဲ့သို့ ပုံဖော်ဝါဒဖြန့်ခြင်း (ခိုးယူခြင်း - Plagiarism) လုံးဝမပြုရ။ အချက်အလက်အားလုံးကို ရင်းမြစ်အတိုင်း တိကျစွာ အသိအမှတ်ပြုကိုးကားရမည်။"
  },
  {
    id: 2,
    englishTitle: "Understand institutional obligation",
    myanmarTitle: "၂။ မိမိအား ပံ့ပိုးပေးသော အဖွဲ့အစည်း၏ ကတိကဝတ်များကို လိုက်နာရမည်",
    desc: "သုတေသနပြုလုပ်ရန် ကူညီထောက်ပံ့ပေးသော ရန်ပုံငွေအဖွဲ့အစည်း သို့မဟုတ် မိမိ၏ လက်ရှိတက္ကသိုလ်၏ သတ်မှတ်စည်းကမ်းချက်များနှင့် အချိန်အပိုင်းအခြားများအတိုင်း သုတေသနလုပ်ငန်းကို ပြီးဆုံးအောင် အပြည့်အဝ အားစိုက်ထုတ်ရမည် ဖြစ်ပြီး အလယ်အလတ်လမ်းတွင် ဆိုင်းငံ့စွန့်ပစ်ခြင်း မပြုရ။"
  },
  {
    id: 3,
    englishTitle: "Exhibit expertise in the given research field",
    myanmarTitle: "၃။ မိမိလုပ်ဆောင်သော နယ်ပယ်တွင် ကျွမ်းကျင်လိမ္မာမှုရှိရမည်",
    desc: "သုတေသီသည် မိမိလုပ်ဆောင်နေသော ဘာသာရပ်နယ်ပယ်၌ သီအိုရီနှင့် လက်တွေ့ပိုင်းဆိုင်ရာ သိနားလည်မှု ပြည့်စုံရန် လိုအပ်ပြီး၊ ခွဲခြမ်းစိတ်ဖြာသုံးသပ်ချက်များတွင် မှားယွင်းမှု မရှိစေရန် အထူးသတိပြုရမည်။"
  },
  {
    id: 4,
    englishTitle: "Responsibility for both living and non-living subjects",
    myanmarTitle: "၄။ သုတေသနပြုလုပ်သည့် သက်ရှိ/သက်မဲ့ အရာအားလုံးအပေါ် တာဝန်ယူမှုရှိရမည်",
    desc: "သုတေသနလုပ်ငန်းတွင် ပါဝင်ပတ်သက်နေသော လူသားများ၊ တိရစ္ဆာန်များ၊ အပင်များ၊ သဘာဝပတ်ဝန်းကျင်နှင့် ဒေသန္တရယဉ်ကျေးမှုများအပေါ် အထူးနူးညံ့သိမ်မွေ့စွာ ကိုင်တွယ်ရမည်ဖြစ်ပြီး ဆိုးကျိုးမဖြစ်စေရန် ကာကွယ်မှုပေးရမည်။"
  },
  {
    id: 5,
    englishTitle: "Respect the rights of all human research subjects",
    myanmarTitle: "၅။ သုတေသနပါ လူသားများ၏ အခွင့်အရေးကို လေးစားရမည်",
    desc: "သုတေသနတွင် ပါဝင်ကူညီသော လူသားအစုအဖွဲ့များအား သုတေသန၏ ရည်ရွယ်ချက်ကို ပွင့်လင်းမြင်သာစွာ ရှင်းလင်းပြရမည်။ ၎င်းတို့၏ ကိုယ်ရေးကိုယ်တာ အခွင့်အရေးများနှင့် လွတ်လပ်စွာ ဆုံးဖြတ်နိုင်ခွင့်ကို နည်းလမ်းတကျ လေးစားရမည်ဖြစ်ပြီး အဓမ္မတိုက်တွန်းခြင်း မပြုရ။"
  },
  {
    id: 6,
    englishTitle: "Exercise integrity in every steps of research",
    myanmarTitle: "၆။ သုတေသနအဆင့်တိုင်းတွင် တရားမျှတမှန်ကန်မှု (Integrity) ရှိရမည်",
    desc: "တစ်ကိုယ်ကောင်းဆန်သော အကျိုးစီးပွား သို့မဟုတ် ပညာရပ်ဆိုင်ရာ ဘက်လိုက်မှုများကြောင့် သုတေသနအချက်အလက်ကို ပြုပြင်ပြောင်းလဲခြင်း သို့မဟုတ် လိုရာဆွဲပုံဖော်ခြင်း လုံးဝလုံးဝမပြုရ။"
  },
  {
    id: 7,
    englishTitle: "Apply the research in a positive way for society",
    myanmarTitle: "၇။ လူ့အဖွဲ့အစည်းအတွက် အကျိုးရှိသော ဘက်တွင် အသုံးပြုရမည်",
    desc: "မိမိ၏ သုတေသနတွေ့ရှိချက်များကို လူ့အဖွဲ့အစည်းနှင့် သိပ္ပံပညာလောက ဖွံ့ဖြိုးတိုးတက်ရေးအတွက် ကောင်းမွန်သည့်ဘက်တွင် သုံးစွဲရမည်ဖြစ်ပြီး၊ လူဖျက်ဆီးရေး သို့မဟုတ် ကံကျွေးချ မမှန်ကန်သော အရာများတွင် အသုံးပြုခြင်းမှ ရှောင်ကြဉ်ရမည်။"
  },
  {
    id: 8,
    englishTitle: "Always accept constructive academic criticism",
    myanmarTitle: "၈။ ပညာရပ်ဆိုင်ရာ ဝေဖန်ဆန်းစစ်မှုများကို လွတ်လပ်စွာ လက်ခံနိုင်ရမည်",
    desc: "သုတေသီသည် မိမိ၏ သုတေသနလုပ်ငန်းနှင့် ပတ်သက်၍ အခြားပညာရှင်များ၏ ဝေဖန်သုံးသပ်မှုများကို ပွင့်လင်းမြင်သာစွာ လက်ခံဆွေးနွေးနိုင်ရမည် ဖြစ်သည်။"
  },
  {
    id: 9,
    englishTitle: "Social responsibility and benefit to humanity",
    myanmarTitle: "၉။ လူ့အစုအဖွဲ့အပေါ် တာဝန်သိမှု ရှိရမည်",
    desc: "မိမိ၏ ဉာဏ်ပညာနှင့် လုပ်အားကို လူ့အဖွဲ့အစည်း ဖွံ့ဖြိုးတိုးတက်စေရန်နှင့် လူသားထု၏ ကောင်းကျိုးအတွက်သာ ရိုးသားစွာ ရည်ရွယ်လုပ်ဆောင်ရမည်။"
  }
];

export const inlineCitationsData = {
  apa: {
    title: "APA Style (First Format - Chapter 5)",
    description: "The American Psychological Association (APA) 5th/7th edition based format, adapted for Thai context. Uses Author-Date system.",
    rules: [
      {
        title: "Work by One Author (Burmese Explanation)",
        details: "စာရေးသူ ၁ ဦးတည်းရှိသော စာအုပ်ကို ညွှန်းဆိုနည်း။ မြန်မာစာအုပ်ဆိုလျှင် နာမည်နှင့် မျိုးရိုးအမည်/မိသားစုအမည်ကို အပြည့်အစုံထည့်ရပြီး၊ နိုင်ငံခြားစာအုပ်ဆိုလျှင် မျိုးရိုးအမည် (Surname) တခုတည်းသာ ထည့်ရမည်။",
        examples: [
          { type: "In front of text (Thai)", code: "ရังสรรค์ ธนะพรพันธุ์ (2548) ဖော်ပြထားသည်မှာ..." },
          { type: "In front of text (Foreign)", code: "Patten (2005) suggested that deep learning..." },
          { type: "In parentheses (Thai)", code: "... (ရังสรรค์ ธนะพรพันธุ์, 2548)" },
          { type: "In parentheses (Foreign)", code: "... (Patten, 2005)" }
        ]
      },
      {
        value: "two_authors",
        title: "Work by Two Authors",
        details: "စာရေးသူ ၂ ဦးရှိပါက စာသားထဲတွင်ရေးလျှင် 'and' ကိုသုံးပြီး၊ လက်သည်းကွင်းထဲတွင်ရေးလျှင် '&' သင်္ကေတကို အစားထိုးသုံးရမည်။",
        examples: [
          { type: "In text style", code: "Enger and Smith (2004) proved that..." },
          { type: "In parentheses style", code: "The performance is highly stable (Enger & Smith, 2004)." }
        ]
      },
      {
        value: "three_to_five",
        title: "Work by 3 to 5 Authors",
        details: "စာရေးသူ ၃ ဦးမှ ၅ ဦးအထိရှိပါက - ပထမဆုံးအကြိမ်ကိုးကားရာ၌ စာရေးသူအားလုံး၏ အမည်များကို ကော်မာခံ၍ ဖော်ပြရမည်။ နောက်ပိုင်းကိုးကားမှုများတွင် ပထမဆုံးသူ၏ အမည်နောက်၌ 'et al.' အစောင်းမဟုတ်သော စာသား သုံး၍ အတိုကောက်ရေးခွင့်ရှိသည်။",
        examples: [
          { type: "First Citation", code: "Gebbie, Rosenstock, and Hernandez (2003) discovered..." },
          { type: "Subsequent Citation", code: "Gebbie et al. (2003) also mentioned..." },
          { type: "Subsequent Citation (Parentheses)", code: "As discussed previously (Gebbie et al., 2003)." }
        ]
      },
      {
        value: "six_or_more",
        title: "Work by 6 or More Authors",
        details: "စာရေးသူ ၆ ဦးနှင့်အထက် ရှိပါက ပထမဆုံးအကြိမ် ကိုးကားကတည်းက ပထမဦးဆုံး သုတေသီအမည်နောက်တွင် 'et al.' ကို သုံးနိုင်ပါသည်။ သို့သော် References (ကျမ်းနောက်ဆက်တွဲ ကိုးကားရင်းမြစ်စာရင်း) ၌ ပထမသုတေသီ ၆ ဦးအမည်ရိုက်ပြီးမှကျန်သူများကို 'et al.' နှင့် အဆုံးသတ်ရမည်။",
        examples: [
          { type: "Cite Style", code: "Piot et al. (1992) researched on AIDS in Africa..." },
          { type: "In Parentheses", code: "... (Piot et al., 1992)" }
        ]
      },
      {
        value: "organization",
        title: "Corporate/Business Authors",
        details: "လုပ်ငန်းစု၊ ဝန်ကြီးဌာန၊ သို့မဟုတ် အဖွဲ့အစည်းများဖြစ်ပါက အမည်အပြည့်အစုံကို ကနဦးရေးပေးရမည်။ ကျယ်ကျယ်ပြန့်ပြန့် လူသိများပါက အတိုကောက်စကားလုံးကို [ ] ထဲတွင် ကနဦးထည့်သွင်းဖော်ပြပြီး နောက်ပိုင်းတွင် အတိုကောက်သာ သုံးရန်။",
        examples: [
          { type: "First evaluation cite", code: "Office of the Public Sector Development Commission [OPDC] (2007)..." },
          { type: "Subsequent cite", code: "OPDC (2007) states that..." }
        ]
      },
      {
        value: "no_author_date",
        title: "No Author or No Date",
        details: "စာရေးသူမရှိလျှင် စာအုပ်အမည်ကို အစားထိုး၍လည်းကောင်း၊ ခုနှစ်မရှိပါက 'n.d.' (No Date) ကိုလည်းကောင်း အသုံးပြုရမည်ဖြစ်ပါသည်။",
        examples: [
          { type: "No Author Example", code: "In 'Looking forward to a bright tomorrow...' (1949)" },
          { type: "No Date Example", code: "Viravaidya (n.d.) conducted an analytical study..." },
          { type: "Parentheses No Date Example", code: "... (Viravaidya, n.d.)" }
        ]
      }
    ],
    referenceForming: [
      {
        type: "Book (Single Author)",
        format: "Author. (Year). Title of the book (Bold / Italic). Place of publication: Publisher.",
        example: "Patten, C. (2005). Not quite the diplomat: home truths about world affairs. London: Allen Lane."
      },
      {
        type: "Book (2 to 5 Authors)",
        format: "First Author, & Second Author. (Year). Title of the book. Edition. Place: Publisher.",
        example: "Schaie, K.W. & Willis, S. L. (2002). Adult development and aging. 5th ed. Upper Saddle River, NJ: Prentice Hall."
      },
      {
        type: "Journal Article",
        format: "Author. (Year). Title of article. Title of Journal (Bold), volume(issue), page numbers.",
        example: "Abrams, P. (1980). History, sociology, historical sociology. Past and Present, (87), 3-16."
      },
      {
        type: "Thesis",
        format: "Author. (Year). Title of thesis. Level of thesis (Degree)... program... faculty... university.",
        example: "Nuankoksoong, P. (1998). Morale of the personnel of the Office of Accelerated Rural Development in the northeast. Master thesis, Graduate School, Khon Kaen University."
      },
      {
        type: "Internet Source / Website",
        format: "Author or Org. (Year). Title... Retrieval date, from URL.",
        example: "U.S. General Accounting Office. (1997). Telemedicine: Federal strategy is needed to guide investments. Retrieved September 15, 2000, from http://www.access.gpo.gov/su_docs/aces/aces160.html"
      }
    ]
  },
  vancouver: {
    title: "Vancouver Style (Number style) [Chapter 6]",
    description: "Science and Technology programs at KKU typically specify the Vancouver numerical style of citations.",
    rules: [
      {
        title: "In-text references",
        details: "Statements are referenced using a sequence of numbers inside brackets, e.g., [1], [2]. The numbering can either follow the sequential order of appearance (Cited-order) or align with an alphabetical list of authors (Reference-order).",
        examples: [
          { type: "Single reference", code: "This has been accomplished only after two wars [1]." },
          { type: "Multiple references (comma separated)", code: "The report is verified in several regional studies [1, 2, 5]." },
          { type: "Subsequest citation matching", code: "According to preceding clinical proofs [1], the method works." }
        ]
      },
      {
        title: "Reference Lists (Rearward of Thesis)",
        details: "References are listed at the very end. If choosing Cited-order style, they must match the order in which they are cited. If Reference-order is chosen, they are sorted alphabetically by first author surname and then numbered.",
        examples: [
          { type: "Cited-order listing example", code: "1. Wolfowitz, P. (1992)...\n2. Nasr, SVR. (2006)...\n3. Akins, JE. (1973)..." },
          { type: "Reference-order listing example", code: "1. Akins, JE. (1973)...\n2. Nasr, SVR. (2006)...\n3. Wolfowitz, P. (1992)..." }
        ]
      }
    ],
    referenceForming: [
      {
        type: "Book (Single Author)",
        format: "Author. Title of the book (Bold / Italic). Place of publication: Publisher; Year of publication.",
        example: "Lane NE. AIDS allergy and rheumatology. Totowa (NJ): Humana Press; 1997."
      },
      {
        type: "Book (2 Authors)",
        format: "First Author, Second Author. Title of the book. Place: Publisher; Year.",
        example: "Green J, McCreaner A. Counseling in HIV infection and AIDS. 2nd ed. Cambridg (MA): Blackwell Science; 1996."
      },
      {
        type: "Book (More than six authors)",
        format: "First 6 authors, et al. Title of the book. Place: Publisher; Year.",
        example: "Piot P, Kapita BM, Ngugi EN, Mann JM, Colebunders R, Wabitsch R, et al. AIDS in Africa: a manual for physicians. Geneva: World Health Organization; 1992."
      },
      {
        type: "Journal Article",
        format: "Author. Title of article. Title of journal (Bold / Italic) Year of publication; Volume(Issue): page range.",
        example: "London L. AIDS control and the workplace: the role of occupational health. Int J Health Serv 1998; 28(3): 575-91."
      },
      {
        type: "Thesis",
        format: "Author. Title of thesis [type of thesis]. Place of publication: University; Year of publication.",
        example: "Wongchoo K. The relationship between self-concept, basic personal and family factors with self-care behaviors of HIV [Master Thesis in Family Nursing]. Khon Kaen: Graduate School, Khon Kaen University; 1998."
      }
    ]
  }
};
