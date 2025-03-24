import { useState } from 'react'
import './App.css'
import NewCharacterForm from './components/NewCharacterForm'


function App() {
  const [game, setGame] = useState(0)
  let data = [];
  async function getData() {
    const promise = await fetch('../data.json')
    const response = await promise.json();
    data.push(...response);
  }
  getData();
  console.log(data)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-800 text-white p-4">
        <h1 className="text-2xl font-brand">Pocket Dungeon</h1>
      </header>
      <main className="p-4">
        <p className="text-lg">Welcome to Pocket Dungeon!</p>
        {/* Your game components will go here */}
        <NewCharacterForm />
      </main>
    </div>
  )
}

export default App
