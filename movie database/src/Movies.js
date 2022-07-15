import React from 'react'
import { useGlobalContext } from './context'
import { Link } from 'react-router-dom'
const DEFAULT_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const Movies = () => {

  const { movies, isLoading } = useGlobalContext();

  if(isLoading){
    return <div className="loading"></div>
  }

  return (
    <section className="movies">
      {movies.map((movie)=>{
        const { Poster: poster, imdbID: id, Title: title, Year: year } = movie;

        return (
          <Link to={`/movies/${id}`} key={id} className="movie" >
            <article>
              <img src={poster === 'N/A' ? DEFAULT_IMAGE : poster} alt={title} />
                <div className="movie-info">
                  <h4 className="title">{title}</h4>
                  <p>{year}</p>
                </div>
            </article>
          </Link>
        )
      })}
    </section>
  )
}

export default Movies
