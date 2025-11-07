# Vardiya Yönetim Sistemi

Bu proje, Ruby on Rails ve React kullanılarak geliştirilmiş modern bir vardiya yönetim sistemidir.

## 🚀 Özellikler

- Vardiya oluşturma ve düzenleme
- Vardiya takibi ve yönetimi
- Kullanıcı dostu arayüz
- Responsive tasarım
- RESTful API

## 🛠 Teknolojiler

### Backend
- Ruby on Rails 7
- SQLite (Development)
- RSpec & Cucumber (Test)

### Frontend
- React
- Vite
- Cypress (E2E Testing)

## 💻 Kurulum

### Gereksinimler
- Ruby 3.2.0 veya üstü
- Node.js 18.0.0 veya üstü
- Yarn/npm
- SQLite3

### Backend Kurulumu
```bash
# Gerekli gem'leri yükleme
bundle install

# Veritabanını oluşturma
rails db:create
rails db:migrate

# Test sunucusunu başlatma
rails server
```

### Frontend Kurulumu
```bash
# Frontend klasörüne git
cd frontend

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

## 🧪 Testler

### Backend Testleri
```bash
# RSpec testleri
bundle exec rspec

# Cucumber testleri
bundle exec cucumber
```

### Frontend Testleri
```bash
# Frontend klasöründe
npm run test
```

## 🐳 Docker

Projeyi Docker ile çalıştırmak için:

```bash
# Docker image'ini oluştur
docker build -t shift-system .

# Container'ı çalıştır
docker run -p 3000:3000 shift-system
```

## 📝 API Dokümantasyonu

API endpoint'leri:

- `GET /api/shifts`: Tüm vardiyaları listele
- `POST /api/shifts`: Yeni vardiya oluştur
- `GET /api/shifts/:id`: Belirli bir vardiyayı görüntüle
- `PUT /api/shifts/:id`: Vardiya güncelle
- `DELETE /api/shifts/:id`: Vardiya sil

## 👥 Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik: Açıklama'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Bir Pull Request oluşturun

## 📄 Lisans

Bu proje [MIT lisansı](LICENSE) altında lisanslanmıştır.
