import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './Movie';

const MOVIES_LIST_URL =
	'https://raw.githubusercontent.com/Uniandes-isis2603/ISIS2603_202520_S2_Parcial2_json/refs/heads/main/movies/movie.json';
const MOVIE_DETAIL_BASE =
	'https://raw.githubusercontent.com/Uniandes-isis2603/ISIS2603_202520_S2_Parcial2_json/refs/heads/main/movies';

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	private apiUrl: string = MOVIES_LIST_URL;

    constructor(private http: HttpClient) {}

	getMovies(): Observable<Movie[]> {
		return this.http.get<Movie[]>(this.apiUrl);
	}

	getMovie(id: number): Observable<Movie> {
		const url = `${MOVIE_DETAIL_BASE}/${id}/movie.json`;
		return this.http.get<Movie>(url);
	}
}