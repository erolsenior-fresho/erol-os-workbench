# ACIL: GoDaddy -> Hetzner Domain ve Hesap Gecis Plani

**Oncelik:** ACIL / P1  
**Kayit tarihi:** 2026-06-13  
**Durum:** Hazirlik bekliyor - tasinacak ilk domain adi gerekli

## Degismez Kapsam

- Hostinger'a dokunulmayacak.
- Hostinger'daki web siteleri, domainler, DNS kayitlari, nameserver'lar ve hosting servisleri mevcut haliyle kalacak.
- Bu kayit herhangi bir registrar, DNS veya hosting degisikligini otomatik olarak yetkilendirmez.

## Hedef

1. GoDaddy hesabindaki tum domainleri, domain bilgilerini ve ilgili yonetim kayitlarini envantere almak.
2. Desteklenen domainleri GoDaddy'den Hetzner'a tasimak.
3. Hetzner ilgili uzanti ve musteri bolgesi icin registrar transferini destekliyorsa domain yenileme/faturalandirmasini da Hetzner'a almak.
4. GoDaddy reseller yapisini inceleyip Hetzner'da karsilik gelen altyapiyi kurmak ve musterileri kontrollu olarak gecirmek.
5. Ilk olarak kullanicinin belirleyecegi tek bir domaini pilot transfer olarak tamamlamak.

## Acil Pilot Domain

- **Oncelikli aday:** gpsciyiz.biz
- **Mevcut registrar:** GoDaddy
- **Hedef registrar:** Hetzner (uzanti destegi ve transfer uygunlugu dogrulanirsa)
- **Hosting/DNS:** Mevcut hizmet kesintiye ugramayacak sekilde korunacak
- **Kritik durum:** GoDaddy ekraninda 2026-06-13 tarihinde suresi dolmus gorunuyor. Transferden once yenileme/kurtarma durumu ve transfer uygunlugu derhal kontrol edilmeli.

### 2026-06-16 Canli Koruma Kontrolu

Kullanici karari: `gpsciyiz.biz` tutulacak.

RDAP kontrolu:

- Domain: `gpsciyiz.biz`
- Registrar: `GoDaddy.com, LLC`
- Status: `active`, `renew period`
- Registration date: `2007-06-13T08:29:37Z`
- Expiration date: `2028-06-12T23:59:59Z`
- Last changed: `2026-06-13T11:24:27Z`
- RDAP database update: `2026-06-16T19:38:22Z`

DNS snapshot:

- NS: `ns55.domaincontrol.com`, `ns56.domaincontrol.com`
- A: `13.248.213.45`, `76.223.67.189`
- `www.gpsciyiz.biz`: CNAME -> `gpsciyiz.biz`
- Public MX/TXT kaydi bu kontrol aninda gorunmedi.

Interpretation:

- Domain dusmus gorunmuyor; public registry kaydi aktif.
- `renew period` ve 2028 expiration, GoDaddy tarafinda yenilemenin islenmis olabilecegini gosteriyor.
- Bu asamada ilk hedef transfer degil, GoDaddy icinde yenileme/fatura/DNS durumunu kanitlamak ve auto-renew/payment riskini kapatmaktir.

Immediate retention actions:

1. GoDaddy panelinde `gpsciyiz.biz` expiration tarihinin 2028-06-12/13 civarina uzadigini dogrula.
2. Yenileme faturasi/order receipt kaydini indir veya ekran goruntusuyle belge.
3. Auto-renew acik mi, odeme yontemi gecerli mi, failed payment/renewal warning var mi kontrol et.
4. Domain lock/protection/privacy durumunu goruntule; transfer dusunulmeden degistirme.
5. DNS zone export veya ekran goruntusu al; mevcut NS/A/CNAME kayitlarini koru.
6. E-posta kullanimi varsa MX kaydi olmadigi icin ayrica panelden ve aktif posta hesaplarindan dogrula.
7. Transfer opsiyonunu yalnizca Hetzner `.biz` destegi, EPP code, lock/protection ve yenileme muhasebesi netlestikten sonra degerlendir.

## GoDaddy Ekranindan Ilk Envanter

