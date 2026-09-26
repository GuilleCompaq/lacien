import { Route, Routes } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { MiniPlayer } from './components/layout/MiniPlayer';
import { usePlayerStore } from './store/playerStore';
import { aboveNav, abovePlayer } from './lib/playerLayout';
import Home from './pages/Home';
import Search from './pages/Search';
import MyMusic from './pages/MyMusic';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';

export default function App() {
  const hasCurrentRadio = usePlayerStore((s) => s.currentRadio !== null);
  const status = usePlayerStore((s) => s.status);

  return (
    <>
      <div className="app-shell flex flex-1 flex-col md:border-x md:border-white/5">
        <Header />
        <main
          id="contenido"
          className="flex-1"
          style={{
            // Derivado de las alturas reales de las barras, no de números sueltos.
            paddingBottom: hasCurrentRadio ? abovePlayer(status) : aboveNav(),
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buscar" element={<Search />} />
            <Route path="/mi-musica" element={<MyMusic />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<SignUp />} />
            <Route path="/recuperar" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <MiniPlayer />
      <BottomNav />
      <Analytics />
    </>
  );
}
