/** The panel behind "RoFit settings" on roblox.com/my/account. Lazy-loaded by account.ts. */
import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import css from '../ui/styles.css';
import { SettingsPage } from '../ui/Settings.tsx';
import { ToastHost } from '../ui/primitives.tsx';
import { useMotion, useSettings } from '../ui/data.ts';
import { resolveTheme, themeVars } from '../ui/theme.ts';

function Panel() {
  const settings = useSettings();
  const rm = useMotion(settings.motion) === 'calm';
  const [, bump] = useState(0);
  useEffect(() => {
    // Follow Roblox when its theme flips.
    const mo = new MutationObserver(() => bump((n) => n + 1));
    mo.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });
    return () => mo.disconnect();
  }, []);
  return (
    <div class={'rf rf-acct' + (rm ? ' rm' : '')} style={themeVars(resolveTheme(settings, true)) as any}>
      <ToastHost><SettingsPage settings={settings} /></ToastHost>
    </div>
  );
}

export function mountPanel(host: HTMLElement): () => void {
  const shadow = host.attachShadow({ mode: __ROFIT_TEST__ ? 'open' : 'closed' });
  const style = document.createElement('style');
  style.textContent = css;
  const mount = document.createElement('div');
  shadow.append(style, mount);
  render(<Panel />, mount);
  return () => render(null, mount);
}
