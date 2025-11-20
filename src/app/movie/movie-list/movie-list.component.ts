import { Component, OnInit } from '@angular/core';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  selected: Boolean = false;
  selectedMovie: Movie | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private movieService: MovieService
    , private router: Router
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    this.error = null;

    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data.map(a => new Movie(
          a.id, a.titulo,a.año, a.duracion_minutos, a.generos, a.sinopsis, a.director, a.poster, a.trailer_url,
            a.calificacion,a.actores));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar movies.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSelect(movie: Movie) {
    this.selectedMovie = movie;
    this.selected = true;
    this.router.navigate(['/movie', movie.id]);
  }
}
