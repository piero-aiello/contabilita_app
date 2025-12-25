#!/bin/bash

# Trova e termina tutti i processi Node.js relativi a questa applicazione React
echo "Cercando processi Node.js per l'app contabilità..."

# Trova il PID del processo npm start o react-scripts
PID=$(ps aux | grep -E "(npm.*start|react-scripts)" | grep -v grep | awk '{print $2}')

if [ -z "$PID" ]; then
    echo "Nessun processo dell'app contabilità trovato in esecuzione."
else
    echo "Terminando processo con PID: $PID"
    kill -TERM $PID
    sleep 2
    
    # Verifica se il processo è ancora attivo e forza la terminazione se necessario
    if ps -p $PID > /dev/null; then
        echo "Forzando la terminazione del processo..."
        kill -KILL $PID
    fi
    
    echo "App contabilità terminata con successo."
fi

# Termina anche eventuali processi Node.js sulla porta 3000
echo "Verificando processi sulla porta 3000..."
PORT_PID=$(lsof -ti:3000)
if [ -n "$PORT_PID" ]; then
    echo "Terminando processo sulla porta 3000 con PID: $PORT_PID"
    kill -TERM $PORT_PID
fi

echo "Operazione completata."