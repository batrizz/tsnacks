import { useEffect, useState } from 'react'
import React from 'react'
import styles from '../styles/home.module.scss'
import { api } from '../services/api'
import { Card } from '../components/Card'

type Produtos = {
  comprador: string
  idProduto: string
  nomeDoProduto: string
  valor: string
}

export default function Home() {
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

  return (
    <div className={styles.homepage}>
      <span> Snacks Cadastrados </span>
      {compradorExistente.map((comprador, index) => (
        <Card key={index} {...comprador} />
      ))}
    </div>
  )
}
