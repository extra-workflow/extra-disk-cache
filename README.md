# @extra-workflow/extra-disk-cache
## Install
```sh
npm install --save @extra-workflow/extra-disk-cache
# or
yarn add @extra-workflow/extra-disk-cache
```

## API
### DiskStore
```ts
class DiskStore<T> implements IStore<T> {
  constructor(view: DiskCacheView<number, IRecord<T>>)
}
```
