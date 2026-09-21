# Erol OS iPad Launcher

iPad ana ekranında Dock'a eklenebilen, macOS Finder görünümünde bir uygulama klasörü/başlatıcıdır. Kullanıcının ekran görüntülerindeki uygulamalar kategori, arama ve özelleştirilebilir favori Dock'u ile önceden tanımlıdır.

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

iPadOS, üçüncü taraf uygulamalara cihazdaki uygulamaları otomatik listeleme veya sistem Dock'unu değiştirme yetkisi vermez. Bu nedenle başlatıcı önceden tanımlı Universal Link'leri, desteklenen URL şemalarını ve kullanıcının eklediği bağlantıları kullanır. Bir uygulama URL şeması sağlamıyorsa başlatıcı uygulamanın web sürümünü açar veya bağlantı eklenmesi gerektiğini bildirir.

## Test

```bash
npm test
```
