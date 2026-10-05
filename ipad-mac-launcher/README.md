# Erol OS iPad Launcher

iPad ana ekranında Dock'a eklenebilen, macOS Finder görünümünde bir uygulama klasörü/başlatıcıdır. Kullanıcının ekran görüntülerindeki uygulamalar kategori, arama, macOS tarzı simgeler ve özelleştirilebilir favori Dock'u ile önceden tanımlıdır.

## Çalıştırma

```bash
cd ipad-mac-launcher
npm run serve
```

Ardından `http://localhost:4173` adresini açın.

## iPad'e kurma

Uygulama iPadOS 16.4 veya üzerinde Safari ya da Chrome kullanılarak kurulabilir.

### Safari

1. Uygulamayı HTTPS üzerinden yayınlayın ve iPad'de Safari ile açın.
2. Araç çubuğundaki Paylaş düğmesine dokunup **Ana Ekrana Ekle** seçeneğini kullanın.
3. **Ekle**'ye dokunun.

### Chrome

1. Uygulamayı iPad'de güncel Chrome ile açın.
2. Adres çubuğunun sağındaki Paylaş düğmesine dokunup **Ana Ekrana Ekle** seçeneğini kullanın.
3. **Ekle**'ye dokunun. Seçenek görünmüyorsa Chrome'u ve iPadOS'i güncelleyin.

Oluşan **Erol OS** simgesine basılı tutup iPad Dock'una sürükleyebilirsiniz.

Başlatıcı kurulduktan sonra çevrimdışı çalışır. **Düzenle** ile favoriler değiştirilebilir; **Ekle** ile yeni web veya uygulama bağlantıları eklenebilir.

## Teknik sınır

iPadOS, üçüncü taraf uygulamalara cihazdaki uygulamaları otomatik listeleme, sistem Dock'unu değiştirme veya başka uygulamaların işlemlerini sonlandırma yetkisi vermez. Bu nedenle başlatıcı önceden tanımlı Universal Link'leri, desteklenen URL şemalarını ve kullanıcının eklediği bağlantıları kullanır. Doğrulanmış bağlantısı olmayan simgeler bağlantı eklenmesi gerektiğini bildirir; App Store araması uygulamayı açmanın yerine geçmez. **Listeyi Temizle** yalnızca Erol OS'un oturum içinde açılan bağlantı kaydını temizler. Dock'taki süre, bağlantıya dokunulmasından beri geçen süredir; dış uygulamanın çalıştığını göstermez.

Service worker yeni sürümü arka planda hazırlar. Açık sayfanın kodunu değiştirmemek için güncelleme, bütün Erol OS sekmeleri kapandıktan sonra etkinleşir. Sonraki açılışta yeni sürüm yüklenir; uygulama kabuğunun önbelleğe alınmış içeriği çevrimdışı kullanılabilir, dış bağlantılar ağ gerektirebilir.

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
