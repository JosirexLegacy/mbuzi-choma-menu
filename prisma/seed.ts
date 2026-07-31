import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  const grilled = await db.category.create({
    data: { name: 'Grilled Specialties', order: 1 },
  })
  const sides = await db.category.create({
    data: { name: 'Sides', order: 2 },
  })
  const drinks = await db.category.create({
    data: { name: 'Drinks', order: 3 },
  })

  await db.menuItem.createMany({
    data: [
      {
        name: 'Mbuzi Choma',
        description: 'Slow-grilled goat, marinated overnight, served with a smoky pepper sauce.',
        price: 30000,
        categoryId: grilled.id,
      },
      {
        name: 'Grilled Tilapia',
        description: 'Whole tilapia grilled over charcoal, finished with lemon and herbs.',
        price: 35000,
        categoryId: grilled.id,
      },
      {
        name: 'Chicken Skewers',
        description: 'Char-grilled chicken skewers with a light chili glaze.',
        price: 25000,
        categoryId: grilled.id,
      },
      {
        name: 'Kachumbari',
        description: 'Fresh tomato, onion, and coriander salad.',
        price: 8000,
        categoryId: sides.id,
      },
      {
        name: 'Chips',
        description: 'Hand-cut fries, crisped to order.',
        price: 10000,
        categoryId: sides.id,
      },
      {
        name: 'Ugali',
        description: 'Traditional maize meal, steamed and firm.',
        price: 5000,
        categoryId: sides.id,
      },
      {
        name: 'Stoney Tangawizi',
        description: 'Classic ginger soda, ice cold.',
        price: 4000,
        categoryId: drinks.id,
      },
      {
        name: 'Fresh Passion Juice',
        description: 'Locally sourced passion fruit, no added sugar.',
        price: 7000,
        categoryId: drinks.id,
      },
    ],
  })

  console.log('Seed complete.')
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())