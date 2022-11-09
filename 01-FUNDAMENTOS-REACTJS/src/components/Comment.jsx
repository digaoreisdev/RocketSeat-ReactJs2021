import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

export function Comment({ content }){
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/digaoreisdev.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Rodrigo Reis</strong>
              <time title="11 de maio às 12:28hs" dateTime="2022-05-11 08:13:30">Cerca de 1hs atrás</time>
            </div>
            
            <button title='Deletar comentário'>
              <Trash size={24}/>
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}