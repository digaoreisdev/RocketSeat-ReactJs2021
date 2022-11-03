//JSX = JavaScript + HTML
import { Header } from './components/Header'
import { Post } from './Post';

import styles from './App.module.css';

import './global.css';
import { Sidebar } from './components/Sidebar';

export function App() {

  return (
    <div>
      <Header/>
      
      <div className={styles.wrapper}>
        <Sidebar/>
        
        <main>
          <Post
            author="Diego Fernandes"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolor, optio nemo a odit hic illum qui fuga nostrum nulla sequi praesentium excepturi, similique molestiae error quaerat veniam nobis iure."
          />
        
          <Post
            author="Rodrigo Reis"
            content="Um novo post sobre políticagem"
          />
        </main>
      </div>
    </div>
  )
}

