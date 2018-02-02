

type Expr
  = Var
  | Val
  | Plus
  | Times
  ;

class Var {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Val {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

class Plus {
  left: Expr;
  right: Expr;
  constructor(left: Expr, right: Expr) {
    this.left = left;
    this.right = right;
  }
}

class Times {
  left: Expr;
  right: Expr;
  constructor(left: Expr, right: Expr) {
    this.left = left;
    this.right = right;
  }
}

/*
 *
 *
 * We can compose the Maybe and InEnv applicatives to produce the type
 * Env<X, Y> => Maybe<A>, which will let us handle cases where the
 * requested name is not available
 *
 *
 */
