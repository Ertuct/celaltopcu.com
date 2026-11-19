# Tasarım sistemi — celaltopcu.com

Bu dosya, sitenin görsel kurallarını yazıya döküyor. Yeni sayfa eklerken buna uy.

## Kimlik

Portfolyo bir **insan**, FORGEA bir **ürün**. İkisi kasıtlı olarak farklı görünür.
Portfolyo "mühendis defteri": sıcak grafit / sıcak kağıt, tek aksan rengi oksit turuncusu.

## Renkler

Koyu tema varsayılan.

| Değişken | Koyu | Açık |
|---|---|---|
| `--paper` | `#191714` | `#f4f1ea` |
| `--paper-2` | `#201d19` | `#fffdf8` |
| `--rule` | `#332e27` | `#d9d1c2` |
| `--rule-soft` | `#262220` | `#e7e0d3` |
| `--ink` | `#eae6df` | `#1b1a17` |
| `--ink-dim` | `#a9a196` | `#55504a` |
| `--ink-faint` | `#776f64` | `#8a8278` |
| `--oxide` | `#d46a3c` | `#b24a22` |

Aksan rengi yalnızca şurada kullanılır: bağlantı altı çizgisi, şekil numarası, liste
tiresi, birincil buton, odak halkası, h1 altındaki kısa çizgi. Metin rengi olarak değil.

## Tipografi

- Başlık: **Archivo** 600/700, `letter-spacing: -0.015em` ile -0.03em arası
- Gövde: **Source Serif 4**, 17px, satır yüksekliği 1.62
- Veri, tarih, etiket, menü: **IBM Plex Mono** 0.78rem

## Yapı kuralları

- **Kart yok.** Bloklar ince çizgiyle (`1px solid var(--rule-soft)`) ayrılır.
- **Gölge yok, glow yok, degrade yok.**
- Yuvarlatma yalnızca **2px**, sadece görsel ve butonlarda.
- İki sütunlu `.entry` deseni: solda monospace meta (sağa yaslı), sağda içerik.
- Liste işareti nokta değil, oksit renkli **uzun tire**.
- Teknoloji listesi hap değil, **eğik çizgiyle** ayrılmış monospace satır.

## Yasaklı (kullanıcı reddetti)

emoji ikon · eyebrow satırı · büyük harfli harf-aralıklı etiket · "01." bölüm numarası ·
metne yapışık ok (↗) · orta noktayla birleştirilmiş meta dizeleri · mor-mavi degrade ·
turkuaz-mor renk ikilisi · Inter + Space Grotesk ikilisi

## Zorunlu

- Her etkileşimli öğede `:focus-visible`
- Her animasyonda `prefers-reduced-motion` karşılığı
- JS kapalıyken içerik görünür (`html.js .reveal` deseni)
- Her sayfa iki dilli (`t-en` / `t-tr`), `?lang=tr` adres parametresi desteklenir
- Mobilde yatay kaydırma olmaz

## Sayfalar

```
index.html              tek sayfa: hakkımda, projeler, yazılım, deneyim,
                        yetkinlikler, eğitim, yazılar, iletişim
cv.html                 web özgeçmiş (telefon ve referans e-postası YOK)
404.html
projeler/ruzgar-turbini-cfd.html
projeler/utm.html
projeler/teknofest-iha.html
yazilar/dwg-den-metraja.html
yazilar/kucuk-imalatta-erp.html
yazilar/yuk-hucresi-kalibrasyonu.html
```

## Gizlilik

- Telefon numarası ve hoca e-postaları siteye **konmaz**. PDF CV'de hâlâ varlar; bu
  yüzden `robots.txt` o dosyayı arama motorlarına kapatıyor.
- TC kimlik numarası hiçbir yerde geçmez.
