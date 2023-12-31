import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/data/movie.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  mediaDetails: any = null;
  cast: any = null
  contentTitle: string = '';
  contentDescription: string = '';
  photoCover: string = '';
  id: any = '';
  mediaType: any = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((value) => (this.id = value.get('id')));
    this.route.paramMap.subscribe(
      (value) => (this.mediaType = value.get('media_type'))
    );

    this.setValueToComponent(this.mediaType, this.id);
    this.getCast(this.mediaType, this.id)
  
  }

  setValueToComponent(mediaType: string, id: string) {
    this.movieService.getMediaDetails(mediaType, id).then((response) => {
      this.mediaDetails = response.data;
      console.log(this.mediaDetails);
      
    });
  }

  getImage(url: string) {
    return `https://image.tmdb.org/t/p/original/${url}`
  }

  converTime(time: number) {
    const horas = Math.floor(time / 60)
    const minutosRestantes = time % 60
    return `${horas}h ${minutosRestantes}m`
  }

  getCast(mediaType: string, id: string) {
    this.movieService.getMediaCast(mediaType, id).then((response) => {
      this.cast = response.data.cast
      console.log(this.cast)

    })
  }

}
