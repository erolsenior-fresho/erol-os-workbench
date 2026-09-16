# iPad–Mac AI Bridge

iPad Kestirmeleri üzerinden Mac'teki `llama.cpp` modeliyle sohbet etmeyi ve
izin verilen Mac eylemlerini çalıştırmayı sağlayan küçük bir yerel API. Bu
sürüm özellikle macOS Ventura ile sınırlı 2017 Intel iMac için hazırlanmıştır.

## Güvenlik modeli

- Her istek, kurulum sırasında üretilen en az 24 karakterli bir API anahtarı
  ister.
- Keyfi terminal komutları kabul edilmez.
- Uygulamalar, URL'ler ve Mac Kestirmeleri `config.json` içinde tek tek
  izin listesine eklenir.
- Alt süreçler shell kullanılmadan argüman listesiyle çalıştırılır.

Port `8765` kesinlikle modem üzerinden internete açılmamalıdır. Ev dışından
erişim gerekiyorsa Mac ve iPad'e Tailscale kurup aynı tailnet üzerinden
kullanmak daha güvenlidir.

## 1. Mac'i hazırlama

Gereksinimler:

- macOS 12 Monterey veya üzeri
- Python 3
- [Homebrew](https://brew.sh/)
- 32 GB RAM için önerilen Qwen2.5 7B GGUF model

Terminal'de:

```bash
brew install llama.cpp

mkdir -p ~/Models
curl -L --fail \
  -o ~/Models/qwen2.5-7b-instruct-q4_k_m.gguf \
  "https://huggingface.co/Qwen/Qwen2.5-7B-Instruct-GGUF/resolve/main/qwen2.5-7b-instruct-q4_k_m.gguf"

cd ipad-mac-ai-bridge
chmod +x setup-mac.sh run.sh
./setup-mac.sh
```

Kurulum:

1. `llama-server` ve GGUF modelini kontrol eder.
2. `config.json` dosyasını oluşturur.
3. `.env` içine rastgele API anahtarı yazar.
4. Lokal model sunucusunu ve API'yi iki kullanıcı LaunchAgent'ı olarak başlatır.
5. iPad'de kullanılacak Mac IP adresini ve API anahtarını gösterir.

Kontrol:

```bash
curl http://127.0.0.1:8765/health
```

Beklenen cevap:

```json
{"status":"ok"}
```

Kurulum model sunucusunu yalnızca `127.0.0.1:8080` üzerinde çalıştırır. iPad
doğrudan modele değil, anahtarla korunan köprüye bağlanır.

### 2017 iMac performansı

32 GB RAM ile 7B Q4 model rahatça belleğe sığar. İlk kurulum CPU modunda
`LLAMA_GPU_LAYERS=0` kullanır. Radeon GPU'nun Metal hızlandırmasını denemek
için `.env` içindeki değeri önce `20` yapıp iki servisi yeniden başlatın.
Kararlıysa artırılabilir; hata veya aşırı bellek kullanımı olursa tekrar `0`
yapın. 14B modeller belleğe sığsa da 2017 Intel işlemcide daha yavaş olacaktır.

## 2. İzin verilen Mac eylemlerini düzenleme

`config.json`:

```json
{
  "allowed_apps": {
    "cursor": "Cursor",
    "notes": "Notes",
    "safari": "Safari"
  },
  "allowed_urls": {
    "cursor_agents": "https://cursor.com/agents",
    "github": "https://github.com"
  },
  "allowed_shortcuts": {
    "daily_brief": "Günlük Özet"
  }
}
```

Soldaki değer iPad'in göndereceği kısa addır; sağdaki değer gerçek uygulama
adı, URL veya Mac Kestirmesi adıdır. Değişiklikten sonra:

```bash
launchctl kickstart -k "gui/$(id -u)/com.erolos.ipad-mac-ai-bridge"
```

## 3. iPad Kestirmesini oluşturma

Mac ve iPad aynı güvenilir Wi-Fi ağında olmalıdır.

### Ana menü

Kestirmeler'de yeni bir kestirme oluşturup **Menüden Seç** eylemini ekleyin:

- `AI'ye Sor`
- `Mac Uygulaması Aç`
- `Mac Kestirmesi Çalıştır`

`MAC_IP`, kurulumun gösterdiği adres; `TOKEN`, kurulumun gösterdiği API
anahtarıdır.

### AI'ye Sor dalı

1. **Girdi İste**: Metin
2. **URL İçeriğini Al**
   - URL: `http://MAC_IP:8765/v1/chat`
   - Yöntem: `POST`
   - Başlık `Authorization`: `Bearer TOKEN`
   - Başlık `Content-Type`: `application/json`
   - İstek gövdesi: JSON
   - `message`: **Sağlanan Girdi**
3. Sonuç sözlüğünden `reply` değerini alın.
4. **Sonucu Göster** ekleyin.

### Mac Uygulaması Aç dalı

1. `safari`, `notes` veya `cursor` seçenekli bir **Listeden Seç** ekleyin.
2. **URL İçeriğini Al**
   - URL: `http://MAC_IP:8765/v1/action`
   - Yöntem ve başlıklar yukarıdakiyle aynı
   - JSON gövdesi:
     - `action`: `open_app`
     - `target`: **Seçilen Öğe**

URL açmak için aynı endpoint'e `action: open_url` ve örneğin
`target: cursor_agents` gönderin.

### Mac Kestirmesi Çalıştır dalı

1. Mac'teki Kestirmeler uygulamasında bir kestirme hazırlayın.
2. Bu kestirmeyi `config.json` içindeki `allowed_shortcuts` listesine ekleyin.
3. iPad'den şu JSON gövdesini gönderin:

```json
{
  "action": "run_shortcut",
  "target": "daily_brief"
}
```

İlk istekte iPad yerel ağ erişimi isteyebilir; izin verin. macOS da ilk kez
uygulama veya Kestirme açılırken otomasyon izni isteyebilir.

## API örnekleri

```bash
source .env

curl -X POST http://127.0.0.1:8765/v1/chat \
  -H "Authorization: Bearer $BRIDGE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message":"Bugün için kısa bir çalışma planı hazırla"}'

curl -X POST http://127.0.0.1:8765/v1/action \
  -H "Authorization: Bearer $BRIDGE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"action":"open_app","target":"cursor"}'
```

## Yönetim

Log:

```bash
tail -f ~/Library/Logs/ipad-mac-ai-bridge.log
```

Yeniden başlatma:

```bash
launchctl kickstart -k "gui/$(id -u)/com.erolos.ipad-mac-llama-server"
launchctl kickstart -k "gui/$(id -u)/com.erolos.ipad-mac-ai-bridge"
```

Durdurma:

```bash
launchctl bootout "gui/$(id -u)/com.erolos.ipad-mac-llama-server"
launchctl bootout "gui/$(id -u)/com.erolos.ipad-mac-ai-bridge"
```

Testler:

```bash
python3 -m unittest -v
```

## Codex ekleme

İlk sürüm sohbet için yerel `llama.cpp` kullanır. Codex daha sonra ayrı ve
onaylı bir geliştirme eylemi olarak eklenebilir. Codex'e doğrudan serbest
terminal erişimi vermek yerine belirli bir depo ve çalışma diziniyle
sınırlandırmak gerekir.
