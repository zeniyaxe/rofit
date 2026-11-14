import type { JSX } from 'preact';
import { HANGER } from '../shared/hanger.ts';
import {
  Search, X, ArrowLeft, Settings, Check, Copy, ExternalLink, Bookmark, BookmarkCheck, GitCompareArrows, MoreHorizontal,
  LayoutGrid, List, RefreshCw, ChevronDown, ChevronRight, Library, Download, Upload, Trash2, Filter, History,
  TriangleAlert, Info, Link as LinkIcon, FileCode2, FileJson, Layers, Ruler, Palette, Tag, StickyNote, Lock, User, CircleCheck,
  CircleDashed, ArrowUpDown, Eye, EyeOff, Minus, Plus, Repeat2, ListChecks, Sparkle, Boxes, Hash, ShoppingBag, Clock,
  Star, Command, Share2, Keyboard, FolderInput, Pencil, Globe, ShieldCheck, CheckCheck, SlidersHorizontal, ArrowRight,
  Users, CornerDownLeft, WifiOff, ClipboardPaste, Coins, Gauge, Monitor,
} from 'lucide';

type Node = [string, Record<string, string | number>][];

export function Icon({ node, size = 18, class: cls, label }: { node: Node; size?: number; class?: string; label?: string }): JSX.Element {
  return (
    <svg class={'rf-ico ' + (cls ?? '')} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden={label ? undefined : 'true'} role={label ? 'img' : undefined} aria-label={label}>
      {(node as Node).map(([tag, attrs], i) => {
        const T = tag as 'path';
        return <T key={i} {...(attrs as any)} />;
      })}
    </svg>
  );
}

const I = {
  search: Search, close: X, back: ArrowLeft, settings: Settings, check: Check, copy: Copy, external: ExternalLink,
  save: Bookmark, saved: BookmarkCheck, compare: GitCompareArrows, more: MoreHorizontal, grid: LayoutGrid, list: List,
  refresh: RefreshCw, down: ChevronDown, right: ChevronRight, outfit: HANGER, library: Library, download: Download,
  upload: Upload, trash: Trash2, filter: Filter, history: History, warn: TriangleAlert, info: Info, link: LinkIcon,
  code: FileCode2, json: FileJson, layers: Layers, scale: Ruler, palette: Palette, tag: Tag, note: StickyNote, lock: Lock,
  user: User, ok: CircleCheck, dashed: CircleDashed, sort: ArrowUpDown, eye: Eye, eyeOff: EyeOff, minus: Minus, plus: Plus,
  repeat: Repeat2, tasks: ListChecks, spark: Sparkle, boxes: Boxes, hash: Hash, bag: ShoppingBag, clock: Clock,
  star: Star, command: Command, share: Share2, keyboard: Keyboard, move: FolderInput, edit: Pencil, globe: Globe,
  shield: ShieldCheck, selectAll: CheckCheck, sliders: SlidersHorizontal, arrow: ArrowRight, users: Users, enter: CornerDownLeft,
  offline: WifiOff, paste: ClipboardPaste, coins: Coins, gauge: Gauge, monitor: Monitor,
} as const;

export type IconName = keyof typeof I;
export const Ico = ({ n, size, class: c, label }: { n: IconName; size?: number; class?: string; label?: string }) =>
  <Icon node={I[n] as unknown as Node} size={size} class={c} label={label} />;

/** GitHub's own mark (Octicons "mark-github", MIT). Filled, inherits the link colour. */
export const GithubMark = ({ size = 16, class: c }: { size?: number; class?: string }) => (
  <svg class={'rf-ico ' + (c ?? '')} width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
  </svg>
);
