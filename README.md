# 📘 Book List Vue App

This is a Vue 3-based take-home coding challenge for displaying and adding books using an API. It categorizes books by decade and includes a modal for adding new entries.

## 🚀 Live Demo

> 🔗 [Link to live demo ](https://aldi-books-catalogue.netlify.app/)

## 📦 Tech Stack

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## ✅ Features Implemented

- 📚 Displays books categorized into descending 10-year intervals based on `publishedYear`.
- 🚫 Shows "No publications" for empty decades and merges consecutive empty intervals.
- ➕ Allows adding new books via a modal form with (simple) validation.
- 📝 Validates all required fields; `ratings` field supports an optional empty array.
- 🔄 Updates book list dynamically after successful book addition.
- 📡 Fetches and posts data to the API based on the provided OpenAPI spec.
- 💬 Displays basic error messages on API failure.
- - 💬 Displays  success messages on Successful book entry.

---

🔧 Future Improvements

🧠 Handle years separately (B.C) and clarify Acceptance criterion.

🧪 Refactor the categorizeBooksByDecade function and calculate complexity for it.

🧪 Add form-level validation for number formats and ranges (focus on edge cases).

🧪 Use TDD approach for early requirements clarification and mitigating risks of blockers in future due to ambiguity in acceptance criterion.

🧪 Add unit tests for logic and integration tests for user flow.

🧪 Display Book cards with ratings, pictures and other stuff.

🧪 Improve UI and follow designed guides in tools like Figma etc.


## 🧰 Getting Started

### Prerequisites

- Node.js v10+
- npm

### Installation

```bash
git clone https://github.com/Malik-Naeem-Awan/Aldi_Assignment.git
cd book-list-app
npm install
