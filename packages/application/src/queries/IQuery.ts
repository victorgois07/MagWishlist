export interface IQuery<T> {
  execute(): Promise<T>;
}
