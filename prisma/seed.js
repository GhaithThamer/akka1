const { PrismaClient } = require('@prisma/client');
const rows = require('./aaa.json');
const prisma = new PrismaClient();

async function main() {
    for (const row of rows) {
        await prisma.container.create(
            { data: row, }
        );
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

    //node prisma/seed

    //npx prisma db push

    // npx prisma generate
