import { PrismaClient } from '../src/generated/prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    const password1 = await bcrypt.hash('password123', 10);
    const password2 = await bcrypt.hash('password123', 10);

    const user1 = await prisma.user.upsert({
      where: { email: 'alice@example.com' },
      update: {},
      create: {
        name: 'Alice Chains',
        email: 'alice@example.com',
        password: password1,
      },
    });

    const user2 = await prisma.user.upsert({
      where: { email: 'Liam@example.com' },
      update: {},
      create: {
        name: 'Liam Gallagher',
        email: 'Liam@example.com',
        password: password2,
      },
    });

    await prisma.event.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'Tech Conference 2026',
        description: 'Annual technology conference',
        date: new Date('2026-04-15T10:00:00'),
        location: 'Kyiv, Ukraine',
        capacity: 100,
        visibility: 'public',
        organizerId: user1.id,
      },
    });

    await prisma.event.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'React Workshop',
        description: 'Hands-on workshop for React developers',
        date: new Date('2026-04-20T14:00:00'),
        location: 'Zurich, Switzerland',
        capacity: 30,
        visibility: 'public',
        organizerId: user2.id,
      },
    });

    await prisma.event.upsert({
      where: { id: 3 },
      update: {},
      create: {
        title: 'Node.js Meetup',
        description: 'Monthly Node.js community meetup',
        date: new Date('2026-04-25T18:00:00'),
        location: 'Online',
        capacity: 50,
        visibility: 'public',
        organizerId: user1.id,
      },
    });

    console.log('✅ Seeding completed!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1); 
  } finally {
    await prisma.$disconnect();
  }
}

main();