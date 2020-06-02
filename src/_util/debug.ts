import { noop } from '@/shared/util/noop';

let warn = noop;

if (process.env.NODE_ENV !== 'production') {
  warn = msg => {
    const hasConsole = typeof console !== undefined;
    if (hasConsole) {
      console.error(`[ami warn]: ${msg}`);
    }
  };
}
