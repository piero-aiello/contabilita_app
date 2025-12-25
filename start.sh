#!/bin/bash

echo "🚀 Avvio Contabilità Personale..."

# Vai nella cartella dell'app
#cd "/Users/imac/Desktop/contabilita_app"

# Controlla se è già in esecuzione sulla porta 3000
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ App già in esecuzione!"
    echo "🌐 Apro nel browser..."
    open "http://localhost:3000"
else
    echo "📦 Avvio server..."
    # Avvia il server in background
    npm start > /dev/null 2>&1 &
    
    # Aspetta che il server sia pronto
    echo "⏳ Attendo che il server sia pronto..."
    sleep 5
    
    # Apri nel browser
    echo "🌐 Apro nel browser..."
    open "http://localhost:3000"
fi

echo "✅ Contabilità Personale pronta!"