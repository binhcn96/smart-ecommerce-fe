import { useTranslation } from 'react-i18next';

const useLocale = (content) => {
  const { t } = useTranslation()
  return t(content)
}

export default useLocale