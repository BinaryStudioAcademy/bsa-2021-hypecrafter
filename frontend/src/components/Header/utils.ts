import { Routes } from '../../common/enums';
import type { TranslatorType } from '../../providers/localization';
import classes from './styles.module.scss';

type NavItem = {
  to: Routes
  className: string;
  label: string;
};

export const getLinks = (t: TranslatorType): NavItem[] => [
  {
    to: Routes.HOME,
    className: classes.header_menu_item,
    label: t('Home')
  },
  {
    to: Routes.PROJECTS,
    className: classes.header_menu_item,
    label: t('Projects')
  },
  {
    to: Routes.TRENDS,
    className: `${classes.header_menu_item} ${classes.desktop_trends}`,
    label: t('Trends')
  }
];
