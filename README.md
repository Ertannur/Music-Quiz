Music Quiz

Müzik temalı, hızlı ve eğlenceli bir bilgi yarışması.
React + Vite ile geliştirildi, stil için styled-components, ses için Howler, durum yönetimi için Zustand kullanır.

Öne çıkanlar: Klavye ile hızlı cevaplama (1–4), başlangıç ekranında yön tuşlarıyla quiz seçimi, ses aç/kapa, süre sayacı, sonuç geçmişi ve tek konteyner TopBar.

⸻

İçerik
	•	Demo
	•	Özellikler
	•	Ekran Görüntüleri
	•	Kurulum
	•	Geliştirme Komutları
	•	Mimari & Teknolojiler
	•	Proje Yapısı
	•	Klavye Kısayolları & Erişilebilirlik
	•	Veri & Durum Yönetimi
	•	Quiz Ekleme / İçerik Güncelleme
	•	Performans & UX Notları
	•	Sorun Giderme (FAQ)
	•	Lisans & Teşekkür

⸻

Demo
	•	Canlı Demo: (https://github.com/Ertannur/Music-Quiz)
	

⸻

Özellikler
	•	🎵 Müzik odaklı quiz’ler (ör. Queen, Mor ve Ötesi, 2000’ler Türk Pop)
	•	⌨️ Hızlı cevaplama: 1–4 tuşlarıyla seçenek seçme
	•	⬅️➡️ Quiz seçimi: Başlangıç ekranında yön tuşları ile butonlar arası dolaşma, Enter/Space ile başlatma
	•	🔕 Ses kontrolü: Howler ile global Mute/Unmute
	•	⏱️ Süre sayacı: Her soru için geri sayım (oyun çubuğunda)
	•	🧭 TopBar: Timer + Mute + Results tek konteynerde, sağ üstte
	•	🧠 Geçmiş kayıtları: Doğru sayısı, başlık ve zaman damgası ile localStorage
	•	🧹 Geçmişi Temizle butonu
	•	📱 Duyarlı tasarım: Mobil/Tablet/Web arkaplanları ve layout
	•	🔖 Dinamik sayfa başlıkları: Home/Quiz/Result için document.title
	•	♻️ Oturum sürdürülebilirliği: Yarıda kalan oturum localStorage ile geri yüklenir

Yığın & Mimari
	•	React + Vite, react-router-dom
	•	styled-components (GlobalStyle ile mobil/tablet/web arka planlar)
	•	Howler (arka plan müziği, efektler, global mute)
	•	Zustand (isMuted, musicStarted, correctCount, quizHistory)
	•	localStorage (aktif oturum + sonuç geçmişi)

  Klasör Yapısı (özet)

  src/
  components/
    Quiz/ (GlobalStyle, HistoryButton, QuizPopup, Timer, styles)
    MuteButton.tsx
    TopBar.tsx
    StartScreen.tsx
  data/questions.ts
  hooks/ (useAudioPlayer, useQuizGame)
  pages/ (HomePage, QuizPage, ResultPage)
  routes/AppRoutes.tsx
  stores/quizStore.ts

  Kullanım (Kısayollar)
	•	StartScreen: ←/→/↑/↓ ile butonlar arasında dolaş, Enter/Space ile başlat.
	•	Quiz: 1–4 ile seçenek işaretle.
	•	Results: Tarih/saat tr-TR + Europe/Istanbul ile yerelleştirilir.

  Lisans & Krediler
	•	Müzik: Nicholas Panek (Pixabay) — detay için MusicPlayer.tsx.
	•	Lisans: MIT 