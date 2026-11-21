import {
  announce,
  createChange,
  createRovingFocus,
  definePrimitive,
  isTypeaheadKey,
  prepareAnnouncements,
  type ChangeDetails,
} from "@ui-sdk/core";
import { fuzzyScore } from "@ui-sdk/core/text-match";
import { EMOJI, type Emoji } from "./emoji-data";

export const EMOJI_COLUMNS = 8;

type EmojiPickerOptions = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, details: ChangeDetails<"item-press">) => void;
};

type CellProps = { value: string; label: string; row: number; column: number };

export function searchEmoji(query: string): Emoji[] {
  const q = query.trim();
  if (!q) return EMOJI;
  return EMOJI.map((emoji) => ({
    emoji,
    score: Math.max(fuzzyScore(emoji.name, q), fuzzyScore(emoji.keywords, q) * 0.9),
  }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ emoji }) => emoji);
}

export const emojiPicker = definePrimitive({
  name: "emoji-picker",
  options: { value: "string", defaultValue: "string", onValueChange: "callback" },
  controlled: ["value"],
  state: (options: EmojiPickerOptions) => ({
    value: options.value ?? options.defaultValue ?? "",
    query: "",
    focused: null as string | null,
  }),
  sync: (options) => (options.value === undefined ? {} : { value: options.value }),
  api: (context) => {
    const change = createChange(context);
    const roving = createRovingFocus<ReturnType<typeof context.store.get>, CellProps>(context, {
      slot: "cell",
      key: "focused",
      // A flowing grid: rows hold EMOJI_COLUMNS cells and the last row may be short.
      move: (event, { from, items }) => {
        if (event.altKey) return undefined;
        const index = items.findIndex((item) => item.key === from.key);
        const last = items.length - 1;
        const rowStart = index - (index % EMOJI_COLUMNS);
        const corner = event.ctrlKey || event.metaKey;
        let to: number | undefined;
        switch (event.key) {
          case "ArrowRight":
            to = index + 1;
            break;
          case "ArrowLeft":
            to = index - 1;
            break;
          case "ArrowDown":
            to = index + EMOJI_COLUMNS > last && rowStart + EMOJI_COLUMNS <= last ? last : index + EMOJI_COLUMNS;
            break;
          case "ArrowUp":
            to = index - EMOJI_COLUMNS;
            break;
          case "Home":
            to = corner ? 0 : rowStart;
            break;
          case "End":
            to = corner ? last : Math.min(rowStart + EMOJI_COLUMNS - 1, last);
            break;
          default:
            return undefined;
        }
        return items[to]?.key ?? from.key;
      },
    });

    const labelOf = (value: string) =>
      context.props<CellProps>("cell", value)?.label ?? value;

    const focusSearch = (caretToEnd = false) => {
      const input = context.element("search") as HTMLInputElement | null;
      if (!input) return;
      input.focus();
      if (caretToEnd) input.setSelectionRange(input.value.length, input.value.length);
    };

    const choose = (value: string, event?: Event) => {
      if (change("value", value, { reason: "item-press", event })) {
        announce(`Selected ${labelOf(value)} ${value}`);
      }
    };

    return {
      roving,
      choose,
      search(query: string) {
        context.store.set({ query, focused: null });
        const count = searchEmoji(query).length;
        announce(count === 0 ? "No emoji found" : `${count} emoji`);
      },
      searchKeydown(event: KeyboardEvent) {
        if (event.key === "ArrowDown") {
          const first = searchEmoji(context.store.get().query)[0];
          if (!first) return;
          event.preventDefault();
          roving.focus(first.char);
        } else if (event.key === "Escape" && context.store.get().query) {
          event.preventDefault();
          (event.target as HTMLInputElement).value = "";
          this.search("");
        }
      },
      cellKeydown(event: KeyboardEvent, el: HTMLElement, value: string, row: number) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          choose(value, event);
          return;
        }
        if (event.key === "ArrowUp" && row === 0 && !event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          focusSearch();
          return;
        }
        if (roving.keydown(event, el)) return;
        // Typing returns to the search field; the browser types the key into it.
        if (isTypeaheadKey(event) && event.key !== " " && !event.ctrlKey && !event.metaKey) focusSearch(true);
      },
    };
  },
  slots: (slot) => ({
    root: slot({
      bind: (el) => prepareAnnouncements(el.ownerDocument),
    }),
    search: slot({
      attrs: (_state, part) => ({
        type: "search",
        autocomplete: "off",
        spellcheck: "false",
        "aria-controls": `${part.id}-grid`,
      }),
      on: {
        input: (event, { api }) => api.search((event.target as HTMLInputElement).value),
        keydown: (event, { api }) => api.searchKeydown(event as KeyboardEvent),
      },
    }),
    grid: slot({
      role: "grid",
      keys: { none: "Each cell handles the arrow keys." },
      attrs: (_state, part) => ({ id: `${part.id}-grid` }),
    }),
    row: slot({
      role: "row",
    }),
    cell: slot<CellProps>({
      role: "gridcell",
      focus: "roving",
      keys: ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "Enter", " "],
      props: { value: "string", label: "string", row: "number", column: "number" },
      attrs: (state, part) => ({
        "aria-label": part.props.label,
        "aria-selected": String(state.value === part.key),
        tabindex: part.api.roving.tabIndex(state, part),
      }),
      press: ({ api, key }, event) => api.choose(key, event),
      on: {
        keydown: (event, { el, api, key, props }) => {
          if (el) api.cellKeydown(event as KeyboardEvent, el, key, props.row);
        },
      },
      bind: (el, part) => part.api.roving.bind(el, part),
    }),
    empty: slot({
      present: (state) => searchEmoji(state.query).length === 0,
    }),
  }),
  agent: { actions: ["choose", "search"] },
});

export type { EmojiPickerOptions };
