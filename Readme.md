# Component Designer

## Roadmap

### Release version 1.0.0 alpha 

Bare-bones features that demonstrate the use case and benefit of the application.

#### Remaining Features in order of priority

- Component Editor:
  - [ ] Add pseudo selectors option for each selector (:active, :focus, :hover)
  - [ ] Add custom selectors
  - [ ] Colour pallet:
    - [ ] add/remove/edit colours in the pallet
    - [ ] Reusing the colors defined in the pallet as prop values in the editor
  - [ ] Specific value input for different props:
    - [ ] color picker/color pallet for colors (e.g. background-color, border-color)
    - [ ] number input with suffix for number props (e.g. width, height, border-width)
    - [ ] order props in the autofill by the most used first
    - [ ] sliders for borders
    
- [ ] add custom components to the platform...
  - [ ] Separate the components spec to a separate repo

- Publishing: 
  - [ ] publish a library to github with live documentation and demo page (github pages) 
  
- Component repository:
  - [ ] Extend component collections
    - [ ] Antd components
      - [ ] Checkbox
      - [ ] Dropdown
      - [ ] Input
      - [ ] Radio
      - [ ] Select
      - [ ] Slider
      - [ ] Card
    - [ ] Material UI components
      - [ ] Button
      - [ ] Checkbox
      - [ ] Radio
      - [ ] Select
      - [ ] Slider
      - [ ] Switch
    - [ ] Semantic UI components
      - [ ] Button
      - [ ] Header
      - [ ] Checkbox
      - [ ] Dropdown  

- [ ] Landing page ...
- [ ] Forgot my password reset

- Deployment:
  - [ ] CICD deployment for both UI and server

# Potential Features
Users can...

- [X] login
- [X] registration
- [x] view and filter components to select
- [X] Create/update/delete a library
- [X] add a component to their library
- [X] create a library
- [X] edit styles and preview props for a component
- [X] view their component library
- [X] Remove component from library
- [X] Create a theme and assign it to a library
- [X] edit component styles in the theme 
- [X] set library settings for publishing to npm
- [X] publish their library as an npm package
  - [X] for the React framework

- [ ] Default themes
- [ ] Order previous releases by requested date
- [ ] Create mock up pages using the components in a library
- [ ] Sell components by third party developers as a marketplace
- [ ] Multiple users editing the same library/theme
- [ ] Users leaving comments/notes on a component
- [ ] Pre-existing themes by designers
- [ ] Selling themes created by third party designers
- [ ] Support for Vue, Svelte and other frameworks

Component Editor:
- [ ] Remove existing prop keys from prop key suggestions
- [ ] Disable save button when there are duplicate props for a selector
- [ ] Edit history in component editor
- Defining css variables for:
  - [ ] Font size
  - [ ] paddings/margins
- [ ] Adding custom web fonts

## Misc todo
 
- [X] Add { Demo, info, Control } structure to vendor components
- [X] Create edit route to allow styling components
- [X] Controls for changing styles for each selector 
- [X] Controls for changing component props
- [X] Reflect changes in controls on the component without side-effects
- [X] Link to library on edit component page (show selected theme and library at the top)
- [X] Expand styles that have props by default
- [X] Delete a prop
- [X] Prevent saving empty prop (prop without key or value)
- [X] Change styles expansion panel to look less boxy
- [X] Disable save button when there are no changes
- [X] Refactor CSSEditor to take styles in the same standard format
- [X] Scope styles in editor view so that it doesn't leak to the rest of the application
- [X] Preview components with their styles in the library and all components view
  - [X] in library view
  - [ ] optimize rendering the styles for each component
- [X] Zoom in/out, and pan for the component preview