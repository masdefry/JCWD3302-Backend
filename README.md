Hello, Students! 👋

⌨️ How to Setup Express Typescript?

        1. Create New Directory for Express Typescript Projects

        2. Inside New Directory, Execute this Command:

                npm init --yes

        3. Install Express Typescript

                npm i express @types/express @types/node

                npm i -D typescript concurrently nodemon

        4. Initiate Typescript Configuration

                npx tsc --init
  
        5. Edit `tsconfig.json`:
                
                - Uncomment rootDir:  "rootDir": "./src"
                
                - Uncomment outDir:   "outDir": "./dist"
        
        6. Replace Property `scripts` on `package.json` with this Code:
    
                "scripts": {
                        "build": "npx tsc",
                        "start": "node dist/index.js",
                        "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
                },

        7. Running Express Typescript Projects
  
                npm run dev