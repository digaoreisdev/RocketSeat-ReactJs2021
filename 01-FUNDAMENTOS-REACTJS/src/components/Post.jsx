import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

// author: { avatar_url: "", name: "", role: ""}
// publishedAt: Date
// content: String

export function Post({ author, publishedAt }) {
  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
  })

  return (
    <article className={ styles.post }>
      <header>
        <div className={ styles.author }>
          <Avatar src={author.avatarUrl} />
          <div className={ styles.authorInfo}>
            <strong> {author.name} </strong>
            <span> {author.role} </span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime="2022-05-11 08:13:30">
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={ styles.content }>
        
      </div>

      <form className={ styles.commentForm }>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Deixe um comentário"
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}></div>
        <Comment />
        <Comment />
        <Comment />
    </article>    
  )
}