function Storage(type: Storage = localStorage) {
  //setItem
  function set(key: string, value: string) {
    (type as any).setItem(key, value);
  }
  // getItem
  function get(key: string) {
    (type as any).getItem(key);
  }
  return [{ set, get }];
}
export default Storage;
