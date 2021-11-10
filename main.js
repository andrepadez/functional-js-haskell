const even = x => x % 2 === 0
const odd = x => !even(x)

const list = range(1)(50)
const evens = filter(even)(list)
const odds = filter(odd)(list)

// console.log('list', l2a(list))
// console.log('evens', l2a(evens))
// console.log('odds', l2a(odds))
// console.log('10 first odds', l2a(take(10)(odds)))
// console.log('20 last evens', l2a(take(20)(evens)))

// currying
const allOdds = all(odd)

//

// folding
const sumf = foldr((acc, v) => acc + v)(0)
const multf = foldr((acc, v) => acc * v)(1)

//zip
const a = a2l([1, 2, 3, 4])
const b = a2l([0, 1, 2, 3])
const zipab = zip(a)(b)
// [[1, 0], [2,1], [3,2], [4, 3]]
console.log({ ab: zipab })

const c = a2l([1, 2, 3, 4])
const d = a2l([0, 1])
const zipcd = zip(c)(d)
// [[1, 0], [2,1], [3,0], [4, 1]]
console.log({ cd: zipcd })

// Primes

const sieve = xs =>
  xs === null
    ? null
    : cons(head(xs))(sieve(filter(x => x % head(xs) !== 0)(tail(xs))))

primes = n => sieve(range(2)(n))
