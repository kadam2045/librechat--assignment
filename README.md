# 📌 LibreChat Contact RAG Assignment

## 🚀 Overview

This project extends LibreChat by integrating a **Contact Management System** with **Retrieval-Augmented Generation (RAG)**.

The goal is to allow the LLM (Gemini) to answer user queries using **custom contact data stored in PostgreSQL**, instead of relying only on its internal knowledge.

---

## 🧠 How It Works (High-Level)

1. User asks a question in chat
2. Backend fetches relevant contacts from PostgreSQL
3. Contacts are formatted into text
4. Contacts are injected into the LLM prompt (`sharedRunContext`)
5. Gemini generates response using injected data

---

## 🏗️ Architecture

- **Frontend:** LibreChat UI
- **Backend:** Node.js (LibreChat server)
- **Database:** PostgreSQL (NeonDB)
- **LLM:** Gemini (Google)
- **RAG Layer:** Custom injection via `sharedRunContext`

---

## ⚙️ Implementation Details

### 1. Contact Storage

Contacts are stored in PostgreSQL:

```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name TEXT,
  company TEXT,
  role TEXT
);
```

---

### 2. Backend Services

Created service:

```text
api/server/services/contactsService.js
```

Functions:

- `getRecentContacts()` → Fetch contacts from DB
- `formatContacts()` → Convert to LLM-readable format

---

### 3. RAG Injection (Core Logic)

File modified:

```text
api/server/controllers/agents/client.js
```

Inside `buildMessages()`:

```js
const contacts = await getRecentContacts();
const formattedContacts = formatContacts(contacts);

sharedRunContextParts.push(`
You MUST answer using ONLY the contacts below.

Contacts:
${formattedContacts}
`);
```

---

### 4. API Endpoints

| Method | Endpoint      | Description  |
| ------ | ------------- | ------------ |
| POST   | /api/contacts | Add contact  |
| GET    | /api/contacts | Get contacts |

---

---

## 🧪 Example

### Input:

```
Who works at Google?
```

### Output:

```
John works at Google.
```

---

## ⚠️ Design Decisions

- Used **sharedRunContext** for injection → clean and scalable
- Avoided deep UI changes → focused on backend clarity
- API-first approach for managing contacts

---

## 🚧 Limitations

- No advanced UI for contacts (API-based management)
- No semantic search (simple DB fetch)
- Limited filtering logic

---

## Future Improvements

- Add vector search (Embeddings)
- Build contact UI in frontend
- Add filtering (company, role, etc.)
- Pagination and search

---

## ▶ Setup Instructions

```bash
git clone <repo>
cd LibreChat
npm install
```

### Environment variables:

```env
MONGO_URI=your_mongo
DATABASE_URL=your_postgres
GOOGLE_KEY=your_api_key
```

### Run:

```bash
npm run backend:dev
cd client && npm run dev
```

---

## Conclusion

Successfully implemented a working **RAG system** inside LibreChat using:

- PostgreSQL for structured data
- Gemini for LLM
- Prompt injection via shared context

The system now answers queries based on **custom database knowledge**.

---
