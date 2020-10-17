# react-native-cask-ui

### Demo
```
$ yarn storybook
```

### TODO
1. **Storyboard:** Add storybook example for every ui components.
2. **Hooks:** Replace class component by functional component with `React.memo`.
3. **useMemoStyle:** Use `useMemoStyle` or other memorized methods to improve performance.
4. **Remove T:** Remove the `T` prefix of each component props.
5. **Interface:** Replace the `type` definition of each component props by `interface`.
6. **Renderer:** Separate logic and pure renderer.

|                      | Storybook | Hooks | useMemoStyle | Remove T | Interface | Renderer |
| -------------------- | :-------: | :---: | :----------: | :------: | :-------: | :------: |
| Alert                | -         | ✔️     | -            | ✔️        | ✔️         |          |
| Badge                | ✔️         | ✔️     | ✔️            | ✔️        | ✔️         |          |
| Button               | ✔️         | ✔️     | ✔️            | ✔️        | ✔️         |          |
| Card                 | ✔️         | ✔️     | ✔️            | ✔️        | ✔️         |          |
| Flex                 |           | ✔️     | ✔️            | ✔️        |           |          |
| HeaderButtons        |           | ✔️     |              | ✔️        |           |          |
| KeyboardAvoidingView | -         | ✔️     | -            | ✔️        | ✔️         | -        |
| Image                | ✔️         | ✔️     | ✔️            | ✔️        | ✔️         |          |
| InputSpinner         |           | ✔️     | ✔️            |          |           |          |
| List                 |           | ✔️     |              |          |           |          |
| ListItem             |           | ✔️     | ✔️            | ✔️        |           |          |
| LoadingSpinner       |           | ✔️     |              | ✔️        |           | ✔️        |
| Modal                |           | ✔️     |              |          |           |          |
| Pager                |           | ✔️     |              | ✔️        |           |          |
| PagerConfig          | -         | ✔️     |              | ✔️        |           |          |
| Rating               |           | ✔️     | ✔️            | ✔️        |           |          |
| ReadMore             |           | ✔️     | ✔️            | ✔️        |           |          |
| Screen               | -         | ✔️     | ✔️            | ✔️        | ✔️         |          |
| SearchBar            |           | ✔️     | ✔️            | ✔️        |           | ✔️        |
| Separator            |           | ✔️     | ✔️            | ✔️        |           |          |
| Stack                |           |       |              | ✔️        |           |          |
| Text                 | ✔️         | ✔️     | ✔️            | ✔️        | ✔️         |          |
| TextInput            | ✔️         | ✔️     | ✔️            | ✔️        | ✔️         |          |
| Toolbar              |           | ✔️     | ✔️            | ✔️        |           |          |

### Why need to separate Component and Renderer?

Only the Renderer can be assigned default props. If assign default props to the UI component. It will break the order of overridding.

**The props order to be took effect**
User Assigned Props (UI Component) > Overridded Props (UI Component) > Default Props (Renderer)

**If no Renderer**
User Assigned Props (UI Component) > `Default Props (UI Component)` > Overridded Props (UI Component)

And it is wrong.
