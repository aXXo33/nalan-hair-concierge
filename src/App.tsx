import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import BottomTabBar from './components/BottomTabBar';
import Home from './pages/Home';
import Services from './pages/Services';
import Quote from './pages/Quote';
import Bridal from './pages/Bridal';
import Gallery from './pages/Gallery';
import Aftercare from './pages/Aftercare';
import Vip from './pages/Vip';
import Admin from './pages/Admin';

export default function App() {
  const location = useLocation();
  return (
    <div className="app-shell">
      <div className="app-frame">
        <Header />
        <main className="app-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/bridal" element={<Bridal />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/aftercare" element={<Aftercare />} />
                <Route path="/vip" element={<Vip />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <BottomTabBar />
      </div>
    </div>
  );
}
