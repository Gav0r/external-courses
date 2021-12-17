function Pastry(title, weight) {
  this.title = title;
  this.weight = weight;
}

function ChocoladeBars(title, weight, content) {
  Pastry.call(this, title, weight);
  this.content = content;
}

ChocoladeBars.prototype = Object.create(Pastry.prototype);
ChocoladeBars.prototype.constructor = ChocoladeBars;

function ChocoladeProduct(title, weight, stuffing) {
  Pastry.call(this, title, weight);
  this.stuffing = stuffing;
}

ChocoladeProduct.prototype = Object.create(Pastry.prototype);
ChocoladeProduct.prototype.constructor = ChocoladeProduct;

function Lolipop(title, weight, fruityTaste) {
  Pastry.call(this, title, weight);
  this.fruityTaste = fruityTaste;
}

Lolipop.prototype = Object.create(Pastry.prototype);
Lolipop.prototype.constructor = Lolipop;

const Snickers = new ChocoladeBars('Snickers', 70, 'roasted peanuts');
const Twix = new ChocoladeBars('Twix', 50, 'shortbread cookies');
const Kinder = new ChocoladeProduct('Kinder', 13, 'milky chocolade');
const Nutella = new ChocoladeProduct('Nutella', 200, 'hazelnut');
const chupaChups = new Lolipop('Chupa-Chups', 5, 'strawberry');
const rooster = new Lolipop('Capri', 3, 'caramel');
const newYearGift = [Snickers, Twix, Kinder, Nutella, chupaChups, rooster];

function countWeight(array) {
  let weight = 0;
  for (let i = 0; i < array.length; i += 1) {
    weight += array[i].weight;
  }
  return weight;
}

function byField(field) {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}

function searchByName(name, array) {
  const candies = [];
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].title.includes(name)) {
      candies.push(array[i]);
    }
  }
  return candies;
}

console.log('Новогодний подарок:', newYearGift);
console.log('Вес подарка:', countWeight(newYearGift));
console.log(
  'Новогодний подарок отсортированный по весу:',
  newYearGift.sort(byField('weight')),
);
console.log('Поиск по названию', searchByName('Kinder', newYearGift));
