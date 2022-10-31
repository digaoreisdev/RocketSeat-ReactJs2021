//JSX = JavaScript + HTML
import { Header } from './components/Header'
import { Post } from './Post';

import './styles.css';

export function App() {

  return (
    <div>
      <Header/>
      
      <Post
        author="Diego Fernandes"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolor, optio nemo a odit hic illum qui fuga nostrum nulla sequi praesentium excepturi, similique molestiae error quaerat veniam nobis iure."
      />
      
      <Post
        author="Rodrigo Reis"
        content="Um novo post sobre políticagem"
      />
    </div>
  )
}

