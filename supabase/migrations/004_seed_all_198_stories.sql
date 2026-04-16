-- ============================================
-- Seed ALL 198 real stories from Sipuron archive
-- Replaces previous partial seed files
-- ============================================

BEGIN;

-- Clear existing data
DELETE FROM public.story_category_map;
DELETE FROM public.stories;

-- ============================================
-- INSERT all 198 stories
-- ============================================
INSERT INTO public.stories (title, slug, sort_order, narrator, duration_seconds, age_min, age_max, is_premium, status, published_at) VALUES

-- 0. קריאת שמע (intro/special)
('קריאת שמע', 'kriat-shma', 0, 'מנחם שרון', 300, 3, 8, false, 'published', '2025-01-01'),

-- 1-10
('יונתן איבשיץ והבריון', 'yonatan-eibeshitz-vehabiryon', 1, 'מנחם שרון', 540, 5, 12, true, 'published', '2025-01-02'),
('רבי רפאל והפונדק', 'rabi-rafael-vehafundak', 2, 'מנחם שרון', 560, 5, 12, true, 'published', '2025-01-04'),
('חג הגאולה יב יג תמוז', 'chag-hageula-yud-bet-tamuz', 3, 'מנחם שרון', 650, 6, 13, true, 'published', '2025-01-06'),
('הגמרא שהצילה', 'hagemara-shehitzila', 4, 'מנחם שרון', 490, 5, 10, true, 'published', '2025-01-08'),
('שערי ניקנור', 'shaarei-nikanor', 5, 'מנחם שרון', 550, 5, 12, true, 'published', '2025-01-10'),
('המבחן הגורלי של הרמבם', 'hamivchan-hagorali-shel-harambam', 6, 'מנחם שרון', 750, 6, 13, true, 'published', '2025-01-12'),
('רבי חנינא והאבן', 'rabi-chanina-vehaeven', 7, 'מנחם שרון', 610, 4, 10, true, 'published', '2025-01-14'),
('פרה שומרת שבת', 'para-shomeret-shabbat', 8, 'מנחם שרון', 520, 3, 8, false, 'published', '2025-01-16'),
('חלות השבת של אשת רבי חנינא', 'chalot-hashabbat-shel-eshet-rabi-chanina', 9, 'מנחם שרון', 580, 4, 9, true, 'published', '2025-01-18'),
('המצווה שהגינה מהנחש', 'hamitzva-sheheigina-mehanachash', 10, 'מנחם שרון', 610, 4, 10, true, 'published', '2025-01-20'),

-- 11-20
('החתן שנחטף', 'hechatan-shenechetaf', 11, 'מנחם שרון', 680, 5, 12, true, 'published', '2025-01-22'),
('התפילה של רבי ליבער', 'hatefila-shel-rabi-liber', 12, 'מנחם שרון', 590, 5, 12, true, 'published', '2025-01-24'),
('מושקה והפריץ', 'mushka-vehapritz', 13, 'מנחם שרון', 720, 3, 8, true, 'published', '2025-01-26'),
('תבלין של שבת', 'tavlin-shel-shabbat', 14, 'מנחם שרון', 510, 3, 8, true, 'published', '2025-01-28'),

-- 15-16 (missing from main list, placeholder titles)
('סיפור מספר 15', 'sipur-mispar-15', 15, 'מנחם שרון', 600, 5, 12, true, 'published', '2025-01-30'),
('סיפור מספר 16', 'sipur-mispar-16', 16, 'מנחם שרון', 600, 5, 12, true, 'published', '2025-02-01'),

-- 17-20
('מטבעות הזהב וכדי הדבש', 'matbeot-hazahav-vekadei-hadvash', 17, 'מנחם שרון', 640, 5, 12, true, 'published', '2025-02-03'),
('הארי הקדוש', 'haari-hakadosh', 18, 'מנחם שרון', 710, 6, 13, true, 'published', '2025-02-05'),
('העשיר והעני וגלגל החיים', 'heashir-veheani-vegalgal-hachaim', 19, 'מנחם שרון', 680, 5, 12, true, 'published', '2025-02-07'),
('הקמצן שהפך לנדבן', 'hakamtzan-shehafach-lenadvan', 20, 'מנחם שרון', 620, 5, 12, false, 'published', '2025-02-09'),

-- 21-30
('רבי לוי יצחק מברדיצוב בדין תורה', 'rabi-levi-yitzchak-miberditchev-bedin-tora', 21, 'מנחם שרון', 750, 6, 13, true, 'published', '2025-02-11'),
('אבא אומנא ובת קול משמיים', 'aba-umna-ubat-kol-mishamayim', 22, 'מנחם שרון', 660, 5, 12, true, 'published', '2025-02-13'),

-- 23 (missing, placeholder)
('סיפור מספר 23', 'sipur-mispar-23', 23, 'מנחם שרון', 600, 5, 12, true, 'published', '2025-02-15'),

