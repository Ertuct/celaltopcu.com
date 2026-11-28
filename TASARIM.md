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
| `--ink-faint` | `#8e8578` | `#726b63` |
| `--oxide` | `#d46a3c` | `#b24a22` |

Aksan rengi yalnızca şurada kullanılır: bağlantı altı çizgisi, şekil numarası, liste
tiresi, birincil buton, odak halkası, h1 altındaki kısa çizgi. Metin rengi olarak değil.

## Tipografi

- Başlık: **Archivo** 600/700, `letter-spacing: -0.015em` ile -0.035em arası
- Gövde: **Source Serif 4**, 17px, satır yüksekliği 1.62
- Veri, tarih, etiket, menü: **IBM Plex Mono** `--fs-meta` (0.8125rem); küçük metin AA (4.5:1) geçmeli

## Ölçek ve ritim (2026-11-28 — üç sitede aynı: celaltopcu.com, FORGEA, FabriQ)

`css/style.css` başındaki `:root` token bloğu; renkler sitelere özel, ölçek ortak.

- Akışkan yazı: `--fs-display` clamp(2.6rem, 1.6rem + 4.2vw, 4.75rem) −0.035em / 1.0 ·
  `--fs-h2` clamp(1.75rem, 1.2rem + 2.2vw, 2.6rem) −0.025em / 1.1 · `--fs-h3` clamp(1.2rem, 1rem + 0.8vw, 1.45rem)
  −0.015em / 1.25 · `--fs-body` 1.0625rem · `--fs-small` 0.9375rem · `--fs-meta` 0.8125rem
- Boşluk: `--sp-1 … --sp-11` = 4 8 12 16 24 32 48 64 96 128 160 px. Rastgele px yok.
- Bölüm ritmi: `--section-pad` clamp(72px, 10vw, 152px), her bölüm aynı üst/alt boşluk.
- Okuma: paragraf ≤64ch, hero açıklaması ≤52ch; kapsayıcı 1200px, kenar 24–32px.
- Menü: sticky, 64px; sayfa başında şeffaf ve çizgisiz, 8px kaydırınca zemin + 1px çizgi; aktif bölüm altı çizili.
- Hareket: `js/hareket.js` (üç sitede aynı dosya) + `js/vendor/lenis.min.js` (Lenis 1.3.27, MIT, yerel).
  Belirme 500ms cubic-bezier(.2,.7,.2,1), 14px, %12 eşik, kardeşler arası 60ms, bir kez. **İlk ekrandaki
  hiçbir öğe `.reveal` almaz.** Reduced-motion'da Lenis başlamaz, hiçbir şey hareket etmez. Parallax,
  scroll-jacking, yatay kaydırmalı bölüm, imleç takipçisi yok.
- Dokunma hedefleri ≥44×44px.

## Yapı kuralları

- **Kart yok.** Bloklar ince çizgiyle (`1px solid var(--rule-soft)`) ayrılır.
- **Gölge yok, glow yok, degrade yok.**
- Yuvarlatma yalnızca **2px**, sadece görsel ve butonlarda.
- İki sütunlu `.entry` deseni: solda monospace meta (sağa yaslı), sağda içerik.
- Liste işareti nokta değil, oksit renkli **uzun tire**.
- Teknoloji listesi hap değil, **eğik çizgiyle** ayrılmış monospace satır.

## Yasaklı (kullanıcı reddetti)

emoji ikon · metne yapışık ok (↗) · orta noktayla birleştirilmiş meta dizeleri · degrade · glow · gölge ·
kart · mor-mavi degrade · turkuaz-mor renk ikilisi · Inter + Space Grotesk ikilisi · kayan yazı şeridi
(marquee) · harf harf yazılan başlık · neon renk

## Kairu disiplini — koşullu serbest (Celal kararı, 2026-11-27)

"Kairu gibi olacaksa yasak kalkabilir, olmayacaksa yasak kalsın; bizim kurallarımızla birleşsin."
Aşağıdaki üçü YALNIZCA bu kalıpla serbest; kalıbın dışında kullanılırsa yasak sürer.

- **a) Eyebrow** (bölüm başlığı üstü küçük etiket): yalnız bölüm başlığının (h2) üstünde, bölüm başına
  en fazla bir; IBM Plex Mono 0.75rem, BÜYÜK HARF, letter-spacing 0.12em, renk `--ink-dim` (AA) ya da aksan;
  h2 ile arası 12px. Hero'da en fazla bir. Kart, liste öğesi, paragraf üstünde KULLANILMAZ.
- **b) Büyük harfli, harf aralıklı durum etiketi:** yalnız listelerde sağa yaslı GERÇEK durum ("YAYINDA",
  "PLANLANIYOR", "YAKINDA"); mono 0.6875–0.75rem, 0.1em; hap/kutu içinde DEĞİL, düz metin. Süs olarak kullanılmaz.
- **c) Numara:** yalnız gerçek sıralı adımlarda (kurulum, süreç akışı) "01 02 03" — noktasız, mono,
  `--ink-faint`, başlığın solunda ya da üstünde. Bölümleri numaralamak için KULLANILMAZ.

Referans ölçümler ve uygulama: `F:\Website\Plan\TASARIM_DENETIMI_2026-11-27.md`.

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
