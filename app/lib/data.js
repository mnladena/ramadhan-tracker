export const RAMADHAN_START_2026 = new Date(2026, 1, 18); // Feb 18, 2026 (1 Ramadhan 1447H approx)

export const SHALAT_LIST = [
  { id: "subuh", label: "Subuh", icon: "🌅" },
  { id: "dzuhur", label: "Dzuhur", icon: "☀️" },
  { id: "ashar", label: "Ashar", icon: "🌤️" },
  { id: "maghrib", label: "Maghrib", icon: "🌇" },
  { id: "isya", label: "Isya", icon: "🌙" },
  { id: "tarawih", label: "Tarawih", icon: "✨" },
  { id: "tahajjud", label: "Tahajjud", icon: "🌌" },
];

export const DAILY_TASKS = [
  { id: "puasa", label: "Puasa", icon: "🍽️", type: "toggle" },
  { id: "sedekah", label: "Sedekah", icon: "💝", type: "toggle" },
  { id: "dzikir_pagi", label: "Dzikir Pagi", icon: "🌅", type: "toggle" },
  { id: "dzikir_petang", label: "Dzikir Petang", icon: "🌆", type: "toggle" },
];

export const DUA_COLLECTION = [
  {
    id: 1,
    category: "Sahur",
    title: "Doa Niat Puasa",
    arabic: "نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هٰذِهِ السَّنَةِ لِلّٰهِ تَعَالَى",
    transliteration: "Nawaitu shauma ghadin 'an adaa'i fardhi syahri ramadhaana haadzihis sanati lillaahi ta'aalaa",
    translation: "Saya niat puasa esok hari untuk menunaikan fardhu di bulan Ramadhan tahun ini karena Allah Ta'ala",
  },
  {
    id: 2,
    category: "Iftar",
    title: "Doa Buka Puasa",
    arabic: "اَللّٰهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِيْنَ",
    transliteration: "Allahumma laka shumtu wa bika aamantu wa 'alaa rizqika afthartu bi rahmatika yaa arhamar raahimiin",
    translation: "Ya Allah, untuk-Mu aku berpuasa, kepada-Mu aku beriman, dan dengan rezeki-Mu aku berbuka, dengan rahmat-Mu wahai Yang Maha Penyayang",
  },
  {
    id: 3,
    category: "Harian",
    title: "Doa Sebelum Makan",
    arabic: "بِسْمِ اللّٰهِ وَبَرَكَةِ اللّٰهِ",
    transliteration: "Bismillahi wa barakatillah",
    translation: "Dengan nama Allah dan dengan berkah Allah",
  },
  {
    id: 4,
    category: "Harian",
    title: "Doa Setelah Makan",
    arabic: "اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِيْنَ",
    transliteration: "Alhamdulillahil ladzi ath'amana wa saqaana wa ja'alana muslimiin",
    translation: "Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami orang-orang Muslim",
  },
  {
    id: 5,
    category: "Tarawih",
    title: "Doa Setelah Shalat Tarawih",
    arabic: "اَللّٰهُمَّ اجْعَلْنَا بِالْإِيْمَانِ كَامِلِيْنَ وَلِلْفَرَائِضِ مُؤَدِّيْنَ وَلِلصَّلَاةِ حَافِظِيْنَ وَلِلزَّكَاةِ فَاعِلِيْنَ",
    transliteration: "Allahumma-j'alnaa bil iimaani kaamiliin, wa lil faraa-idhi mu-addiin, wa lish shalaati haafizhiin, wa liz zakaati faa'iliin",
    translation: "Ya Allah, jadikanlah kami orang yang sempurna imannya, yang menunaikan kewajiban, yang menjaga shalat, dan yang menunaikan zakat",
  },
  {
    id: 6,
    category: "Lailatul Qadr",
    title: "Doa Malam Lailatul Qadr",
    arabic: "اَللّٰهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّىْ",
    transliteration: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'annii",
    translation: "Ya Allah, sesungguhnya Engkau Maha Pemaaf, Engkau suka memberi maaf, maka maafkanlah aku",
  },
  {
    id: 7,
    category: "Harian",
    title: "Doa Mohon Ampunan",
    arabic: "رَبَّنَا ظَلَمْنَآ أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُوْنَنَّ مِنَ الْخَاسِرِيْنَ",
    transliteration: "Rabbanaa zhalamnaa anfusanaa wa in lam taghfir lanaa wa tarhamnaa lanakuunanna minal khaasiriin",
    translation: "Ya Tuhan kami, kami telah menganiaya diri kami sendiri, dan jika Engkau tidak mengampuni kami serta memberi rahmat kepada kami, niscaya kami termasuk orang-orang yang merugi",
  },
  {
    id: 8,
    category: "Sahur",
    title: "Doa Sepertiga Malam",
    arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الْغَفُورُ",
    transliteration: "Rabbighfir lii wa tub 'alayya innaka antat tawwaabul ghafuur",
    translation: "Ya Tuhanku, ampunilah aku dan terimalah taubatku, sesungguhnya Engkau Maha Penerima taubat lagi Maha Pengampun",
  },
];

