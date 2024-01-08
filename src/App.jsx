import { Header } from './Components/Header/Header'
import { Body } from './Components/Body'
import { Footer } from './Components/Footer'
import './App.css'

function App() {
  return <main className="flex flex-col items-center justify-center min-h-screen py-4 px-4 gap-y-3">
    <Header />
    <Body />
    <Footer />
  </main>
}

export default App;