import Table from "./components/Table";


Array.prototype.getRandom = function () {
    const idx = Math.floor((Math.random() * this.length))
    const elem = this[idx]
    this.splice(idx,1)
    return elem
}

function App() {
    return (
        <div className="">
            <Table/>
        </div>
    );
}

export default App;
