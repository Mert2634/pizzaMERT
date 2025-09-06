import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const initialValues = {
  name: '',
  size: '',
  toppings: [],
  special: '',
}

const OrderForm = ({ setOrder }) => {
  const [form, setForm] = useState(initialValues)
  const [errors, setErrors] = useState({ name: '', size: '' })
  const history = useHistory()

  const validate = (name, value) => {
    if (name === 'name') {
      return value.trim().length >= 3 ? '' : 'İsim en az 3 karakter olmalı'
    }
    if (name === 'size') {
      return value ? '' : 'Boyut seçilmelidir'
    }
    return ''
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      let newToppings = form.toppings
      if (checked) {
        newToppings = [...newToppings, name]
      } else {
        newToppings = newToppings.filter((t) => t !== name)
      }
      setForm({ ...form, toppings: newToppings })
    } else {
      setForm({ ...form, [name]: value })
      setErrors({ ...errors, [name]: validate(name, value) })
    }
  }

  const isValid = form.name.trim().length >= 3 && form.size && !errors.name && !errors.size

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return
    axios
      .post('https://reqres.in/api/pizza', form)
      .then(() => {
        setOrder(form)
        history.push('/success')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const toppings = ['Pepperoni', 'Sosis', 'Mantar', 'Mısır', 'Zeytin', 'Biber']

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Sipariş Formu</h2>
      <label>
        İsim
        <input name="name" value={form.name} onChange={handleChange} />
      </label>
      {errors.name && <p className="error">{errors.name}</p>}

      <label>
        Boyut
        <select name="size" value={form.size} onChange={handleChange}>
          <option value="">Seçiniz</option>
          <option value="Küçük">Küçük</option>
          <option value="Orta">Orta</option>
          <option value="Büyük">Büyük</option>
        </select>
      </label>
      {errors.size && <p className="error">{errors.size}</p>}

      <fieldset>
        <legend>Ek Malzemeler</legend>
        {toppings.map((t) => (
          <label key={t}>
            <input
              type="checkbox"
              name={t}
              checked={form.toppings.includes(t)}
              onChange={handleChange}
            />
            {t}
          </label>
        ))}
      </fieldset>

      <label>
        Özel İstekler
        <textarea name="special" value={form.special} onChange={handleChange} />
      </label>

      <button disabled={!isValid} type="submit">
        Sipariş Ver
      </button>
    </form>
  )
}

export default OrderForm
