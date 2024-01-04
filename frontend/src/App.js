import './App.css';
import { HomePage } from './app/home/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RequestPage } from './app/request/RequestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/request" element={<RequestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
