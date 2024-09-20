import { Component, OnInit, OnDestroy } from '@angular/core';
import { GraphQLService } from './graphql.service';
import { Subject, takeUntil } from 'rxjs';

interface Geography {
  GeographyID: string;
  ZipCodeBKey: string;
  County: string;
  City: string;
  State: string;
  Country: string;
  ZipCode: string;
}

@Component({
  selector: 'app-geographies',
  templateUrl: './geographies.component.html',
  styleUrls: ['./geographies_style.css']
})
export class GeographiesComponent implements OnInit, OnDestroy {
  geographies: Geography[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private graphQLService: GraphQLService,
  ) {}

  ngOnInit() {
    this.graphQLService.getGeographies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.geographies = data;
        },
        error: (error) => {
          console.error('Error fetching geographies:', error);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
