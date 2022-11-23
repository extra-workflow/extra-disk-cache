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
  constructor(
    cache: DiskCache
  , toBuffer: (value: IRecord<T>) => Buffer = defaultToBuffer
  , fromBuffer: (buffer: Buffer) => IRecord<T> = defaultFromBuffer
  )

  set(index: number, record: IRecord<T>): void
  get(index: number): IRecord<T> | undefined
  pop(): IRecord<T> | undefined
  clear(): void
  dump(): Array<IRecord<T>>
}
```
