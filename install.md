# ⚙️ Installation et Configuration de Renote

Ce document détaille les différentes méthodes pour installer et lancer le projet **Renote** sur votre machine locale. Vous pouvez choisir d'utiliser l'environnement natif avec **Laravel Herd** (recommandé sur Mac) ou l'environnement conteneurisé avec **Docker et Laravel Sail**.

---

## 🚀 Option 1 : Installation native avec Laravel Herd (Recommandée)

[Laravel Herd](https://herd.laravel.com/) est un environnement de développement ultra-rapide pour macOS et Windows. Il installe automatiquement PHP et Composer.

### Prérequis
- [Télécharger et installer Laravel Herd](https://herd.laravel.com/)
- [Installer Node.js (v22 ou +)](https://nodejs.org/) (ou via gestionnaire comme nvm)

### Étapes d'installation

1. **Cloner le projet** et se placer dans le dossier :
   ```bash
   git clone <url-du-repo> renote
   cd renote
   ```

2. **Installer les dépendances PHP et Node** :
   ```bash
   composer install
   npm install
   ```

3. **Configurer l'environnement** :
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *(Par défaut dans le `.env.example`, la connexion `sqlite` est utilisée, donc aucune configuration de base de données complexe n'est requise).*

4. **Créer la base de données locale (SQLite) et migrer** :
   ```bash
   touch database/database.sqlite
   php artisan migrate --seed
   ```

5. **Compiler le Front-end (React/Vite)** :
   ```bash
   npm run dev
   ```

6. **Accéder à l'application** :  
   Dans l'interface de Herd, vous pouvez lier le dossier et y accéder via `http://renote.test`. Sinon, vous pouvez exécuter `php artisan serve` et ouvrir `http://localhost:8000`.

---

## 🐳 Option 2 : Installation via Docker & Laravel Sail

Si vous préférez utiliser Docker pour isoler l'environnement complet (serveur web, MySQL, etc.), le projet est déjà préparé pour exploiter **Laravel Sail**.

### Prérequis
- [Installer Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Étapes d'installation

1. **Cloner le projet** :
   ```bash
   git clone <url-du-repo> renote
   cd renote
   ```

2. **Copier le fichier d'environnement et l'ajuster** :
   ```bash
   cp .env.example .env
   ```
   🚨 *Important : Assurez-vous que les variables de base de données dans votre nouveau fichier `.env` sont configurées pour Sail (ex: `DB_CONNECTION=mysql`, `DB_HOST=mysql`, `DB_USERNAME=sail`, `DB_PASSWORD=password`, etc.) AVANT de lancer Docker pour la première fois.*

3. **Installer les dépendances PHP via un conteneur éphémère** (Si vous n'avez pas Composer localement) :
   ```bash
   docker run --rm \
       -u "$(id -u):$(id -g)" \
       -v "$(pwd):/var/www/html" \
       -w /var/www/html \
       laravelsail/php84-composer:latest \
       composer install --ignore-platform-reqs
   ```

4. **Démarrer les conteneurs Sail** :
   ```bash
   ./vendor/bin/sail up -d
   ```

5. **Générer la clé d'application et exécuter les migrations** :
   ```bash
   ./vendor/bin/sail artisan key:generate
   ./vendor/bin/sail artisan migrate --seed
   ```

6. **Installer et lancer Vite pour le Front-end** :
   ```bash
   ./vendor/bin/sail npm install
   ./vendor/bin/sail npm run dev
   ```

7. **Accéder à l'application** :  
   Ouvrez votre navigateur sur l'adresse **[http://localhost:8001](http://localhost:8001)** (ou l'URL exposée par votre `docker-compose.yml`).

---

## 🛠 Résolution des erreurs fréquentes (Troubleshooting)

### Erreur : `Base table or view not found: 1146 Table 'laravel.sessions' doesn't exist`
**Cause :** La base de données MySQL est lancée, mais elle est totalement vide. Vous avez oublié de lancer les migrations pour créer la structure des tables.
**Solution :**
```bash
./vendor/bin/sail artisan migrate
```

### Erreur : `SQLSTATE[HY000] [1045] Access denied for user...` au lancement des migrations
**Cause :** Vous avez modifié les identifiants de connexion MySQL dans `.env` (ex: `DB_USERNAME=noteuser`) **après** le premier lancement initial de Docker. Le conteneur MySQL a donc été créé et mémorisé avec les anciens identifiants, créant une désynchronisation.
**Solution :** Détruire le volume erroné et recréer la base de données.
```bash
# 1. Détruire les conteneurs et supprimer les données sauvegardées (le volume -v)
./vendor/bin/sail down -v

# 2. Relancer les conteneurs (ils liront votre .env actuel pour sécuriser le nouveau conteneur)
./vendor/bin/sail up -d

# 3. Patienter quelques secondes et exécuter les migrations
./vendor/bin/sail artisan migrate --seed
```

### Le frontend s'affiche mais semble cassé ou n'a aucun style
**Cause :** Le serveur Vite qui compile le CSS (via Tailwind) et le React n'est pas lancé.
**Solution :** Assurez-vous d'avoir bien laissé tourner la commande suivante en continu dans un onglet séparé :
```bash
# Si l'installation native
npm run dev

# Si vous êtes sous Docker (Sail)
./vendor/bin/sail npm run dev
```

---
[👉 Retour à l'accueil (README.md)](./README.md)
