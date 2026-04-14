# Projet 3 : Transformez l'architecture d'une application existante

Bienvenue dans le dépôt du projet 3  du parcours **Architecte Logiciel**. 

# Plot

Renote is an application that allows user to take and store notes.
In renote, a user can:
- create notes
- visualize notes
- define relationship between the notes
- define tags
- and associate a tag to a note.

## Mission

L’objectif a été de la faire évoluer afin de supporter également les appareils mobiles.
Concrètement, cela implique :
● de séparer le back-end du front-end
● et d’introduire une API, qui pourrait être utilisée non seulement par plusieurs interfaces (web et mobiles), mais aussi, potentiellement, par des services externes.

## Présentation de l’existant, analyse et premier essaie de l’architecture cible

![Schéma de l'application Full Stack](https://raw.githubusercontent.com/abmcmanu/ocr-projet3-renote/main/public/archi-overview.png)
> *Figure 1 : Aperçu de l'architecture existante et évolution cible.*

## Présentation de l’architecture cible

![Schéma de l'application Full Stack](https://raw.githubusercontent.com/abmcmanu/ocr-projet3-renote/main/public/archi-cible.png)
> *Figure 2 : Aperçu de l'architecture cible.*

## ⚙️ Installation et Configuration

Pour mettre en place l'environnement de développement et lancer le projet localement, veuillez suivre les instructions détaillées dans le fichier suivant :

👉 **[Consulter le guide d'installation (install.md)](./install.md)**

## 📖 Documentation de l'API

Pour consulter la documentation complète de l'API REST (spécifications, modèles, structure des réponses et des requêtes) :

👉 **[Consulter la documentation REST (API_README.md)](./API_README.md)**

Le schéma OpenAPI standard est également disponible pour intégration (avec Swagger ou Postman par exemple) :

👉 **[Voir le fichier OpenAPI (openapi.yaml)](./openapi.yaml)**
