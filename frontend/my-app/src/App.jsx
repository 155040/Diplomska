import { BrowserRouter } from "react-router"
import { Routes } from "react-router"
import { Route } from "react-router"
import Login from "./components/Login"
import Navbar from './components/Navbar'
import Home from "./components/Home"
import SkateEventForm from "./components/SkateEventForm"
import SkateShopForm from "./components/SkateShopForm"
import SkateSpotForm from './components/SkateSpotForm'
import SkateEventListPage from "./components/SkateEventListPage"
import SkateShopListPage from "./components/SkateShopListPage"
import SkateSpotListPage from "./components/SkateSpotListPage"
import Gallery from "./components/Gallery";
import VideoListPage from "./components/VideoListPage";
import VideoForm from "./components/VideoForm";
import ImageListPage from "./components/ImageListPage";
import ImageUploadForm from "./components/ImageUploadForm";
import 'leaflet/dist/leaflet.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/skate-event" element={<SkateEventListPage />} />
          <Route path="/skate-shop" element={<SkateShopListPage />} />
          <Route path="/skate-spot" element={<SkateSpotListPage />} />
          <Route path="/video" element={<VideoListPage />} />
          <Route path="/image" element={<ImageListPage />} />
        </Route>
        <Route path="/add-skate-event" element={<SkateEventForm />} />
        <Route path="/add-skate-shop" element={<SkateShopForm />} />
        <Route path="/add-skate-spot" element={<SkateSpotForm />} />
        <Route path="/add-video" element={<VideoForm />} />
        <Route path="/add-image" element={<ImageUploadForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
