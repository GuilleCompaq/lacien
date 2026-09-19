import { Route, Routes } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { MiniPlayer } from './components/layout/MiniPlayer';
import { usePlayerStore } from './store/playerStore';
import Home from './pages/Home';
import Search from './pages/Search';
import MyMusic from './pages/MyMusic';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

export default function App() {
  const hasCurrentRadio = usePlayerStore((s) => s.currentRadio !== null);

  return (
    <>
      <Header />
      <main className={`flex-1 ${hasCurrentRadio ? 'pb-36' : 'pb-16'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/mi-musica" element={<MyMusic />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<SignUp />} />
        </Routes>
      </main>
      <MiniPlayer />
      <BottomNav />
      <Analytics />
    </>
  );
}
