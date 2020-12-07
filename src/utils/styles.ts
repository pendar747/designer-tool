import { StyleSheet } from "../types";

const convertCamelCaseToKebabCase = (phrase: string) => phrase
  .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

export const convertStylesToString = (styles: React.CSSProperties) => {
  return Object.entries(styles)
    .map(([key, value]) => `${convertCamelCaseToKebabCase(key)}: ${value};`)
    .join('\n');
}

export const convertSheetToString = (sheet: StyleSheet) => {
  return sheet.map(({ selector, properties }) => `
    ${selector} {
      ${properties}
    }
  `).join('\n');
}