export const IMSAKIYAH_JAKARTA = [
  { day: 1, date: "18 Feb", imsak: "04:21", subuh: "04:31", terbit: "05:49", dzuhur: "12:05", ashar: "15:20", maghrib: "18:14", isya: "19:25" },
  { day: 2, date: "19 Feb", imsak: "04:22", subuh: "04:32", terbit: "05:49", dzuhur: "12:05", ashar: "15:20", maghrib: "18:14", isya: "19:25" },
  { day: 3, date: "20 Feb", imsak: "04:22", subuh: "04:32", terbit: "05:49", dzuhur: "12:05", ashar: "15:20", maghrib: "18:14", isya: "19:24" },
  { day: 4, date: "21 Feb", imsak: "04:22", subuh: "04:32", terbit: "05:49", dzuhur: "12:05", ashar: "15:21", maghrib: "18:14", isya: "19:24" },
  { day: 5, date: "22 Feb", imsak: "04:23", subuh: "04:33", terbit: "05:49", dzuhur: "12:05", ashar: "15:21", maghrib: "18:14", isya: "19:24" },
  { day: 6, date: "23 Feb", imsak: "04:23", subuh: "04:33", terbit: "05:50", dzuhur: "12:05", ashar: "15:21", maghrib: "18:13", isya: "19:23" },
  { day: 7, date: "24 Feb", imsak: "04:23", subuh: "04:33", terbit: "05:50", dzuhur: "12:05", ashar: "15:21", maghrib: "18:13", isya: "19:23" },
  { day: 8, date: "25 Feb", imsak: "04:24", subuh: "04:34", terbit: "05:50", dzuhur: "12:05", ashar: "15:21", maghrib: "18:13", isya: "19:23" },
  { day: 9, date: "26 Feb", imsak: "04:24", subuh: "04:34", terbit: "05:50", dzuhur: "12:06", ashar: "15:21", maghrib: "18:13", isya: "19:22" },
  { day: 10, date: "27 Feb", imsak: "04:24", subuh: "04:34", terbit: "05:50", dzuhur: "12:06", ashar: "15:21", maghrib: "18:12", isya: "19:22" },
  { day: 11, date: "28 Feb", imsak: "04:25", subuh: "04:35", terbit: "05:50", dzuhur: "12:06", ashar: "15:21", maghrib: "18:12", isya: "19:21" },
  { day: 12, date: "1 Mar", imsak: "04:25", subuh: "04:35", terbit: "05:50", dzuhur: "12:06", ashar: "15:21", maghrib: "18:12", isya: "19:21" },
  { day: 13, date: "2 Mar", imsak: "04:25", subuh: "04:35", terbit: "05:50", dzuhur: "12:06", ashar: "15:21", maghrib: "18:11", isya: "19:20" },
  { day: 14, date: "3 Mar", imsak: "04:25", subuh: "04:35", terbit: "05:50", dzuhur: "12:06", ashar: "15:21", maghrib: "18:11", isya: "19:20" },
  { day: 15, date: "4 Mar", imsak: "04:26", subuh: "04:36", terbit: "05:50", dzuhur: "12:06", ashar: "15:21", maghrib: "18:11", isya: "19:19" },
  { day: 16, date: "5 Mar", imsak: "04:26", subuh: "04:36", terbit: "05:50", dzuhur: "12:06", ashar: "15:20", maghrib: "18:10", isya: "19:19" },
  { day: 17, date: "6 Mar", imsak: "04:26", subuh: "04:36", terbit: "05:50", dzuhur: "12:06", ashar: "15:20", maghrib: "18:10", isya: "19:18" },
  { day: 18, date: "7 Mar", imsak: "04:26", subuh: "04:36", terbit: "05:50", dzuhur: "12:06", ashar: "15:20", maghrib: "18:09", isya: "19:18" },
  { day: 19, date: "8 Mar", imsak: "04:27", subuh: "04:37", terbit: "05:50", dzuhur: "12:05", ashar: "15:20", maghrib: "18:09", isya: "19:17" },
  { day: 20, date: "9 Mar", imsak: "04:27", subuh: "04:37", terbit: "05:50", dzuhur: "12:05", ashar: "15:19", maghrib: "18:08", isya: "19:17" },
  { day: 21, date: "10 Mar", imsak: "04:27", subuh: "04:37", terbit: "05:50", dzuhur: "12:05", ashar: "15:19", maghrib: "18:08", isya: "19:16" },
  { day: 22, date: "11 Mar", imsak: "04:27", subuh: "04:37", terbit: "05:49", dzuhur: "12:05", ashar: "15:19", maghrib: "18:07", isya: "19:15" },
  { day: 23, date: "12 Mar", imsak: "04:27", subuh: "04:37", terbit: "05:49", dzuhur: "12:05", ashar: "15:18", maghrib: "18:07", isya: "19:15" },
  { day: 24, date: "13 Mar", imsak: "04:27", subuh: "04:37", terbit: "05:49", dzuhur: "12:04", ashar: "15:18", maghrib: "18:06", isya: "19:14" },
  { day: 25, date: "14 Mar", imsak: "04:28", subuh: "04:38", terbit: "05:49", dzuhur: "12:04", ashar: "15:17", maghrib: "18:05", isya: "19:13" },
  { day: 26, date: "15 Mar", imsak: "04:28", subuh: "04:38", terbit: "05:49", dzuhur: "12:04", ashar: "15:17", maghrib: "18:05", isya: "19:13" },
  { day: 27, date: "16 Mar", imsak: "04:28", subuh: "04:38", terbit: "05:49", dzuhur: "12:04", ashar: "15:16", maghrib: "18:04", isya: "19:12" },
  { day: 28, date: "17 Mar", imsak: "04:28", subuh: "04:38", terbit: "05:48", dzuhur: "12:03", ashar: "15:16", maghrib: "18:04", isya: "19:11" },
  { day: 29, date: "18 Mar", imsak: "04:28", subuh: "04:38", terbit: "05:48", dzuhur: "12:03", ashar: "15:15", maghrib: "18:03", isya: "19:11" },
  { day: 30, date: "19 Mar", imsak: "04:28", subuh: "04:38", terbit: "05:48", dzuhur: "12:03", ashar: "15:15", maghrib: "18:02", isya: "19:10" },
];

