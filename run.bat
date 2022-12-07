start cmd /k "cd public & npm install & npm run dev"
cd aws
cd lambdas
call npm install
cd ..
cd ..
call npm install
call npm run build
call npm run start