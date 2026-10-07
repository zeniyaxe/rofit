import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import css from '../ui/styles.css';
import { Shell } from '../ui/Shell.tsx';
import { SettingsPage } from '../ui/Settings.tsx';
import { Welcome } from '../ui/Welcome.tsx';
import { useReducedMotion, useSettings } from '../ui/data.ts';
import { ToastHost } from '../ui/primitives.tsx';
import { resolveTheme, themeVars } from '../ui/theme.ts';
import { Ico } from '../ui/icons.tsx';

const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

const readRoute = () => location.hash.replace('#', '') || 'library';

function Page() {
  const settings = useSettings();
  const rm = useReducedMotion(settings.motion);
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
  document.title = route === 'settings' ? 'RoFit settings' : route === 'welcome' ? 'Welcome to RoFit' : 'RoFit library';
  const go = (r: string) => { location.hash = r; };
  return (
    <div class={'rf rf-page' + (rm ? ' rm' : '')} style={vars as any}>
      {route === 'welcome' ? <Welcome onDone={(r) => go(r ?? 'library')} /> : (
        <>
          <nav class="rf-pnav">
            <b class="rf-pbrand"><Ico n="outfit" size={18} />RoFit</b>
            <button class={route !== 'settings' ? 'on' : ''} onClick={() => go('library')}>Library</button>
            <button class={route === 'settings' ? 'on' : ''} onClick={() => go('settings')}>Settings</button>
          </nav>
          {route === 'settings' ? <ToastHost><SettingsPage settings={settings} /></ToastHost> : <Shell standalone />}
        </>
      )}
    </div>
  );
}
render(<Page />, document.getElementById('root')!);
