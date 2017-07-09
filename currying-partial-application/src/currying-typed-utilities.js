
// @flow

function curry2<A, B, R>(fn : (A, B) => R) : A => B => R {
  return function (a : A) : B => R {
    return function (b : B) : R {
      return fn(a, b);
    };
  };
};

function curry3<A, B, C, R>(fn : (A, B, C) => R) : A => B => C => R {
  return function (a : A) : B => C => R {
    return function (b : B) : C => R {
      return function (c : C) : R {
        return fn(a, b, c);
      };
    };
  };
};

function curry4<A, B, C, D, R>(fn : (A, B, C, D) => R) : A => B => C => D => R {
  return function (a : A) : B => C => D => R {
    return function (b : B) : C => D => R {
      return function (c : C) : D => R {
        return function (d : D) : R {
          return fn(a, b, c, d);
        };
      };
    };
  };
};

function curry5<A, B, C, D, E, R>(fn : (A, B, C, D, E) => R) : A => B => C => D => E => R {
  return function (a : A) : B => C => D => E => R {
    return function (b : B) : C => D => E => R {
      return function (c : C) : D => E => R {
        return function (d : D) : E => R {
          return function (e : E) : R {
            return fn(a, b, c, d, e);
          };
        };
      };
    };
  };
};

function curry6<A, B, C, D, E, F, R>(fn : (A, B, C, D, E, F) => R) :
  A => B => C => D => E => F => R {
  return function (a : A) : B => C => D => E => F => R {
    return function (b : B) : C => D => E => F => R {
      return function (c : C) : D => E => F => R {
        return function (d : D) : E => F => R {
          return function (e : E) : F => R {
            return function (f : F) : R {
              return fn(a, b, c, d, e, f);
            };
          };
        };
      };
    };
  };
};


function curry7<A, B, C, D, E, F, G, R>(fn : (A, B, C, D, E, F, G) => R) :
  A => B => C => D => E => F => G => R {
  return function (a : A) : B => C => D => E => F => G => R {
    return function (b : B) : C => D => E => F => G => R {
      return function (c : C) : D => E => F => G => R {
        return function (d : D) : E => F => G => R {
          return function (e : E) : F => G => R {
            return function (f : F) : G => R {
              return function (g : G) : R {
                return fn(a, b, c, d, e, f, g);
              };
            };
          };
        };
      };
    };
  };
};

function curry8<A, B, C, D, E, F, G, H, R>(fn : (A, B, C, D, E, F, G, H) => R) :
  A => B => C => D => E => F => G => H => R {
  return function (a : A) : B => C => D => E => F => G => H => R {
    return function (b : B) : C => D => E => F => G => H => R {
      return function (c : C) : D => E => F => G => H => R {
        return function (d : D) : E => F => G => H => R {
          return function (e : E) : F => G => H => R {
            return function (f : F) : G => H => R {
              return function (g : G) : H => R {
                return function (h : H) : R {
                  return fn(a, b, c, d, e, f, g, h);
                };
              };
            };
          };
        };
      };
    };
  };
};

export {
  curry2,
  curry3,
  curry4,
  curry5,
  curry6,
  curry7,
  curry8
};

