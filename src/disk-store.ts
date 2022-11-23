import { IRecord, IStore } from 'extra-workflow'
import { DiskCache, DiskCacheView } from 'extra-disk-cache'
import { sortNumbersAscending } from 'extra-sort'
import { toArray, isntUndefined } from '@blackglory/prelude'
import { last } from 'iterable-operator'

export class DiskStore<T> implements IStore<T> {
  private view: DiskCacheView<number, IRecord<T>>

  constructor(
    private cache: DiskCache
  , toBuffer: (value: IRecord<T>) => Buffer = defaultToBuffer
  , fromBuffer: (buffer: Buffer) => IRecord<T> = defaultFromBuffer
  ) {
    this.view = new DiskCacheView<number, IRecord<T>>(
      cache
    , {
        toString: x => x.toString()
      , fromString: x => Number(x)
      }
    , {
        toBuffer
      , fromBuffer
      }
    )
  }

  set(index: number, record: IRecord<T>): void {
    this.view.set(index, record)
  }

  get(index: number): IRecord<T> | undefined {
    return this.view.get(index)?.value
  }

  pop(): IRecord<T> | undefined {
    const lastIndex = last(this.getIndexesAscending())
    if (isntUndefined(lastIndex)) {
      const record = this.get(lastIndex)!
      this.view.delete(lastIndex)
      return record
    }
  }

  clear(): void {
    this.cache.clear()
  }

  dump(): Array<IRecord<T>> {
    return this.getIndexesAscending()
      .map(index => {
        const item = this.view.get(index)!
        return item.value
      })
  }

  private getIndexesAscending(): number[] {
    const indexes = toArray(this.view.keys())
    sortNumbersAscending(indexes)
    return indexes
  }
}

function defaultToBuffer<T>(value: T): Buffer {
  return Buffer.from(JSON.stringify(value))
}

function defaultFromBuffer<T>(buffer: Buffer): T {
  return JSON.parse(buffer.toString())
}
