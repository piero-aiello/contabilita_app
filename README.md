# 💰 Personal Accounting

![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

A web application for personal accounting management. Track income, expenses, recurring subscriptions, and savings goals in a simple and intuitive way.

🌍 **Multi-language support:** English and Italian

![App Screenshot](https://via.placeholder.com/800x400?text=App+Screenshot)

---

## ✨ Features

### Transaction Management
- ➕ Record income and expenses with category, date, and description
- 🗂️ Customizable categories (add, edit, delete)
- 🔍 Advanced filters by type, period, and category
- 📊 Automatic summary of filtered transactions

### Balance & Finances
- 💵 Real-time balance display
- 💳 Quick deposits
- ✏️ Manual balance editing

### Recurring Expenses
- 🔄 Manage subscriptions and monthly expenses
- ✅ Monthly status tracking (paid/pending)
- 📅 Quick add to monthly expenses

### Wishlist
- 🎯 Create savings goals
- 💰 Partial payments with progress tracking
- ↩️ Automatic refund on deletion

### Security & Backup
- 🔐 Password protection
- 📤 Export data in JSON format
- 📥 Import data from backup
- 💾 Automatic save to localStorage

### Internationalization
- 🌍 English and Italian support
- 🔄 Language toggle in header
- 💾 Language preference saved locally

---

## 🚀 Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/piero-aiello/contabilita_app.git

# Enter the directory
cd contabilita_app

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and set your REACT_APP_ADMIN_CODE

# Start in development mode
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
```

Optimized files will be in the `build/` folder.

---

## 📁 Project Structure

```
src/
├── App.js                     # Main component and state management
├── App.css                    # Global styles
├── i18n/
│   ├── LanguageContext.js     # Language context and provider
│   └── translations.js        # EN/IT translations
├── components/
│   ├── Header.js              # Navbar, balance, import/export
│   ├── Login.js               # Authentication
│   ├── PasswordSetup.js       # Initial password setup
│   ├── PasswordReset.js       # Password reset
│   ├── TransactionForm.js     # New transaction form
│   ├── TransactionList.js     # Transactions table
│   ├── TransactionSummary.js  # Income/expenses summary
│   ├── FilterControls.js      # Filter controls
│   ├── CategoryManagementModal.js  # Category management
│   ├── RecurringExpenses.js   # Recurring expenses
│   ├── WishList.js            # Wishlist
│   ├── WishItem.js            # Single wish item
│   ├── AddWishForm.js         # New wish form
│   └── AddPaymentForm.js      # Payment form
└── index.js                   # Entry point
```

---

## 🛠️ Tech Stack

| Technology | Version | Usage |
|------------|---------|-------|
| React | 19.1 | UI Framework |
| React-Bootstrap | 2.10 | UI Components |
| Bootstrap | 5.3 | Styling |
| localStorage | - | Data persistence |

---

## 💾 Storage

Data is saved in the browser's `localStorage`:

| Key | Content |
|-----|---------|
| `contabilita-balance` | Current balance |
| `contabilita-transactions` | Transactions array |
| `contabilita-expense-categories` | Expense categories |
| `contabilita-income-categories` | Income categories |
| `contabilita-recurring-expenses` | Recurring expenses |
| `contabilita-wishes` | Wishlist |
| `contabilita-language` | Selected language (en/it) |

---

## 🔐 First Access

On first launch, you'll be asked to set a password. This will be saved locally in the browser.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start in development mode |
| `npm run build` | Production build |
| `npm test` | Run tests |
| `./start.sh` | Start the app (macOS) |
| `./stop.sh` | Stop the app (macOS) |

---

## 🔧 Environment Variables

Create a `.env` file from `.env.example`:

| Variable | Description |
|----------|-------------|
| `REACT_APP_ADMIN_CODE` | Admin code for password reset |

---

## 📄 License

This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Piero Aiello**

---

<p align="center">
  Made with ❤️ and React
</p>
