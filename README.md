# Express Esimed

## TP n°1

### First steps

- Fichier de configuration de l'app
- Fichier dédié à la DB (table "user" avec : id, firstName, lastName, password)
- Fichier dédié à l'intéraction avec la DB
- Route pour récupérer tous les "user"
- Route pour récupérer un "user" via son firstName
- Route pour créer un "user"
- Route pour modifier un "user"
- Route pour supprimer un "user"
- Les routes créées doivent retourner le bon code HTTP et doivent utiliser le bon verbe HTTP
- Ajouter un fichier `.gitignore` à la racine de votre projet pour faire en sorte de ne pas pousser les `node_modules` ainsi que le répertoire `.idea`
- Si les `node_modules` avaient déjà été poussé sur le repository, trouver la commande git qui permettra de supprimer ce répertoire seulement sur le dépôt GitHub et non en local

### Optional steps

- Créez toutes vos routes dans un autre fichier, de façon à sortir cette logique du fichier index.js => [Express Doc](https://expressjs.com/fr/guide/routing.html)
- Encrypter en md5 le password de l'utilisateur
- Logger chaque requête avec: Date, IP de l'appelant, durée de la requête, verbe + route HTTP
- Pour la gestion des dates, vous pouvez utiliser la librairie de votre choix disponible sur npm (a condition qu'elle vous semble viable)
- Pour l'insertion des utilisateurs, et plus particulièrement leur identifiant "id", il faut un uuid et non un entier qui va être auto increment
- Middleware pour la gestion des erreurs

## TP n°2

### First steps

> Pour vérifier le fonctionnement de vos JWT, il faudra bien entendu faire les appels de vos routes, en passant le header correspondant (que vous trouverez dans la doc de la lib ci-dessous)

- Installer les librairies `express-jwt` et `bcryptjs`
- Créer un middleware dédié au `jwt` comme indiqué dans la doc de la librairie
- Modifier la route de création d'un utilisateur
  - Au lieu d'encrypter le mot de passe en `md5`, l'encrypter en `bcrypt` avec un `salt` de 12 (cf doc de la lib)
- Créer une route d'authentification: `/login`
  - Body de la request: firstName, password
  - Aller chercher dans les utilisateurs, celui dont le firstName correspond à celui dans le body de la request
  - En fonction de l'utilisateur récupéré, comparé le password qu'il avait en base (encrypté) avec celui qui est dans le body de la request
  - Si les passwords ne matchent pas => Réponse 401 Unauthorized
  - Si les password matchent, on créé et retourne un jwt
- Enfin, rendez les routes de MODIFICATION et de SUPPRESSION d'utilisateurs accessibles UNIQUEMENT aux utilisateurs authentifiés grâce à un JWT valide

### Optional steps

- Étant donné la requête par `firstName` de la route `/login`, faites en sorte que dans la table des utilisateurs, on ne puisse pas avoir 2 fois un utilisateur avec le même `firstName`
- Rajoutez une information `roles` dans la table des utilisateurs, qui sera un tableau de string
- 2 rôles existeront au sein de l'aplication: ADMIN / MEMBER
- Pour les routes suivants, définissez les accès comme suit:
  - `/login` => tout le monde à le droit
  - `GET /users` & `GET /users/:id` => les utilisateurs ayant les rôles ADMIN / MEMBER ont le droit
  - `POST /users` & `PUT /users/:id` & `DELETE /users/:id` => seulent les ADMIN ont le droit
- Gérez en conséquence les retours d'erreurs de façon à avoir des erreurs compréhensibles pour ceux qui utiliseront les API de votre back-end