export const MOTIVATIONAL_QUOTES = [
  {
    text: "Barangsiapa berpuasa Ramadhan karena iman dan mengharap pahala, maka diampuni dosa-dosanya yang telah lalu.",
    source: "HR. Bukhari & Muslim",
  },
  {
    text: "Bulan Ramadhan yang di dalamnya diturunkan Al-Quran sebagai petunjuk bagi manusia.",
    source: "QS. Al-Baqarah: 185",
  },
  {
    text: "Puasa adalah perisai, maka janganlah berkata keji dan jangan pula bertindak bodoh.",
    source: "HR. Bukhari",
  },
  {
    text: "Sesungguhnya Kami menurunkan Al-Quran pada malam kemuliaan. Malam kemuliaan itu lebih baik dari seribu bulan.",
    source: "QS. Al-Qadr: 1-3",
  },
  {
    text: "Setiap amal anak Adam dilipat gandakan, satu kebaikan menjadi sepuluh hingga tujuh ratus kali lipat. Allah berfirman: Kecuali puasa, karena puasa itu untuk-Ku.",
    source: "HR. Muslim",
  },
  {
    text: "Doa orang yang berpuasa tidak akan ditolak.",
    source: "HR. Ibnu Majah",
  },
  {
    text: "Bagi orang yang berpuasa ada dua kegembiraan: kegembiraan saat berbuka dan kegembiraan saat bertemu Tuhannya.",
    source: "HR. Bukhari & Muslim",
  },
  {
    text: "Barangsiapa mendirikan shalat pada bulan Ramadhan karena iman dan mengharap pahala, maka diampuni dosa-dosanya yang telah lalu.",
    source: "HR. Bukhari & Muslim",
  },
  {
    text: "Siapa yang memberi makan orang yang berpuasa, maka baginya pahala seperti orang yang berpuasa tersebut.",
    source: "HR. Tirmidzi",
  },
  {
    text: "Dan apabila hamba-hamba-Ku bertanya kepadamu tentang Aku, maka sesungguhnya Aku itu dekat.",
    source: "QS. Al-Baqarah: 186",
  },
];

export const DUA_CATEGORIES = ["Semua", "Sahur", "Iftar", "Harian", "Tarawih", "Lailatul Qadr"];

export function getRamadhanDay(date = new Date()) {
  const start = new Date(RAMADHAN_START_2026);
  start.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const diff = Math.floor((target - start) / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, Math.min(30, diff));
}

export function getMotivationalQuote(day) {
  return MOTIVATIONAL_QUOTES[(day - 1) % MOTIVATIONAL_QUOTES.length];
}
