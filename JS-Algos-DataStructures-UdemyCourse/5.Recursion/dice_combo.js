// https://youtu.be/9ByWqPzfXDU?si=fwK1LKa58KQA75iE

// find all dice roll combos that sum to target, print results only (undef return)
function dice(target, proc = "") {
  if (target === 0) {
    console.log(proc);
    return;
  }

  for (let i = 1; i <= 6 && i <= target; i++) {
    // need i <= 6 to make valid dice roll since target is sum so target could be > 6
    dice(target - i, proc + i);
  }
}
dice(4);

// find all dice roll combos that sum to target, results array in BODY
function diceArr1(target, proc = "") {
  if (target === 0) {
    return [proc];
  }

  const newArr = [];

  for (let i = 1; i <= 6 && i <= target; i++) {
    // need i <= 6 to make valid dice roll since target is sum so target could be > 6
    newArr.push(...diceArr1(target - i, proc + i));
  }
  return newArr;
}
console.log(diceArr1(3));

// find all dice roll combos that sum to target, results array in PARAMETER
function diceArr2(target, proc = "", results = []) {
  if (target === 0) {
    results.push(proc);
    return results;
  }

  const newArr = [];

  for (let i = 1; i <= 6 && i <= target; i++) {
    // need i <= 6 to make valid dice roll since target is sum so target could be > 6
    diceArr2(target - i, proc + i, results);
  }
  return results;
}
console.log(diceArr2(2));

// find all dice roll combos that sum to target, dynamic dice face, results array in PARAMETER
function diceArr3(target, diceFace, proc = "", results = []) {
  if (target === 0) {
    results.push(proc);
    return results;
  }

  const newArr = [];

  for (let i = 1; i <= diceFace && i <= target; i++) {
    // need i <= diceFace to make valid dice roll since target is sum so target could be > 6
    diceArr3(target - i, diceFace, proc + i, results);
  }
  return results;
}
console.log(diceArr3(6, 8));
