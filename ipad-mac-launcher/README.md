# Erol OS iPad Launcher

iPad ana ekranında Dock'a eklenebilen, macOS Finder görünümünde bir uygulama klasörü/başlatıcıdır. Kullanıcının ekran görüntülerindeki uygulamalar kategori, arama, macOS tarzı simgeler ve özelleştirilebilir favori Dock'u ile önceden tanımlıdır.

## Çalıştırma

```bash
cd ipad-mac-launcher
npm run serve
```

Ardından `http://localhost:4173` adresini açın.

## iPad'e kurma

1. Uygulamayı HTTPS üzerinden yayınlayın ve iPad'de Safari ile açın.
2. Paylaş menüsünden **Ana Ekrana Ekle** seçeneğini kullanın.
3. Oluşan **Erol OS** simgesine basılı tutup iPad Dock'una sürükleyin.

Başlatıcı kurulduktan sonra çevrimdışı çalışır. **Düzenle** ile favoriler değiştirilebilir; **Ekle** ile yeni web veya uygulama bağlantıları eklenebilir.

## Teknik sınır

iPadOS, üçüncü taraf uygulamalara cihazdaki uygulamaları otomatik listeleme, sistem Dock'unu değiştirme veya başka uygulamaların işlemlerini sonlandırma yetkisi vermez. Bu nedenle başlatıcı önceden tanımlı Universal Link'leri, desteklenen URL şemalarını ve kullanıcının eklediği bağlantıları kullanır. Bir uygulama URL şeması sağlamıyorsa başlatıcı uygulamanın web sürümünü açar veya bağlantı eklenmesi gerektiğini bildirir.

## Test

```bash
npm run icons
npm test
```

## iOS uygulaması / App Store

Bu arayüzü iPhone + iPad için yerel bir iOS uygulaması olarak paketlemek ve App Store'a göndermek için [APP_STORE.md](APP_STORE.md) dosyasına bakın. Web varlıklarını uygulama paketine hazırlamak için:

```bash
npm run build:web
```

## Yerel Hermes sohbeti

Mac'te Ollama ve `hermes3-tr` modeli hazırken `npm run serve:hermes` komutunu çalıştırın.
`http://127.0.0.1:4173/` adresinde Favoriler veya Yapay Zekâ kategorisindeki Hermes simgesi sohbeti açar.
Sunucu yalnızca loopback üzerinde dinler. Model mesaj gönderildiğinde kullanılır ve yanıt sonrasında bellekten çıkarılır.
Sohbet geçmişi açık sayfanın belleğinde tutulur; sayfayı kapatmak veya Yeni sohbet düğmesi geçmişi temizler.

Bu adres iPad'de Mac'e ulaşmaz. iPad erişimi için Mac sunucusuna Tailscale Serve üzerinden bağlantı ayrıca kurulmalıdır; şu an yapılandırılmadı.

Kontroller: `npm test`, `npm run build:web`, `python3 -m unittest discover -s tools -p 'test_serve_hermes.py'`.