('הארי הקדוש והתרנגולות', 'haari-hakadosh-vehatarnegolot', 24, 'מנחם שרון', 690, 5, 12, true, 'published', '2025-02-17'),
('בתו של נחוניה בן הקנה', 'bito-shel-nechunia-ben-hakane', 25, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-02-19'),
('נס שיח הצלף', 'nes-siach-hatzalaf', 26, 'מנחם שרון', 530, 5, 12, true, 'published', '2025-02-21'),
('רבי אלעזר בן שמוע', 'rabi-elazar-ben-shamua', 27, 'מנחם שרון', 610, 6, 13, true, 'published', '2025-02-23'),
('מתי יבוא המשיח', 'matai-yavo-hamashiach', 28, 'מנחם שרון', 700, 5, 12, true, 'published', '2025-02-25'),
('שש שנים טובות', 'shesh-shanim-tovot', 29, 'מנחם שרון', 620, 5, 12, true, 'published', '2025-02-27'),
('הציצית שהצילה', 'hatzitzit-shehitzila', 30, 'מנחם שרון', 550, 5, 12, true, 'published', '2025-03-01'),

-- 31-40
('החנוכיה המסתורית', 'hachanukia-hamistrorit', 31, 'מנחם שרון', 640, 5, 12, true, 'published', '2025-03-03'),
('אבא תחנה', 'aba-tachana', 32, 'מנחם שרון', 520, 5, 10, true, 'published', '2025-03-05'),
('אבני הכדכוד', 'avnei-hakadkod', 33, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-03-07'),
('מה שלמד רבי אלעזר מאליהו הנביא', 'ma-shelamad-rabi-elazar-meeliyahu-hanavi', 34, 'מנחם שרון', 690, 6, 13, true, 'published', '2025-03-09'),
('המוכסן שהחליט לשמור שבת', 'hamochsan-shehechlit-lishmor-shabbat', 35, 'מנחם שרון', 630, 5, 12, true, 'published', '2025-03-11'),
('מר עוקבא ומתן בסתר', 'mar-ukva-umatan-beseter', 36, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-03-13'),
('הכפרי שהוריד גשם בירושלים', 'hakafri-shehorid-geshem-birushalayim', 37, 'מנחם שרון', 610, 5, 12, true, 'published', '2025-03-15'),
('התפילה שכמעט הביאה את המשיח', 'hatefila-shekimat-hevia-et-hamashiach', 38, 'מנחם שרון', 720, 6, 13, true, 'published', '2025-03-17'),
('מבחן בחג השבועות', 'mivchan-bechag-hashavuot', 39, 'מנחם שרון', 560, 5, 12, true, 'published', '2025-03-19'),
('רואה למרחוק', 'roe-lemarchok', 40, 'מנחם שרון', 540, 5, 12, false, 'published', '2025-03-21'),

-- 41-50
('רבי אליעזר מכניס אורחים', 'rabi-eliezer-machnis-orchim', 41, 'מנחם שרון', 600, 5, 12, true, 'published', '2025-03-23'),
('השגחה פרטית אפילו על גבעול קש', 'hashgacha-pratit-afilu-al-givol-kash', 42, 'מנחם שרון', 570, 5, 12, true, 'published', '2025-03-25'),
('הפריץ שחזר ליהדותו', 'hapritz-shechazar-leyahaduto', 43, 'מנחם שרון', 650, 5, 12, true, 'published', '2025-03-27'),
('הפריץ שעשה תשובה ביום הכיפורים', 'hapritz-sheasa-tshuva-beyom-hakipurim', 44, 'מנחם שרון', 700, 5, 12, true, 'published', '2025-03-29'),
('הבנקאי שכמעט איבד הכל בשביל השבת', 'habankai-shekimat-ibed-hakol-bishvil-hashabbat', 45, 'מנחם שרון', 680, 6, 13, true, 'published', '2025-03-31'),
('ההשקעה הכי משתלמת', 'hahashkaa-hachi-mishtalemet', 46, 'מנחם שרון', 560, 5, 12, true, 'published', '2025-04-02'),
('סל מהשמיים', 'sal-mehashamayim', 47, 'מנחם שרון', 520, 4, 10, true, 'published', '2025-04-04'),
('תעלומה באמצע תפילת יום כיפור', 'taaluma-beemtza-tefilat-yom-kipur', 48, 'מנחם שרון', 740, 6, 13, true, 'published', '2025-04-06'),
('הבעל שם טוב ושלוש דפיקות', 'habaal-shem-tov-veshalosh-dfikot', 49, 'מנחם שרון', 780, 5, 12, true, 'published', '2025-04-08'),
('ובכן תן פחדך על החיילים השיכורים', 'uvchen-ten-pachdecha-al-hachayalim-hashikurim', 50, 'מנחם שרון', 850, 7, 13, true, 'published', '2025-04-10'),

-- 51-60
('המראה שהחזירה בתשובה', 'hamare-shehechzira-betshuva', 51, 'מנחם שרון', 610, 5, 12, true, 'published', '2025-04-12'),
('סליחות מתוך שירה ושמחה', 'slichot-mitoch-shira-vesimcha', 52, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-04-14'),
('תשובה שלמה בזכות מידת האמת', 'tshuva-shlema-bizchut-midat-haemet', 53, 'מנחם שרון', 640, 5, 12, true, 'published', '2025-04-16'),
('סליחות בבית המרזח בברדיצוב', 'slichot-bebeit-hamarzach-bebarditchev', 54, 'מנחם שרון', 670, 6, 13, true, 'published', '2025-04-18'),
('ראש השנה בעולמות עליונים', 'rosh-hashana-beolamot-elyonim', 55, 'מנחם שרון', 730, 6, 13, true, 'published', '2025-04-20'),
('תפילה של ילד שבוקעת רקיעים', 'tefila-shel-yeled-shebokeaat-rekiim', 56, 'מנחם שרון', 560, 4, 10, true, 'published', '2025-04-22'),
('שופר בסיביר הרחוקה', 'shofar-besibir-harechoka', 57, 'מנחם שרון', 680, 6, 13, true, 'published', '2025-04-24'),
('יעקב עומד בניסיון', 'yaakov-omed-benisayon', 58, 'מנחם שרון', 600, 5, 12, true, 'published', '2025-04-26'),
('שיכור קדוש ביום הכיפורים', 'shikor-kadosh-beyom-hakipurim', 59, 'מנחם שרון', 650, 6, 13, true, 'published', '2025-04-28'),
('כפרות על שני פנקסים', 'kaparot-al-shnei-pinkasim', 60, 'מנחם שרון', 570, 5, 12, false, 'published', '2025-04-30'),

-- 61-70
('יום הכיפורים כמו בגן עדן', 'yom-hakipurim-kmo-began-eden', 61, 'מנחם שרון', 690, 5, 12, true, 'published', '2025-05-02'),
('אבא מוצא את בנו ביום הכיפורים', 'aba-motze-et-bno-beyom-hakipurim', 62, 'מנחם שרון', 620, 5, 12, true, 'published', '2025-05-04'),
('שעיר לעזאזל', 'sair-laazazel', 63, 'מנחם שרון', 710, 7, 13, true, 'published', '2025-05-06'),
('סוכה או גן עדן', 'suka-o-gan-eden', 64, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-05-08'),
('האתרוג של הרב מרדכי אליהו', 'haetrog-shel-harav-mordechai-eliyahu', 65, 'מנחם שרון', 640, 5, 12, true, 'published', '2025-05-10'),
('אתרוג מגן עדן', 'etrog-migan-eden', 66, 'מנחם שרון', 590, 5, 12, true, 'published', '2025-05-12'),
('שלג כבד בשמחת תורה', 'sheleg-kaved-besimchat-tora', 67, 'מנחם שרון', 620, 5, 12, true, 'published', '2025-05-14'),
('זקן מסתורי באי בודד', 'zaken-mistori-beiy-boded', 68, 'מנחם שרון', 740, 5, 12, true, 'published', '2025-05-16'),
('בדרך לפסגה', 'baderech-lapisga', 69, 'מנחם שרון', 560, 5, 12, true, 'published', '2025-05-18'),
('הלל הזקן ואהבת התורה', 'hilel-hazaken-veahavat-hatora', 70, 'מנחם שרון', 650, 5, 12, true, 'published', '2025-05-20'),

-- 71-80
('רבי אליעזר בן הורקנוס', 'rabi-eliezer-ben-hurkanos', 71, 'מנחם שרון', 700, 6, 13, true, 'published', '2025-05-22'),
('כוחו של יהודי פשוט', 'kocho-shel-yehudi-pashut', 72, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-05-24'),
('הסחורה הכי טובה בעולם', 'haschora-hachi-tova-baolam', 73, 'מנחם שרון', 540, 5, 12, true, 'published', '2025-05-26'),
('חוני המעגל ועץ החרוב', 'choni-hamaagal-veetz-hacharuv', 74, 'מנחם שרון', 660, 5, 12, true, 'published', '2025-05-28'),
('הסודות של אליהו הנביא', 'hasodot-shel-eliyahu-hanavi', 75, 'מנחם שרון', 720, 5, 12, true, 'published', '2025-05-30'),
('נקדימון בן גוריון ועולי הרגל', 'nakdimon-ben-gurion-veolei-haregel', 76, 'מנחם שרון', 680, 6, 13, true, 'published', '2025-06-01'),
('התפילה ששברה את הבצורת במרוקו', 'hatefila-sheshavra-et-habatzoret-bemaroko', 77, 'מנחם שרון', 640, 5, 12, true, 'published', '2025-06-03'),
('הגשם שירד בזכות המלמד', 'hageshem-sheyarad-bizchut-hamelamed', 78, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-06-05'),
('גשמי ברכה בטבריה', 'gishmei-bracha-betverya', 79, 'מנחם שרון', 550, 5, 12, true, 'published', '2025-06-07'),
('משה והמלאכים במתן תורה', 'moshe-vehamalachim-bematan-tora', 80, 'מנחם שרון', 750, 5, 12, false, 'published', '2025-06-09'),

-- 81-90
('הבבא סאלי והמקווה', 'hababa-sali-vehamikveh', 81, 'מנחם שרון', 640, 5, 12, true, 'published', '2025-06-11'),
('הנס של רחל אמנו', 'hanes-shel-rachel-imenu', 82, 'מנחם שרון', 700, 5, 12, true, 'published', '2025-06-13'),
('דמא בן נתינה', 'dama-ben-netina', 83, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-06-15'),
('אופניים חדשות בזכות כיבוד אם', 'ofanayim-chadashot-bizchut-kibud-em', 84, 'מנחם שרון', 520, 4, 10, true, 'published', '2025-06-17'),
('איך רבי טרפון כיבד את אמו', 'eich-rabi-tarfon-kibed-et-imo', 85, 'מנחם שרון', 560, 5, 12, true, 'published', '2025-06-19'),
('נס בזכות כיבוד אם', 'nes-bizchut-kibud-em', 86, 'מנחם שרון', 530, 4, 10, true, 'published', '2025-06-21'),
('ההפלגה שנדחתה', 'hahaflaga-shenidcheta', 87, 'מנחם שרון', 610, 5, 12, true, 'published', '2025-06-23'),
('התלמיד שהביא אורח מפתיע', 'hatalmid-shehevi-oreach-maftia', 88, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-06-25'),
('עז בתוך הישיבה', 'ez-betoch-hayeshiva', 89, 'מנחם שרון', 540, 5, 12, true, 'published', '2025-06-27'),
('מלך פרס וחלב הלביאה', 'melech-paras-vechalav-halevia', 90, 'מנחם שרון', 680, 5, 12, true, 'published', '2025-06-29'),

-- 91-100
('אליעזר מוצא אישה ליצחק', 'eliezer-motze-isha-leyitzchak', 91, 'מנחם שרון', 720, 5, 12, true, 'published', '2025-07-01'),
('תיקון חצות מסתורי', 'tikun-chatzot-mistori', 92, 'מנחם שרון', 640, 6, 13, true, 'published', '2025-07-03'),
('מאכזבה להצלחה', 'meachzava-lehatzlacha', 93, 'מנחם שרון', 560, 5, 12, true, 'published', '2025-07-05'),
('מסירות נפש על התורה', 'mesirut-nefesh-al-hatora', 94, 'מנחם שרון', 680, 6, 13, true, 'published', '2025-07-07'),
('הברכה שמילאה את המקווה', 'habracha-shemila-et-hamikveh', 95, 'מנחם שרון', 590, 5, 12, true, 'published', '2025-07-09'),
('מי עיכב את עשיו במסע הציד', 'mi-ikev-et-esav-bemasa-hatzayid', 96, 'מנחם שרון', 650, 5, 12, true, 'published', '2025-07-11'),
('הדוב שניצח את הפריץ', 'haduv-shenitzeach-et-hapritz', 97, 'מנחם שרון', 600, 5, 12, true, 'published', '2025-07-13'),
('אבא יודן והאוצר הגדול', 'aba-yudan-vehaotzar-hagadol', 98, 'מנחם שרון', 620, 5, 12, true, 'published', '2025-07-15'),
('בזכות מידת האמת', 'bizchut-midat-haemet', 99, 'מנחם שרון', 570, 5, 12, true, 'published', '2025-07-17'),
('אלף קרבנות מול שתי ציפורים קטנות', 'elef-korbanot-mul-shtei-tziporim-ktanot', 100, 'מנחם שרון', 640, 5, 12, false, 'published', '2025-07-19'),

-- 101-110
('הסיפור מאחורי הדודאים של ראובן', 'hasipur-meachorei-hadudaim-shel-reuven', 101, 'מנחם שרון', 680, 5, 12, true, 'published', '2025-07-21'),
('הרבי האמצעי והלכות טריפות', 'harabi-haemtzai-vehilchot-trefot', 102, 'מנחם שרון', 710, 6, 13, true, 'published', '2025-07-23'),
('החסיד שלא וויתר', 'hachasid-shelo-viter', 103, 'מנחם שרון', 590, 5, 12, true, 'published', '2025-07-25'),
('הרב שלא ויתר על האמת', 'harav-shelo-viter-al-haemet', 104, 'מנחם שרון', 620, 6, 13, true, 'published', '2025-07-27'),
('החסד שהפך לשלהבת אש', 'hachesed-shehafach-leshalhevet-esh', 105, 'מנחם שרון', 640, 5, 12, true, 'published', '2025-07-29'),
('כמה שוות עשר דקות', 'kama-shavot-eser-dakot', 106, 'מנחם שרון', 530, 5, 12, true, 'published', '2025-07-31'),
('יעקב ועניי שכם', 'yaakov-vaaniei-shchem', 107, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-08-02'),
('סגירת מעגל אחרי 25 שנה', 'sgirat-maagal-acharei-25-shana', 108, 'מנחם שרון', 660, 5, 12, true, 'published', '2025-08-04'),
('שרשרת הניסים בדרך למאסר', 'sharsheret-hanisim-baderech-lemaasar', 109, 'מנחם שרון', 730, 6, 13, true, 'published', '2025-08-06'),
('נס ברכת הלבנה בחצר הכלא', 'nes-birkat-halevana-bachatzer-hakele', 110, 'מנחם שרון', 650, 6, 13, true, 'published', '2025-08-08'),

-- 111-120
('הבן איש חי ושלושת הסוחרים', 'haben-ish-chai-ushloshet-hasochrim', 111, 'מנחם שרון', 700, 6, 13, true, 'published', '2025-08-10'),
('מה יוסף לחש שהפתיע את פוטיפר', 'ma-yosef-lachash-shehiftia-et-potifar', 112, 'מנחם שרון', 640, 5, 12, true, 'published', '2025-08-12'),
('הסגולה המופלאה ביותר לנס חנוכה', 'hasgula-hamufla-beyoter-lenes-chanuka', 113, 'מנחם שרון', 660, 5, 12, true, 'published', '2025-08-14'),
('מדוע כיבה הרבי את נרות החנוכיה', 'madua-kiba-harabi-et-nerot-hachanukia', 114, 'מנחם שרון', 620, 5, 12, true, 'published', '2025-08-16'),
('בזכות נר ישן שנמצא במחסן', 'bizchut-ner-yashan-shenimtza-bamachsan', 115, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-08-18'),
('אור קטן בטהרן הרחוקה', 'or-katan-beteheran-harechoka', 116, 'מנחם שרון', 600, 5, 12, true, 'published', '2025-08-20'),
('החוקים המוזרים של יוסף', 'hachukim-hamuzarim-shel-yosef', 117, 'מנחם שרון', 650, 5, 12, true, 'published', '2025-08-22'),
('סודו של השמש', 'sodo-shel-hashemesh', 118, 'מנחם שרון', 570, 5, 12, true, 'published', '2025-08-24'),

-- 119 (missing, placeholder)
('סיפור מספר 119', 'sipur-mispar-119', 119, 'מנחם שרון', 600, 5, 12, true, 'published', '2025-08-26'),

('מלאך בתחנת אוטובוס', 'malach-betachanat-otobus', 120, 'מנחם שרון', 580, 5, 12, false, 'published', '2025-08-28'),

-- 121-130
('המים שהפכו ליין', 'hamayim-shehafchu-leyayin', 121, 'מנחם שרון', 540, 5, 12, true, 'published', '2025-08-30'),
('הסוד שיוסף נשבע לא לגלות', 'hasod-sheyosef-nishba-lo-legalot', 122, 'מנחם שרון', 660, 5, 12, true, 'published', '2025-09-01'),
('האיש עם הידיים הכחולות', 'haish-im-hayadayim-hakchulot', 123, 'מנחם שרון', 610, 5, 12, true, 'published', '2025-09-03'),
('סיפור המצור על ירושלים', 'sipur-hamatzor-al-yerushalayim', 124, 'מנחם שרון', 750, 6, 13, true, 'published', '2025-09-05'),
('ההגדה המסתורית', 'hahagada-hamistrorit', 125, 'מנחם שרון', 680, 5, 12, true, 'published', '2025-09-07'),
('כרטיס החסד הסודי', 'kartis-hachesed-hasodi', 126, 'מנחם שרון', 540, 4, 10, true, 'published', '2025-09-09'),
('הנס הכפול בשער הארמון במצרים', 'hanes-hakaful-beshaar-haarmon-bemitzrayim', 127, 'מנחם שרון', 700, 5, 12, true, 'published', '2025-09-11'),
('כיסא שהיה גם מעלית', 'kise-shehaya-gam-maalit', 128, 'מנחם שרון', 560, 4, 10, true, 'published', '2025-09-13'),
('הסלון שהפך כמעט לים התיכון', 'hasalon-shehafach-kimat-leyam-hatichon', 129, 'מנחם שרון', 590, 4, 10, true, 'published', '2025-09-15'),
('שרשרת של חסדים בתוך מונית', 'sharsheret-shel-chasadim-betoch-monit', 130, 'מנחם שרון', 520, 4, 10, true, 'published', '2025-09-17'),

-- 131-140
('תודה אחרי שמונה שנים', 'toda-acharei-shmone-shanim', 131, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-09-19'),
('מטה פלאים באמצע הגינה', 'mate-playm-beemtza-hagina', 132, 'מנחם שרון', 550, 4, 10, true, 'published', '2025-09-21'),
('תרופה סודית בדיר העיזים', 'trufa-sodit-bedir-haizim', 133, 'מנחם שרון', 600, 5, 12, true, 'published', '2025-09-23'),
('הנס מאחורי חלון הזכוכית', 'hanes-meachorei-chalon-hazkuchit', 134, 'מנחם שרון', 570, 5, 12, true, 'published', '2025-09-25'),
('הרב שהפך לעגלון', 'harav-shehafach-leagalon', 135, 'מנחם שרון', 630, 5, 12, true, 'published', '2025-09-27'),
('כוחה של ההודיה להשם', 'kocha-shel-hahodaya-lahashem', 136, 'מנחם שרון', 560, 5, 12, true, 'published', '2025-09-29'),
('המכה שגילתה את הגנבים', 'hamaka-shegilta-et-haganavim', 137, 'מנחם שרון', 590, 5, 12, true, 'published', '2025-10-01'),
('העשיר שוויתר על העולם הבא', 'heashir-sheviter-al-haolam-haba', 138, 'מנחם שרון', 650, 5, 12, true, 'published', '2025-10-03'),
('הבבא סאלי והשעון האחרון', 'hababa-sali-vehasheon-haacharon', 139, 'מנחם שרון', 680, 5, 12, true, 'published', '2025-10-05'),
('ארוחת בוקר מהשמיים', 'aruchat-boker-mehashamayim', 140, 'מנחם שרון', 520, 4, 10, false, 'published', '2025-10-07'),

-- 141-150
('כוחן של מילים', 'kochan-shel-milim', 141, 'מנחם שרון', 540, 5, 12, true, 'published', '2025-10-09'),
('פרשת בא הסוד המופלא של שרח בת אשר', 'parashat-bo-hasod-hamufla-shel-serach-bat-asher', 142, 'מנחם שרון', 700, 5, 12, true, 'published', '2025-10-11'),
('יונה מזהב', 'yona-mizahav', 143, 'מנחם שרון', 560, 5, 12, true, 'published', '2025-10-13'),
('הכנר והבירכון', 'haknar-vehabirkon', 144, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-10-15'),
('מעבר גבול בברוקלין', 'maavar-gvul-bebrooklin', 145, 'מנחם שרון', 620, 5, 12, true, 'published', '2025-10-17'),
('מה שהסתתר בתרופה', 'ma-shehistater-batrufa', 146, 'מנחם שרון', 550, 5, 12, true, 'published', '2025-10-19'),
('אלפי תופים של אמונה', 'alfei-tupim-shel-emuna', 147, 'מנחם שרון', 640, 5, 12, true, 'published', '2025-10-21'),
('בזכות שתי מילים בלבד', 'bizchut-shtei-milim-bilvad', 148, 'מנחם שרון', 530, 5, 12, true, 'published', '2025-10-23'),
('הברכה שעצרה את האש', 'habracha-sheatzra-et-haesh', 149, 'מנחם שרון', 590, 5, 12, true, 'published', '2025-10-25'),
('נס המעיין באמצע היער', 'nes-hamaayan-beemtza-hayaar', 150, 'מנחם שרון', 570, 5, 12, true, 'published', '2025-10-27'),

-- 151-160
('מי יודע להצליף', 'mi-yodea-lehatzlif', 151, 'מנחם שרון', 540, 5, 12, true, 'published', '2025-10-29'),
('מדוע משה רבינו הפסיק לדבר', 'madua-moshe-rabenu-hifsik-ledaber', 152, 'מנחם שרון', 620, 5, 12, true, 'published', '2025-10-31'),
('התיקון של שומר הפרדס', 'hatikun-shel-shomer-hapardes', 153, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-11-02'),
('על מה ביקשה הרבנית סליחה', 'al-ma-biksha-harabanit-slicha', 154, 'מנחם שרון', 560, 5, 12, true, 'published', '2025-11-04'),
('הישיבה שכמעט נסגרה', 'hayeshiva-shekimat-nisgera', 155, 'מנחם שרון', 640, 5, 12, true, 'published', '2025-11-06'),
('מלכודת בשדה התעופה', 'malkodet-bisdeh-hateeufa', 156, 'מנחם שרון', 670, 5, 12, true, 'published', '2025-11-08'),
('להוריד את המשקל מהלב', 'lehorid-et-hamishkal-mehalev', 157, 'מנחם שרון', 530, 5, 12, true, 'published', '2025-11-10'),
('הריקוד שהרעיש עולמות', 'harikud-shehirish-olamot', 158, 'מנחם שרון', 610, 5, 12, true, 'published', '2025-11-12'),
('השמחה שסילקה את העוני', 'hasimcha-shesilka-et-haoni', 159, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-11-14'),
('החנוכיה שסירבה להידלק', 'hachanukia-shesirva-lehidalek', 160, 'מנחם שרון', 600, 5, 12, false, 'published', '2025-11-16'),

-- 161-170
('נס פורים בזכות מפה', 'nes-purim-bizchut-mapa', 161, 'מנחם שרון', 620, 5, 12, true, 'published', '2025-11-18'),
('מי סוחב עצים במדבר', 'mi-sochev-etzim-bamidbar', 162, 'מנחם שרון', 550, 5, 12, true, 'published', '2025-11-20'),
('מה מסתתר מאחורי התחפושת', 'ma-mistater-meachorei-hatachposet', 163, 'מנחם שרון', 580, 4, 10, true, 'published', '2025-11-22'),
('פורים תימן הנסיך שקם לתחיה', 'purim-teiman-hanasich-shekam-letchia', 164, 'מנחם שרון', 700, 5, 12, true, 'published', '2025-11-24'),
('הבדחן שחיפש את השמחה', 'habadchan-shechipesh-et-hasimcha', 165, 'מנחם שרון', 590, 5, 12, true, 'published', '2025-11-26'),
('קופסת הטבק של החידא', 'kufsat-hatabak-shel-hachida', 166, 'מנחם שרון', 560, 5, 12, true, 'published', '2025-11-28'),
('סוד הקטורת של בית אבטינס', 'sod-haktoret-shel-beit-avtinas', 167, 'מנחם שרון', 640, 6, 13, true, 'published', '2025-11-30'),
('הריקוד שהושיע', 'harikud-shehoshia', 168, 'מנחם שרון', 570, 5, 12, true, 'published', '2025-12-02'),
('מגילת אסתר הסיפור המלא', 'megilat-ester-hasipur-hamale', 169, 'מנחם שרון', 1080, 5, 12, true, 'published', '2025-12-04'),
('פורים סרגוסה החלום שהציל את הקהילה', 'purim-saragosa-hachalom-shehitzil-et-hakehila', 170, 'מנחם שרון', 720, 5, 12, true, 'published', '2025-12-06'),

-- 171-180
('בזכות אוזן המן', 'bizchut-ozen-haman', 171, 'מנחם שרון', 540, 4, 10, true, 'published', '2025-12-08'),
('הניסיון הגדול במדבר סיני', 'hanisayon-hagadol-bamidbar-sinai', 172, 'מנחם שרון', 660, 5, 12, true, 'published', '2025-12-10'),
('הסופה שעצרה את הרכבת', 'hasufa-sheatzra-et-harakevet', 173, 'מנחם שרון', 610, 5, 12, true, 'published', '2025-12-12'),
('החידה של האורח המוזר', 'hachida-shel-haorach-hamuzer', 174, 'מנחם שרון', 590, 5, 12, true, 'published', '2025-12-14'),
('הכתובת הסודית בפתק', 'haktovet-hasodit-bapetek', 175, 'מנחם שרון', 560, 5, 12, true, 'published', '2025-12-16'),
('ארבע כוסות של חלב', 'arba-kosot-shel-chalav', 176, 'מנחם שרון', 580, 4, 10, true, 'published', '2025-12-18'),
('התולעת שניצחה את הברזל', 'hatola-at-sheniztcha-et-habarzel', 177, 'מנחם שרון', 620, 5, 12, true, 'published', '2025-12-20'),
('עולם הבא תמורת תפוחי אדמה', 'olam-haba-tmurat-tapuchei-adama', 178, 'מנחם שרון', 580, 5, 12, true, 'published', '2025-12-22'),
('הצדיק שחיפש לחמניה בערב פסח', 'hatzadik-shechipesh-lachmanya-beerev-pesach', 179, 'מנחם שרון', 610, 5, 12, true, 'published', '2025-12-24'),
('המרור שהבריח את האורח', 'hamaror-shehevriach-et-haorach', 180, 'מנחם שרון', 550, 4, 10, false, 'published', '2025-12-26'),

-- 181-190
('ליל הסדר שהרעיש עולמות', 'leil-haseder-shehirish-olamot', 181, 'מנחם שרון', 700, 5, 12, true, 'published', '2025-12-28'),
('עוגת גבינה בליל הסדר', 'ugat-gvina-beleil-haseder', 182, 'מנחם שרון', 560, 4, 10, true, 'published', '2025-12-30'),
('היהודי שרצה לפגוש את אליהו הנביא', 'hayehudi-sheratza-lifgosh-et-eliyahu-hanavi', 183, 'מנחם שרון', 640, 5, 12, true, 'published', '2026-01-01'),
('עוגת גבינה בליל הסדר', 'ugat-gvina-beleil-haseder-2', 184, 'מנחם שרון', 560, 4, 10, true, 'published', '2026-01-03'),
('ליל הסדר והשודדים', 'leil-haseder-vehashodedim', 185, 'מנחם שרון', 680, 5, 12, true, 'published', '2026-01-05'),
('המרכבה של אליהו הנביא', 'hamerkava-shel-eliyahu-hanavi', 186, 'מנחם שרון', 700, 5, 12, true, 'published', '2026-01-07'),
('מבצע סולמות', 'mivtza-sulamot', 187, 'מנחם שרון', 620, 5, 12, true, 'published', '2026-01-09'),
('ההבטחה של הרבי', 'hahavtacha-shel-harabi', 188, 'מנחם שרון', 640, 5, 12, true, 'published', '2026-01-11'),
('כרכרה מהשמיים', 'karkara-mehashamayim', 189, 'מנחם שרון', 580, 5, 12, true, 'published', '2026-01-13'),
('חיילים בליל שימורים', 'chayalim-beleil-shimurim', 190, 'מנחם שרון', 650, 5, 12, true, 'published', '2026-01-15'),

-- 191-198
('שריפת החמץ במפעל', 'srefat-hachametz-bamifal', 191, 'מנחם שרון', 580, 5, 12, true, 'published', '2026-01-17'),
('הטעות שהצילה את פראג', 'hataut-shehitzila-et-prag', 192, 'מנחם שרון', 640, 5, 12, true, 'published', '2026-01-19'),
('החלום שהציל את ירושלים', 'hachalom-shehitzil-et-yerushalayim', 193, 'מנחם שרון', 680, 5, 12, true, 'published', '2026-01-21'),
('שיירת גמלים מן השמיים', 'shayeret-gmalim-min-hashamayim', 194, 'מנחם שרון', 620, 5, 12, true, 'published', '2026-01-23'),
('האש הפלאית מקודש הקדשים', 'haesh-haplayt-mikodesh-hakodashim', 195, 'מנחם שרון', 700, 6, 13, true, 'published', '2026-01-25'),
('המצווה ששווה כל הון', 'hamitzva-sheshava-kol-hon', 196, 'מנחם שרון', 560, 5, 12, true, 'published', '2026-01-27'),
('השמחה כנגד כל הסיכויים', 'hasimcha-kneged-kol-hasikuyim', 197, 'מנחם שרון', 610, 5, 12, true, 'published', '2026-01-29'),
('המתנה למלך המשיח', 'hamatana-lemelech-hamashiach', 198, 'מנחם שרון', 650, 5, 12, true, 'published', '2026-01-31');


-- ============================================
-- CATEGORY MAPPINGS
-- ============================================

-- ────────────────────────────────────────────
-- tzadikim: רבי / הרב / בעל שם טוב / בבא סאלי / חידא / הארי / רמבם / הלל / חוני etc.
-- ────────────────────────────────────────────
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'tzadikim' AND s.slug IN (
  'yonatan-eibeshitz-vehabiryon',          -- 1 יונתן איבשיץ
  'rabi-rafael-vehafundak',                 -- 2 רבי רפאל
  'hamivchan-hagorali-shel-harambam',       -- 6 הרמבם
  'rabi-chanina-vehaeven',                  -- 7 רבי חנינא
  'chalot-hashabbat-shel-eshet-rabi-chanina', -- 9 אשת רבי חנינא
  'hatefila-shel-rabi-liber',               -- 12 רבי ליבער
  'haari-hakadosh',                         -- 18 הארי הקדוש
  'rabi-levi-yitzchak-miberditchev-bedin-tora', -- 21 רבי לוי יצחק
  'haari-hakadosh-vehatarnegolot',          -- 24 הארי הקדוש
  'bito-shel-nechunia-ben-hakane',          -- 25 בתו של נחוניה
  'rabi-elazar-ben-shamua',                 -- 27 רבי אלעזר
  'ma-shelamad-rabi-elazar-meeliyahu-hanavi', -- 34 רבי אלעזר + אליהו
  'rabi-eliezer-machnis-orchim',            -- 41 רבי אליעזר
  'habaal-shem-tov-veshalosh-dfikot',       -- 49 בעל שם טוב
  'hilel-hazaken-veahavat-hatora',          -- 70 הלל הזקן
  'rabi-eliezer-ben-hurkanos',              -- 71 רבי אליעזר בן הורקנוס
  'choni-hamaagal-veetz-hacharuv',          -- 74 חוני המעגל
  'nakdimon-ben-gurion-veolei-haregel',     -- 76 נקדימון בן גוריון
  'hababa-sali-vehamikveh',                 -- 81 הבבא סאלי
  'dama-ben-netina',                        -- 83 דמא בן נתינה
  'eich-rabi-tarfon-kibed-et-imo',          -- 85 רבי טרפון
  'haben-ish-chai-ushloshet-hasochrim',     -- 111 הבן איש חי
  'harabi-haemtzai-vehilchot-trefot',       -- 102 הרבי האמצעי
  'harav-shelo-viter-al-haemet',            -- 104 הרב
  'harav-shehafach-leagalon',               -- 135 הרב
  'hababa-sali-vehasheon-haacharon',        -- 139 הבבא סאלי
  'kufsat-hatabak-shel-hachida',            -- 166 החידא
  'haetrog-shel-harav-mordechai-eliyahu',   -- 65 הרב מרדכי אליהו
  'hahavtacha-shel-harabi',                 -- 188 הרבי
  'madua-moshe-rabenu-hifsik-ledaber'       -- 152 משה רבינו
);

-- ────────────────────────────────────────────
-- holidays: חנוכה / פורים / סוכה / אתרוג / פסח / סדר / ר"ה / שופר / כיפור / שבת / שבועות / סליחות / תשובה / כפרות / שמחת תורה / חמץ / מרור
-- ────────────────────────────────────────────
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'holidays' AND s.slug IN (
  'chag-hageula-yud-bet-tamuz',             -- 3 חג הגאולה
  'para-shomeret-shabbat',                  -- 8 שבת
  'chalot-hashabbat-shel-eshet-rabi-chanina', -- 9 שבת
  'tavlin-shel-shabbat',                    -- 14 שבת
  'hamochsan-shehechlit-lishmor-shabbat',   -- 35 שבת
  'habankai-shekimat-ibed-hakol-bishvil-hashabbat', -- 45 שבת
  'mivchan-bechag-hashavuot',               -- 39 שבועות
  'hamare-shehechzira-betshuva',            -- 51 תשובה
  'slichot-mitoch-shira-vesimcha',          -- 52 סליחות
  'tshuva-shlema-bizchut-midat-haemet',     -- 53 תשובה
  'slichot-bebeit-hamarzach-bebarditchev',  -- 54 סליחות
  'rosh-hashana-beolamot-elyonim',          -- 55 ראש השנה
  'shofar-besibir-harechoka',               -- 57 שופר
  'shikor-kadosh-beyom-hakipurim',          -- 59 יום הכיפורים
  'kaparot-al-shnei-pinkasim',             -- 60 כפרות
  'yom-hakipurim-kmo-began-eden',           -- 61 יום הכיפורים
  'aba-motze-et-bno-beyom-hakipurim',       -- 62 יום הכיפורים
  'sair-laazazel',                          -- 63 שעיר (יו"כ)
  'suka-o-gan-eden',                        -- 64 סוכה
  'haetrog-shel-harav-mordechai-eliyahu',   -- 65 אתרוג
  'etrog-migan-eden',                       -- 66 אתרוג
  'sheleg-kaved-besimchat-tora',            -- 67 שמחת תורה
  'taaluma-beemtza-tefilat-yom-kipur',      -- 48 יום כיפור
  'hapritz-sheasa-tshuva-beyom-hakipurim',  -- 44 יום הכיפורים
  'hachanukia-hamistrorit',                 -- 31 חנוכיה
  'hasgula-hamufla-beyoter-lenes-chanuka',  -- 113 חנוכה
  'madua-kiba-harabi-et-nerot-hachanukia',  -- 114 חנוכיה
  'bizchut-ner-yashan-shenimtza-bamachsan', -- 115 נר (חנוכה context)
  'or-katan-beteheran-harechoka',           -- 116 אור (חנוכה context)
  'hachanukia-shesirva-lehidalek',          -- 160 חנוכיה
  'nes-purim-bizchut-mapa',                 -- 161 פורים
  'ma-mistater-meachorei-hatachposet',      -- 163 תחפושת (פורים)
  'purim-teiman-hanasich-shekam-letchia',   -- 164 פורים
  'habadchan-shechipesh-et-hasimcha',       -- 165 בדחן (פורים context)
  'megilat-ester-hasipur-hamale',           -- 169 מגילת אסתר
  'purim-saragosa-hachalom-shehitzil-et-hakehila', -- 170 פורים
  'bizchut-ozen-haman',                     -- 171 אוזן המן
  'arba-kosot-shel-chalav',                 -- 176 ארבע כוסות (פסח)
  'hatzadik-shechipesh-lachmanya-beerev-pesach', -- 179 פסח
  'hamaror-shehevriach-et-haorach',         -- 180 מרור (פסח)
  'leil-haseder-shehirish-olamot',          -- 181 סדר
  'ugat-gvina-beleil-haseder',              -- 182 סדר
  'ugat-gvina-beleil-haseder-2',            -- 184 סדר
  'leil-haseder-vehashodedim',              -- 185 סדר
  'chayalim-beleil-shimurim',               -- 190 ליל שימורים (פסח)
  'srefat-hachametz-bamifal',               -- 191 חמץ
  'hahagada-hamistrorit',                   -- 125 הגדה (פסח)
  'moshe-vehamalachim-bematan-tora'         -- 80 מתן תורה (שבועות)
);

-- ────────────────────────────────────────────
-- mushka-series: סיפורי מושקה
-- ────────────────────────────────────────────
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'mushka-series' AND s.slug IN (
  'mushka-vehapritz'                        -- 13 מושקה והפריץ
);

-- ────────────────────────────────────────────
-- values: השגחה / נס / מלאך / אליהו הנביא / חסד / צדקה / מתן בסתר / שמיים + defaults
-- ────────────────────────────────────────────
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'values' AND s.slug IN (
  'kriat-shma',                             -- 0 קריאת שמע
  'hamitzva-sheheigina-mehanachash',        -- 10 המצווה שהגינה
  'hechatan-shenechetaf',                   -- 11 החתן שנחטף
  'matbeot-hazahav-vekadei-hadvash',        -- 17 מטבעות הזהב
  'heashir-veheani-vegalgal-hachaim',       -- 19 העשיר והעני
  'hakamtzan-shehafach-lenadvan',           -- 20 הקמצן שהפך לנדבן
  'aba-umna-ubat-kol-mishamayim',           -- 22 בת קול משמיים
  'nes-siach-hatzalaf',                     -- 26 נס שיח הצלף
  'matai-yavo-hamashiach',                  -- 28 מתי יבוא המשיח
  'shesh-shanim-tovot',                     -- 29 שש שנים טובות
  'hatzitzit-shehitzila',                   -- 30 הציצית שהצילה
  'aba-tachana',                            -- 32 אבא תחנה
  'avnei-hakadkod',                         -- 33 אבני הכדכוד
  'mar-ukva-umatan-beseter',                -- 36 מתן בסתר
  'hakafri-shehorid-geshem-birushalayim',   -- 37 גשם
  'hashgacha-pratit-afilu-al-givol-kash',   -- 42 השגחה פרטית
  'hapritz-shechazar-leyahaduto',           -- 43 הפריץ שחזר
  'hahashkaa-hachi-mishtalemet',            -- 46 ההשקעה
  'sal-mehashamayim',                       -- 47 סל מהשמיים
  'roe-lemarchok',                          -- 40 רואה למרחוק
  'yaakov-omed-benisayon',                  -- 58 יעקב עומד בניסיון
  'kocho-shel-yehudi-pashut',              -- 72 כוחו של יהודי
  'haschora-hachi-tova-baolam',             -- 73 הסחורה הכי טובה
  'hasodot-shel-eliyahu-hanavi',            -- 75 אליהו הנביא
  'hatefila-sheshavra-et-habatzoret-bemaroko', -- 77 תפילה / נס
  'hageshem-sheyarad-bizchut-hamelamed',    -- 78 גשם בזכות
  'gishmei-bracha-betverya',                -- 79 גשמי ברכה
  'hanes-shel-rachel-imenu',                -- 82 הנס
  'ofanayim-chadashot-bizchut-kibud-em',    -- 84 כיבוד אם
  'nes-bizchut-kibud-em',                   -- 86 נס + כיבוד אם
  'hahaflaga-shenidcheta',                  -- 87 ההפלגה
  'hatalmid-shehevi-oreach-maftia',         -- 88 אורח מפתיע
  'ez-betoch-hayeshiva',                    -- 89 עז בישיבה
  'melech-paras-vechalav-halevia',          -- 90 מלך פרס
  'eliezer-motze-isha-leyitzchak',          -- 91 אליעזר
  'tikun-chatzot-mistori',                  -- 92 תיקון חצות
  'meachzava-lehatzlacha',                  -- 93 מאכזבה להצלחה
  'habracha-shemila-et-hamikveh',           -- 95 הברכה
  'mi-ikev-et-esav-bemasa-hatzayid',        -- 96 עשיו
  'haduv-shenitzeach-et-hapritz',           -- 97 הדוב
  'aba-yudan-vehaotzar-hagadol',            -- 98 אוצר
  'bizchut-midat-haemet',                   -- 99 מידת האמת
  'elef-korbanot-mul-shtei-tziporim-ktanot', -- 100 קרבנות
  'hasipur-meachorei-hadudaim-shel-reuven', -- 101 דודאים
  'hachasid-shelo-viter',                   -- 103 חסיד
  'hachesed-shehafach-leshalhevet-esh',     -- 105 חסד
  'kama-shavot-eser-dakot',                -- 106 כמה שוות
  'yaakov-vaaniei-shchem',                  -- 107 יעקב
  'sgirat-maagal-acharei-25-shana',         -- 108 סגירת מעגל
  'sharsheret-hanisim-baderech-lemaasar',   -- 109 ניסים
  'nes-birkat-halevana-bachatzer-hakele',   -- 110 נס
  'ma-yosef-lachash-shehiftia-et-potifar',  -- 112 יוסף
  'hachukim-hamuzarim-shel-yosef',          -- 117 יוסף
  'sodo-shel-hashemesh',                    -- 118 סוד
  'malach-betachanat-otobus',               -- 120 מלאך
  'hamayim-shehafchu-leyayin',              -- 121 נס
  'hasod-sheyosef-nishba-lo-legalot',       -- 122 יוסף
  'haish-im-hayadayim-hakchulot',           -- 123 האיש
  'sipur-hamatzor-al-yerushalayim',         -- 124 ירושלים
  'kartis-hachesed-hasodi',                 -- 126 חסד
  'hanes-hakaful-beshaar-haarmon-bemitzrayim', -- 127 נס
  'kise-shehaya-gam-maalit',               -- 128 כיסא
  'hasalon-shehafach-kimat-leyam-hatichon', -- 129 נס
  'sharsheret-shel-chasadim-betoch-monit',  -- 130 חסדים
  'toda-acharei-shmone-shanim',             -- 131 תודה
  'mate-playm-beemtza-hagina',              -- 132 מטה פלאים
  'trufa-sodit-bedir-haizim',               -- 133 תרופה
  'hanes-meachorei-chalon-hazkuchit',       -- 134 נס
  'kocha-shel-hahodaya-lahashem',           -- 136 הודיה
  'hamaka-shegilta-et-haganavim',           -- 137 גנבים
  'heashir-sheviter-al-haolam-haba',        -- 138 עולם הבא
  'aruchat-boker-mehashamayim',             -- 140 מהשמיים
  'kochan-shel-milim',                      -- 141 כוחן של מילים
  'yona-mizahav',                           -- 143 יונה מזהב
  'haknar-vehabirkon',                      -- 144 כנר
  'maavar-gvul-bebrooklin',                 -- 145 מעבר גבול
  'ma-shehistater-batrufa',                 -- 146 תרופה
  'alfei-tupim-shel-emuna',                 -- 147 אמונה
  'bizchut-shtei-milim-bilvad',             -- 148 בזכות
  'habracha-sheatzra-et-haesh',             -- 149 ברכה
  'nes-hamaayan-beemtza-hayaar',            -- 150 נס
  'mi-yodea-lehatzlif',                     -- 151 מי יודע
  'hatikun-shel-shomer-hapardes',           -- 153 תיקון
  'al-ma-biksha-harabanit-slicha',          -- 154 רבנית
  'hayeshiva-shekimat-nisgera',             -- 155 ישיבה
  'malkodet-bisdeh-hateeufa',               -- 156 מלכודת
  'lehorid-et-hamishkal-mehalev',           -- 157 משקל מהלב
  'harikud-shehirish-olamot',               -- 158 ריקוד
  'hasimcha-shesilka-et-haoni',             -- 159 שמחה
  'mi-sochev-etzim-bamidbar',               -- 162 מדבר
  'sod-haktoret-shel-beit-avtinas',         -- 167 קטורת
  'harikud-shehoshia',                      -- 168 ריקוד
  'hanisayon-hagadol-bamidbar-sinai',       -- 172 ניסיון
  'hasufa-sheatzra-et-harakevet',           -- 173 סופה
  'hachida-shel-haorach-hamuzer',           -- 174 חידה
  'haktovet-hasodit-bapetek',               -- 175 כתובת
  'hatola-at-sheniztcha-et-habarzel',       -- 177 תולעת
  'olam-haba-tmurat-tapuchei-adama',        -- 178 עולם הבא
  'hayehudi-sheratza-lifgosh-et-eliyahu-hanavi', -- 183 אליהו הנביא
  'hamerkava-shel-eliyahu-hanavi',          -- 186 אליהו הנביא
  'mivtza-sulamot',                         -- 187 מבצע
  'karkara-mehashamayim',                   -- 189 מהשמיים
  'hataut-shehitzila-et-prag',              -- 192 הטעות שהצילה
  'hachalom-shehitzil-et-yerushalayim',     -- 193 החלום שהציל
  'shayeret-gmalim-min-hashamayim',         -- 194 מהשמיים
  'haesh-haplayt-mikodesh-hakodashim',      -- 195 אש פלאית
  'hamitzva-sheshava-kol-hon',              -- 196 מצווה
  'hasimcha-kneged-kol-hasikuyim',          -- 197 שמחה
  'hamatana-lemelech-hamashiach',           -- 198 משיח
  'zaken-mistori-beiy-boded',               -- 68 זקן מסתורי
  'baderech-lapisga',                       -- 69 בדרך לפסגה
  'uvchen-ten-pachdecha-al-hachayalim-hashikurim', -- 50 חיילים
  -- placeholders
  'sipur-mispar-15',
  'sipur-mispar-16',
  'sipur-mispar-23',
  'sipur-mispar-119'
);

-- ────────────────────────────────────────────
-- talmud: תפילה / תורה / גמרא / תלמוד / ישיבה / משנה
-- ────────────────────────────────────────────
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'talmud' AND s.slug IN (
  'hagemara-shehitzila',                    -- 4 הגמרא
  'shaarei-nikanor',                        -- 5 שערי ניקנור (בית המקדש)
  'hatefila-shel-rabi-liber',               -- 12 התפילה
  'hilel-hazaken-veahavat-hatora',          -- 70 אהבת התורה
  'rabi-eliezer-ben-hurkanos',              -- 71 רבי אליעזר
  'mesirut-nefesh-al-hatora',               -- 94 מסירות על התורה
  'tefila-shel-yeled-shebokeaat-rekiim',    -- 56 תפילה
  'hatefila-shekimat-hevia-et-hamashiach',  -- 38 התפילה
  'hatefila-sheshavra-et-habatzoret-bemaroko', -- 77 התפילה
  'moshe-vehamalachim-bematan-tora',        -- 80 מתן תורה
  'ez-betoch-hayeshiva',                    -- 89 ישיבה
  'hayeshiva-shekimat-nisgera'              -- 155 ישיבה
);

-- ────────────────────────────────────────────
-- parashat-shavua: פרשת
-- ────────────────────────────────────────────
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'parashat-shavua' AND s.slug IN (
  'parashat-bo-hasod-hamufla-shel-serach-bat-asher'  -- 142 פרשת בא
);

COMMIT;
