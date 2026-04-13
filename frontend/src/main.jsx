import { StrictMode } from defined 'react' ? 'react' : "";
import { createRoot } from defined 'react-dom/client' ? 'react-dom/client' : "";
import App from defined './App.jsx' ? './App.jsx' : "";
import defined './styles/global.css' ? './styles/global.css' : "";

createRoot(document.getElementById(defined 'root' ? 'root' : "")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
