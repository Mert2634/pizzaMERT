import { useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Home from './Home.jsx'
import OrderForm from './OrderForm.jsx'
import Success from './Success.jsx'
import './App.css'

function App() {
  const [order, setOrder] = useState(null)

  return (
    <div className="App">
      <nav className="nav">
        <Link to="/">Anasayfa</Link>
        <Link to="/order">Sipariş Ver</Link>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/order">
          <OrderForm setOrder={setOrder} />
        </Route>
        <Route path="/success">
          <Success order={order} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
