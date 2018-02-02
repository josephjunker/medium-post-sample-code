
// @flow

type Expr
  = Num
  | Plus
  | Times
  ;

class Num {
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

const plus = (a, b) => a + b,
      times = (a, b) => a * b;

function evaluate(expr: Expr) : number {
  return expr instanceof Num  ? expr.value
  :      expr instanceof Plus ? plus(evaluate(expr.left), evaluate(expr.right))
  :      /* we have a Times  */ times(evaluate(expr.left), evaluate(expr.right));
}

const expr = new Plus(
  new Num(1),
  new Times(
    new Num(4),
    new Num(2)));

console.log(evaluate(expr));

