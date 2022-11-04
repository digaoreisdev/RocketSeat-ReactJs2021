import { HandPalm, Knife } from 'phosphor-react'
import styles from './Post.module.css';

export function Post(){
  return (
    <article className={ styles.post }>
      <header>
        <div className={ styles.author }>
          <img
            className={ styles.avatar }
            src="https://github.com/digaoreisdev.png"
          />

          <div className={ styles.authorInfo}>
            <strong> Rodrigo Reis </strong>
            <span> Web Developer </span>
          </div>
        </div>

        <time title="11 de maio às 12:28hs" dateTime="2022-05-11 08:13:30"> Publicado há 1hs </time>
      </header>

      <div className={ styles.content }>
        <p>Fala Reis! <Knife /> </p>
        <p>Testando primeiro Post do Projeto.</p>
        <p> < HandPalm/> Curti ai e Comenta.</p>
      </div>
    </article>    
  )
}