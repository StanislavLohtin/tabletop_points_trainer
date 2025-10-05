export interface Empire {
  id: number;
  name: string;
  color: string
}

export interface Card {
  id: number;
  empire: Empire;
  value: number;
  letter?: 'A' | 'B' | 'C' | null;
}

export interface EmpireDeck {
  empire: Empire;
  cards: Card[];
}

export const EMPIRES: Empire[]  = [
  {
    id: 0,
    name: 'Prussia',
    color: 'black'
  },
  {
    id: 1,
    name: 'Habsburg',
    color: 'yellow'
  },
  {
    id: 2,
    name: 'Ottoman',
    color: 'green'
  },
  {
    id: 3,
    name: 'Spain',
    color: 'white'
  },
  {
    id: 4,
    name: 'France',
    color: 'blue'
  },
  {
    id: 5,
    name: 'Russia',
    color: 'pink'
  },
  {
    id: 6,
    name: 'UK',
    color: 'red'
  },
];

export const CARDS: Card[]  = [
  // --- Prussia (empires[0]) ---
  {
    id: 1,
    empire: EMPIRES[0],
    value: 7,
    letter: "A"
  },
  {
    id: 2,
    empire: EMPIRES[0],
    value: 6,
    letter: "B"
  },
  {
    id: 3,
    empire: EMPIRES[0],
    value: 5,
    letter: "C"
  },
  {
    id: 4,
    empire: EMPIRES[0],
    value: 4,
  },
  {
    id: 5,
    empire: EMPIRES[0],
    value: 3,
  },
  {
    id: 6,
    empire: EMPIRES[0],
    value: 3,
  },
  {
    id: 7,
    empire: EMPIRES[0],
    value: 3,
  },

  // --- Habsburg (empires[1]) ---
  {
    id: 8,
    empire: EMPIRES[1],
    value: 6,
    letter: "A"
  },
  {
    id: 9,
    empire: EMPIRES[1], // Habsburg (Yellow)
    value: 5,
    letter: "B"
  },
  {
    id: 10,
    empire: EMPIRES[1],
    value: 5,
    letter: "C"
  },
  {
    id: 11,
    empire: EMPIRES[1],
    value: 4,
  },
  {
    id: 12,
    empire: EMPIRES[1],
    value: 3,
  },
  {
    id: 13,
    empire: EMPIRES[1],
    value: 3,
  },

  // --- Ottoman (empires[2]) ---
  {
    id: 14,
    empire: EMPIRES[2], // Ottoman (Green)
    value: 6,
    letter: "A"
  },
  {
    id: 15,
    empire: EMPIRES[2],
    value: 5,
    letter: "B"
  },
  {
    id: 16,
    empire: EMPIRES[2],
    value: 5,
    letter: "C"
  },
  {
    id: 17,
    empire: EMPIRES[2],
    value: 4,
  },
  {
    id: 18,
    empire: EMPIRES[2],
    value: 3,
  },
  {
    id: 19,
    empire: EMPIRES[2],
    value: 3,
  },
  {
    id: 20,
    empire: EMPIRES[2],
    value: 3,
  },

  // --- Spain (empires[3]) ---
  {
    id: 21,
    empire: EMPIRES[3], // Spain (White)
    value: 6,
    letter: "A"
  },
  {
    id: 22,
    empire: EMPIRES[3],
    value: 5,
    letter: "B"
  },
  {
    id: 23,
    empire: EMPIRES[3],
    value: 4,
    letter: "C"
  },
  {
    id: 24,
    empire: EMPIRES[3],
    value: 4,
  },
  {
    id: 25,
    empire: EMPIRES[3],
    value: 3,
  },
  {
    id: 26,
    empire: EMPIRES[3],
    value: 3,
  },
  {
    id: 27,
    empire: EMPIRES[3],
    value: 3,
  },

  // --- France (empires[4]) ---
  {
    id: 28,
    empire: EMPIRES[4], // France (Blue)
    value: 5,
    letter: "A"
  },
  {
    id: 29,
    empire: EMPIRES[4],
    value: 5,
    letter: "B"
  },
  {
    id: 30,
    empire: EMPIRES[4],
    value: 4,
    letter: "C"
  },
  {
    id: 31,
    empire: EMPIRES[4],
    value: 4,
  },
  {
    id: 32,
    empire: EMPIRES[4],
    value: 3,
  },
  {
    id: 33,
    empire: EMPIRES[4],
    value: 3,
  },
  {
    id: 34,
    empire: EMPIRES[4],
    value: 3,
  },

  // --- Russia (empires[5]) ---
  {
    id: 35,
    empire: EMPIRES[5], // Russia (Pink)
    value: 5,
    letter: "A"
  },
  {
    id: 36,
    empire: EMPIRES[5],
    value: 4,
    letter: "B"
  },
  {
    id: 37,
    empire: EMPIRES[5],
    value: 4,
    letter: "C"
  },
  {
    id: 38,
    empire: EMPIRES[5],
    value: 4,
  },
  {
    id: 39,
    empire: EMPIRES[5],
    value: 3,
  },
  {
    id: 40,
    empire: EMPIRES[5],
    value: 3,
  },
  {
    id: 41,
    empire: EMPIRES[5],
    value: 3,
  },

  // --- UK (empires[6]) ---
  {
    id: 42,
    empire: EMPIRES[6], // UK (Red)
    value: 4,
    letter: "A"
  },
  {
    id: 43,
    empire: EMPIRES[6],
    value: 4,
    letter: "B"
  },
  {
    id: 44,
    empire: EMPIRES[6],
    value: 4,
    letter: "C"
  },
  {
    id: 45,
    empire: EMPIRES[6],
    value: 4,
  },
  {
    id: 46,
    empire: EMPIRES[6],
    value: 3,
  },
  {
    id: 47,
    empire: EMPIRES[6],
    value: 3,
  },
  {
    id: 48,
    empire: EMPIRES[6],
    value: 3,
  },
]
