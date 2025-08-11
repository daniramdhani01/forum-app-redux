export const abortManager = {
  map: new Map(),

  create(key) {
    const c = new AbortController();
    if (key) this.map.set(key, c);
    return c;
  },

  get(key) {
    return this.map.get(key);
  },

  abort(key) {
    const c = this.map.get(key);
    if (c) {
      c.abort();
      this.map.delete(key);
    }
  },

  abortAll() {
    for (const c of this.map.values()) c.abort();
    this.map.clear();
  },

  delete(key) {
    this.map.delete(key);
  }
};
