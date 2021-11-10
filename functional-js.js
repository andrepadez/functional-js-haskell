const cons = a => b => ({ _val: a, next: b })
const head = p => p._val
const tail = p => p.next
const last = xs => [...l2a(xs)].reverse().shift()
const get = n => xs => n === 0 ? head(xs) : get(n - 1)(tail(xs))

const range = l => h => l > h ? null : cons(l)(range(l + 1)(h))
const a2l = arr => [...arr].reverse().reduce((l, i) => cons(i)(l), null)
const l2a = xs => (xs === null ? [] : [head(xs), ...l2a(tail(xs))])

const concat = xs => ys => a2l([...l2a(xs), ...l2a(ys)])

const length = xs => (xs === null ? 0 : 1 + length(tail(xs)))
const elem = item => xs =>
  xs === null ? false : head(xs) === item ? true : elem(item)(tail(xs))

const reverse = xs => a2l(l2a(xs).reverse())
const take = n => xs =>
  n === 0 || xs === null ? null : cons(head(xs))(take(n - 1)(tail(xs)))
const drop = n => xs => n === 0 ? xs : drop(n - 1)(tail(xs))

const takeEnd = n => xs => reverse(take(n)(reverse(xs)))

const map = p => xs => xs === null ? null : cons(p(head(xs)))(map(p)(tail(xs)))
//prettier-ignore
const filter = p => xs => xs === null ? null
    : !!p(head(xs)) ? cons(head(xs))(filter(p)(tail(xs)))
      : filter(p)(tail(xs))

// const all = p => xs => xs === null ? true : !!p(head(xs)) && all(p)(tail(xs))
// talk about short-circuit
const all = p => xs =>
  xs === null ? true : !p(head(xs)) ? false : all(p)(tail(xs))

const any = p => xs =>
  xs === null ? false : !!p(head(xs)) ? true : any(p)(tail(xs))

const sum = xs => (xs === null ? 0 : head(xs) + sum(tail(xs)))
const multiply = xs => (xs === null ? 1 : head(xs) * multiply(tail(xs)))

//prettier-ignore
const foldr = f => acc => xs =>
  xs === null ? acc : foldr (f) (f(acc, head(xs))) (tail(xs))

const foldl = f => acc => xs => foldr(f)(acc)(reverse(xs))

const zip = xs => ys =>
  a2l(
    (function rec(xs, ys, idx, acc) {
      if (xs === null) return acc
      return [
        ...acc,
        [head(xs), get(idx % length(ys))(ys)],
        ...rec(tail(xs), ys, idx + 1, acc),
      ]
    })(xs, ys, 0, [])
  )
