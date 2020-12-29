export interface Theme {
  id?: string,
  name: string,
  description: string,
  isPublic: Boolean,
  createdBy: string,
  libraryId: string,
  isDefault: boolean
}

export interface Styles {
  id?: string,
  selector: string,
  props: {
    prop: string,
    value: string
  }[]
}

export interface StylesBodyPayload {
  componentId: string,
  themeId: string,
  styles: Styles[]
}

export interface StyleItem { 
  themeId: string, 
  componentId: string, 
  styles: Styles 
};
