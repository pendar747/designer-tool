export interface Color {}

export type StyleSheet = {
  selector: string,
  properties: React.CSSProperties
}[]; 

export interface ControlOptions {
  styleSheet: StyleSheet,
  props: any 
}

export interface ComponentDefinition {
  Demo: React.FC,
  info: ComponentInfo,
  Control: React.FC<ControlOptions>
}

export type PropType = 'string'|'boolean'|'enum';

export interface Prop {
  name: string,
  type: PropType,
  enumOptions?: string[]
}

export interface ComponentInfo {
  availableOptions: {
    css?: {
      selectors: string[]
    },
    props?: Prop[] 
  },
  id: string,
  name: string,
  library: string
}

export interface User {
  id: string,
  email: string
}