| Domain | GoDaddy ekranindaki durum/tarih |
|---|---|
| gpsciyiz.biz | Suresi doldu - 2026-06-13 |
| tdturkey.com | Otomatik yenileme - 2026-06-13 |
| dikeyelektronik.net | Otomatik yenileme - 2026-06-19 |
| dikeysatis.net | Otomatik yenileme - 2026-06-30 |
| dikeysatis.com | Otomatik yenileme - 2026-06-30 |
| otelip.com | Otomatik yenileme - 2026-07-08 |
| 4quadro.net | Iptal tarihi - 2026-07-08 |
| 4quadro.com | Iptal tarihi - 2026-07-08 |
| debagkimya.com | Otomatik yenileme - 2026-12-02 |
| debagkimya.net | Otomatik yenileme; tarih ekran goruntusunde tam gorunmuyor |
| utku.info | Otomatik yenileme - 2027-05-06 |
| dijitaltv.net | Otomatik yenileme - 2027-05-18 |
| dikeybox.com | Otomatik yenileme - 2027-05-18 |
| qamsistem.net | Otomatik yenileme - 2027-10-02 |
| hdtvturkey.com | Otomatik yenileme - 2028-06-11 |
| dikeysatis.info | Ekranda mevcut; tarih tam gorunmuyor |

Bu liste ekran goruntusunde gorunen kayitlarla sinirlidir; GoDaddy hesabinin tam domain disari aktarimi ile tamamlanmalidir.

### Domain Disi GoDaddy Urunu

- `Kurumsal E-posta Bireysel / Yeni Hesap`: otomatik yenileme - 2026-11-20.
- Bu e-posta urunu domain transferinden ayridir. Posta kutusu, adresler, DNS `MX/SPF/DKIM/DMARC` kayitlari ve arsiv ihtiyaci belirlenmeden iptal edilmemelidir.

### E-posta Maliyet ve Tasima Notu

- Kullanici bilgisine gore HostGator ve bazi GoDaddy planlarinda e-posta ayrica ucretlendirilmeden plana dahildi.
- Hostinger'da domain basina ilk 5 posta kutusundan sonrasi icin ek fiyatlandirma uygulanabiliyor; kesin limit ve fiyat mevcut plan/fatura uzerinden dogrulanmalidir.
- Bu nedenle hosting saglayicilarinin maliyeti yalnizca domain ve disk fiyatiyla karsilastirilmamalidir.
- Her domain icin posta kutusu sayisi, kota, arsiv boyutu, alias/forwarder, mailing list ve aktif kullanici sayisi envantere alinmalidir.
- Kendi Hetzner sunucumuzda WHM/cPanel ile posta kutusu sayisi lisans paketinin hesap limiti ve sunucu kaynaklari dahilinde yonetilebilir. Ancak e-posta teknik olarak bedelsiz degildir; disk, yedek, spam filtreleme, IP itibari, teslim edilebilirlik ve sunucu yonetimi maliyeti vardir.
- Kritik e-posta hesaplari ilk asamada mevcut saglayicida veya ayri bir e-posta hizmetinde tutulmalidir. Web siteleri basariyla tasinmadan toplu e-posta gecisi yapilmamalidir.
- GoDaddy/HostGator/Hostinger hesaplari, posta kutulari ve arsivleri tasinip `MX`, `SPF`, `DKIM` ve `DMARC` kayitlari dogrulanmadan kapatilmamalidir.

#### E-posta Envanteri Icin Gerekli Alanlar

| Alan | Aciklama |
|---|---|
| Domain | E-postanin bagli oldugu domain |
| Saglayici | GoDaddy, HostGator veya Hostinger |
| Posta kutusu sayisi | Aktif kullanici hesaplari |
| Alias/forwarder | Ayrica tasinacak yonlendirmeler |
| Toplam kullanim | Posta arsivinin GB cinsinden boyutu |
| Kritik hesaplar | Satis, muhasebe, destek ve yonetim |
| Mevcut ucret | Pakete dahil veya ek ucretli |
| Hedef model | Kendi sunucumuz veya ayri e-posta hizmeti |

### Iptal Isaretli Domainler

- `4quadro.net` ve `4quadro.com` icin ekranda `Iptal tarihi: 2026-07-08` gorunuyor.
- Bu kayitlarin kullanici tarafindan bilerek birakilip birakilmadigi teyit edilmelidir.
- Korunacaklarsa 2026-07-08 beklenmeden iptal durumu geri alinmali ve transfer uygunlugu kontrol edilmelidir.

### GoDaddy Fatura Goruntusunden Okunabilen Tutarlar

