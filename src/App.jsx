import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");

  // Membuat sebuah fungsi asinkron dengan keyword `async`
  // Fungsi ini akan mengirimkan permintaan HTTP ke API quotable.io untuk mendapatkan quote acak
  // Fungsi ini mengembalikan sebuah promise yang akan di-resolve dengan objek data yang berisi quote dan penulisnya
  async function getQuote() {
    // Menggunakan `fetch` untuk mengirimkan permintaan HTTP GET ke URL yang diberikan
    const res = await fetch("https://api.quotable.io/random");
    // Menggunakan `json` untuk mengubah respon dari promise menjadi objek JavaScript
    const data = await res.json();
    // Menggunakan template literal untuk menggabungkan quote dan penulisnya menjadi sebuah string
    // dan kemudian menggunakan `setQuote` untuk mengubah state quote menjadi string yang baru
    setQuote(`${data.content} - ${data.author}`);
  }

  // Menggunakan `useEffect` untuk memanggil fungsi `getQuote` setelah komponen di-mount
  // Parameter pertama adalah fungsi yang akan dipanggil setelah komponen di-mount
  // Parameter kedua adalah array kosong, yang artinya fungsi akan dipanggil hanya sekali setelah komponen di-mount
  // Struktur code ini digunakan untuk melakukan operasi seperti permintaan HTTP atau eksekusi fungsi lain yang tidak diperlukan pada setiap render
  useEffect(() => {
    getQuote(); // Panggil fungsi `getQuote` untuk mendapatkan quote awal
  }, []);
  // Jalankan fungsi hanya sekali saat komponen di-mount
  // Dengan menambahkan parameter kedua yang kosong, kita menghindari fungsi di-rerun pada setiap render
  // Hal ini berguna ketika kita hanya ingin melakukan operasi sekali saat komponen di-mount atau di-unmount
  // Misalnya, jika kita tidak menambahkan parameter kedua, maka fungsi akan di-rerun pada setiap render karena state `quote` berubah

  return (
    <div className="App">
      <h1>Quote Generator</h1>
      <h3>{quote}</h3>
      <button onClick={getQuote}>Get Quote</button>
    </div>
  );
}

export default App;
