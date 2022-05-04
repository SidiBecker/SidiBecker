import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment.local';
import {
  Analytics,
  getAnalytics,
  logEvent,
  setAnalyticsCollectionEnabled,
} from 'firebase/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sidi-becker';

  private analytics!: Analytics;

  constructor() {
    const app = initializeApp(environment.FIREBASE_CONFIG);
    const analytics = getAnalytics(app);

    this.analytics = analytics;

    setAnalyticsCollectionEnabled(analytics, true);
  }

  visit(target: string) {
    logEvent(this.analytics, 'visit', { target });
  }
}
