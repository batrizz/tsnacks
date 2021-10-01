import styles from '../styles/results.module.scss'

import { useEffect, useState } from 'react'
import { api } from '../services/api'

type Produtos = {
  comprador: string
  idProduto: string
  nomeDoProduto: string
  valor: string
}

export function Results() {
  const [compradorExistente, setCompradorExistente] = useState<Produtos[]>([])
  const total = compradorExistente.reduce(
    (acc, comp) => acc + Number(comp.valor.replace(',', '.')),
    0
  )

  useEffect(() => {
    api.get(`api/Produto`).then(response => {
      setCompradorExistente(response.data)
      console.log(compradorExistente)
    })
  }, [])

  function format(total) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(total)
  }

  return (
    <div className={styles.resultsContainer}>
      <span>TOTAL DE PRODUTOS:</span>
      <span className={styles.spanDivider}>{compradorExistente.length}</span>

      <span>VALOR TOTAL:</span>
      <span>{format(total)}</span>
    </div>
  )
}
