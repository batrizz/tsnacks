import styles from '../styles/registration.module.scss'
import React from 'react'

import { api } from '../services/api'
import { useState, useEffect } from 'react'

type Produtos = {
  comprador: string
  idProduto: string
  nomeDoProduto: string
  valor: string
}

export function Registration() {
  const [comprador, setComprador] = useState('')
  const [nomeDoProduto, setNomeDoProduto] = useState('')
  const [selectComprador, setSelectComprador] = useState('')
  const [valor, setValor] = useState('')
  const [compradorExistente, setCompradorExistente] = useState<Produtos[]>([])

  useEffect(() => {
    api.get(`api/Produto`).then(response => {
      setCompradorExistente(getUnicoComprador(response.data, 'comprador'))
    })
  }, [])

  function getUnicoComprador(arr: unknown[], key: string) {
    // @ts-ignore
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

  async function postDataForm(event) {
    event.preventDefault()

    if (comprador.trim() == '') {
      const comp =
        compradorExistente.find(
          comprador => comprador.idProduto == selectComprador
        )?.comprador || comprador

      await api.post(
        `api/Produto?NomeDoProduto=${nomeDoProduto}&Valor=${valor}&idProduto=${selectComprador}&Comprador=${comp}`
      )
      window.location.reload()
      return
    }

    const post = await api.post(
      `api/Produto?NomeDoProduto=${nomeDoProduto}&Valor=${valor}&Comprador=${comprador}`
    )
    const response = await api.get(`api/Produto`)
    setCompradorExistente(response.data)
    window.location.reload()
  }

  return (
    <div className={styles.registrationContainer}>
      <span>Cadastrar Produtos</span>

      <form onSubmit={postDataForm}>
        <p> Digite o nome do produto: </p>
        <input
          type="text"
          placeholder="ex: Doritos"
          onChange={event => setNomeDoProduto(event.target.value)}
          value={nomeDoProduto}
        />
        <p> Digite o valor: </p>
        <input
          type="text"
          placeholder="R$00,00"
          onChange={event => {
            setValor(event.target.value)
          }}
          value={valor}
        />

        <p> Selecione o comprador: </p>
        <select
          name="names"
          id="name"
          onChange={event => setSelectComprador(event.target.value)}
          value={selectComprador}
        >
          <option>Escolha o comprador</option>
          {compradorExistente.map(comprador => (
            <option key={comprador.idProduto} value={comprador.idProduto}>
              {comprador.comprador}
            </option>
          ))}
        </select>
        <p className={styles.ou}> ou </p>

        <p> Adicione um novo integrante: </p>
        <input
          type="text"
          placeholder="ex: Maria Eugênia"
          onChange={event => setComprador(event.target.value)}
          value={comprador}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}
