A faire à la récupération du projet :

npm install
Créer une base de données MySQL => dev_fullstack_1
Copier-coller script.sql pour créer les tables dans la bdd une fois créée

Commande effectuées pour installer les différentes dépendances utilisées durant le projet :

npm init -y
npm install express mysql2 dotenv bcrypt cors helmet
npm install jsonwebtoken

/* Tests unitaires */
npm install --save-dev jest
npm install --save-dev jest@latest
npm install --save-dev babel-jest @babel/preset-env

/* Tests End-To-End */
npm install --save-dev supertest

Commande à exécuter pour démarrer le serveur backend :

node src/server.js

Commande à exécuter pour lancer les tests :

npm test
