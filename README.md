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
  set(index: number, record: IRecord<T>): void
  get(index: number): IRecord<T> | undefined
  pop(): IRecord<T> | undefined
  clear(): void
  dump(): Array<IRecord<T>>
}
```
