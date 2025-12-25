export const translations = {
  en: {
    // Header
    appName: 'Personal Accounting',
    currentBalance: 'Current Balance',
    deposit: 'Deposit',
    editBalance: 'Edit Balance',
    exportJson: 'Export JSON',
    importJson: 'Import JSON',
    logout: 'Logout',
    manageCategories: 'Manage Categories',
    
    // Deposit Modal
    makeDeposit: 'Make a Deposit',
    amountToDeposit: 'Amount to deposit',
    confirm: 'Confirm',
    cancel: 'Cancel',
    
    // Edit Balance Modal
    editBalanceTitle: 'Edit Balance',
    newBalance: 'New balance',
    set: 'Set',
    
    // Transaction Form
    addNewTransaction: 'Add New Transaction',
    type: 'Type',
    expense: 'Expense',
    income: 'Income',
    category: 'Category',
    amount: 'Amount',
    date: 'Date',
    description: 'Description',
    add: 'Add',
    addNewCategory: 'Add New Category',
    newCategoryFor: 'New category name for',
    saveCategory: 'Save Category',
    fillAllFields: 'Please fill in all fields.',
    
    // Transaction List
    transactionHistory: 'Transaction History',
    actions: 'Actions',
    delete: 'Delete',
    noTransactions: 'No transactions found.',
    confirmDeleteTransaction: 'Are you sure you want to delete this transaction?',
    
    // Transaction Summary
    filteredSummary: 'Filtered Transactions Summary',
    totalExpenses: 'Total Expenses',
    totalIncome: 'Total Income',
    
    // Filter Controls
    filters: 'Filters',
    filterByType: 'Filter by Type',
    all: 'All',
    expensesOnly: 'Expenses Only',
    incomeOnly: 'Income Only',
    filterByCategory: 'Filter by Category',
    allCategories: 'All categories',
    filterByPeriod: 'Filter by Period',
    allTime: 'All Time',
    currentMonth: 'Current Month',
    customRange: 'Custom Range',
    from: 'From',
    to: 'To',
    
    // Category Management
    categoryManagement: 'Category Management',
    allCategoriesTitle: 'All Categories',
    edit: 'Edit',
    save: 'Save',
    close: 'Close',
    noCategoriesFound: 'No categories found.',
    confirmDeleteCategory: "Are you sure you want to delete the category '{category}'? All transactions with this category will remain unchanged.",
    categoryExists: "The category '{category}' already exists.",
    
    // Recurring Expenses
    recurringExpenses: 'Recurring Expenses',
    noRecurringExpenses: 'No recurring expenses configured.',
    addSubscriptions: 'Add subscriptions, bills, or other monthly expenses.',
    addedThisMonth: 'Added this month',
    alreadyAddedThisMonth: 'Already added this month',
    addToExpenses: 'Add to expenses',
    createdOn: 'Created on',
    addRecurringExpense: 'Add Recurring Expense',
    editRecurringExpense: 'Edit Recurring Expense',
    title: 'Title',
    descriptionOptional: 'Description (optional)',
    saveChanges: 'Save Changes',
    enterValidTitleAmount: 'Please enter a valid title and amount',
    confirmDeleteRecurring: 'Are you sure you want to delete "{title}"?',
    insufficientBalance: 'Insufficient balance to add this expense.',
    billingDateInfo: 'Use this field to add useful info like billing date',
    
    // Wishlist
    wishlist: 'Wishlist',
    noWishesYet: "You haven't added any wishes yet.",
    addNewWish: 'Add New Wish',
    newWish: 'New Wish',
    name: 'Name',
    price: 'Price',
    linkOptional: 'Link (optional)',
    desireLevel: 'Desire Level',
    currentLevel: 'Current level',
    addWish: 'Add Wish',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    veryHigh: 'Very High',
    essential: 'Essential',
    enterWishName: 'Please enter a wish name',
    enterValidPrice: 'Please enter a valid price',
    
    // Wish Item
    targetPrice: 'Target price',
    paid: 'Paid',
    remaining: 'Remaining',
    completed: 'completed',
    completedBadge: 'Completed!',
    viewProduct: 'View Product',
    recentPayments: 'Recent payments',
    andMorePayments: 'and {count} more payments',
    addPayment: 'Add Payment',
    confirmDeleteWish: 'You are about to delete "{name}".\n\nYou have paid €{amount} for this wish.\n\nChoose an option:\n- OK: Delete AND refund the paid amount to balance\n- Cancel: Don\'t delete',
    confirmDeleteWishSimple: 'Are you sure you want to delete "{name}"?',
    confirmDeletePayment: 'Do you want to delete the payment of €{amount} from {date}?\n\nThe amount will be refunded to your balance.',
    paymentFor: 'Payment for',
    refundForDeletion: 'Refund for deletion',
    paymentRefund: 'Payment refund',
    insufficientBalancePayment: 'Insufficient balance for this payment.',
    
    // Add Payment Form
    paymentAmount: 'Payment amount',
    quickPayments: 'Quick payments',
    pay: 'Pay',
    max: 'Max',
    enterValidAmount: 'Please enter a valid amount',
    amountCannotExceed: "Amount cannot exceed €{max} (remaining to complete the goal)",
    
    // Login
    protectedAccess: 'Protected Access',
    password: 'Password',
    enterPassword: 'Enter password',
    login: 'Login',
    resetPassword: 'Reset Password',
    forAdmins: 'For authorized administrators',
    wrongPassword: 'Wrong password. Please try again.',
    
    // Password Setup
    initialSetup: 'Initial Setup',
    setupDescription: 'Set your personal password to access the application. This password will be used for all future logins.',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    enterYourPassword: 'Enter your password',
    confirmYourPassword: 'Confirm password',
    setPassword: 'Set Password',
    passwordEmpty: 'Password cannot be empty',
    passwordMinLength: 'Password must be at least 4 characters',
    passwordsNoMatch: 'Passwords do not match',
    
    // Password Reset
    adminAuth: 'Administrator Authentication',
    resetPasswordTitle: 'Reset Password',
    adminCode: 'Administrator Code',
    enterAdminCode: 'Enter administrator code',
    codeAuthInfo: 'Enter the code to authorize password reset',
    verifyCode: 'Verify Code',
    invalidAdminCode: 'Invalid administrator code',
    adminCodeVerified: 'Administrator code verified! You can now set a new password.',
    enterNewPassword: 'Enter new password',
    confirmNewPassword: 'Confirm new password',
    setNewPassword: 'Set New Password',
    
    // Alerts
    invalidJsonFile: 'Invalid or malformed JSON file.',
    errorParsingJson: 'Error parsing JSON file.',

    // Placeholders
    placeholderAmount: 'e.g. 50.00',
    placeholderDescription: 'e.g. Electricity bill',
    placeholderCategory: 'e.g. Gas',
    placeholderRecurring: 'e.g. Netflix, Electricity Bill, Gym...',
    placeholderDetails: 'Additional details...',
    placeholderWishName: 'e.g. MacBook Pro, iPhone, Trip...',
    placeholderBillingDate: 'e.g. Due date: 15th of month, Charge: every 1st...',
  },
  
  it: {
    // Header
    appName: 'Contabilità Personale',
    currentBalance: 'Saldo Attuale',
    deposit: 'Versamento',
    editBalance: 'Modifica Saldo',
    exportJson: 'Esporta JSON',
    importJson: 'Importa JSON',
    logout: 'Esci',
    manageCategories: 'Gestisci Categorie',
    
    // Deposit Modal
    makeDeposit: 'Effettua un Versamento',
    amountToDeposit: 'Importo da versare',
    confirm: 'Conferma',
    cancel: 'Annulla',
    
    // Edit Balance Modal
    editBalanceTitle: 'Modifica Saldo',
    newBalance: 'Nuovo saldo',
    set: 'Imposta',
    
    // Transaction Form
    addNewTransaction: 'Aggiungi Nuova Transazione',
    type: 'Tipo',
    expense: 'Spesa',
    income: 'Entrata',
    category: 'Categoria',
    amount: 'Importo',
    date: 'Data',
    description: 'Descrizione',
    add: 'Aggiungi',
    addNewCategory: 'Aggiungi Nuova Categoria',
    newCategoryFor: 'Nome della nuova categoria per',
    saveCategory: 'Salva Categoria',
    fillAllFields: 'Per favore, compila tutti i campi.',
    
    // Transaction List
    transactionHistory: 'Cronologia Transazioni',
    actions: 'Azioni',
    delete: 'Elimina',
    noTransactions: 'Nessuna transazione trovata.',
    confirmDeleteTransaction: 'Sei sicuro di voler eliminare questa transazione?',
    
    // Transaction Summary
    filteredSummary: 'Riepilogo Transazioni Filtrate',
    totalExpenses: 'Totale Spese',
    totalIncome: 'Totale Entrate',
    
    // Filter Controls
    filters: 'Filtri',
    filterByType: 'Filtra per Tipo',
    all: 'Tutte',
    expensesOnly: 'Solo Spese',
    incomeOnly: 'Solo Entrate',
    filterByCategory: 'Filtra per Categoria',
    allCategories: 'Tutte le categorie',
    filterByPeriod: 'Filtra per Periodo',
    allTime: 'Sempre',
    currentMonth: 'Mese Corrente',
    customRange: 'Intervallo Personalizzato',
    from: 'Da',
    to: 'A',
    
    // Category Management
    categoryManagement: 'Gestione Categorie',
    allCategoriesTitle: 'Tutte le Categorie',
    edit: 'Modifica',
    save: 'Salva',
    close: 'Chiudi',
    noCategoriesFound: 'Nessuna categoria trovata.',
    confirmDeleteCategory: "Sei sicuro di voler eliminare la categoria '{category}'? Tutte le transazioni con questa categoria rimarranno invariate.",
    categoryExists: "La categoria '{category}' esiste già.",
    
    // Recurring Expenses
    recurringExpenses: 'Spese Ricorrenti',
    noRecurringExpenses: 'Nessuna spesa ricorrente configurata.',
    addSubscriptions: 'Aggiungi abbonamenti, bollette o altre spese mensili.',
    addedThisMonth: 'Aggiunto questo mese',
    alreadyAddedThisMonth: 'Già aggiunto questo mese',
    addToExpenses: 'Aggiungi alle spese',
    createdOn: 'Creato il',
    addRecurringExpense: 'Aggiungi Spesa Ricorrente',
    editRecurringExpense: 'Modifica Spesa Ricorrente',
    title: 'Titolo',
    descriptionOptional: 'Descrizione (opzionale)',
    saveChanges: 'Salva Modifiche',
    enterValidTitleAmount: 'Inserisci titolo e importo validi',
    confirmDeleteRecurring: 'Sei sicuro di voler eliminare "{title}"?',
    insufficientBalance: 'Saldo insufficiente per aggiungere questa spesa.',
    billingDateInfo: 'Usa questo campo per aggiungere info utili come la data di addebito',
    
    // Wishlist
    wishlist: 'Lista Desideri',
    noWishesYet: 'Non hai ancora aggiunto nessun desiderio.',
    addNewWish: 'Aggiungi Nuovo Desiderio',
    newWish: 'Nuovo Desiderio',
    name: 'Nome',
    price: 'Prezzo',
    linkOptional: 'Link (opzionale)',
    desireLevel: 'Livello di Desiderio',
    currentLevel: 'Livello corrente',
    addWish: 'Aggiungi Desiderio',
    low: 'Basso',
    medium: 'Medio',
    high: 'Alto',
    veryHigh: 'Molto Alto',
    essential: 'Indispensabile',
    enterWishName: 'Inserisci il nome del desiderio',
    enterValidPrice: 'Inserisci un prezzo valido',
    
    // Wish Item
    targetPrice: 'Prezzo obiettivo',
    paid: 'Versato',
    remaining: 'Rimanente',
    completed: 'completato',
    completedBadge: 'Completato!',
    viewProduct: 'Vedi Prodotto',
    recentPayments: 'Versamenti recenti',
    andMorePayments: 'e altri {count} versamenti',
    addPayment: 'Aggiungi Versamento',
    confirmDeleteWish: 'Stai per eliminare "{name}".\n\nHai versato €{amount} per questo desiderio.\n\nScegli un\'opzione:\n- OK: Elimina E rimborsa i soldi versati al saldo\n- Annulla: Non eliminare',
    confirmDeleteWishSimple: 'Sei sicuro di voler eliminare "{name}"?',
    confirmDeletePayment: 'Vuoi eliminare il versamento di €{amount} del {date}?\n\nL\'importo verrà rimborsato al tuo saldo.',
    paymentFor: 'Versamento per',
    refundForDeletion: 'Rimborso eliminazione',
    paymentRefund: 'Rimborso versamento',
    insufficientBalancePayment: 'Saldo insufficiente per effettuare questo versamento.',
    
    // Add Payment Form
    paymentAmount: 'Importo versamento',
    quickPayments: 'Versamenti rapidi',
    pay: 'Versa',
    max: 'Max',
    enterValidAmount: 'Inserisci un importo valido',
    amountCannotExceed: "L'importo non può superare €{max} (rimanente per completare l'obiettivo)",
    
    // Login
    protectedAccess: 'Accesso Protetto',
    password: 'Password',
    enterPassword: 'Inserisci la password',
    login: 'Accedi',
    resetPassword: 'Reset Password',
    forAdmins: 'Per amministratori autorizzati',
    wrongPassword: 'Password errata. Riprova.',
    
    // Password Setup
    initialSetup: 'Configurazione Iniziale',
    setupDescription: 'Imposta la tua password personale per accedere all\'applicazione. Questa password verrà utilizzata per tutti i futuri accessi.',
    newPassword: 'Nuova Password',
    confirmPassword: 'Conferma Password',
    enterYourPassword: 'Inserisci la tua password',
    confirmYourPassword: 'Conferma la password',
    setPassword: 'Imposta Password',
    passwordEmpty: 'La password non può essere vuota',
    passwordMinLength: 'La password deve essere di almeno 4 caratteri',
    passwordsNoMatch: 'Le password non corrispondono',
    
    // Password Reset
    adminAuth: 'Autenticazione Amministratore',
    resetPasswordTitle: 'Reset Password',
    adminCode: 'Codice Amministratore',
    enterAdminCode: 'Inserisci il codice amministratore',
    codeAuthInfo: 'Inserisci il codice per autorizzare il reset della password',
    verifyCode: 'Verifica Codice',
    invalidAdminCode: 'Codice amministratore non valido',
    adminCodeVerified: 'Codice amministratore verificato! Ora puoi impostare una nuova password.',
    enterNewPassword: 'Inserisci la nuova password',
    confirmNewPassword: 'Conferma la nuova password',
    setNewPassword: 'Imposta Nuova Password',
    
    // Alerts
    invalidJsonFile: 'File JSON non valido o malformato.',
    errorParsingJson: 'Errore nel parsing del file JSON.',

    // Placeholders
    placeholderAmount: 'Es. 50.00',
    placeholderDescription: 'Es. Bolletta luce',
    placeholderCategory: 'Es. Benzina',
    placeholderRecurring: 'es. Netflix, Bolletta Luce, Palestra...',
    placeholderDetails: 'Dettagli aggiuntivi...',
    placeholderWishName: 'es. MacBook Pro, iPhone, Viaggio...',
    placeholderBillingDate: 'es. Scadenza: 15 del mese, Addebito: ogni 1° del mese...',
  }
};

export default translations;

