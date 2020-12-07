export interface Color {}

export type StyleSheet = {
  selector: string,
  properties: React.CSSProperties
}[]; 

export interface ControlOptions {
  styleSheet: StyleSheet,
  props: any 
}

export interface ComponentDefintiion {
  Demo: React.FC,
  info: ComponentInfo,
  Control: React.FC
}

export interface ComponentInfo {
  availableOptions: {
    css?: {
      selectors: string[]
    },
    props?: {
      name: string,
      type: 'string'|'boolean'|'enum',
      enum?: string[]
    }[] 
  },
  id: string,
  name: string,
  library: string
}
