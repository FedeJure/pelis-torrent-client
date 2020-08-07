const memorize = (fn) => {
    let cache = {}
    return (...args) => {
      let strX = JSON.stringify(args);
      return strX in cache ? cache[strX]
        : (cache[strX] = fn(...args).catch((x) => {
            delete cache[strX];
            return x;
          }))
    } 
};

export { memorize };