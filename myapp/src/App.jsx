// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductsList from './pages/Products/ProductsList';
import PurchaseHistory from './pages/List/PurchaseHistory';
import { ListProvider } from './contexts/ListContext';

function App() {
  return (
    <ListProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ProductsList />} />
              <Route path="/cart/history" element={<PurchaseHistory />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ListProvider>

  );
}

export default App;
