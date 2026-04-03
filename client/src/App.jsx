

import Navbar from "./components/Navbar"
import "./App.css"
import Footer from "./components/Footer";
import News from "./components/News";
import NewsBoston from "./components/NewsBoston";
import NewsMa from "./components/NewsMa";
import Weather from "./components/Weather";
import YoutubeWeather from "./components/YoutubeWeather";
import Location from "./components/Location";
import { Routes, Route } from "react-router-dom";






function App() {
  return (
<div className="app">
  <Navbar />

      <Routes>
        <Route path="*" element={<News />} />
        <Route path="/" element={<News />} />
        <Route path="/news" element={<News />} />
        <Route path="/newsboston" element={<NewsBoston />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/location" element={<Location />} />
      </Routes>


  <main className="main-content">
    
    {/* <News /> */} 
    {/* <NewsBoston /> */} 
    {/* <Weather /> */} 
    {/* <YoutubeWeather /> */} 
    {/* <Location /> */} 
    {/* <NewsMa /> */} 



  </main>

  <Footer />
</div>
  )
}

export default App