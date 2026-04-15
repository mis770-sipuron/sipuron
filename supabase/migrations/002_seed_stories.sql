-- ============================================
-- Seed stories
-- ============================================

INSERT INTO public.stories (title, slug, description, duration_seconds, narrator, age_min, age_max, is_premium, status, published_at, sort_order) VALUES
('תולעת השמיר ובניית המקדש', 'tola-at-hashamir', 'איך גילה שלמה המלך את הסוד לבניית בית המקדש — בלי כלי ברזל? סיפור מרתק על חוכמה, סבלנות ונס.', 720, 'מנחם שרון', 5, 10, false, 'published', now() - interval '60 days', 1),
('השקט שלימד להקשיב', 'hasheket-shelimad', 'רותם ואליאב מגלים למה כל עם ישראל שתק בבוקר מתן תורה. סיפור על אחדות והקשבה.', 480, 'מנחם שרון', 4, 8, false, 'published', now() - interval '55 days', 2),
('מושקה והגן הקסום', 'mushka-vehagan', 'מושקה מגלה שהפרחים בגן הסודי צומחים רק כשעושים חסד. הרפתקה מלאה צבעים וערכים.', 900, 'מנחם שרון', 3, 7, true, 'published', now() - interval '50 days', 3),
('האריה והנמלה', 'haarie-vehanemala', 'סיפור על גאווה וענווה — כשהאריה החזק לומד שיעור חשוב מהנמלה הקטנה.', 600, 'מנחם שרון', 4, 8, true, 'published', now() - interval '45 days', 4),
('רבי עקיבא ורחל', 'rabi-akiva-verachel', 'סיפור האהבה הגדול של רבי עקיבא ורחל — על אמונה, מסירות ולימוד תורה.', 1080, 'מנחם שרון', 6, 12, true, 'published', now() - interval '40 days', 5),
('הרפתקה בסוכה', 'harpatka-basuka', 'ילדי משפחת כהן בונים סוכה ומגלים אורח מפתיע. סיפור לחג הסוכות מלא הומור וחום.', 720, 'מנחם שרון', 3, 7, false, 'published', now() - interval '35 days', 6),
('ארתור והמפתח האבוד', 'artur-vehamafteach', 'ארתור יוצא למסע מרתק לחפש את המפתח שנעלם. הרפתקה עם חידות ותעלומות.', 1200, 'מנחם שרון', 5, 10, true, 'published', now() - interval '30 days', 7),
('הבעל שם טוב והילד', 'baal-shem-tov', 'סיפור חסידי מרגש על הבעל שם טוב שפגש ילד רועה בשדה — ולימד את כולנו שיעור על תפילה.', 840, 'מנחם שרון', 5, 10, true, 'published', now() - interval '25 days', 8),
('סיפור לפרשת בראשית', 'parashat-bereshit', 'ששת ימי הבריאה — כפי שמעולם לא שמעתם. סיפור מרתק על תחילת העולם.', 660, 'מנחם שרון', 4, 8, true, 'published', now() - interval '20 days', 9),
('החלום של יוסי', 'hachalom-shel-yossi', 'יוסי חולם חלום מוזר — ובבוקר מגלה שהחלום שלו הפך למציאות. סיפור מרגיע לפני השינה.', 480, 'מנחם שרון', 2, 5, false, 'published', now() - interval '15 days', 10),
('הגיבור הקטן', 'hagibor-hakatan', 'דוד בן ה-7 חושב שהוא קטן מדי לעשות דברים גדולים. עד שיום אחד...', 960, 'מנחם שרון', 6, 10, true, 'published', now() - interval '10 days', 11),
('מושקה בבית הספר', 'mushka-babet-sefer', 'מושקה מתחילה שנת לימודים חדשה ומגלה שהחברה הכי טובה מגיעה ממקום לא צפוי.', 780, 'מנחם שרון', 4, 8, true, 'published', now() - interval '5 days', 12);

-- ============================================
-- Link stories to categories
-- ============================================

-- תולעת השמיר → תלמוד + ערכים
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'tola-at-hashamir' AND c.slug = 'talmud';

INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'tola-at-hashamir' AND c.slug = 'values';

-- השקט שלימד → חגים
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'hasheket-shelimad' AND c.slug = 'holidays';

-- מושקה והגן → סדרת מושקה + ערכים
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'mushka-vehagan' AND c.slug = 'mushka-series';

INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'mushka-vehagan' AND c.slug = 'values';

-- האריה והנמלה → ערכים
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'haarie-vehanemala' AND c.slug = 'values';

-- רבי עקיבא → צדיקים
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'rabi-akiva-verachel' AND c.slug = 'tzadikim';

-- הרפתקה בסוכה → חגים
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'harpatka-basuka' AND c.slug = 'holidays';

-- ארתור → סדרת ארתור + הרפתקאות
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'artur-vehamafteach' AND c.slug = 'arthur-series';

INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'artur-vehamafteach' AND c.slug = 'adventures';

-- בעל שם טוב → חסידים
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'baal-shem-tov' AND c.slug = 'hasidim';

-- פרשת בראשית → פרשת שבוע
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'parashat-bereshit' AND c.slug = 'parashat-shavua';

-- החלום של יוסי → לפני השינה
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'hachalom-shel-yossi' AND c.slug = 'bedtime';

-- הגיבור הקטן → הרפתקאות + ערכים
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'hagibor-hakatan' AND c.slug = 'adventures';

INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'hagibor-hakatan' AND c.slug = 'values';

-- מושקה בבית הספר → סדרת מושקה
INSERT INTO public.story_category_map (story_id, category_id)
SELECT s.id, c.id FROM public.stories s, public.story_categories c
WHERE s.slug = 'mushka-babet-sefer' AND c.slug = 'mushka-series';
