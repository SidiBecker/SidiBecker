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

  public avatarUrl!: string;

  private analytics!: Analytics;

  constructor() {
    const app = initializeApp(environment.FIREBASE_CONFIG);
    const analytics = getAnalytics(app);

    this.analytics = analytics;

    setAnalyticsCollectionEnabled(analytics, true);

    fetch(`https://api.github.com/users/sidibecker`)
      .then(async obj => {
        const githubInfo: any = await obj.json();
        this.avatarUrl = githubInfo.avatar_url;
        document.title = 'Sidnei Becker'
      });
  }

  visit(target: string) {
    logEvent(this.analytics, 'visit', { target });
  }
}
