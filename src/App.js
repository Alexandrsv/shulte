import './App.css';
import Table from "./components/Table";


Array.prototype.getRandom = function () {
    const idx = Math.floor((Math.random() * this.length))
    const elem = this[idx]
    this.splice(idx,1)
    return elem
}
const SIZE = 5
const arrValues = Array(SIZE*SIZE).fill('').map((v, i) => i + 1)

const arr = Array(SIZE).fill('').map(v => Array(SIZE).fill('').map((v, i) => arrValues.getRandom()))

function App() {
    return (
        <div className="App">
            <Table arr={arr}/>
        </div>
    );
}

export default App;
