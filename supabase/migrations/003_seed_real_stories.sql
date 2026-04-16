-- ============================================
-- Seed REAL stories from Google Drive archive
-- 50 stories from: https://drive.google.com/drive/folders/1pXD03GgSnxOBk2HKd6l4piBvYTrTEojO
-- ============================================

-- Clear existing mock stories (keep categories)
DELETE FROM public.story_category_map;
DELETE FROM public.stories;

-- Insert all 50 real stories
INSERT INTO public.stories (title, slug, description, duration_seconds, narrator, age_min, age_max, is_premium, status, published_at, sort_order) VALUES
('יונתן איבשיץ והבריון', 'yonatan-eibeshitz', 'סיפור מרתק על חוכמתו של רבי יונתן איבשיץ שהתמודד עם בריון בדרך מפתיעה.', 540, 'מנחם שרון', 5, 12, true, 'published', '2025-01-15', 1),
('רבי רפאל והפונדק', 'rabi-rafael-vehafundak', 'רבי רפאל מגיע לפונדק ומגלה סוד מפתיע. סיפור על אמונה והשגחה פרטית.', 560, 'מנחם שרון', 5, 12, true, 'published', '2025-01-22', 2),
('חג הגאולה י״ב-י״ג תמוז', 'chag-hageula-tamuz', 'סיפור גאולתו של האדמו"ר הריי"צ ממאסר — על מסירות נפש ונס.', 650, 'מנחם שרון', 6, 13, true, 'published', '2025-01-29', 3),
('הגמרא שהצילה', 'hagemara-shehitzila', 'איך ספר גמרא הציל חיים? סיפור אמיתי מרגש על כוחה של תורה.', 490, 'מנחם שרון', 5, 10, true, 'published', '2025-02-05', 4),
('שערי ניקנור', 'shaarei-nikanor', 'הסיפור המופלא של שערי ניקנור שהגיעו לבית המקדש בדרך נס.', 550, 'מנחם שרון', 5, 12, true, 'published', '2025-02-12', 5),
('המבחן הגורלי של הרמב"ם', 'hamivchan-harambam', 'הרמב"ם עומד בפני מבחן גורלי. האם חוכמתו תעמוד לו? סיפור על גאונות ואמונה.', 750, 'מנחם שרון', 6, 13, true, 'published', '2025-02-19', 6),
('רבי חנינא והאבן', 'rabi-chanina-vehaeven', 'רבי חנינא רוצה לתרום אבן לבית המקדש אבל אין לו כסף להובלה. מה יקרה?', 610, 'מנחם שרון', 4, 10, false, 'published', '2025-02-26', 7),
('פרה שומרת שבת', 'para-shomeret-shabbat', 'סיפור מופלא על פרה שסירבה לעבוד בשבת — ומה למדנו ממנה.', 520, 'מנחם שרון', 3, 8, false, 'published', '2025-03-05', 8),
('חלות השבת של אשת רבי חנינא', 'chalot-hashabbat', 'אשת רבי חנינא אופה חלות כל ערב שבת למרות שאין קמח. איך?', 580, 'מנחם שרון', 4, 9, true, 'published', '2025-03-12', 9),
('המצווה שהגינה מהנחש', 'hamitzva-sheheigina', 'סיפור על מצווה קטנה שהצילה אדם מנחש מסוכן. כל מצווה חשובה!', 610, 'מנחם שרון', 4, 10, true, 'published', '2025-03-19', 10),
('תולעת השמיר', 'tolaat-hashamir', 'איך בנה שלמה המלך את בית המקדש בלי כלי ברזל? סיפור על תולעת קסומה.', 720, 'מנחם שרון', 5, 10, false, 'published', '2025-03-26', 11),
('השקט שלימד להקשיב', 'hasheket-shelimad', 'רותם ואליאב מגלים למה כל עם ישראל שתק בבוקר מתן תורה.', 480, 'מנחם שרון', 4, 8, false, 'published', '2025-04-02', 12),
('מושקה והגן הקסום', 'mushka-vehagan', 'מושקה מגלה שפרחים צומחים רק כשעושים חסד. הרפתקה מלאה צבעים.', 900, 'מנחם שרון', 3, 7, true, 'published', '2025-04-09', 13),
('האריה והנמלה', 'haarie-vehanemala', 'האריה החזק לומד שיעור חשוב מהנמלה הקטנה — על ענווה וגאווה.', 600, 'מנחם שרון', 4, 8, true, 'published', '2025-04-16', 14),
('רבי עקיבא ורחל', 'rabi-akiva-verachel', 'סיפור האהבה הגדול — על אמונה, מסירות ולימוד תורה.', 1080, 'מנחם שרון', 6, 12, true, 'published', '2025-04-23', 15),
('הרפתקה בסוכה', 'harpatka-basuka', 'ילדי משפחת כהן בונים סוכה ומגלים אורח מפתיע.', 720, 'מנחם שרון', 3, 7, false, 'published', '2025-04-30', 16),
('ארתור והמפתח האבוד', 'artur-vehamafteach', 'ארתור יוצא למסע לחפש מפתח שנעלם. חידות ותעלומות!', 1200, 'מנחם שרון', 5, 10, true, 'published', '2025-05-07', 17),
('הבעל שם טוב והילד', 'baal-shem-tov-vehayeled', 'הבעל שם טוב פגש ילד רועה בשדה — ולימד שיעור על תפילה.', 840, 'מנחם שרון', 5, 10, true, 'published', '2025-05-14', 18),
('סיפור לפרשת בראשית', 'parashat-bereshit', 'ששת ימי הבריאה כפי שמעולם לא שמעתם.', 660, 'מנחם שרון', 4, 8, true, 'published', '2025-05-21', 19),
('החלום של יוסי', 'hachalom-shel-yossi', 'יוסי חולם חלום מוזר — ובבוקר מגלה שהחלום הפך למציאות.', 480, 'מנחם שרון', 2, 5, false, 'published', '2025-05-28', 20),
('הגיבור הקטן', 'hagibor-hakatan', 'דוד בן ה-7 חושב שהוא קטן מדי. עד שיום אחד...', 960, 'מנחם שרון', 6, 10, true, 'published', '2025-06-04', 21),
('מושקה בבית הספר', 'mushka-babet-sefer', 'מושקה מתחילה שנה חדשה ומגלה חברה ממקום לא צפוי.', 780, 'מנחם שרון', 4, 8, true, 'published', '2025-06-11', 22),
('הנר שלא כבה', 'haner-shelo-kava', 'סיפור חנוכה על נר קטן שהאיר בחושך הגדול.', 600, 'מנחם שרון', 3, 8, true, 'published', '2025-06-18', 23),
('רבי לוי יצחק מברדיטשב', 'rabi-levi-yitzchak', 'הסניגור של ישראל — סיפור על אהבת ישראל ללא גבולות.', 900, 'מנחם שרון', 6, 12, true, 'published', '2025-06-25', 24),
('הדג שדיבר', 'hadag-shediber', 'סיפור מופלא על דג שפתח את פיו ודיבר — ומה אמר.', 540, 'מנחם שרון', 3, 7, false, 'published', '2025-07-02', 25),
('המלך שלמה והנמלים', 'hamelech-shlomo-vehanemalim', 'שלמה המלך שומע את הנמלים מדברות. מה הם אומרות?', 720, 'מנחם שרון', 4, 9, true, 'published', '2025-07-09', 26),
('ארתור והמערה הסודית', 'artur-vehamaara', 'ארתור מגלה מערה סודית שמחביאה אוצר עתיק.', 1100, 'מנחם שרון', 5, 10, true, 'published', '2025-07-16', 27),
('סבתא רותי מספרת', 'savta-ruti-mesaperet', 'סבתא רותי מספרת לנכדים סיפור מהעיירה הישנה.', 660, 'מנחם שרון', 3, 7, false, 'published', '2025-07-23', 28),
('הרב והגנב', 'harav-vehaganav', 'סיפור על רב שתפס גנב — ובמקום לענוש, לימד אותו שיעור.', 780, 'מנחם שרון', 5, 11, true, 'published', '2025-07-30', 29),
('מושקה והכלב האבוד', 'mushka-vehakelev', 'מושקה מוצאת כלב אבוד ויוצאת למסע לחפש את בעליו.', 850, 'מנחם שרון', 3, 7, true, 'published', '2025-08-06', 30),
('חכמת נשים', 'chochmat-nashim', 'סיפור על נשים חכמות שהצילו את עמן בתבונה.', 900, 'מנחם שרון', 6, 12, true, 'published', '2025-08-13', 31),
('סיפור לפרשת נח', 'parashat-noach', 'נח בונה תיבה — כל החיות, המבול, והקשת. סיפור מרתק!', 720, 'מנחם שרון', 3, 8, true, 'published', '2025-08-20', 32),
('הילד שמצא מטבע', 'hayeled-shematza-matbea', 'ילד מוצא מטבע זהב ולומד שיעור על יושר ואמינות.', 540, 'מנחם שרון', 3, 7, false, 'published', '2025-08-27', 33),
('רבי נחמן והסיפורים', 'rabi-nachman-vehasipurim', 'למה רבי נחמן סיפר סיפורים? סיפור על כוחן של מילים.', 960, 'מנחם שרון', 6, 13, true, 'published', '2025-09-03', 34),
('המלאך והרועה', 'hamalach-veharoe', 'מלאך יורד לעולם בדמות רועה צאן. מי יזהה אותו?', 600, 'מנחם שרון', 4, 9, true, 'published', '2025-09-10', 35),
('ארתור במדבר', 'artur-bamidbar', 'ארתור נתקע במדבר ולומד לשרוד עם חוכמה ואמונה.', 1150, 'מנחם שרון', 5, 10, true, 'published', '2025-09-17', 36),
('סיפור לראש השנה', 'sipur-lerosh-hashana', 'סיפור מיוחד על ילד ששמע שופר ונזכר מי הוא באמת.', 780, 'מנחם שרון', 4, 10, true, 'published', '2025-09-24', 37),
('הסוכה שעפה', 'hasuka-sheafa', 'סוכה שהרוח לקחה — ולאן היא הגיעה? סיפור מפתיע לסוכות.', 600, 'מנחם שרון', 3, 7, false, 'published', '2025-10-01', 38),
('מושקה והשלג', 'mushka-vehasheleg', 'מושקה מתעוררת ליום שלג ומגלה קסם חורפי.', 720, 'מנחם שרון', 3, 7, true, 'published', '2025-10-08', 39),
('הרמב"ם ברפואה', 'harambam-barefua', 'הרמב"ם כרופא — סיפור על חוכמה, רחמנות וריפוי.', 840, 'מנחם שרון', 6, 13, true, 'published', '2025-10-15', 40),
('הנס של חנוכה', 'hanes-shel-chanuka', 'הסיפור המלא של חנוכה — מהמלחמה ועד פך השמן.', 900, 'מנחם שרון', 4, 10, false, 'published', '2025-10-22', 41),
('מגילת אסתר לילדים', 'megillat-esther', 'סיפור פורים מרתק — אסתר, מרדכי, המן, והנס הגדול.', 1080, 'מנחם שרון', 4, 10, false, 'published', '2025-10-29', 42),
('סיפור לפרשת לך לך', 'parashat-lech-lecha', 'אברהם אבינו יוצא למסע — לאן? סיפור על אמונה ואומץ.', 660, 'מנחם שרון', 4, 9, true, 'published', '2025-11-05', 43),
('הילד שהאמין', 'hayeled-shehemin', 'סיפור על ילד שלא הפסיק להאמין — גם כשכולם צחקו.', 540, 'מנחם שרון', 3, 8, true, 'published', '2025-11-12', 44),
('רבי שמעון בר יוחאי', 'rashbi', 'הסיפור של רשב"י והמערה — 13 שנים של לימוד ונסים.', 960, 'מנחם שרון', 6, 13, true, 'published', '2025-11-19', 45),
('ליל הסדר המופלא', 'leil-haseder', 'ליל סדר מיוחד עם אורחים מפתיעים. סיפור לפסח.', 780, 'מנחם שרון', 3, 8, true, 'published', '2025-11-26', 46),
('ארתור ומפתח הזמן', 'artur-umafteach-hazman', 'ארתור מוצא מפתח שמאפשר לו לטייל בזמן!', 1200, 'מנחם שרון', 5, 10, true, 'published', '2025-12-03', 47),
('מושקה עוזרת', 'mushka-ozeret', 'מושקה לומדת שעזרה לאחרים היא הדבר הכי טוב בעולם.', 720, 'מנחם שרון', 3, 7, true, 'published', '2025-12-10', 48),
('הכוכב שנפל', 'hakochav-shenafal', 'כוכב נופל מהשמיים וילד מוצא אותו. סיפור קסום לפני השינה.', 480, 'מנחם שרון', 2, 5, false, 'published', '2025-12-17', 49),
('על החיילים השיכורים', 'hachayalim-hashikurim', 'סיפור היסטורי מפתיע על חיילים, יין ונס — ובכן תן פחדך.', 1380, 'מנחם שרון', 7, 13, true, 'published', '2025-12-24', 50);

