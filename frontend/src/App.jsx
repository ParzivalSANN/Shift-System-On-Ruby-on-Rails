import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:3000'; // Rails backend 3000 portunda çalışıyor

function App() {
  const [vardiyalar, setVardiyalar] = useState([]);
  const [yeniVardiya, setYeniVardiya] = useState({
    start_time: '',
    end_time: '',
    employee_name: '',
  });
  const [duzenlenenVardiya, setDuzenlenenVardiya] = useState(null);
  const [hata, setHata] = useState(null);

  useEffect(() => {
    vardiyalariGetir();
  }, []);

  const vardiyalariGetir = async () => {
    try {
      const response = await fetch(`${API_URL}/shifts`);
      if (!response.ok) {
        throw new Error(`HTTP hatası! durum: ${response.status}`);
      }
      const data = await response.json();
      setVardiyalar(data);
    } catch (error) {
      console.error("Vardiyalar getirilirken hata:", error);
      setHata("Vardiyalar getirilemedi.");
    }
  };

  const girdiyiIsle = (e) => {
    const { name, value } = e.target;
    setYeniVardiya({ ...yeniVardiya, [name]: value });
  };

  const duzenlemeGirdisiniIsle = (e) => {
    const { name, value } = e.target;
    setDuzenlenenVardiya({ ...duzenlenenVardiya, [name]: value });
  };

  const gonderimIsle = async (e) => {
    e.preventDefault();
    setHata(null);
    try {
      const response = await fetch(`${API_URL}/shifts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shift: yeniVardiya }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors ? JSON.stringify(errorData.errors) : `HTTP hatası! durum: ${response.status}`);
      }
      setYeniVardiya({
        start_time: '',
        end_time: '',
        employee_name: '',
      });
      vardiyalariGetir();
    } catch (error) {
      console.error("Vardiya oluşturulurken hata:", error);
      setHata(`Vardiya oluşturulamadı: ${error.message}`);
    }
  };

  const guncellemeIsle = async (e) => {
    e.preventDefault();
    setHata(null);
    try {
      const response = await fetch(`${API_URL}/shifts/${duzenlenenVardiya.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shift: duzenlenenVardiya }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors ? JSON.stringify(errorData.errors) : `HTTP hatası! durum: ${response.status}`);
      }
      setDuzenlenenVardiya(null);
      vardiyalariGetir();
    } catch (error) {
      console.error("Vardiya güncellenirken hata:", error);
      setHata(`Vardiya güncellenemedi: ${error.message}`);
    }
  };

  const silmeIsle = async (id) => {
    setHata(null);
    try {
      const response = await fetch(`${API_URL}/shifts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP hatası! durum: ${response.status}`);
      }
      vardiyalariGetir();
    } catch (error) {
      console.error("Vardiya silinirken hata:", error);
      setHata("Vardiya silinemedi.");
    }
  };

  const duzenlemeIsle = (vardiya) => {
    setDuzenlenenVardiya({
      ...vardiya,
      start_time: new Date(vardiya.start_time).toISOString().slice(0, 16),
      end_time: new Date(vardiya.end_time).toISOString().slice(0, 16),
    });
  };

  return (
    <div className="App">
      <h1>Vardiya Yönetimi</h1>

      {duzenlenenVardiya ? (
        <form onSubmit={guncellemeIsle}>
          <h2>Vardiyayı Düzenle</h2>
          {hata && <p style={{ color: 'red' }}>{hata}</p>}
          <div>
            <label>
              Başlangıç Zamanı:
              <input
                type="datetime-local"
                name="start_time"
                value={duzenlenenVardiya.start_time}
                onChange={duzenlemeGirdisiniIsle}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Bitiş Zamanı:
              <input
                type="datetime-local"
                name="end_time"
                value={duzenlenenVardiya.end_time}
                onChange={duzenlemeGirdisiniIsle}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Çalışan Adı:
              <input
                type="text"
                name="employee_name"
                value={duzenlenenVardiya.employee_name}
                onChange={duzenlemeGirdisiniIsle}
                required
              />
            </label>
          </div>
          <button type="submit">Vardiyayı Güncelle</button>
          <button type="button" onClick={() => setDuzenlenenVardiya(null)}>
            İptal
          </button>
        </form>
      ) : (
        <form onSubmit={gonderimIsle}>
          <h2>Yeni Vardiya Oluştur</h2>
          {hata && <p style={{ color: 'red' }}>{hata}</p>}
          <div>
            <label>
              Başlangıç Zamanı:
              <input
                type="datetime-local"
                name="start_time"
                value={yeniVardiya.start_time}
                onChange={girdiyiIsle}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Bitiş Zamanı:
              <input
                type="datetime-local"
                name="end_time"
                value={yeniVardiya.end_time}
                onChange={girdiyiIsle}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Çalışan Adı:
              <input
                type="text"
                name="employee_name"
                value={yeniVardiya.employee_name}
                onChange={girdiyiIsle}
                required
              />
            </label>
          </div>
          <button type="submit">Vardiya Ekle</button>
        </form>
      )}

      <h2>Mevcut Vardiyalar</h2>
      {vardiyalar.length === 0 ? (
        <p>Vardiya bulunamadı.</p>
      ) : (
        <ul>
          {vardiyalar.map((vardiya) => (
            <li key={vardiya.id}>
              {vardiya.employee_name} -{' '}
              {new Date(vardiya.start_time).toLocaleString()} - {' '}
              {new Date(vardiya.end_time).toLocaleString()}
              <button onClick={() => duzenlemeIsle(vardiya)}>Düzenle</button>
              <button onClick={() => silmeIsle(vardiya.id)}>Sil</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;