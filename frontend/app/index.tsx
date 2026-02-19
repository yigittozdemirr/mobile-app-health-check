import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import {
  Menu,
  RefreshCw,
  ChevronRight,
  X,
  Home,
  BookOpen,
  Brain,
  ListOrdered,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronLeft,
  Info,
  Pill,
  Stethoscope,
  HeartPulse,
  Utensils,
  ClipboardList,
  AlertCircle,
} from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const C = {
  bg: '#F8F9FA',
  primary: '#0056B3',
  primaryLight: '#E8F0FB',
  primaryDark: '#003D80',
  yellow: '#FFC107',
  yellowLight: '#FFF8E1',
  green: '#28A745',
  greenLight: '#E8F5E9',
  red: '#DC3545',
  redLight: '#FFEBEE',
  blue2: '#17A2B8',
  blue2Light: '#E0F7FA',
  text: '#212529',
  textSec: '#6C757D',
  white: '#FFFFFF',
  border: '#DEE2E6',
  card: '#FFFFFF',
  orange: '#FD7E14',
  orangeLight: '#FFF3E0',
  purple: '#6F42C1',
  purpleLight: '#F3E8FF',
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'genel',
    title: 'KOLONOSKOPİ HAKKINDA GENEL BİLGİLER',
    color: C.yellow,
    bgColor: C.yellowLight,
    icon: 'stethoscope',
    items: [
      { id: 'g1', title: 'Kolonoskopi Nedir?', icon: 'info' },
      { id: 'g2', title: 'Neden Yapılır?', icon: 'heart' },
      { id: 'g3', title: 'Hazırlık Süreci', icon: 'clipboard' },
      { id: 'g4', title: 'İşlem Sonrası Bakım', icon: 'pill' },
    ],
  },
  {
    id: 'bagirsak',
    title: 'BAĞIRSAK TEMİZLİĞİ İŞLEMLERİ',
    color: C.primary,
    bgColor: C.primaryLight,
    icon: 'heartpulse',
    items: [
      { id: 'b1', title: 'Beslenme Önerileri', icon: 'utensils' },
      { id: 'b2', title: 'Temizlik Solüsyonu Kullanımı', icon: 'pill' },
      { id: 'b3', title: 'İçecek Kısıtlamaları', icon: 'alert' },
      { id: 'b4', title: 'İlaç Yönetimi', icon: 'clipboard' },
    ],
  },
  {
    id: 'ilac',
    title: 'AKILLI İLAÇ KULLANIM REHBERİ',
    color: C.orange,
    bgColor: C.orangeLight,
    icon: 'pill',
    items: [
      { id: 'i1', title: 'Toz İlaç Hazırlama', icon: 'clipboard' },
      { id: 'i2', title: 'Çoklu İlaç Kullanımı', icon: 'pill' },
      { id: 'i3', title: 'Yan Etkiler', icon: 'alert' },
      { id: 'i4', title: 'Saklama Koşulları', icon: 'info' },
    ],
  },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Birden fazla ilaç içmeniz gereken durumda ne yaparsınız?',
    options: [
      { label: 'A', text: 'Hepsini aynı anda alırım, daha pratik olur.' },
      { label: 'B', text: 'Her ilacı ayrı ayrı, belirli aralıklarla alırım.' },
      { label: 'C', text: 'Sadece en önemli gördüğüm ilacı alırım.' },
    ],
    correct: 'B',
    explanation:
      'İlaçlar arasındaki etkileşimi önlemek için her ilacı ayrı ayrı ve belirli aralıklarla almak gerekir.',
  },
  {
    id: 2,
    question: 'Kolonoskopi öncesinde katı gıdayı ne zaman kesmelisiniz?',
    options: [
      { label: 'A', text: 'İşlemden 24 saat önce' },
      { label: 'B', text: 'İşlemden 48 saat önce' },
      { label: 'C', text: 'İşlemden 1 saat önce' },
    ],
    correct: 'A',
    explanation:
      'Kolonoskopiden 24 saat önce katı gıdaları kesmek standart hazırlık protokolüdür.',
  },
  {
    id: 3,
    question: 'Temizlik solüsyonunu içerken hangi yöntemi uygulamalısınız?',
    options: [
      { label: 'A', text: 'Tek seferde hızlıca içmeyi tamamlarım.' },
      { label: 'B', text: '15 dakikada bir bardak, yavaş yavaş içerim.' },
      { label: 'C', text: 'İçmek istemiyorsam atlayabilirim.' },
    ],
    correct: 'B',
    explanation:
      "Solüsyonu yavaşça ve düzenli aralıklarla içmek bulantıyı azaltır ve bağırsak temizliğini optimize eder.",
  },
  {
    id: 4,
    question: 'Toz antibiyotik hazırlarken kaç mL su kullanılır?',
    options: [
      { label: 'A', text: '50 mL' },
      { label: 'B', text: '100 mL' },
      { label: 'C', text: '200 mL' },
    ],
    correct: 'B',
    explanation: 'Standart toz antibiyotik protokolüne göre 100 mL su kullanılmalıdır.',
  },
  {
    id: 5,
    question: 'Kolonoskopi sonrası ağrı ve gaz için ne yapmalısınız?',
    options: [
      { label: 'A', text: 'Hemen ağır bir yemek yerim.' },
      { label: 'B', text: 'Yavaş yürüyüş yaparak gaz hareketini kolaylaştırırım.' },
      { label: 'C', text: 'Hiçbir şey yapmadan beklemeye devam ederim.' },
    ],
    correct: 'B',
    explanation:
      'Hafif yürüyüş, işlem sonrası bağırsaklarda biriken gazın atılmasına yardımcı olur.',
  },
  {
    id: 6,
    question: 'Hangi içecekler kolonoskopi hazırlığında yasaktır?',
    options: [
      { label: 'A', text: 'Sadece kırmızı ve mor renkli içecekler' },
      { label: 'B', text: 'Tüm meyve suları' },
      { label: 'C', text: 'Sadece gazlı içecekler' },
    ],
    correct: 'A',
    explanation:
      'Kırmızı ve mor renkli içecekler bağırsak duvarını boyayarak değerlendirmeyi zorlaştırır.',
  },
  {
    id: 7,
    question: 'İlaçlarınızı hangi sıvıyla almanız önerilir?',
    options: [
      { label: 'A', text: 'Meyve suyu ile' },
      { label: 'B', text: 'Süt ile' },
      { label: 'C', text: 'Bol su ile' },
    ],
    correct: 'C',
    explanation: 'İlaçların emilimi için bol su ile alınması her zaman önerilir.',
  },
  {
    id: 8,
    question: 'Hazırlık solüsyonu içildikten ne kadar sonra bağırsak hareketleri başlar?',
    options: [
      { label: 'A', text: '30-60 dakika içinde' },
      { label: 'B', text: '5-10 dakika içinde' },
      { label: 'C', text: '3-4 saat sonra' },
    ],
    correct: 'A',
    explanation:
      "Çoğu hastada solüsyon alımından 30-60 dakika sonra bağırsak hareketleri başlar.",
  },
  {
    id: 9,
    question: 'Kolonoskopi işlemi kaç dakika sürer?',
    options: [
      { label: 'A', text: '5-10 dakika' },
      { label: 'B', text: '20-45 dakika' },
      { label: 'C', text: '2-3 saat' },
    ],
    correct: 'B',
    explanation: 'Standart bir kolonoskopi işlemi genellikle 20-45 dakika sürmektedir.',
  },
  {
    id: 10,
    question: 'Diyabetik hastalar kolonoskopi gününde hangi ek önlemi almalıdır?',
    options: [
      { label: 'A', text: 'Kan şekerini her 2 saatte bir ölçmelidir.' },
      { label: 'B', text: 'Normal insülin dozunu almaya devam etmelidir.' },
      { label: 'C', text: 'Hazırlığı tamamen atlayabilirler.' },
    ],
    correct: 'A',
    explanation:
      'Diyabetik hastalarda aç kalma süresi kan şekerini etkileyebileceğinden düzenli takip şarttır.',
  },
];

