import {Component} from '@angular/core';
import {TripService} from './services/trip.service';
import {TRIP} from './models/tripModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CS591 PS6';
  origin: string;
  destination: string;
  data: any = {};
  found: boolean;

  getTripInfo(): void {
    const info = {origins: this.origin, destinations: this.destination};
    this.tripService.getTrip(info)
      .subscribe(trips => {
        if (Object.keys(trips).length) {
          this.data = trips;
          this.found = true;
          console.log(trips);
        }
      });
  }

  constructor(private tripService: TripService) {
  }

}

