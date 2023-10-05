import conversation from './conversation';
import conversations from './conversations';
import endpoints from './endpoints';
import user from './user';
import text from './text';
import submission from './submission';
import search from './search';
import preset from './preset';
import token from './token';
import lang from './language';
import settings from './settings';
import reverse from './reverseProxy';

export default {
  ...conversation,
  ...conversations,
  ...endpoints,
  ...user,
  ...text,
  ...submission,
  ...search,
  ...preset,
  ...token,
  ...lang,
  ...settings,
  ...reverse,
};
