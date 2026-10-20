// Temporary screen for checking i18n and RTL on a device. Remove once real
// screens use translations.
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  I18nManager,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { changeLanguage, languageChoice } from '../../i18n';
import { formatDate, formatNumber } from '../../i18n/format';
import {
  defaultLanguage,
  isLanguage,
  languageNames,
  type Language,
} from '../../i18n/languages';
import { saveLanguageChoice } from '../../storage/preferences';

// Covers every Arabic plural form: zero, one, two, few, many and other.
const counts: readonly number[] = [0, 1, 2, 3, 11, 100];

type LanguageOption = {
  readonly choice: Language | null;
  readonly label: string;
};

function LanguageTestScreen(): React.JSX.Element {
  const { t, i18n } = useTranslation();
  const [countIndex, setCountIndex] = useState<number>(0);
  const language: Language = isLanguage(i18n.language)
    ? i18n.language
    : defaultLanguage;
  const count: number = counts[countIndex] ?? 0;
  const [choice, setChoice] = useState<Language | null>(languageChoice());

  const options: readonly LanguageOption[] = [
    { choice: null, label: t('screens.languageTest.deviceOption') },
    { choice: 'en', label: languageNames.en },
    { choice: 'ar', label: languageNames.ar },
  ];

  const selectLanguage = (next: Language | null): void => {
    setChoice(next);
    changeLanguage(next, saveLanguageChoice).catch(() => {
      setChoice(languageChoice());
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title} accessibilityRole="header">
          {t('screens.languageTest.title')}
        </Text>
        <Text style={styles.body}>{t('screens.languageTest.intro')}</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>
            {t('screens.languageTest.choiceTitle')}
          </Text>
          <View style={styles.segments}>
            {options.map(option => {
              const selected: boolean = option.choice === choice;
              return (
                <Pressable
                  key={option.choice ?? 'device'}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => selectLanguage(option.choice)}
                  style={[styles.segment, selected && styles.segmentSelected]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      selected && styles.segmentTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.hint}>
            {t('screens.languageTest.choiceHint')}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.body}>
            {t('screens.languageTest.language', {
              name: languageNames[language],
            })}
          </Text>
          <Text style={styles.body}>
            {t('screens.languageTest.direction', {
              direction: I18nManager.isRTL
                ? t('screens.languageTest.rtl')
                : t('screens.languageTest.ltr'),
            })}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>
            {t('screens.languageTest.pluralTitle')}
          </Text>
          <Text style={styles.body}>
            {t('screens.languageTest.glasses', { count })}
          </Text>
          <View style={styles.row}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('screens.languageTest.removeGlass')}
              disabled={countIndex === 0}
              onPress={() => setCountIndex(index => Math.max(0, index - 1))}
              style={[styles.button, countIndex === 0 && styles.disabled]}
            >
              <Text style={styles.buttonText}>−</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('screens.languageTest.addGlass')}
              disabled={countIndex === counts.length - 1}
              onPress={() =>
                setCountIndex(index => Math.min(counts.length - 1, index + 1))
              }
              style={[
                styles.button,
                countIndex === counts.length - 1 && styles.disabled,
              ]}
            >
              <Text style={styles.buttonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>
            {t('screens.languageTest.formattingTitle')}
          </Text>
          <Text style={styles.body}>
            {t('screens.languageTest.number', {
              value: formatNumber(1234567.89, language),
            })}
          </Text>
          <Text style={styles.body}>
            {t('screens.languageTest.date', {
              value: formatDate(new Date(), language, { dateStyle: 'full' }),
            })}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>
            {t('screens.languageTest.layoutTitle')}
          </Text>
          <View style={[styles.row, styles.spread]}>
            <Text style={styles.tag}>{t('screens.languageTest.start')}</Text>
            <Text style={styles.tag}>{t('screens.languageTest.end')}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// textAlign has no 'start' in React Native; 'left' is swapped to the start
// side when the layout is right-to-left.
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F5F4',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#15211D',
    textAlign: 'left',
  },
  heading: {
    fontSize: 17,
    fontWeight: '600',
    color: '#15211D',
    textAlign: 'left',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#3C4843',
    textAlign: 'left',
  },
  hint: {
    fontSize: 13,
    lineHeight: 18,
    color: '#56635E',
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  spread: {
    justifyContent: 'space-between',
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#E4E9E7',
    color: '#15211D',
    fontSize: 15,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#0E6B5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
  },
  segments: {
    flexDirection: 'row',
    gap: 4,
    padding: 4,
    borderRadius: 14,
    backgroundColor: '#E4E9E7',
  },
  segment: {
    flex: 1,
    minHeight: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentSelected: {
    backgroundColor: '#15211D',
  },
  segmentText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#15211D',
  },
  segmentTextSelected: {
    color: '#FFFFFF',
  },
});

export default LanguageTestScreen;
