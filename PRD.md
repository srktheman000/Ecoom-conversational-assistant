# 📘 Product Requirements Document (PRD)

**Project Name**: RevisionLLM

---

## 🎯 Purpose

To build an AI-driven educational assistant for students (grades 6–10) to learn subjects like History, Geography, Science, etc., through conversational interfaces using advanced LLMs, powered with multimedia components (quizzes, MCQs, timelines, etc.), and backed by vector-based knowledge retrieval.

---

## 🧩 Key Features

### 1. **Authentication Module**

- **Login Page**
  - Email/password login.
  - “Remember me” checkbox.
  - “Forgot password?” link.
  - Redirect to the home screen upon successful login.
- **Signup Page**
  - Create account form with email, password, grade selection.
  - On successful signup, auto-login and redirect to subject selection page.

### 2. **Home Dashboard (Subject Selection)**

- Tile-style layout for subjects.
- Filter or tab system to choose between:
  - Grade 6, 7, 8, 9, 10.
- Subject Tiles:
  - Title (e.g., History).
  - Grade badge (e.g., "6th").
  - Subject image.
  - Chapter count.
  - Short subject description.
  - “Start Learning” button.
- On clicking a tile, navigate to subject-specific **chat workspace**.

### 3. **Chat Workspace (Conversational AI)**

- Sidebar:
  - List of previous chat sessions.
  - "New Chat" button.
- Main Chat Area:
  - Displays current subject name and grade.
  - Chat messages between student and AI.
  - Support for rendering:
    - Quizzes (multiple choice).
    - Summary cards.
    - Interactive timelines.
    - Images and diagrams.
- AI should use appropriate vector context for each subject + grade.
- All messages and components returned by AI should be persistently stored.

### 4. **LLM-Driven Features**

- Retrieval-Augmented Generation (RAG) using:
  - **OpenAI LLM** for response generation.
  - **Vector Store** to fetch contextual info.
- Response types:
  - Text answer.
  - JSON-renderable component for UI (e.g., `<Quiz />, <SummaryCard />, etc.`)

---

## ⚙️ Technical Architecture

### 📚 Frontend

- **Framework**: Next.js + TailwindCSS
- **State Management**: Zustand or Context API
- **Routing**: App Router (Next.js 13+)
- **Auth**: NextAuth.js

### 🧠 AI Backend

- **LLM Provider**: OpenAI GPT-4 or GPT-3.5
- **Embedding**: `text-embedding-ada-002`
- **Vector Store**:

````markdown
### Vector Store

- **Provider**: openai vector store
- **Integration Example**:
  ```javascript
  const results = await openai.vectorStores.search(
    VECTOR_STORE_ID, // First argument: vectorStoreId
    {
      query: enhancedSearchPhrase, // Second argument: body
      max_num_results: 5
    }
  )
  ```
  ```link
  [OpenAI Vector Store API Documentation](https://platform.openai.com/docs/api-reference/vector-stores-files/createFile)
  ```
- **Purpose**:

  - Store and retrieve vector embeddings for subject content.
  - Enable efficient similarity search for context retrieval.

  ```

  ```

- **Knowledge Chunking**:
  - subject details of all filed uploaded in a store

### 🗃️ Database

- **MongoDB (via Mongoose)**
- Collections:
  - `users`: Auth + profile info.
  - `subjects`: Metadata, chapters, description.
  - `chats`: Chat sessions per user.
  - `messages`: Messages per chat session.
  - `vectors`: Embedded subject content (if not using external vector DB).

---

## 🧱 API Endpoints

### 🔐 Auth

- `POST /api/auth/login`
- `POST /api/auth/signup`
- `POST /api/auth/logout`
- `GET /api/auth/session`

### 📚 Subjects

- `GET /api/subjects?grade=6`
- `GET /api/subjects/:id`

### 💬 Chat

- `POST /api/chat/start`
- `POST /api/chat/:chatId/message`
- `GET /api/chat/:chatId/messages`
- `GET /api/chat/sessions`

---

## 🖼️ UI Components (Based on Screenshots)

### Auth Page

- Dark theme form layout.
- Inputs: Email, Password.
- CTA: Sign in, Sign up link.

### Home Page

- Grade selection tabs.
- Subject tiles in responsive grid.
- “Start Learning” launches the chat UI with subject context.

### Chat UI

- Sidebar for session management.
- Chat display area.
- Bottom input bar for interaction.
- AI responses can include:
  - `<QuizComponent />`
  - `<SummaryCard />`
  - `<Timeline />`
  - `<Image />` (Optional)

---

- Login → Subject select → Chat flow.
- Chat message → response rendering (text + component).

## <!--

## 📈 Future Enhancements

- Teacher/Admin dashboard.
- Gamification with points for each interaction.
- Leaderboards.
- AI feedback/clarification feature.
- Voice input & text-to-speech output. -->
````
