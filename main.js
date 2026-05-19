const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    
    mainWindow.loadFile('index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.maximize();
        mainWindow.show();
    });
}

ipcMain.on('abrir-juego', (event, data) => {
    console.log("Recibido para ejecutar:", data);

    // --- CASO 1: STEAM ---
    if (typeof data === "string" && data.startsWith("steam://")) {
        exec(`start "" "${data}"`);
        return;
    }

    // --- CASO 2: EMULADORES (Objetos) ---
    if (typeof data === "object") {
        
        // Lógica para CEMU
        if (data.tipo === "cemu") {
            const rutaCemu = "C:\\Users\\daliu\\Downloads\\COZAS\\Cemu_2.6\\Cemu.exe";
            const comando = `"${rutaCemu}" -g "${data.ruta}"`;
            exec(comando, (error) => {
                if (error) console.error("Error al abrir Cemu:", error);
            });
        } 
        
        // Lógica para PCSX2 (CORREGIDA)
        else if (data.tipo === "pcsx2") {
            const exe = "pcsx2-qt.exe"; 
            const dir = "C:\\Users\\daliu\\Downloads\\COZAS\\pcsx2-v2.1.126-windows-x64-Qt\\";
            const rutaFullExe = dir + exe;

            // Usamos -fullscreen y -batch para evitar el error de "Unknown parameter"
            const comando = `"${rutaFullExe}" -fullscreen -batch "${data.ruta}"`;
            
            console.log("Ejecutando PS2:", comando);

            exec(comando, (error) => {
                if (error) console.error("Error al abrir PCSX2:", error);
            });
        }
        return;
    }

    // --- CASO 3: EJECUTABLE NORMAL (String) ---
    if (typeof data === "string") {
        exec(`"${data}"`, (error) => {
            if (error) console.error("Error al lanzar juego:", error);
        });
    }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});