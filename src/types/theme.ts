export interface Theme {
  id?: string,
  name: string,
  description: string,
  isPublic: Boolean,
  createdBy: string,
  libraryId: string,
  isDefault: boolean
}

export interface Prop {  
  prop: string, 
  value: string
}

export interface Style {
  id?: string,
  selector: string,
  props: Prop[]
}

export interface StylesBodyPayload {
  componentId: string,
  themeId: string,
  styles: Style[]
}

export interface StyleItem { 
  themeId: string, 
  componentId: string, 
  styles: Style[]
};

export interface ThemeStyles {
  themeId: string,
  styles: Style[]
}
