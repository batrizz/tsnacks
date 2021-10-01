import { useEffect, useState } from 'react'
import { api } from '../services/api'
import styles from '../styles/home.module.scss'

type Produtos = {
  comprador: string
  idProduto: string
  nomeDoProduto: string
  valor: string
}

export function Card({ idProduto, comprador }: Produtos) {
  const [show, setShow] = useState(false)
  const [compradorExistente, setCompradorExistente] = useState<Produtos[]>([])

  useEffect(() => {
    getProdutosDoComprador()
  }, [])

  useEffect(() => {
    if (show == true) {
      getProdutosDoComprador()
    }
  }, [show])

  function getProdutosDoComprador() {
    api
      .get(`api/Produto/getComprador?NomeDoComprador=${comprador}`)
      .then(response => {
        console.log(response.data)
        setCompradorExistente(response.data)
      })
  }

  function deletarProduto(id) {
    api.delete(`api/Produto/${id}`)
    setCompradorExistente(
      compradorExistente.filter(produto => produto.idProduto !== id)
    )
  }

  return (
    <ul key={comprador}>
      <div className={styles.nameContent}>
        <p>{comprador}</p>
        <img
          src="/abrir.svg"
          alt="Abrir"
          className={`${show && styles.open}`}
          onClick={() => setShow(!show)}
        />
      </div>

      {show ? (
        <div className={styles.list}>
          {compradorExistente.map((comprador, index) => (
            <li key={index}>
              <div className={styles.nameValueProduct}>
                <strong>{comprador.nomeDoProduto}</strong>
                <p>R${comprador.valor}</p>
              </div>
              <img
                className={styles.trash}
                src="/trash.svg"
                alt="Deletar"
                onClick={() => deletarProduto(comprador.idProduto)}
              />
            </li>
          ))}
        </div>
      ) : null}
    </ul>
  )
}