const SEQUENCING_STEPS = [
  { id: 1, text: 'Şişeye 100 mL su ekleyin' },
  { id: 2, text: 'Kısaca sallayarak tozu çözün' },
  { id: 3, text: 'Damla hesabını yapın (30 damla/dk)' },
  { id: 4, text: 'Uygun vene giriş sağlayın' },
  { id: 5, text: 'Solüsyonu 30 dakikada infüze edin' },
  { id: 6, text: 'İşlem sonrası kaydı tamamlayın' },
];

const SIDEBAR_ITEMS = [
  { id: 'Home', label: 'Ana Sayfa', icon: 'home' },
  { id: 'Quiz', label: 'Bilgi Testi', icon: 'brain' },
  { id: 'Sequencing', label: 'Sıralama Oyunu', icon: 'listordered' },
];

const CONTENT_DETAIL: Record<
  string,
  { title: string; body: string; color: string; bgColor: string }
> = {
  g1: {
    title: 'Kolonoskopi Nedir?',
    color: C.yellow,
    bgColor: C.yellowLight,
    body: `Kolonoskopi, kalın bağırsağın (kolon) ve rektumun iç yüzeyini görüntülemek için yapılan endoskopik bir işlemdir.\n\nUcunda küçük bir kamera bulunan ince, esnek bir boru (kolonoskop) anüsten girilerek bağırsağın tamamı incelenir.\n\n• Polip veya anormal doku görüldüğünde anında biyopsi alınabilir\n• Kanama odakları tespit edilip tedavi edilebilir\n• Kolorektal kanser taramasında altın standarttır`,
  },
  g2: {
    title: 'Neden Yapılır?',
    color: C.yellow,
    bgColor: C.yellowLight,
    body: `Kolonoskopi aşağıdaki durumlarda önerilir:\n\n• Rektal kanama veya koyu renkli dışkı\n• Açıklanamayan kilo kaybı\n• Bağırsak alışkanlıklarında değişiklik\n• 50 yaş üstü rutin tarama\n• Kolorektal kanser aile öyküsü\n• Kronik ishal veya kabızlık\n• Ülseratif kolit / Crohn hastalığı takibi`,
  },
  g3: {
    title: 'Hazırlık Süreci',
    color: C.yellow,
    bgColor: C.yellowLight,
    body: `İdeal kolonoskopi için bağırsak tamamen temiz olmalıdır.\n\n3 Gün Önce:\n• Posalı gıdaları azaltın\n• Kırmızı et tüketimini kısıtlayın\n\n1 Gün Önce:\n• Yalnızca sıvı beslenin\n• Kırmızı/mor renkli içeceklerden kaçının\n• Doktorunuzun önerdiği temizlik solüsyonunu alın\n\nİşlem Günü:\n• 4 saat öncesine kadar hiçbir şey yemeyin\n• Diyabet ilaçlarınızı doktorunuza danışarak düzenleyin`,
  },
  g4: {
    title: 'İşlem Sonrası Bakım',
    color: C.yellow,
    bgColor: C.yellowLight,
    body: `İşlem sonrası normal hissetmek birkaç saat alabilir.\n\n• Hafif şişkinlik ve gaz normaldir\n• Yavaş yürüyüş gazın atılmasına yardımcı olur\n• İlk öğününüz hafif ve az yağlı olmalı\n• 24 saat araç kullanmayın\n• Biyopsi alındıysa az miktarda kanama olabilir\n\n⚠️ Şiddetli karın ağrısı, ateş veya yoğun kanama durumunda acile başvurun.`,
  },
  b1: {
    title: 'Beslenme Önerileri',
    color: C.primary,
    bgColor: C.primaryLight,
    body: `İşlem öncesi 3 gün boyunca:\n\n✓ Tüketilebilecekler:\n• Beyaz ekmek, pirinç pilavı\n• Haşlanmış tavuk/balık\n• Muz, elma (kabuksuz)\n• Yoğurt, beyaz peynir\n• Berrak çorba, su, çay\n\n✗ Kaçınılacaklar:\n• Sebze ve meyve kabukları\n• Tam tahıl ürünleri\n• Kırmızı et\n• Sert çekirdekli meyveler\n• Bakliyat`,
  },
  b2: {
    title: 'Temizlik Solüsyonu Kullanımı',
    color: C.primary,
    bgColor: C.primaryLight,
    body: `Temizlik solüsyonu bağırsağı etkin şekilde boşaltır.\n\nKullanım Talimatı:\n1. Solüsyonu önerilen şekilde hazırlayın\n2. Akşam 18:00'de içmeye başlayın\n3. Her 15 dakikada bir tam bardak için\n4. Toplam 2-4 litre tüketin\n5. Sabah 6:00'da ikinci dozu alın\n\nİpuçları:\n• Soğuk içmek daha kolay tolere edilir\n• Bulantı hissinde 15 dk mola verin\n• Meyve aroması ekleyebilirsiniz`,
  },
  b3: {
    title: 'İçecek Kısıtlamaları',
    color: C.primary,
    bgColor: C.primaryLight,
    body: `Hazırlık sürecinde bazı içecekler kesinlikle yasaktır:\n\n🚫 Yasak İçecekler:\n• Kırmızı ve mor renkli her türlü içecek\n• Portakal ve domates suyu (kırmızı renk)\n• Vişne, çilek suları\n• Alkollü içecekler\n\n✅ İzin Verilen İçecekler:\n• Su (en iyi seçenek)\n• Berrak elma suyu\n• Limonlu su\n• Sade çay ve kahve (sütsüz)\n• Şeffaf et suyu`,
  },
  b4: {
    title: 'İlaç Yönetimi',
    color: C.primary,
    bgColor: C.primaryLight,
    body: `Kolonoskopi öncesinde bazı ilaçlar düzenlenmeli:\n\n⚠️ Doktorunuza Bildirin:\n• Kan sulandırıcılar (aspirin, warfarin)\n• Diyabet ilaçları\n• Demir takviyeleri\n• NSAID grubu ağrı kesiciler\n\n📋 Genellikle Sürdürülebilir:\n• Tansiyon ilaçları (az su ile)\n• Tiroid ilaçları\n• Kalp ilaçları\n\n⚠️ Hiçbir ilacı doktor onayı olmadan kesmeyin!`,
  },
  i1: {
    title: 'Toz İlaç Hazırlama',
    color: C.orange,
    bgColor: C.orangeLight,
    body: `Toz antibiyotik hazırlama protokolü:\n\n1️⃣ Şişeye 100 mL oda sıcaklığında su ekleyin\n2️⃣ Şişeyi kapağını kapatarak hafifçe sallayın\n3️⃣ Toz tamamen çözünene dek sallayın\n4️⃣ Solüsyon berrak görünene kadar bekleyin\n5️⃣ Damla hesabını yapın (standart: 30 damla/dk)\n6️⃣ Uygun vene venöz giriş sağlayın\n7️⃣ Solüsyonu 30 dakikada infüze edin\n\n⚠️ Bulanık veya renk değişikliği olan solüsyonu kullanmayın!`,
  },
  i2: {
    title: 'Çoklu İlaç Kullanımı',
    color: C.orange,
    bgColor: C.orangeLight,
    body: `Birden fazla ilaç kullanırken dikkat edilmesi gerekenler:\n\n• Her ilacı ayrı ayrı ve belirli aralıklarla alın\n• İlaçları asla birbirine karıştırmayın\n• Bol su ile alın\n• İlaç saatlerini düzenli takip edin\n\n⏰ Örnek Program:\n• 08:00 - İlaç 1\n• 12:00 - İlaç 2\n• 20:00 - İlaç 1\n\n📱 Hatırlatma için telefon alarmı kurmanız önerilir`,
  },
  i3: {
    title: 'Yan Etkiler',
    color: C.orange,
    bgColor: C.orangeLight,
    body: `Sık görülen yan etkiler ve yönetimi:\n\nBulantı:\n• İlaçları yemekten sonra alın\n• Küçük ve sık öğünler tüketin\n\nMide Yanması:\n• Yatmadan 2 saat önce almayın\n• Antasit önerilirse kullanın\n\nAlerjik Reaksiyon:\n• Döküntü, kaşıntı → Hemen doktora başvurun\n• Nefes darlığı → Acil yardım çağırın\n\n⚠️ Şiddetli yan etkilerde ilacı kesip doktorunuzu arayın`,
  },
  i4: {
    title: 'Saklama Koşulları',
    color: C.orange,
    bgColor: C.orangeLight,
    body: `İlaçların etkinliğini korumak için:\n\n🌡️ Sıcaklık:\n• Çoğu ilaç: oda sıcaklığı (15-25°C)\n• Şuruplar: buzdolabında (2-8°C)\n• Son kullanma tarihini kontrol edin\n\n☀️ Işık ve Nem:\n• Doğrudan güneş ışığından koruyun\n• Banyo dolabı yerine kuru bir yer seçin\n• Orijinal ambalajında saklayın\n\n🚫 Kesinlikle:\n• Araçta (ısı değişimi) bırakmayın\n• Çocukların ulaşamayacağı yerde tutun`,
  },
};

