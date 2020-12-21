function evaluate(str) {
    var consoleOutput = '';
    try {
        const console = {
            log: function (m) {
                consoleOutput = consoleOutput + '\n' + JSON.stringify(m);
                return consoleOutput;
            },
        };
        return eval(str);
    } catch (e) {
        return e.toString();
    }
}

const testScript = `
function oddishOrEvenish(number) {
    const numberToString = number.toString();
    return [...numberToString].reduce((acc, value) => parseInt(acc) + parseInt(value), 0) % 2
        ? 'Oddish'
        : 'Evenish';
}

console.log(oddishOrEvenish(41));

function leader(arr) {
    return arr.filter((e, index) => isLeader(e, arr.slice(index + 1, arr.length)));
}

function isLeader(el, arr) {
    return arr.every((e) => e < el);
}

console.log(leader([2, 3, 20, 15, 8, 25, 3]));

function isPrime(n) {
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return n > 1;
}

console.log(isPrime(5));

function primeFactorize(num) {
    let arr = [];
    for (i = 2; i < num + 1; i++) {
        if (num % i === 0 && isPrime(i)) {
            return arr.concat(i, primeFactorize(num / i));
        }
    }

    return arr;
}

console.log(primeFactorize(25));

function findDuplicates(arr) {
    const observed = {};
    for (let i = 0; i < arr.length; i++) {
        if (observed[arr[i]]) {
            return arr[i];
        } else {
            observed[arr[i]] = arr[i];
        }
    }

    return false;
}

console.log(findDuplicates([1, 2, 3, 4, 5, 6, 7, 7, 8, 6, 10]));

function findMaxMin(arr) {
    const result = {
        max: 0,
        mix: 0,
    };

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < result.min) {
            result.min = arr[i];
        }

        if (arr[i] > result.max) {
            result.max = arr[i];
        }
    }
}

function cumulative(arr) {
    const sum = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        sum.push(sum[i - 1] + arr[i]);
    }

    return sum;
}

console.log(cumulative([1, 3, 5, 7]));

function distanceToNearestVowel(str) {
    const array = [...str];
    return array.map((value, index) => getDistanceToNearestVowel(array, value, index));
}

const vowel = ['a', 'u', 'i', 'e', 'o'];

function getDistanceToNearestVowel(array, value, index) {
    if (vowel.includes(value)) {
        return 0;
    }

    var distance = 0;
    while (index + distance < array.length || index - distance > 0) {
        if (
            (array[index - distance] && vowel.includes(array[index - distance])) ||
            (array[index + distance] && vowel.includes(array[index + distance]))
        ) {
            return distance;
        }

        distance++;
    }

    return distance;
}

console.log(distanceToNearestVowel('bba'));
console.log(distanceToNearestVowel('abcdabcd'));
console.log(distanceToNearestVowel('shopper'));

function sumDigProd(...arg) {
    let result = arg.reduce((acc, item) => acc + item);
    while (result > 9) {
        result = [...result.toString()].reduce((acc, item) => acc * item, 1);
    }

    return result;
}

console.log(sumDigProd(16, 28));

function balanced(value) {
    const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
    const valuePositioned = [...value].map((item) => alphabet.indexOf(item) + 1);
    const median = value.length / 2;
    const left = valuePositioned.slice(0, median);
    const right = valuePositioned.slice(0, -median);
    return getAccumulator(left) === getAccumulator(right);
}

function getAccumulator(sliceOfArray) {
    return sliceOfArray.reduce((acc, item) => item + acc);
}

console.log(balanced('brake'));

async function testAsync() {
    const result = await loadData();
    console.log('result: ', result);
    await loadData()
        .then(() => console.log('success'))
        .catch(() => console.log('error'));
}

function loadData() {
    return new Promise((res) =>
        setTimeout(() => {
            console.log('after 1 sec');
            res('resolved');
        }, 1000)
    );
}

testAsync();
`;

const testScript2 = `
    function loadData() {
    return new Promise((res) =>
        setTimeout(() => {
            console.log('after 1 sec');
            res('resolved');
        }, 1000)
    );
}

loadData();
`;

console.log(evaluate(testScript2));
// function Evaluator(cons) {
//     this.cons = cons;
// }
// Evaluator.prototype.evaluate = function (str) {
//     try {
//         var console = this.cons;
//         return JSON.stringify(eval(str));
//     } catch (e) {
//         return e.toString();
//     }
// };

// var cons = {
//     log: function (m) {
//         return m;
//     },
// };

// var e = new Evaluator(cons);
// console.log(e.evaluate("console.log('hello'); console.log('test')"));
