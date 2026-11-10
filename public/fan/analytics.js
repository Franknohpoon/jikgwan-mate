import { inject } from './analytics-sdk.js';
// Count public beta visits only; never send map IDs, answers, names or recovery data.
if (location.hostname === 'jikgwan-mate.vercel.app') {
  inject({
    mode: 'production',
    beforeSend(event) {
      const url = new URL(event.url);
      url.search = '';
      url.hash = '';
      return { ...event, url: url.href };
    },
  });
}