| Fatura tarihi | Gorunen tutar |
|---|---:|
| 2026-05-17 | EUR 43.55 |
| 2025-11-20 | TRY 863.86 |
| 2025-10-03 | TRY 1,939.66 |
| 2025-07-01 | TRY 4,343.29 |
| 2025-06-21 | TRY 1,695.53 |
| 2025-06-20 | TRY 967.76 |
| 2025-05-19 | TRY 1,575.53 |

- Ekranda siparislerin urun detayi gorunmedigi icin bu tutarlar simdilik belirli domainlerle eslestirilmemistir.
- Saglikli maliyet karsilastirmasi icin GoDaddy CSV/fatura detayinda urun, sure, vergi, indirim ve yenileme kalemleri ayrilmalidir.

### CSV ile Dogrulanan Fatura ve Yillik Maliyetler

Kaynak: `receipts.csv`, 2026-06-13 tarihinde incelendi. Kisisel adres, telefon, e-posta ve odeme bilgileri maliyet raporuna alinmadi.

| Domain / urun | Sure | Fatura toplami | Yilliklandirilmis toplam |
|---|---:|---:|---:|
| hdtvturkey.com | 2 yil | EUR 53.18 | EUR 26.59/yil |
| dijitaltv.net | 1 yil | EUR 25.93 | EUR 25.93/yil |
| dikeybox.com | 1 yil | EUR 22.99 | EUR 22.99/yil |
| utku.info | 1 yil | EUR 43.55 | EUR 43.55/yil |
| qamsistem.net | 2 yil | TRY 1,939.66 | TRY 969.83/yil |
| dikeysatis.info | 3 yil | TRY 4,343.29 | TRY 1,447.76/yil |
| dikeyelektronik.com | 2 yil | TRY 1,695.53 | TRY 847.77/yil |
| dikeyelektronik.net | 1 yil | TRY 967.76 | TRY 967.76/yil |
| Kurumsal e-posta | 1 yil | TRY 863.86 | TRY 863.86/yil |

#### Mutabakat

- Toplam 9 fatura satiri: 8 domain yenilemesi ve 1 kurumsal e-posta yenilemesi.
- CSV'deki EUR faturalarinin vergi dahil toplami: `EUR 145.65`.
- EUR domainlerin yilliklandirilmis toplami: `EUR 119.06/yil`.
- CSV'deki TRY faturalarinin vergi dahil toplami: `TRY 9,810.10`.
- TRY domainlerin yilliklandirilmis toplami: `TRY 4,233.12/yil`.
- Kurumsal e-posta, domain transfer maliyetinden ayri tutuldu.
- Para birimleri tarihsel kurla birbirine cevrilmedi; EUR ve TRY ayri raporlandi.
- Incelenen kayitlarda `.info` yenilemeleri en pahali domain kalemleridir.

Detayli calisma kitabi: `outputs/godaddy_cost_audit/GoDaddy_Maliyet_Envanteri_2026-06-13.xlsx`

## Birlesik Saglayici Maliyet ve Kullanim Denetimi

### Amac

GoDaddy, HostGator ve Hostinger'daki her domain/site icin gercek kullanim, aktiflik, e-posta ihtiyaci ve yillik maliyeti tek tabloda karsilastirarak Hetzner'a tasimanin net ekonomik etkisini hesaplamak.

### Guvenli Erisim Kurali

- Parolalar sohbet, prompt, dokuman veya rapora yazilmayacak.
- Mevcut oturum veya gecici parola ile salt okunur envanter alinacak.
- Kullanici onayi olmadan DNS, hosting, e-posta, nameserver, otomatik yenileme veya abonelik degisikligi yapilmayacak.

### Site Bazinda Toplanacak Veriler

| Alan | Aciklama |
|---|---|
| Domain/site | Tam domain adi |
| Saglayici | GoDaddy, HostGator veya Hostinger |
| Registrar | Domain kaydinin tutuldugu sirket |
| Hosting plani | Paket adi ve hesap/reseller iliskisi |
| Yenileme tarihi | Domain, hosting ve e-posta ayri |
| Yillik maliyet | Vergi dahil, indirim ve donem belirtilerek |
| Disk kullanimi | Web, veritabani ve e-posta ayri |
| Aylik trafik | Son 30/90 gun |
| Son web istegi | Erisilebiliyorsa log/analytics tarihi |
| HTTP durumu | 200, yonlendirme, park, hata veya erisilemiyor |
| CMS/uygulama | WordPress, statik, ozel uygulama vb. |
| Veritabani | Adet ve toplam boyut |
| Posta kutusu | Adet ve toplam kullanim |
| DNS bagimliliklari | MX, alt domain, harici servisler |
| Aktiflik sinifi | Aktif, dusuk kullanim, park, bos, kirik, belirsiz |
| Tasima karari | Tasi, arsivle, birak, kapatma adayi |

