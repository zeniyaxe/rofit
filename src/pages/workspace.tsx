import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import css from '../ui/styles.css';
import { Shell } from '../ui/Shell.tsx';
import { SettingsPage } from '../ui/Settings.tsx';
import { Welcome } from '../ui/Welcome.tsx';
import { useMotion, useSettings } from '../ui/data.ts';
import { ToastHost } from '../ui/primitives.tsx';
import { resolveTheme, themeVars } from '../ui/theme.ts';
import { motionClass } from '../shared/motion.ts';
import { Ico } from '../ui/icons.tsx';
import { payloadFrom, shareUrl } from '../shared/share.ts';

const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

/**
 * Routes (location.hash): library · library/import · library/import/<share payload> · settings[/<section>] · welcome.
 * The import routes only ever open the import dialog with the link pre-filled; nothing is saved until the user confirms.
 */
interface Route { page: 'library' | 'settings' | 'welcome'; importText?: string; openKey?: string }
function readRoute(): Route {
  const [top, sub, ...rest] = location.hash.slice(1).split('/');
  if (top === 'settings') return { page: 'settings' };
  if (top === 'welcome') return { page: 'welcome' };
  if (sub === 'import') {
    const payload = payloadFrom(rest.join('/'));
    return { page: 'library', importText: payload ? shareUrl(payload) : '' };
  }
  if (sub === 'open' && /^\d+:\d+$/.test(decodeURIComponent(rest[0] ?? ''))) return { page: 'library', openKey: decodeURIComponent(rest[0]) };
  return { page: 'library' };
}

function Page() {
  const settings = useSettings();
  const motion = useMotion(settings.motion);
  const [route, setRoute] = useState(readRoute());
  const [, tick] = useState(0);
  useEffect(() => {
    const f = () => setRoute(readRoute());
    window.addEventListener('hashchange', f);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const g = () => tick((n) => n + 1);
    mq.addEventListener('change', g);
    return () => { window.removeEventListener('hashchange', f); mq.removeEventListener('change', g); };
  }, []);
  const vars = themeVars(resolveTheme(settings, false));
  const page = route.page;
  document.title = page === 'settings' ? 'RoFit settings' : page === 'welcome' ? 'Welcome to RoFit' : 'RoFit library';
  const go = (r: string) => { location.hash = r; };
  // Once the import dialog has the link, drop it from the address bar so a reload doesn't reopen it.
  const importShown = () => { history.replaceState(null, '', '#library'); setRoute({ page: 'library' }); };
  useEffect(() => { if (route.openKey) history.replaceState(null, '', '#library'); }, [route.openKey]);
  return (
    <div class={'rf rf-page' + motionClass(motion)} style={vars as any}>
      {(page === 'welcome' || location.hash === '#whatsnew') ? <Welcome mode={location.hash === '#whatsnew' ? 'whatsnew' : 'welcome'} onDone={(r) => go(r ?? 'library')} /> : (
        <>
          <nav class="rf-pnav" aria-label="RoFit">
            <b class="rf-pbrand"><Ico n="outfit" size={18} />RoFit</b>
            <button class={page !== 'settings' ? 'on' : ''} aria-current={page !== 'settings' ? 'page' : undefined} onClick={() => go('library')}>Library</button>
            <button class={page === 'settings' ? 'on' : ''} aria-current={page === 'settings' ? 'page' : undefined} onClick={() => go('settings')}>Settings</button>
          </nav>
          {page === 'settings' ? <ToastHost><SettingsPage settings={settings} /></ToastHost> : <Shell standalone importText={route.importText ?? null} onImportShown={importShown} openKey={route.openKey ?? null} />}
        </>
      )}
    </div>
  );
}
render(<Page />, document.getElementById('root')!);