// ─── ICON HELPER ─────────────────────────────────────────────────────────────
function Icon({
  name,
  size = 20,
  color = C.text,
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  const props = { size, color };
  switch (name) {
    case 'home': return <Home {...props} />;
    case 'brain': return <Brain {...props} />;
    case 'listordered': return <ListOrdered {...props} />;
    case 'book': return <BookOpen {...props} />;
    case 'x': return <X {...props} />;
    case 'refresh': return <RefreshCw {...props} />;
    case 'chevronright': return <ChevronRight {...props} />;
    case 'chevronleft': return <ChevronLeft {...props} />;
    case 'menu': return <Menu {...props} />;
    case 'check': return <CheckCircle2 {...props} />;
    case 'xcircle': return <XCircle {...props} />;
    case 'rotate': return <RotateCcw {...props} />;
    case 'info': return <Info {...props} />;
    case 'pill': return <Pill {...props} />;
    case 'stethoscope': return <Stethoscope {...props} />;
    case 'heart': return <HeartPulse {...props} />;
    case 'clipboard': return <ClipboardList {...props} />;
    case 'utensils': return <Utensils {...props} />;
    case 'alert': return <AlertCircle {...props} />;
    case 'heartpulse': return <HeartPulse {...props} />;
    default: return <Info {...props} />;
  }
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('Home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contentId, setContentId] = useState<string>('g1');
  const sidebarAnim = useRef(new Animated.Value(-SCREEN_WIDTH * 0.75)).current;

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizDone, setQuizDone] = useState(false);

  // Sequencing state
  const [selectedSeq, setSelectedSeq] = useState<number[]>([]);
  const [seqModal, setSeqModal] = useState<'none' | 'success' | 'error'>('none');

  const navigate = (screen: string, id?: string) => {
    if (screen === 'Quiz') { setQuizIndex(0); setSelectedOption(null); setQuizAnswers({}); setQuizDone(false); }
    if (screen === 'Sequencing') { setSelectedSeq([]); setSeqModal('none'); }
    if (id) setContentId(id);
    setCurrentScreen(screen);
    closeSidebar();
  };

  const openSidebar = () => {
    setSidebarOpen(true);
    Animated.spring(sidebarAnim, { toValue: 0, useNativeDriver: true, tension: 80, friction: 12 }).start();
  };

  const closeSidebar = () => {
    Animated.spring(sidebarAnim, { toValue: -SCREEN_WIDTH * 0.75, useNativeDriver: true, tension: 80, friction: 12 }).start(() => setSidebarOpen(false));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home': return <HomeScreen navigate={navigate} openSidebar={openSidebar} />;
      case 'Content': return <ContentScreen contentId={contentId} navigate={navigate} openSidebar={openSidebar} />;
      case 'Quiz': return (
        <QuizScreen
          quizIndex={quizIndex} setQuizIndex={setQuizIndex}
          selectedOption={selectedOption} setSelectedOption={setSelectedOption}
          quizAnswers={quizAnswers} setQuizAnswers={setQuizAnswers}
          quizDone={quizDone} setQuizDone={setQuizDone}
          navigate={navigate} openSidebar={openSidebar}
        />
      );
      case 'Sequencing': return (
        <SequencingScreen
          selectedSeq={selectedSeq} setSelectedSeq={setSelectedSeq}
          seqModal={seqModal} setSeqModal={setSeqModal}
          navigate={navigate} openSidebar={openSidebar}
        />
      );
      default: return <HomeScreen navigate={navigate} openSidebar={openSidebar} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={C.primary} />
      {renderScreen()}
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeSidebar}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.45)' }}
        />
      )}
      <Animated.View
        style={{
          position: 'absolute', top: 0, left: 0, bottom: 0,
          width: SCREEN_WIDTH * 0.75,
          backgroundColor: C.white,
          transform: [{ translateX: sidebarAnim }],
          shadowColor: '#000', shadowOffset: { width: 4, height: 0 }, shadowOpacity: 0.18, shadowRadius: 12, elevation: 16,
          zIndex: 100,
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ backgroundColor: C.primary, paddingHorizontal: 20, paddingVertical: 28, paddingTop: Platform.OS === 'android' ? 40 : 28 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <Icon name="stethoscope" size={28} color={C.white} />
              <TouchableOpacity onPress={closeSidebar} style={{ padding: 4 }}>
                <Icon name="x" size={22} color={C.white} />
              </TouchableOpacity>
            </View>
            <Text style={{ color: C.white, fontSize: 17, fontWeight: '700', marginTop: 6 }}>
                {'Akılcı İlaç &'}
              </Text>
              <Text style={{ color: C.white, fontSize: 17, fontWeight: '700' }}>
                {'Kolonoskopi Asistanı'}
              </Text>
          </View>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}>
            {SIDEBAR_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => navigate(item.id)}
                style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, gap: 14 }}
              >
                <View style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: C.primaryLight, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={item.icon} size={18} color={C.primary} />
                </View>
                <Text style={{ color: C.text, fontSize: 15, fontWeight: '600' }}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            <View style={{ height: 1, backgroundColor: C.border, marginHorizontal: 20, marginVertical: 8 }} />
            <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
              <Text style={{ color: C.textSec, fontSize: 12, fontWeight: '600', letterSpacing: 0.8, marginBottom: 12 }}>KATEGORİLER</Text>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => navigate('Content', cat.items[0].id)}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10 }}
                >
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: cat.color }} />
                  <Text style={{ color: C.text, fontSize: 13, fontWeight: '500', flex: 1 }}>{cat.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

// ─── SHARED HEADER ────────────────────────────────────────────────────────────
function AppHeader({ title, onMenu, onRefresh, onBack, showBack = false }: { title: string; onMenu: () => void; onRefresh?: () => void; onBack?: () => void; showBack?: boolean }) {
  return (
    <View style={{ backgroundColor: C.primary, paddingTop: Platform.OS === 'android' ? 36 : 0, paddingBottom: 14, paddingHorizontal: 16 }}>
      <SafeAreaView>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {showBack && onBack ? (
            <TouchableOpacity onPress={onBack} style={{ padding: 6, borderRadius: 8 }}>
              <Icon name="chevronleft" size={22} color={C.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onMenu} style={{ padding: 6, borderRadius: 8 }}>
              <Icon name="menu" size={22} color={C.white} />
            </TouchableOpacity>
          )}
          <Text style={{ flex: 1, color: C.white, fontSize: 17, fontWeight: '700', letterSpacing: 0.3 }}>{title}</Text>
          {onRefresh && (
            <TouchableOpacity onPress={onRefresh} style={{ padding: 6, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <Icon name="refresh" size={18} color={C.white} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
function HomeScreen({ navigate, openSidebar }: { navigate: (s: string, id?: string) => void; openSidebar: () => void }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <AppHeader title="Akılcı İlaç & Kolonoskopi Asistanı" onMenu={openSidebar} onRefresh={() => {}} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        {/* Banner */}
        <View style={{ backgroundColor: C.primary, borderRadius: 16, padding: 18, marginBottom: 20, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="stethoscope" size={26} color={C.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: C.white, fontSize: 16, fontWeight: '700', marginBottom: 3 }}>Hoş Geldiniz</Text>
            <Text style={{ color: 'rgba(255,255,255,0.82)', fontSize: 13, lineHeight: 18 }}>Kolonoskopi hazırlığı ve akılcı ilaç kullanımı rehberiniz</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigate('Quiz')} style={{ flex: 1, backgroundColor: C.purpleLight, borderRadius: 14, padding: 16, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#E9D8FD' }}>
            <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: C.purple + '22', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="brain" size={20} color={C.purple} />
            </View>
            <Text style={{ color: C.purple, fontSize: 13, fontWeight: '700', textAlign: 'center' }}>Bilgi Testi</Text>
            <Text style={{ color: C.purple + 'AA', fontSize: 11, textAlign: 'center' }}>10 Soru</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Sequencing')} style={{ flex: 1, backgroundColor: C.blue2Light, borderRadius: 14, padding: 16, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#B2EBF2' }}>
            <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: C.blue2 + '22', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="listordered" size={20} color={C.blue2} />
            </View>
            <Text style={{ color: C.blue2, fontSize: 13, fontWeight: '700', textAlign: 'center' }}>Sıralama</Text>
            <Text style={{ color: C.blue2 + 'AA', fontSize: 11, textAlign: 'center' }}>Oyunu</Text>
          </TouchableOpacity>
        </View>

        {/* Category Cards */}
        {CATEGORIES.map((cat) => (
          <View key={cat.id} style={{ backgroundColor: C.white, borderRadius: 16, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3 }}>
            {/* Category Header */}
            <View style={{ backgroundColor: cat.bgColor, borderLeftWidth: 4, borderLeftColor: cat.color, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: cat.color + '22', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={cat.icon} size={20} color={cat.color} />
              </View>
              <Text style={{ flex: 1, color: C.text, fontSize: 14, fontWeight: '800', letterSpacing: 0.3, lineHeight: 20 }}>{cat.title}</Text>
            </View>
            {/* Sub-items */}
            {cat.items.map((item, idx) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => navigate('Content', item.id)}
                style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12, borderTopWidth: idx === 0 ? 0 : 1, borderTopColor: C.border }}
              >
                <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: cat.bgColor, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={item.icon} size={16} color={cat.color} />
                </View>
                <Text style={{ flex: 1, color: C.text, fontSize: 14, fontWeight: '500' }}>{item.title}</Text>
                <Icon name="chevronright" size={16} color={C.textSec} />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ─── CONTENT SCREEN ──────────────────────────────────────────────────────────
function ContentScreen({ contentId, navigate, openSidebar }: { contentId: string; navigate: (s: string, id?: string) => void; openSidebar: () => void }) {
  const detail = CONTENT_DETAIL[contentId];
  if (!detail) return null;

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <AppHeader title={detail.title} onMenu={openSidebar} onBack={() => navigate('Home')} showBack onRefresh={() => {}} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <View style={{ backgroundColor: detail.bgColor, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: detail.color, padding: 20, marginBottom: 16 }}>
          <Text style={{ color: C.text, fontSize: 15, lineHeight: 26, fontWeight: '400' }}>
            {detail.body}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigate('Quiz')}
          style={{ backgroundColor: C.primary, borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 8 }}
        >
          <Icon name="brain" size={20} color={C.white} />
          <Text style={{ color: C.white, fontWeight: '700', fontSize: 15 }}>Bilgi Testini Başlat</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ─── QUIZ SCREEN ─────────────────────────────────────────────────────────────
function QuizScreen({ quizIndex, setQuizIndex, selectedOption, setSelectedOption, quizAnswers, setQuizAnswers, quizDone, setQuizDone, navigate, openSidebar }: any) {
  const q = QUIZ_QUESTIONS[quizIndex];
  const total = QUIZ_QUESTIONS.length;
  const progress = (quizIndex + 1) / total;

  const handleSelect = (label: string) => {
    if (selectedOption) return;
    setSelectedOption(label);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    const newAnswers = { ...quizAnswers, [q.id]: selectedOption };
    setQuizAnswers(newAnswers);
    if (quizIndex < total - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizDone(true);
    }
  };

  if (quizDone) {
    const allAnswers = { ...quizAnswers, [q.id]: selectedOption };
    const correct = QUIZ_QUESTIONS.filter((qq) => allAnswers[qq.id] === qq.correct).length;
    const pct = Math.round((correct / total) * 100);
    const passed = pct >= 70;
    return (
      <View style={{ flex: 1, backgroundColor: C.bg }}>
        <AppHeader title="Test Sonucu" onMenu={openSidebar} onBack={() => navigate('Home')} showBack />
        <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center', paddingBottom: 40 }}>
          <View style={{ width: 110, height: 110, borderRadius: 55, backgroundColor: passed ? C.greenLight : C.redLight, alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 24, borderWidth: 3, borderColor: passed ? C.green : C.red }}>
            <Icon name={passed ? 'check' : 'xcircle'} size={52} color={passed ? C.green : C.red} />
          </View>
          <Text style={{ fontSize: 26, fontWeight: '800', color: C.text, marginBottom: 6 }}>{pct}%</Text>
          <Text style={{ fontSize: 16, fontWeight: '600', color: passed ? C.green : C.red, marginBottom: 20 }}>{passed ? 'Tebrikler! Başardınız.' : 'Tekrar deneyin.'}</Text>
          <View style={{ backgroundColor: C.white, borderRadius: 16, padding: 20, width: '100%', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3 }}>
            <Text style={{ color: C.text, fontSize: 15, fontWeight: '700', marginBottom: 12, textAlign: 'center' }}>Sonuç Özeti</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 28, fontWeight: '800', color: C.green }}>{correct}</Text>
                <Text style={{ color: C.textSec, fontSize: 12, marginTop: 2 }}>Doğru</Text>
              </View>
              <View style={{ width: 1, backgroundColor: C.border }} />
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 28, fontWeight: '800', color: C.red }}>{total - correct}</Text>
                <Text style={{ color: C.textSec, fontSize: 12, marginTop: 2 }}>Yanlış</Text>
              </View>
              <View style={{ width: 1, backgroundColor: C.border }} />
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 28, fontWeight: '800', color: C.primary }}>{total}</Text>
                <Text style={{ color: C.textSec, fontSize: 12, marginTop: 2 }}>Toplam</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => { setQuizIndex(0); setSelectedOption(null); setQuizAnswers({}); setQuizDone(false); }}
            style={{ backgroundColor: C.primary, borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%', justifyContent: 'center', marginBottom: 12 }}
          >
            <Icon name="rotate" size={18} color={C.white} />
            <Text style={{ color: C.white, fontWeight: '700', fontSize: 15 }}>Tekrar Başlat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate('Home')}
            style={{ borderWidth: 1.5, borderColor: C.primary, borderRadius: 14, padding: 16, width: '100%', alignItems: 'center' }}
          >
            <Text style={{ color: C.primary, fontWeight: '700', fontSize: 15 }}>Ana Sayfaya Dön</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <AppHeader title={`Sorular ${quizIndex + 1}/${total}`} onMenu={openSidebar} onBack={() => navigate('Home')} showBack />
      {/* Progress Bar */}
      <View style={{ height: 4, backgroundColor: C.border }}>
        <View style={{ height: 4, backgroundColor: C.primary, width: `${progress * 100}%` }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* Question Card */}
        <View style={{ backgroundColor: C.white, borderRadius: 16, padding: 20, marginBottom: 20, marginTop: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <View style={{ backgroundColor: C.primaryLight, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 5 }}>
              <Text style={{ color: C.primary, fontSize: 13, fontWeight: '700' }}>Soru {quizIndex + 1}</Text>
            </View>
          </View>
          <Text style={{ color: C.text, fontSize: 16, fontWeight: '600', lineHeight: 24 }}>{q.question}</Text>
        </View>

        {/* Options */}
        {q.options.map((opt: any) => {
          const isSelected = selectedOption === opt.label;
          const isCorrect = opt.label === q.correct;
          let bgColor = C.white;
          let borderColor = C.border;
          let textColor = C.text;
          let labelBg = C.bg;

          if (selectedOption) {
            if (isCorrect) { bgColor = C.greenLight; borderColor = C.green; textColor = C.text; labelBg = C.green; }
            else if (isSelected && !isCorrect) { bgColor = C.redLight; borderColor = C.red; textColor = C.text; labelBg = C.red; }
          } else if (isSelected) {
            bgColor = C.primaryLight; borderColor = C.primary; labelBg = C.primary;
          }

          return (
            <TouchableOpacity
              key={opt.label}
              onPress={() => handleSelect(opt.label)}
              activeOpacity={0.75}
              style={{ backgroundColor: bgColor, borderRadius: 14, borderWidth: 2, borderColor, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}
            >
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: labelBg, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: labelBg === C.bg ? C.textSec : C.white, fontWeight: '800', fontSize: 15 }}>{opt.label}</Text>
              </View>
              <Text style={{ flex: 1, color: textColor, fontSize: 14, fontWeight: '500', lineHeight: 20 }}>{opt.text}</Text>
              {selectedOption && isCorrect && <Icon name="check" size={22} color={C.green} />}
              {selectedOption && isSelected && !isCorrect && <Icon name="xcircle" size={22} color={C.red} />}
            </TouchableOpacity>
          );
        })}

        {/* Explanation */}
        {selectedOption && (
          <View style={{ backgroundColor: C.primaryLight, borderRadius: 14, padding: 16, marginTop: 4, flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
            <Icon name="info" size={18} color={C.primary} />
            <Text style={{ flex: 1, color: C.primaryDark, fontSize: 13, lineHeight: 20, fontWeight: '500' }}>{q.explanation}</Text>
          </View>
        )}

        {/* Next Button */}
        {selectedOption && (
          <TouchableOpacity
            onPress={handleNext}
            style={{ backgroundColor: C.primary, borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 16, flexDirection: 'row', justifyContent: 'center', gap: 10 }}
          >
            <Text style={{ color: C.white, fontWeight: '700', fontSize: 15 }}>
              {quizIndex < total - 1 ? 'Sonraki Soru' : 'Sonucu Gör'}
            </Text>
            <Icon name="chevronright" size={18} color={C.white} />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

// ─── SEQUENCING SCREEN ───────────────────────────────────────────────────────
function SequencingScreen({ selectedSeq, setSelectedSeq, seqModal, setSeqModal, navigate, openSidebar }: any) {
  const handleStepPress = (id: number) => {
    if (selectedSeq.includes(id)) {
      setSelectedSeq(selectedSeq.filter((s: number) => s !== id));
    } else {
      setSelectedSeq([...selectedSeq, id]);
    }
  };

  const checkOrder = () => {
    const correct = SEQUENCING_STEPS.map((s) => s.id);
    const isCorrect = JSON.stringify(selectedSeq) === JSON.stringify(correct);
    setSeqModal(isCorrect ? 'success' : 'error');
  };

  const reset = () => { setSelectedSeq([]); setSeqModal('none'); };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <AppHeader title="Toz Antibiyotik Hazırlama" onMenu={openSidebar} onBack={() => navigate('Home')} showBack onRefresh={reset} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <View style={{ backgroundColor: C.primaryLight, borderRadius: 14, padding: 14, marginBottom: 18, flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
          <Icon name="info" size={18} color={C.primary} />
          <Text style={{ flex: 1, color: C.primaryDark, fontSize: 13, lineHeight: 20, fontWeight: '500' }}>
            Adımları doğru sıraya göre seçin. Her adıma tıkladığınızda seçim sıranıza eklenir.
          </Text>
        </View>

        {/* Selected Order Preview */}
        {selectedSeq.length > 0 && (
          <View style={{ backgroundColor: C.white, borderRadius: 14, padding: 14, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
            <Text style={{ color: C.textSec, fontSize: 12, fontWeight: '700', letterSpacing: 0.8, marginBottom: 10 }}>SEÇİLEN SIRA</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {selectedSeq.map((id: number, idx: number) => {
                const step = SEQUENCING_STEPS.find((s) => s.id === id);
                return (
                  <View key={id} style={{ backgroundColor: C.primaryLight, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: C.white, fontSize: 10, fontWeight: '800' }}>{idx + 1}</Text>
                    </View>
                    <Text style={{ color: C.primaryDark, fontSize: 12, fontWeight: '600', maxWidth: 160 }} numberOfLines={1}>{step?.text}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Steps */}
        {SEQUENCING_STEPS.map((step, index) => {
          const seqPosition = selectedSeq.indexOf(step.id);
          const isSelected = seqPosition !== -1;
          return (
            <TouchableOpacity
              key={step.id}
              onPress={() => handleStepPress(step.id)}
              activeOpacity={0.75}
              style={{
                backgroundColor: isSelected ? C.primary : C.white,
                borderRadius: 14,
                padding: 16,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 14,
                borderWidth: 2,
                borderColor: isSelected ? C.primaryDark : C.border,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isSelected ? 0.12 : 0.05,
                shadowRadius: 6,
                elevation: isSelected ? 4 : 2,
              }}
            >
              <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : C.primaryLight, alignItems: 'center', justifyContent: 'center' }}>
                {isSelected ? (
                  <Text style={{ color: C.white, fontWeight: '800', fontSize: 16 }}>{seqPosition + 1}</Text>
                ) : (
                  <Icon name="listordered" size={18} color={C.primary} />
                )}
              </View>
              <Text style={{ flex: 1, color: isSelected ? C.white : C.text, fontSize: 14, fontWeight: isSelected ? '700' : '500', lineHeight: 20 }}>{step.text}</Text>
              {isSelected && <Icon name="check" size={20} color={C.white} />}
            </TouchableOpacity>
          );
        })}

        {/* Action Buttons */}
        <View style={{ gap: 12, marginTop: 8 }}>
          <TouchableOpacity
            onPress={checkOrder}
            disabled={selectedSeq.length !== SEQUENCING_STEPS.length}
            style={{ backgroundColor: selectedSeq.length === SEQUENCING_STEPS.length ? C.primary : C.border, borderRadius: 14, padding: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10 }}
          >
            <Icon name="check" size={20} color={C.white} />
            <Text style={{ color: C.white, fontWeight: '700', fontSize: 15 }}>
              {selectedSeq.length === SEQUENCING_STEPS.length ? 'Sıralamayı Kontrol Et' : `${selectedSeq.length}/${SEQUENCING_STEPS.length} Seçildi`}
            </Text>
          </TouchableOpacity>
          {selectedSeq.length > 0 && (
            <TouchableOpacity
              onPress={reset}
              style={{ borderWidth: 1.5, borderColor: C.textSec, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <Icon name="rotate" size={16} color={C.textSec} />
              <Text style={{ color: C.textSec, fontWeight: '600', fontSize: 14 }}>Sıfırla</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Result Modal */}
      <Modal visible={seqModal !== 'none'} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <View style={{ backgroundColor: C.white, borderRadius: 20, padding: 28, width: '100%', maxWidth: 340, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 16 }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: seqModal === 'success' ? C.greenLight : C.redLight, alignItems: 'center', justifyContent: 'center', marginBottom: 18, borderWidth: 3, borderColor: seqModal === 'success' ? C.green : C.red }}>
              <Icon name={seqModal === 'success' ? 'check' : 'xcircle'} size={40} color={seqModal === 'success' ? C.green : C.red} />
            </View>
            <Text style={{ fontSize: 22, fontWeight: '800', color: C.text, marginBottom: 10, textAlign: 'center' }}>
              {seqModal === 'success' ? 'Mükemmel!' : 'Yanlış Sıralama'}
            </Text>
            <Text style={{ fontSize: 14, color: C.textSec, textAlign: 'center', lineHeight: 22, marginBottom: 24 }}>
              {seqModal === 'success'
                ? 'Toz antibiyotik hazırlama adımlarını doğru sıraladınız. Harika iş!'
                : 'Sıralama doğru değil. Adımları dikkatlice tekrar okuyup yeniden deneyin.'}
            </Text>
            <View style={{ gap: 10, width: '100%' }}>
              {seqModal === 'error' && (
                <TouchableOpacity
                  onPress={reset}
                  style={{ backgroundColor: C.primary, borderRadius: 12, padding: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
                >
                  <Icon name="rotate" size={16} color={C.white} />
                  <Text style={{ color: C.white, fontWeight: '700', fontSize: 15 }}>Tekrar Dene</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => { setSeqModal('none'); if (seqModal === 'success') navigate('Home'); }}
                style={{ borderWidth: 1.5, borderColor: seqModal === 'success' ? C.green : C.border, borderRadius: 12, padding: 14, alignItems: 'center' }}
              >
                <Text style={{ color: seqModal === 'success' ? C.green : C.textSec, fontWeight: '700', fontSize: 15 }}>
                  {seqModal === 'success' ? 'Ana Sayfaya Dön' : 'Kapat'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
