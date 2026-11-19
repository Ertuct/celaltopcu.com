# celaltopcu.com

Celal Topcu'nun kişisel portfolyo sitesi — makine mühendisliği projeleri, deneyim ve
TopcuSoft adı altında geliştirilen uygulamalar.

Statik site: bağımlılık yok, derleme adımı yok.

## Yapı

```
index.html        # tek sayfa, TR/EN içerik birlikte
css/style.css     # koyu tema
js/script.js      # dil değiştirme, menü, scroll animasyonları
assets/           # profil fotoğrafı ve logolar
```

## Yerelde çalıştırma

```
python -m http.server 5173
```

Ardından http://localhost:5173 adresini aç.

## Dil

Site Türkçe ve İngilizce içerir. Ziyaretçinin tarayıcı diline göre otomatik seçilir,
sağ üstteki düğmeyle değiştirilebilir ve tercih `localStorage`'da saklanır.
