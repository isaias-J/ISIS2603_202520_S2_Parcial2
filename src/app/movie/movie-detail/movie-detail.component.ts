import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../Movie';

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit, OnChanges {
  @Input() movie: any;
  safeTrailerUrl: SafeResourceUrl | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.movie) {
      const idParam = this.route.snapshot.paramMap.get('id');
      const id = idParam ? parseInt(idParam, 10) : null;
      if (id != null && !isNaN(id)) {
        this.movieService.getMovie(id).subscribe({
          next: (m: Movie) => {
            this.movie = m;
            this.updateTrailerUrl();
          },
          error: (err) => {
            console.error('Error cargando detalle de movie', err);
          }
        });
      }
    } else {
      this.updateTrailerUrl();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movie']) {
      this.updateTrailerUrl();
    }
  }

  private updateTrailerUrl(): void {
    if (this.movie?.trailer_url) {
      let embedUrl = this.movie.trailer_url;
      if (embedUrl.includes('watch?v=')) {
        embedUrl = embedUrl.replace('watch?v=', 'embed/');
      }
      this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } else {
      this.safeTrailerUrl = null;
    }
  }

  goBack(): void {
    this.router.navigate(['/movie']);
  }
}
