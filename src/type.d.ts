declare module '*.less'; 

declare namespace JSX {
  interface IntrinsicElements {
    'elix-border-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>; // Normal web component
    'elix-dropdown-list': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>; // Normal web component
  }
}

declare module 'known-css-properties' {
  export const all: string[];
}