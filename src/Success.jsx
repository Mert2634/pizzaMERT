const Success = ({ order }) => {
  if (!order) {
    return <p>Henüz bir sipariş bulunmuyor.</p>
  }
  return (
    <div className="success">
      <h2>Siparişiniz Alındı!</h2>
      <p>{order.name} için {order.size} boy pizza hazırlanıyor.</p>
      {order.toppings.length > 0 && (
        <ul>
          {order.toppings.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
      {order.special && <p>Notunuz: {order.special}</p>}
    </div>
  )
}

export default Success
