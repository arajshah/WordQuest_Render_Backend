require('dotenv').config();
const connectDB = require('../src/config/db');
const Level = require('../src/models/Level');

async function seedLevels() {
  await connectDB();
  const levelsData = [
    {
      levelNumber: 1,
      grid: [
        ['Q', 'U', 'I', 'Z'],
        ['T', 'H', 'E', 'R'],
        ['A', 'B', 'C', 'D'],
        ['E', 'F', 'G', 'H']
      ],
      difficulty: 'easy'
    },
    {
      levelNumber: 2,
      grid: [
        ['Z', 'Y', 'X', 'W'],
        ['V', 'U', 'T', 'S'],
        ['R', 'Q', 'U', 'O'],
        ['M', 'N', 'O', 'P']
      ],
      difficulty: 'medium'
    }
  ];
  
  await Level.deleteMany({});
  await Level.insertMany(levelsData);
  console.log("Story levels seeded!");
  process.exit(0);
}

seedLevels();
