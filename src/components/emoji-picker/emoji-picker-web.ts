import { createParts, wrappedChild } from "@ui-sdk/web";
import { EMOJI_COLUMNS, emojiPicker, searchEmoji } from "./emoji-picker";

function renderResults(root: HTMLElement, query: string) {
  const grid = root.querySelector("emoji-picker-grid");
  if (!grid) return;
  const results = searchEmoji(query);
  const rows: HTMLElement[] = [];
  results.forEach((emoji, index) => {
    const row = Math.floor(index / EMOJI_COLUMNS);
    if (!rows[row]) rows[row] = document.createElement("emoji-picker-row");
    const cell = document.createElement("emoji-picker-cell");
    cell.setAttribute("value", emoji.char);
    cell.setAttribute("label", emoji.name);
    cell.setAttribute("row", String(row));
    cell.setAttribute("column", String(index % EMOJI_COLUMNS));
    cell.textContent = emoji.char;
    rows[row].append(cell);
  });
  grid.replaceChildren(...rows);
}

export const EmojiPickerParts = createParts(emojiPicker, {
  root: {
    tag: "emoji-picker",
    display: "block",
    render: (el, instance) => {
      let query = (instance.get() as { query: string }).query;
      renderResults(el, query);
      return instance.subscribe(() => {
        const next = (instance.get() as { query: string }).query;
        if (next === query) return;
        query = next;
        renderResults(el, query);
      });
    },
  },
  search: { tag: "emoji-picker-search", display: "contents", target: wrappedChild("input") },
  grid: { tag: "emoji-picker-grid", display: "block" },
  row: { tag: "emoji-picker-row", display: "block" },
  cell: "emoji-picker-cell",
  empty: { tag: "emoji-picker-empty", display: "block" },
});
