Hello, Students! 👋

🧑‍💻 How to Setup Express Typescript & RDBMS (MySql/Postgresql)?

        1. Create New Directory for ExpressTS Projects

        2. Inside New Directory, Execute this Command:

                ➡️ npm init --yes

        3. Install Express Typescript & RDBMS (MySql/Postgresql)

                mysql           ➡️      npm i express mysql2 @types/express @types/node

                                        npm i -D typescript ts-node nodemon

                posgresql       ➡️      npm i express pg @types/express @types/node

                                        npm i -D typescript ts-node nodemon

                                        npm i @types/pg --save-dev

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
