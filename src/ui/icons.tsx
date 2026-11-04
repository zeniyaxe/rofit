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
