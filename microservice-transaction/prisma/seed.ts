import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.transactionType.upsert({
    where: { id: '1' },
    update: {},
    create: { id: '1', code: 'TT1', name: 'Type 1' },
  });

  await prisma.transactionType.upsert({
    where: { id: '2' },
    update: {},
    create: { id: '2', code: 'TT2', name: 'Type 2' },
  });

  await prisma.transaction.upsert({
    where: { id: '1' },
    update: {
      accountExternalIdDebit: 'Guid1',
      accountExternalIdCredit: 'Guid2',
      value: 900.00,
      status: 'pending',
      transferTypeId: '1',
    },
    create: {
      id: '1',
      accountExternalIdDebit: 'Guid1',
      accountExternalIdCredit: 'Guid2',
      value: 900.00,
      status: 'pending',
      transferTypeId: '1',
    },
  });

  await prisma.transaction.upsert({
    where: { id: '2' },
    update: {
      accountExternalIdDebit: 'Guid3',
      accountExternalIdCredit: 'Guid4',
      value: 1500.00,
      status: 'approved',
      transferTypeId: '2',
    },
    create: {
      id: '2',
      accountExternalIdDebit: 'Guid3',
      accountExternalIdCredit: 'Guid4',
      value: 1500.00,
      status: 'approved',
      transferTypeId: '2',
    },
  });

    console.log('Seeding complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
