## Todo
 
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

- [ ] Add pseudo selectors option for each selector (:active, :focus, :hover)
- [ ] Disable save button when there are duplicate props for a selector
- [ ] Warn user about duplicate props (set input on danger mode)
- [ ] Remove existing prop keys from prop key suggestions
- [ ] Order previous releases by requested date
- [ ] Specific value input for different props:
  - [ ] color picker/color pallet for colors (e.g. background-color, border-color)
  - [ ] number input with suffix for number props (e.g. width, height, border-width)
  - [ ] order props in the autofill by the most used first

# Features
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

- [ ] Extend component collections
  - [ ] Antd components
    - [ ] Dropdown
    - [ ] Checkbox
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
- [ ] publish library to github with a live documentation and demo page (github pages) 

- [ ] add custom components to the platform...
  - [ ] Separate the components spec to a separate repo
- [ ] Edit history in component editor
- [ ] Add custom selectors
- [ ] Colour pallet
  - [ ] add/remove/edit colours in the pallet
- [ ] Default themes
- [ ] Landing page...