### Aktif Site Siniflandirmasi

- **Aktif:** Site yanit veriyor ve son 90 gunde gercek trafik, guncelleme, form, siparis veya e-posta bagimliligi var.
- **Dusuk kullanim:** Site yanit veriyor ancak trafik cok dusuk; ticari/marka degeri ayrica kontrol edilmeli.
- **Park/bos:** Park sayfasi, varsayilan hosting ekrani veya anlamli icerik yok.
- **Kirik:** DNS, SSL, HTTP 4xx/5xx, veritabani veya uygulama hatasi var.
- **Belirsiz:** Disaridan karar verilemiyor; panel/log/analytics kontrolu gerekli.
- Bir sitenin disaridan acilmasi tek basina kapatma karari icin yeterli degildir. E-posta, API, alt domain, marka ve yonlendirme bagimliliklari da kontrol edilmelidir.

### Gereken Disari Aktarimlar

#### GoDaddy

- Tum domainlerin CSV aktarimi.
- Son 24 aylik siparis/fatura detaylari.
- DNS zone kayitlari.
- E-posta ve reseller urun listesi.

#### HostGator

- cPanel/WHM hesap listesi.
- Disk ve bant genisligi raporu.
- Domain, addon domain, subdomain ve redirect listesi.
- Posta kutusu ve kota listesi.
- Son 12/24 aylik faturalar.
- Varsa AWStats/Webalizer veya erisim loglari.

#### Hostinger

- Website ve hosting plan listesi.
- Disk, inode, trafik ve kaynak kullanim raporu.
- Domain ve yenileme listesi.
- Posta kutusu ve e-posta paketleri.
- Son 12/24 aylik faturalar.
- Analytics/erisim loglari mevcutsa son 90 gun verisi.

### Ekonomik Karsilastirma

Her site icin:

`Mevcut yillik domain + hosting + e-posta + ek hizmet maliyeti`

eksi

`Hetzner paylastirilmis sunucu maliyet payi + lisans + yedek + domain + e-posta maliyeti`

esittir

`Tahmini yillik tasarruf veya ek maliyet`

Maliyetler tek bir kur tarihine gore cevrilecek; orijinal para birimi de korunacak. Cok yillik faturalar yilliklandirilacak ve promosyonlu ilk yil fiyatlari normal yenileme fiyatlarindan ayrilacak.

## Fiyat Notu

- Hetzner ekranindaki `EUR 4.90/year`, tum uzantilar icin sabit fiyat degil, domain kaydi icin baslangic fiyatidir.
- `.com`, `.net` ve `.biz` uzantilari ayri fiyatlandirilabilir; transfer destekleri de ayri kontrol edilmelidir.
- Ekrandaki fiyat KDV harictir.
- Web hosting paketi ile domain kaydi ayri urunlerdir; Hetzner web hosting paketi domaini fiyata dahil etmez.
- GoDaddy ile karsilastirma, promosyonlu ilk yil yerine her domainin gercek yenileme bedeli ve Hetzner transfer/yenileme bedeli uzerinden yapilmalidir.

## Uygulama Plani

### 1. GoDaddy Envanteri

- Tum domain adlarini ve uzantilarini listele.
- Her domain icin bitis tarihi, auto-renew durumu, registrar lock, DNSSEC, privacy ve sahiplik/iletisim bilgilerini kaydet.
- Nameserver ve DNS zone kayitlarini disari aktar veya ekran goruntusu/yedek ile belgele.
- Domainlere bagli e-posta, SSL, forwarding ve alt domain bagimliliklarini kaydet.
- Reseller hesabi, alt musteriler, urunler, bakiyeler, faturalar ve yenileme tarihlerini ayri envantere al.

### 2. Hetzner Hazirlik Kontrolu

