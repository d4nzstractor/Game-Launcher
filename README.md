⚠️ CONFIGURATION NOTE:
This launcher uses direct file paths to your game executables. To get it working on your machine:

Open index.html and update the path property for each game to match its actual location on your computer.

Open main.js and ensure the path of Cemu variable and the dir path for PCSX2 point to where you have installed your emulators.

🎮 Game-LauncherA custom, lightweight game launcher built with Electron. This application provides a centralized and organized interface to manage and launch your local games, Steam titles, and emulated games all in one place.

🚀 Key FeaturesUnified Library: View all your games in a clean, responsive, grid-based interface.Smart Search: Quickly find any game in your library using the integrated search bar.Flexible Sorting: Organize your collection by A-Z, Z-A, or "Recently Played" (using local storage).Categorized View: Optional toggle to group your games alphabetically.Multi-Platform Support:Direct Executables: Seamlessly launch local .exe files.Steam Integration: Full support for Steam shortcuts.Emulators: Pre-configured support for Cemu and PCSX2.

🏗️ System ArchitectureThe application is built on a clean separation of concerns:
-Frontend (index.html)Manages the UI, CSS Grid layout, search filtering, and sorting logic. Communicates with the backend via ipcRenderer.

-Backend (main.js)Electron’s main process; acts as the bridge to the OS and uses child_process.exec to trigger game/emulator launches.

🛠️ Adding New GamesTo add your own games to the library, edit the games array located inside the <script> tag in index.html. Each game is defined as an object:

{ 

  id: "my-game", 
  
  nombre: "My Awesome Game", 

  ruta: "C:\\Games\\MyGame\\game.exe", 
  
  img: "imagenes/cover.jpg",

  tipo: "cemu" // Optional: specify "cemu" or "pcsx2"
  
}

Note: Since this launcher uses hardcoded paths, please update the ruta (path) in index.html and main.js to match the file structure on your local machine.💻 Technical StackElectron: Framework for cross-platform desktop applications.Node.js: Core application logic and system command execution.HTML5/CSS3: Modern, dark-themed user interface.🚀 Getting StartedClone the repository:Bashgit clone [your-repository-url]
Install dependencies:Bashnpm install
Launch the application:Bashnpm start
