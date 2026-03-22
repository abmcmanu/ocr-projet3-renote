# Renote — Documentation API

API REST de l'application Renote, construite avec Laravel 12 et authentifiée via Laravel Sanctum.

**Base URL** : `http://localhost:8000/api`

---

## Authentification

L'API utilise des tokens Bearer (Laravel Sanctum). Après connexion, inclure le token dans toutes les requêtes protégées :

```
Authorization: Bearer <token>
```

---

## Endpoints

### POST /api/auth/login

Connexion d'un utilisateur existant. Retourne un token Sanctum.

**Accès** : Public

**Corps de la requête (JSON)**

| Champ    | Type   | Requis | Description              |
|----------|--------|--------|--------------------------|
| email    | string | Oui    | Adresse email            |
| password | string | Oui    | Mot de passe             |

**Exemple de requête**

```json
{
  "email": "user@example.com",
  "password": "motdepasse"
}
```

**Réponse 200 — Succès**

```json
{
  "status": "success",
  "message": "Connexion réussie.",
  "data": {
    "user": {
      "id": 1,
      "name": "Jean Dupont",
      "email": "user@example.com",
      "created_at": "2026-03-01T10:00:00.000000Z",
      "updated_at": "2026-03-01T10:00:00.000000Z"
    },
    "token": "1|abc123xyz..."
  }
}
```

**Réponse 422 — Identifiants invalides**

```json
{
  "message": "Les identifiants sont incorrects.",
  "errors": {
    "email": ["Les identifiants sont incorrects."]
  }
}
```

---

### GET /api/notes

Liste toutes les notes de l'utilisateur authentifié, triées de la plus récente à la plus ancienne. Chaque note inclut son tag associé.

**Accès** : Protégé (Bearer token requis)

**Réponse 200 — Succès**

```json
{
  "status": "success",
  "message": "Notes récupérées.",
  "data": [
    {
      "id": 3,
      "text": "Revoir les bases de Docker",
      "tag": {
        "id": 2,
        "name": "DevOps",
        "created_at": "2026-03-10T08:00:00.000000Z"
      },
      "created_at": "2026-03-22T14:30:00.000000Z",
      "updated_at": "2026-03-22T14:30:00.000000Z"
    },
    {
      "id": 1,
      "text": "Lire la doc Laravel",
      "tag": {
        "id": 1,
        "name": "Backend",
        "created_at": "2026-03-01T08:00:00.000000Z"
      },
      "created_at": "2026-03-01T09:00:00.000000Z",
      "updated_at": "2026-03-01T09:00:00.000000Z"
    }
  ]
}
```

**Réponse 401 — Non authentifié**

```json
{
  "message": "Unauthenticated."
}
```

---

### POST /api/notes

Crée une nouvelle note pour l'utilisateur authentifié.

**Accès** : Protégé (Bearer token requis)

**Corps de la requête (JSON)**

| Champ  | Type    | Requis | Contraintes                           |
|--------|---------|--------|---------------------------------------|
| tag_id | integer | Oui    | Doit exister dans la table `tags`     |
| text   | string  | Oui    | Contenu de la note                    |

**Exemple de requête**

```json
{
  "tag_id": 1,
  "text": "Étudier les middlewares Laravel"
}
```

**Réponse 201 — Note créée**

```json
{
  "status": "success",
  "message": "Note créée.",
  "data": {
    "id": 4,
    "text": "Étudier les middlewares Laravel",
    "tag": {
      "id": 1,
      "name": "Backend",
      "created_at": "2026-03-01T08:00:00.000000Z"
    },
    "created_at": "2026-03-22T15:00:00.000000Z",
    "updated_at": "2026-03-22T15:00:00.000000Z"
  }
}
```

**Réponse 422 — Validation échouée**

```json
{
  "message": "The tag_id field is required.",
  "errors": {
    "tag_id": ["The tag_id field is required."],
    "text": ["The text field is required."]
  }
}
```

---

### DELETE /api/notes/{id}

Supprime la note identifiée par `{id}`. L'utilisateur doit en être le propriétaire.

**Accès** : Protégé (Bearer token requis)

**Paramètre d'URL**

| Paramètre | Type    | Description         |
|-----------|---------|---------------------|
| id        | integer | Identifiant de la note |

**Réponse 200 — Note supprimée**

```json
{
  "status": "success",
  "message": "Note supprimée.",
  "data": null
}
```

**Réponse 403 — Non autorisé (note appartenant à un autre utilisateur)**

```json
{
  "message": "Cette note ne vous appartient pas."
}
```

**Réponse 404 — Note introuvable**

```json
{
  "message": "No query results for model [App\\Models\\Note] 99"
}
```

---

### GET /api/tags

Liste tous les tags de l'utilisateur authentifié, triés du plus récent au plus ancien.

**Accès** : Protégé (Bearer token requis)

**Réponse 200 — Succès**

```json
{
  "status": "success",
  "message": "Tags récupérés.",
  "data": [
    {
      "id": 2,
      "name": "DevOps",
      "created_at": "2026-03-10T08:00:00.000000Z"
    },
    {
      "id": 1,
      "name": "Backend",
      "created_at": "2026-03-01T08:00:00.000000Z"
    }
  ]
}
```

---

## Codes de statut HTTP

| Code | Signification                              |
|------|--------------------------------------------|
| 200  | Succès                                     |
| 201  | Ressource créée                            |
| 401  | Non authentifié (token manquant ou invalide) |
| 403  | Accès refusé (ressource appartenant à un autre utilisateur) |
| 404  | Ressource introuvable                      |
| 422  | Données invalides (erreur de validation)   |

---

## Format de réponse standard

Toutes les réponses respectent la structure suivante :

```json
{
  "status": "success | error",
  "message": "Description lisible du résultat",
  "data": null
}
```