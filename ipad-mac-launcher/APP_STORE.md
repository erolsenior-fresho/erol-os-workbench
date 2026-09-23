# Erol OS — iOS uygulaması olarak paketleme ve App Store

Bu klasördeki web arayüzü, [Capacitor](https://capacitorjs.com/) ile **tek bir evrensel iOS uygulamasına** (iPhone + iPad) dönüştürülecek şekilde hazırlandı. Web varlıkları uygulamanın içine gömülür; çevrimdışı çalışır, sunucu gerektirmez.

> Not: Kaynak imzalama, App Store Connect ve inceleme adımları **yalnızca bir Mac + Xcode ve senin Apple Developer hesabınla** yapılabilir. Aşağıdaki adımları Mac üzerinde sen çalıştırırsın.

## Gerekenler

- **Mac** (macOS) + **Xcode** (App Store'dan)
- **CocoaPods**: `sudo gem install cocoapods` (veya `brew install cocoapods`)
- **Node.js 18+**
- **Apple Developer Program** üyeliği — yıllık **99 USD** (uygulamayı satmak/yayınlamak için zorunlu)

## Uygulamayı oluşturma (Mac'te)

```bash
cd ipad-mac-launcher
npm install

# Web varlıklarını paketle ve iOS projesini oluştur (ilk sefer)
npm run ios:add

# Xcode'da aç
npm run ios:open
```

Xcode açıldığında `App` hedefinde:

1. **Signing & Capabilities** → *Team* olarak kendi Apple Developer hesabını seç (otomatik imzalama açık).
2. **Bundle Identifier**: `com.erolos.launcher` (kendi ters-alan-adınla değiştirebilirsin; App Store Connect'te bu kimlikle uygulama oluşturacaksın).
3. **General → Deployment Info → iPhone/iPad**: evrensel (Universal) olarak bırak; minimum iOS sürümünü seç (örn. iOS 15).
4. **App Icons**: Assets kataloğuna uygulama simgesini ekle. Hazır 1024×1024 üretmek için (opsiyonel):
   ```bash
   npm i -D @capacitor/assets
   npx capacitor-assets generate --ios   # icons/icon-512.png'yi büyütmen gerekebilir
   ```
5. Bir simülatörde veya bağlı cihazda **Run** ile test et.

## Web arayüzünü güncelledikten sonra

Arayüzde (ikonlar, dock, apps-data vb.) değişiklik yaptığında:

```bash
npm run ios:sync   # web'i yeniden paketler ve iOS projesine kopyalar
```

Sonra Xcode'da tekrar Run/Archive.

## App Store'a gönderme (satış)

1. [App Store Connect](https://appstoreconnect.apple.com/) → **My Apps → +** ile yeni uygulama oluştur (yukarıdaki Bundle ID ile).
2. **Pricing and Availability**: ücretli bir fiyat katmanı seç (satmak için). Apple, satışlardan **%15–30 komisyon** alır.
3. Uygulama bilgileri: ad, açıklama, anahtar kelimeler, kategori, gizlilik politikası URL'si, **ekran görüntüleri** (iPhone + iPad boyutları).
4. Xcode'da: **Product → Archive → Distribute App → App Store Connect → Upload**.
5. App Store Connect'te yüklenen derlemeyi seçip **incelemeye gönder**.

## Ücretsiz alternatif (App Store'suz)

App Store'a hiç girmeden, aynı arayüzü iPad/iPhone ana ekranına **PWA** olarak ekleyebilirsin: Safari'de siteyi aç → **Paylaş → Ana Ekrana Ekle**. Ücret yok, inceleme yok, anında.

## Önemli: App Store inceleme ve marka riski

Bu başlatıcı, üçüncü taraf uygulama adlarını ve marka-renkli simgeleri içeriyor. Kişisel kullanım için sorun değil; ancak **App Store'da satış** için Apple'ın kuralları risk yaratır:

- **Guideline 4.3 (Spam / minimum işlevsellik)**: Ağırlıklı olarak "bağlantı/kısayol" toplayan başlatıcı uygulamaları reddedilebilir. Özgün, katma değerli işlevler eklemek gerekir.
- **Guideline 5.2 (Fikri mülkiyet)**: Başka şirketlerin ticari markalarını/logolarını izinsiz kullanmak redde veya kaldırmaya yol açabilir.

Öneri: Satılacak sürümde **kendi özgün markanı/simgelerini** kullan, üçüncü taraf marka işaretlerini sınırla veya ilgili izinleri al. (Bu depodaki simgeler zaten marka renkleri + açık lisanslı `simple-icons` işaretlerinden türetilmiş özgün, macOS tarzı yorumlardır; birebir kopya değildir — yine de ticari dağıtım için hukuki değerlendirme önerilir.)
