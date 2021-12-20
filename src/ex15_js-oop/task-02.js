class ElectricalAppliances {
  constructor(title, power, switched) {
    this.title = title;
    this.power = power;
    this.switched = switched;
  }

  switchOn() {
    this.switched = true;
  }

  switchOff() {
    this.switched = false;
  }
}

class Computer extends ElectricalAppliances {
  constructor(title, power, switched, type) {
    super(title, power, switched);
    this.type = type;
  }
}

class Television extends ElectricalAppliances {
  constructor(title, power, switched, diagonal) {
    super(title, power, switched);
    this.diagonal = diagonal;
  }
}

class Conditioner extends ElectricalAppliances {
  constructor(title, power, switched, type) {
    super(title, power, switched);
    this.type = type;
  }
}

const redmond = new Computer('Asus', 2000, true, 'gaming');
const samsung = new Television('Samsung', 1000, true, '60');
const vitec = new Conditioner('Vitec', 500, false, 'household');
const room = [redmond, samsung, vitec];

function countPower(array) {
  let power = 0;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].switched) {
      power += array[i].power;
    }
  }
  return power;
}

function searchByName(name, array) {
  const devices = [];
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].title.includes(name)) {
      devices.push(array[i]);
    }
  }

  return devices;
}
console.log('Приборы в комнате:', room);
console.log('Потребляемая мощность:', countPower(room));
console.log('Поиск по названию:', searchByName('Vitec', room));
