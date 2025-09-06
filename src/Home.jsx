import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home">
      <h1>Teknolojik Yemekler</h1>
      <p>Acıktıysan doğru yerdesin!</p>
      <Link className="order-btn" to="/order">Hemen Sipariş Ver</Link>
    </div>
  )
}

export default Home