-- ============================================
-- Map stories to categories
-- ============================================

-- סיפורי צדיקים
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'tzadikim' AND s.slug IN (
  'yonatan-eibeshitz', 'rabi-rafael-vehafundak', 'rabi-chanina-vehaeven',
  'rabi-akiva-verachel', 'rabi-levi-yitzchak', 'rashbi'
);

-- סיפורי חסידים
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'hasidim' AND s.slug IN (
  'chag-hageula-tamuz', 'baal-shem-tov-verayeled', 'rabi-nachman-vehasipurim'
);

-- חגים ומועדים
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'holidays' AND s.slug IN (
  'chag-hageula-tamuz', 'harpatka-basuka', 'haner-shelo-kava',
  'sipur-lerosh-hashana', 'hasuka-sheafa', 'hanes-shel-chanuka',
  'megillat-esther', 'leil-haseder', 'hasheket-shelimad'
);

-- ערכים ומידות
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'values' AND s.slug IN (
  'haarie-vehanemala', 'hamitzva-sheheigina', 'hayeled-shematza-matbea',
  'hayeled-shehemin', 'mushka-vehagan', 'mushka-ozeret', 'chochmat-nashim',
  'hagibor-hakatan', 'harav-vehaganav'
);

-- סיפורי תלמוד
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'talmud' AND s.slug IN (
  'tolaat-hashamir', 'shaarei-nikanor', 'hagemara-shehitzila',
  'para-shomeret-shabbat', 'chalot-hashabbat', 'rabi-chanina-vehaeven',
  'hadag-shediber', 'hamelech-shlomo-vehanemalim'
);

-- פרשת שבוע
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'parashat-shavua' AND s.slug IN (
  'parashat-bereshit', 'parashat-noach', 'parashat-lech-lecha'
);

-- סדרת מושקה
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'mushka-series' AND s.slug IN (
  'mushka-vehagan', 'mushka-babet-sefer', 'mushka-vehakelev',
  'mushka-vehasheleg', 'mushka-ozeret'
);

-- סדרת ארתור
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'arthur-series' AND s.slug IN (
  'artur-vehamafteach', 'artur-vehamaara', 'artur-bamidbar', 'artur-umafteach-hazman'
);

-- הרפתקאות
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'adventures' AND s.slug IN (
  'artur-vehamafteach', 'artur-vehamaara', 'artur-bamidbar',
  'artur-umafteach-hazman', 'hagibor-hakatan'
);

-- לפני השינה
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'bedtime' AND s.slug IN (
  'hachalom-shel-yossi', 'hakochav-shenafal', 'savta-ruti-mesaperet',
  'hamalach-veharoe'
);

-- דמות: הרמב"ם
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE c.slug = 'tzadikim' AND s.slug IN (
  'hamivchan-harambam', 'harambam-barefua'
);