- Hetzner hesabinin aktif ve kimlik/faturalandirma bilgilerinin tamam oldugunu dogrula.
- Her TLD icin Hetzner'in yeni kayit ve transfer destegini kontrol et.
- Transfer ucretini, transferle gelen yenileme suresini ve gerekli ozel registry kosullarini kontrol et.
- Mevcut nameserver'lari transfer sirasinda koruma imkanini dogrula.
- Reseller ihtiyaci icin Hetzner'in urun ve yetkilendirme modelinin GoDaddy reseller modelini birebir karsilamadigini varsay; teknik ve ticari uygunlugu ayri dogrula.

### 3. Tek Domain Pilot Transferi

1. Domainin transfer yasagi, yeni kayit/son transfer kilidi ve ihtilaf durumunu kontrol et.
2. Sahiplik/iletisim e-postasinin erisilebilir oldugunu dogrula.
3. Mevcut DNS zone'u yedekle ve aktif nameserver'lari kaydet.
4. DNSSEC aktifse transfer prosedurune gore DS kayitlarini koordine et; plansiz kapatma yapma.
5. GoDaddy'de domain transfer kilidini ac.
6. GoDaddy'den EPP/Auth code al.
7. Hetzner'da transfer uygunluk ve fiyat kontrolunu tamamla.
8. Hetzner transfer talebini EPP/Auth code ile baslat.
9. Gerekli e-posta onaylarini tamamla.
10. Transfer boyunca nameserver ve DNS kayitlarini degistirmeden izle.
11. Transfer tamamlaninca registrar, expiry, auto-renew, nameserver, DNSSEC, web ve e-posta kontrollerini yap.
12. Kanitlari ve sonuc durumunu kaydet.

## Reseller Gecisi

- Reseller hesaplari tek tikla registrarlar arasinda tasinmaz.
- Hetzner'da hedef hesap, yetkilendirme, faturalandirma ve musteri yonetim modeli once kurulmalidir.
- Musteri domainleri, DNS, hosting, e-posta ve faturalandirma bagimliliklari tek tek eslenmelidir.
- Musteri iletisimleri ve onaylari planlanmadan toplu gecis yapilmamalidir.
- GoDaddy reseller hesabi ancak tum domainler, musteriler, bakiyeler, faturalar ve yenilemeler dogrulandiktan sonra kapatilmalidir.

## Hetzner Kontrol Paneli ve WHM/cPanel Karari

- Hetzner'in kendi yonetim panelleri vardir:
  - `Cloud Console`: Cloud sunuculari ve altyapi kaynaklari.
  - `Robot`: Dedicated/root server yonetimi.
  - `konsoleH`: Hetzner web hosting, managed server ve domain islemleri.
  - `DNS Console`: DNS zone ve kayit yonetimi.
- Bunlar GoDaddy reseller panelinin veya WHM/cPanel'in birebir karsiligi degildir.
- Hetzner Cloud veya dedicated sunucuda WHM/cPanel varsayilan olarak kurulu ve dahil gelmez.
- WHM/cPanel isteniyorsa uyumlu bir Hetzner sunucusu secilmeli; desteklenen isletim sistemi kurulumu, cPanel lisansi, kurulum, guvenlik, yedekleme ve sunucu yonetimi ayrica planlanmalidir.
- Sadece domain registrar ve DNS tasinacaksa WHM/cPanel gerekli degildir.
- GoDaddy'deki hosting reseller/musteri hesaplari da tasinacaksa iki aday model ayri degerlendirilecektir:
  1. Hetzner sunucusu + ucretli WHM/cPanel lisansi.
  2. Hetzner'in `konsoleH` tabanli web hosting/managed hizmetleri; reseller ve musteri izolasyonu gereksinimleri karsilanirsa.
- Hostinger'daki mevcut siteler bu karardan etkilenmeyecek ve simdilik tasinmayacaktir.

## Basari Kriterleri

- Hostinger tarafinda hicbir degisiklik veya kesinti yok.
- Pilot domain Hetzner'da registrar olarak gorunuyor.
- Web sitesi, DNS ve e-posta hizmetleri transfer oncesiyle ayni sekilde calisiyor.
- Yenileme ve faturalandirma Hetzner'da etkin ve dogrulanmis.
- GoDaddy envanteri ile Hetzner hedef envanteri mutabik.

## Blokaj

Transferin baslatilabilmesi icin kullanicidan tasinacak ilk domainin tam adi gereklidir.
