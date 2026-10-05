const otherIOSBrowserPattern = /(EdgiOS|FxiOS|OPiOS)/i;

export const detectInstallContext = ({
  userAgent = "",
  platform = "",
  maxTouchPoints = 0,
  standalone = false
} = {}) => {
  const isiPadOS =
    /iPad|iPhone|iPod/i.test(userAgent) ||
    (platform === "MacIntel" && Number(maxTouchPoints) > 1);
  const isChrome = isiPadOS && /CriOS/i.test(userAgent);
  const isSafari =
    isiPadOS &&
    /Safari/i.test(userAgent) &&
    !isChrome &&
    !otherIOSBrowserPattern.test(userAgent);

  return { isiPadOS, isChrome, isSafari, standalone };
};

const installedGuide = {
  buttonTitle: "Ana ekrana eklendi",
  buttonSubtitle: "Kurulum tamamlandı",
  eyebrow: "KURULUM TAMAM",
  title: "Erol OS ana ekranda",
  steps: [
    "Erol OS şu anda ana ekran uygulaması olarak çalışıyor.",
    "Tarayıcı araç çubukları olmadan bağımsız pencereyi kullanabilirsiniz.",
    "Dock’a taşımak için ana ekrandaki Erol OS simgesine basılı tutun."
  ],
  note: "Safari ve Chrome kurulumları favorileri ve özel bağlantıları ayrı saklar.",
  hideButton: true
};

const chromeGuide = {
  buttonTitle: "Chrome’dan yükle",
  buttonSubtitle: "Ana ekrana ekleme adımları",
  eyebrow: "IPAD CHROME KURULUMU",
  title: "Chrome’dan ana ekrana ekle",
  steps: [
    "Bu sayfayı iPad’de Chrome ile açık tutun.",
    "Adres çubuğunun sağındaki Paylaş düğmesine dokunup Ana Ekrana Ekle seçin.",
    "Ekle’ye dokunun; ardından Erol OS simgesini isterseniz Dock’a sürükleyin."
  ],
  note: "Ana Ekrana Ekle görünmüyorsa Chrome’u ve iPadOS’i güncelleyin. Bu özellik iPadOS 16.4 veya yenisini gerektirir.",
  hideButton: false
};

const safariGuide = {
  buttonTitle: "Safari’den yükle",
  buttonSubtitle: "Ana ekrana ekleme adımları",
  eyebrow: "IPAD SAFARI KURULUMU",
  title: "Safari’den ana ekrana ekle",
  steps: [
    "Bu sayfayı iPad’de Safari ile açık tutun.",
    "Araç çubuğundaki Paylaş düğmesine dokunup Ana Ekrana Ekle seçin.",
    "Ekle’ye dokunun; ardından Erol OS simgesini isterseniz Dock’a sürükleyin."
  ],
  note: "Erol OS kurulduktan sonra bağımsız pencere ve çevrimdışı uygulama kabuğuyla çalışır.",
  hideButton: false
};

const genericGuide = {
  buttonTitle: "Ana ekrana ekle",
  buttonSubtitle: "iPad kurulum adımları",
  eyebrow: "IPAD KURULUMU",
  title: "Başlatıcıyı ana ekrana ekle",
  steps: [
    "Bu bağlantıyı iPad’de güncel Safari veya Chrome ile açın.",
    "Tarayıcının Paylaş menüsünden Ana Ekrana Ekle seçeneğine dokunun.",
    "Ekle’ye dokunun; ardından Erol OS simgesini isterseniz Dock’a sürükleyin."
  ],
  note: "iPadOS’ta kurulum kullanıcı tarafından Paylaş menüsünden tamamlanır; otomatik kurulum istemi desteklenmez.",
  hideButton: false
};

export const getInstallGuide = (context) => {
  if (context.standalone) return installedGuide;
  if (context.isChrome) return chromeGuide;
  if (context.isSafari) return safariGuide;
  return genericGuide;
};
