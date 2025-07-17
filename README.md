Hello, Students! 👋

🧑‍💻 How to Setup Express Typescript?

        1. Create New Directory for ExpressTS Projects

        2. Inside New Directory, Execute this Command:

                ➡️ npm init --yes

        3. Install Express Typescript

                ➡️ npm i express @types/express @types/node

                ➡️ npm i -D typescript ts-node nodemon

        4. Initiate Typescript Configuration

                ➡️ npx tsc --init

        5. Edit `tsconfig.json`:

                ▪️Uncomment rootDir:  "rootDir": "./src"

                ▪️Uncomment outDir:   "outDir": "./dist"

        6. Replace Property `scripts` on `package.json` with this Code:

                "scripts": {
                        "dev": "nodemon",
                        "build": "tsc",
                        "start": "node dist/index.js",
                }

        7. Create New File with Name `nodemon.json` and Add this Configuration:

                {
                    "watch": ["src"],
                    "ext": "ts",
                    "ignore": ["dist"],
                    "exec": "ts-node src/index.ts"
                }

        8. Running Express Typescript Projects

                ➡️ npm run dev

🧑‍💻 How to Setup Prisma ORM (Using Javascript or Typescript)?

        1. Install Package(s)

                ➡️ npm install prisma --save-dev

                ➡️ npx prisma init --datasource-provider mysql

        2. Edit `DATABASE_URL` on File `.env`

                DATABASE_URL="mysql://root:abc12345@localhost:3306/day08_prisma"

        3. Create Model Inside `prisma > schema.prisma`:

                model User {
                        id        String        @id @default(cuid())
                        email     String        @unique
                        name      String
                        password   String

                        user_addresses UserAddress[]

                        createdAt   DateTime  @default(now())
                        updatedAt   DateTime  @updatedAt
                        deletedAt   DateTime?

                        @@map("users")
                }

                model UserAddress{
                        id        Int     @id @default(autoincrement())
                        consignee String
                        address   String

                        userId    String @unique
                        users User @relation(fields: [userId], references: [id])

                        createdAt   DateTime  @default(now())
                        updatedAt   DateTime  @updatedAt
                        deletedAt   DateTime?

                        @@map("user_addresses")
                }

        4. Migration Models

                ➡️ npx prisma migrate dev --name init

        5. Setup Seeders

                ▪️Create `seed.ts` on `prisma` directory

                ▪️Add this code on `package.json`:

                        "prisma": {
                                "seed": "node prisma/seed.ts"
                        }

                ▪️After that, execute this command:

                        ➡️ npx prisma db seed

        6. Formatting `schema.prisma` Scripts

                ➡️ npx prisma format

                ___ or ___

                ➡️ prisma format

        7. Reset Database Seeding
                ▪️Step-01

                        ➡️ npx prisma db push --force-reset

                ▪️Step-02

                        ➡️ npx prisma db push
