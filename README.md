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
| Image                |           | ✔️     |              |          |           |          |
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
