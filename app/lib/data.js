// Default start date, can be overridden by user preference stored in localStorage
export const RAMADHAN_START_DEFAULT = 18; // Feb 18

export function getStartDate() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("ramadhan_start_date_2026");
    if (stored) {
      return new Date(2026, 1, parseInt(stored, 10));
    }
  }
  return new Date(2026, 1, RAMADHAN_START_DEFAULT);
}

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
  // === SAHUR ===
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
    category: "Sahur",
    title: "Doa Sepertiga Malam",
    arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الْغَفُورُ",
    transliteration: "Rabbighfir lii wa tub 'alayya innaka antat tawwaabul ghafuur",
    translation: "Ya Tuhanku, ampunilah aku dan terimalah taubatku, sesungguhnya Engkau Maha Penerima taubat lagi Maha Pengampun",
  },
  {
    id: 3,
    category: "Sahur",
    title: "Doa Makan Sahur",
    arabic: "بِسْمِ اللّٰهِ وَعَلَى بَرَكَةِ اللّٰهِ، اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Bismillahi wa 'alaa barakatillah. Allahumma baarik lanaa fiimaa razaqtanaa wa qinaa 'adzaaban naar",
    translation: "Dengan nama Allah dan atas berkah Allah. Ya Allah, berkahilah kami pada rezeki yang Engkau berikan dan lindungi kami dari siksa neraka",
  },

  // === IFTAR (BUKA PUASA) ===
  {
    id: 4,
    category: "Iftar",
    title: "Doa Buka Puasa (Versi Populer)",
    arabic: "اَللّٰهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِيْنَ",
    transliteration: "Allahumma laka shumtu wa bika aamantu wa 'alaa rizqika afthartu bi rahmatika yaa arhamar raahimiin",
    translation: "Ya Allah, untuk-Mu aku berpuasa, kepada-Mu aku beriman, dan dengan rezeki-Mu aku berbuka, dengan rahmat-Mu wahai Yang Maha Penyayang",
  },
  {
    id: 5,
    category: "Iftar",
    title: "Doa Buka Puasa (HR. Abu Dawud)",
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوْقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللّٰهُ",
    transliteration: "Dzahabazh zhama-u wabtallatil 'uruuqu wa tsabatal ajru insyaa Allah",
    translation: "Telah hilang dahaga, telah basah tenggorokan, dan telah tetap pahalanya insya Allah",
  },
  {
    id: 6,
    category: "Iftar",
    title: "Doa Buka Puasa (HR. Tirmidzi)",
    arabic: "اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ بِرَحْمَتِكَ الَّتِيْ وَسِعَتْ كُلَّ شَيْءٍ أَنْ تَغْفِرَ لِيْ",
    transliteration: "Allahumma innii as-aluka bi rahmatikallati wasi'at kulla syai-in an taghfira lii",
    translation: "Ya Allah, aku memohon kepada-Mu dengan rahmat-Mu yang meliputi segala sesuatu, agar Engkau mengampuniku",
  },
  {
    id: 7,
    category: "Iftar",
    title: "Doa Buka Puasa (HR. Ibnu Majah)",
    arabic: "اَللّٰهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ فَتَقَبَّلْ مِنِّيْ إِنَّكَ أَنْتَ السَّمِيْعُ الْعَلِيْمُ",
    transliteration: "Allahumma laka shumtu wa 'alaa rizqika afthartu fataqabbal minnii innaka antas samii'ul 'aliim",
    translation: "Ya Allah, untuk-Mu aku berpuasa dan dengan rezeki-Mu aku berbuka, maka terimalah dariku, sesungguhnya Engkau Maha Mendengar lagi Maha Mengetahui",
  },
  {
    id: 8,
    category: "Iftar",
    title: "Doa Mendoakan yang Memberi Buka",
    arabic: "اَللّٰهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِيْ وَاسْقِ مَنْ سَقَانِيْ",
    transliteration: "Allahumma ath'im man ath'amanii wasqi man saqaanii",
    translation: "Ya Allah, berilah makan orang yang telah memberiku makan, dan berilah minum orang yang memberiku minum",
  },

  // === HARIAN ===
  {
    id: 9,
    category: "Harian",
    title: "Doa Sebelum Makan",
    arabic: "بِسْمِ اللّٰهِ وَبَرَكَةِ اللّٰهِ",
    transliteration: "Bismillahi wa barakatillah",
    translation: "Dengan nama Allah dan dengan berkah Allah",
  },
  {
    id: 10,
    category: "Harian",
    title: "Doa Setelah Makan",
    arabic: "اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِيْنَ",
    transliteration: "Alhamdulillahil ladzi ath'amana wa saqaana wa ja'alana muslimiin",
    translation: "Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami orang-orang Muslim",
  },
  {
    id: 11,
    category: "Harian",
    title: "Doa Mohon Ampunan",
    arabic: "رَبَّنَا ظَلَمْنَآ أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُوْنَنَّ مِنَ الْخَاسِرِيْنَ",
    transliteration: "Rabbanaa zhalamnaa anfusanaa wa in lam taghfir lanaa wa tarhamnaa lanakuunanna minal khaasiriin",
    translation: "Ya Tuhan kami, kami telah menganiaya diri kami sendiri, dan jika Engkau tidak mengampuni kami serta memberi rahmat kepada kami, niscaya kami termasuk orang-orang yang merugi",
  },
  {
    id: 12,
    category: "Harian",
    title: "Sayyidul Istighfar",
    arabic: "اَللّٰهُمَّ أَنْتَ رَبِّيْ لَا إِلٰهَ إِلَّا أَنْتَ خَلَقْتَنِيْ وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لَا يَغْفِرُ الذُّنُوْبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma anta rabbii laa ilaaha illaa anta khalaqtanii wa ana 'abduka wa ana 'alaa 'ahdika wa wa'dika mastatha'tu. A'uudzu bika min syarri maa shana'tu. Abuu-u laka bi ni'matika 'alayya wa abuu-u bi dzanbii faghfirlii fa innahu laa yaghfirudz dzunuuba illaa anta",
    translation: "Ya Allah, Engkau Tuhanku, tidak ada ilah yang berhak diibadahi selain Engkau. Engkau telah menciptakanku dan aku adalah hamba-Mu, aku berada di atas janji dan perjanjian-Mu semampuku. Aku berlindung kepada-Mu dari keburukan yang aku perbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku, sungguh tiada yang mengampuni dosa selain Engkau",
  },
  {
    id: 13,
    category: "Harian",
    title: "Doa Mohon Kebaikan Dunia Akhirat",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbanaa aatinaa fid dunyaa hasanatan wa fil aakhirati hasanatan wa qinaa 'adzaaban naar",
    translation: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari siksa neraka",
  },
  {
    id: 14,
    category: "Harian",
    title: "Doa Mohon Perlindungan",
    arabic: "اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيْحِ الدَّجَّالِ",
    transliteration: "Allahumma innii a'uudzu bika min 'adzaabi jahannam, wa min 'adzaabil qabri, wa min fitnatil mahyaa wal mamaati, wa min syarri fitnatil masiihid dajjaal",
    translation: "Ya Allah, aku berlindung kepada-Mu dari siksa Jahannam, dari siksa kubur, dari fitnah kehidupan dan kematian, dan dari keburukan fitnah Dajjal",
  },
  {
    id: 15,
    category: "Harian",
    title: "Doa Ketika Marah atau Tergoda",
    arabic: "أَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ",
    transliteration: "A'uudzu billaahi minasy syaithaanir rajiim",
    translation: "Aku berlindung kepada Allah dari godaan setan yang terkutuk",
  },
  {
    id: 16,
    category: "Harian",
    title: "Doa Ketika Dicela Saat Puasa",
    arabic: "إِنِّيْ صَائِمٌ، إِنِّيْ صَائِمٌ",
    transliteration: "Innii shaa-imun, innii shaa-imun",
    translation: "Sesungguhnya aku sedang berpuasa, sesungguhnya aku sedang berpuasa",
  },

  // === TARAWIH & WITIR ===
  {
    id: 17,
    category: "Tarawih",
    title: "Doa Setelah Shalat Tarawih",
    arabic: "اَللّٰهُمَّ اجْعَلْنَا بِالْإِيْمَانِ كَامِلِيْنَ وَلِلْفَرَائِضِ مُؤَدِّيْنَ وَلِلصَّلَاةِ حَافِظِيْنَ وَلِلزَّكَاةِ فَاعِلِيْنَ",
    transliteration: "Allahumma-j'alnaa bil iimaani kaamiliin, wa lil faraa-idhi mu-addiin, wa lish shalaati haafizhiin, wa liz zakaati faa'iliin",
    translation: "Ya Allah, jadikanlah kami orang yang sempurna imannya, yang menunaikan kewajiban, yang menjaga shalat, dan yang menunaikan zakat",
  },
  {
    id: 18,
    category: "Tarawih",
    title: "Doa Antar Rakaat Tarawih",
    arabic: "سُبْحَانَ ذِي الْمُلْكِ وَالْمَلَكُوْتِ، سُبْحَانَ ذِي الْعِزَّةِ وَالْعَظَمَةِ وَالْهَيْبَةِ وَالْقُدْرَةِ وَالْكِبْرِيَاءِ وَالْجَبَرُوْتِ",
    transliteration: "Subhaana dzil mulki wal malakuut, subhaana dzil 'izzati wal 'azhamati wal haibati wal qudrati wal kibriyaa-i wal jabaruut",
    translation: "Mahasuci Dzat yang memiliki kerajaan dan kekuasaan, Mahasuci Dzat yang memiliki kemuliaan, keagungan, kewibawaan, kekuasaan, kebesaran, dan keperkasaan",
  },
  {
    id: 19,
    category: "Witir",
    title: "Doa Qunut Witir",
    arabic: "اَللّٰهُمَّ اهْدِنِيْ فِيْمَنْ هَدَيْتَ وَعَافِنِيْ فِيْمَنْ عَافَيْتَ وَتَوَلَّنِيْ فِيْمَنْ تَوَلَّيْتَ وَبَارِكْ لِيْ فِيْمَا أَعْطَيْتَ وَقِنِيْ شَرَّ مَا قَضَيْتَ فَإِنَّكَ تَقْضِيْ وَلَا يُقْضَى عَلَيْكَ وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ",
    transliteration: "Allahummahdinii fiiman hadait, wa 'aafinii fiiman 'aafait, wa tawallanii fiiman tawallait, wa baarik lii fiimaa a'thait, wa qinii syarra maa qadhait, fa innaka taqdhii wa laa yuqdhaa 'alaik, wa innahu laa yadzillu man waalait, tabaarakta rabbanaa wa ta'aalait",
    translation: "Ya Allah, berilah aku petunjuk di antara orang-orang yang Engkau beri petunjuk. Berilah aku keselamatan di antara orang-orang yang Engkau beri keselamatan. Urusanilah aku di antara orang-orang yang Engkau urus. Berkahilah aku pada apa yang Engkau berikan. Lindungilah aku dari keburukan yang Engkau tetapkan. Sesungguhnya Engkau yang menetapkan dan tidak ada yang menetapkan atas-Mu. Sungguh tidak terhina orang yang Engkau lindungi. Mahaberkah Engkau, Tuhan kami, dan Mahatinggi",
  },
  {
    id: 20,
    category: "Witir",
    title: "Doa Setelah Salam Witir",
    arabic: "سُبْحَانَ الْمَلِكِ الْقُدُّوْسِ، سُبْحَانَ الْمَلِكِ الْقُدُّوْسِ، سُبْحَانَ الْمَلِكِ الْقُدُّوْسِ رَبُّ الْمَلَائِكَةِ وَالرُّوْحِ",
    transliteration: "Subhaanal malikil qudduus (3x), rabbul malaa-ikati war ruuh",
    translation: "Mahasuci Raja yang Mahasuci (3x), Tuhan para malaikat dan Jibril",
  },

  // === LAILATUL QADR ===
  {
    id: 21,
    category: "Lailatul Qadr",
    title: "Doa Malam Lailatul Qadr",
    arabic: "اَللّٰهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّىْ",
    transliteration: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'annii",
    translation: "Ya Allah, sesungguhnya Engkau Maha Pemaaf, Engkau suka memberi maaf, maka maafkanlah aku",
  },
  {
    id: 22,
    category: "Lailatul Qadr",
    title: "Doa 10 Malam Terakhir Ramadhan",
    arabic: "اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْجَنَّةَ وَأَعُوْذُ بِكَ مِنَ النَّارِ",
    transliteration: "Allahumma innii as-alukal jannata wa a'uudzu bika minan naar",
    translation: "Ya Allah, sungguh aku memohon surga kepada-Mu dan aku berlindung kepada-Mu dari api neraka",
  },
  {
    id: 23,
    category: "Lailatul Qadr",
    title: "Doa Akhir Ramadhan",
    arabic: "اَللّٰهُمَّ لَا تَجْعَلْهُ آخِرَ الْعَهْدِ مِنْ صِيَامِنَا رَمَضَانَ وَإِنْ جَعَلْتَهُ فَاجْعَلْنِيْ مَرْحُوْمًا وَلَا تَجْعَلْنِيْ مَحْرُوْمًا",
    transliteration: "Allahumma laa taj'alhu aakhiral 'ahdi min shiyaaminaa ramadhaana wa in ja'altahu faj'alnii marhuuman wa laa taj'alnii mahruuman",
    translation: "Ya Allah, janganlah Engkau jadikan ini Ramadhan terakhir bagiku. Jika Engkau menjadikannya demikian, maka jadikanlah aku orang yang dirahmati, dan jangan jadikan aku orang yang terhalang dari rahmat-Mu",
  },

  // === SHOLAT ===
  {
    id: 24,
    category: "Sholat",
    title: "Doa Setelah Adzan",
    arabic: "اَللّٰهُمَّ رَبَّ هٰذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيْلَةَ وَالْفَضِيْلَةَ وَابْعَثْهُ مَقَامًا مَحْمُوْدًا الَّذِيْ وَعَدْتَهُ",
    transliteration: "Allahumma rabba haadzihid da'watit taammah wash shalaatil qaa-imah, aati Muhammadanil wasiilata wal fadhiilah, wab'ats-hu maqaamam mahmuudanil ladzii wa'adtah",
    translation: "Ya Allah, Tuhan pemilik seruan yang sempurna ini dan shalat yang akan ditegakkan, berikanlah kepada Muhammad wasilah dan keutamaan, dan bangkitkanlah beliau ke tempat terpuji yang telah Engkau janjikan",
  },
  {
    id: 25,
    category: "Sholat",
    title: "Doa Setelah Sholat (Dzikir)",
    arabic: "أَسْتَغْفِرُ اللّٰهَ، أَسْتَغْفِرُ اللّٰهَ، أَسْتَغْفِرُ اللّٰهَ. اَللّٰهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    transliteration: "Astaghfirullaah (3x). Allahumma antas salaamu wa minkas salaamu tabaarakta yaa dzal jalaali wal ikraam",
    translation: "Aku memohon ampun kepada Allah (3x). Ya Allah, Engkau Mahasejahtera dan dari-Mu keselamatan. Mahaberkah Engkau wahai Dzat pemilik keagungan dan kemuliaan",
  },

  // === QURAN ===
  {
    id: 26,
    category: "Quran",
    title: "Doa Sebelum Membaca Al-Quran",
    arabic: "اَللّٰهُمَّ افْتَحْ عَلَيْنَا حِكْمَتَكَ وَانْشُرْ عَلَيْنَا رَحْمَتَكَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    transliteration: "Allahummaf-tah 'alainaa hikmataka wansyur 'alainaa rahmataka yaa dzal jalaali wal ikraam",
    translation: "Ya Allah, bukakanlah kepada kami hikmah-Mu dan curahkanlah kepada kami rahmat-Mu, wahai Dzat pemilik keagungan dan kemuliaan",
  },
  {
    id: 27,
    category: "Quran",
    title: "Doa Khatam Al-Quran",
    arabic: "صَدَقَ اللّٰهُ الْعَظِيْمُ. اَللّٰهُمَّ انْفَعْنِيْ بِالْقُرْآنِ الْعَظِيْمِ وَاجْعَلْهُ لِيْ إِمَامًا وَنُوْرًا وَهُدًى وَرَحْمَةً. اَللّٰهُمَّ ذَكِّرْنِيْ مِنْهُ مَا نَسِيْتُ وَعَلِّمْنِيْ مِنْهُ مَا جَهِلْتُ وَارْزُقْنِيْ تِلَاوَتَهُ آنَاءَ اللَّيْلِ وَأَطْرَافَ النَّهَارِ",
    transliteration: "Shadaqallahul 'azhiim. Allahumman-fa'nii bil qur-aanil 'azhiim waj'alhu lii imaaman wa nuuran wa hudan wa rahmah. Allahumma dzakkirnii minhu maa nasiitu wa 'allimnii minhu maa jahiltu warzuqnii tilaawatahu aanaa-al laili wa athraafan nahaar",
    translation: "Mahabenar Allah yang Mahaagung. Ya Allah, jadikanlah Al-Quran bermanfaat bagiku, jadikanlah ia imam, cahaya, petunjuk, dan rahmat bagiku. Ya Allah, ingatkanlah aku apa yang aku lupa darinya, ajarkanlah aku apa yang aku tidak tahu, dan karuniakanlah aku membacanya di waktu malam dan siang",
  },

  // === ZAKAT ===
  {
    id: 28,
    category: "Zakat",
    title: "Doa Niat Zakat Fitrah",
    arabic: "نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ نَفْسِيْ فَرْضًا لِلّٰهِ تَعَالَى",
    transliteration: "Nawaitu an ukhrija zakaatal fithri 'an nafsii fardhan lillaahi ta'aalaa",
    translation: "Saya niat mengeluarkan zakat fitrah untuk diri saya sendiri, fardhu karena Allah Ta'ala",
  },
  {
    id: 29,
    category: "Zakat",
    title: "Doa Menerima Zakat",
    arabic: "آجَرَكَ اللّٰهُ فِيْمَا أَعْطَيْتَ وَبَارَكَ لَكَ فِيْمَا أَبْقَيْتَ وَجَعَلَهُ لَكَ طَهُوْرًا",
    transliteration: "Aajarakallahu fiimaa a'thaita wa baaraka laka fiimaa abqaita wa ja'alahu laka thahuuran",
    translation: "Semoga Allah memberimu pahala atas apa yang engkau berikan, memberkahi apa yang tersisa, dan menjadikannya penyucian bagimu",
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

export const DUA_CATEGORIES = ["Semua", "Sahur", "Iftar", "Harian", "Tarawih", "Witir", "Lailatul Qadr", "Sholat", "Quran", "Zakat"];

export function getRamadhanDay(date = new Date()) {
  const start = new Date(getStartDate());
  start.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const diff = Math.floor((target - start) / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, Math.min(30, diff));
}

export function getMotivationalQuote(day) {
  return MOTIVATIONAL_QUOTES[(day - 1) % MOTIVATIONAL_QUOTES.length];
}
