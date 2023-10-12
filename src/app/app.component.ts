import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  liberaPayUrl = 'https://liberapay.com/piraces';
  registrySearchUrl = `https://api.allorigins.win/get?charset=ISO-8859-1&url=${encodeURIComponent('https://freedns.afraid.org/domain/registry/?sort=5&q=developer.li&submit=SEARCH')}`;
  actualYear = new Date().getFullYear();
  subdomainCount = 0;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    this.getSubdomainsNumber();
  }


  public supportMe() {
    this.document.location.href = this.liberaPayUrl;
  }

  public getSubdomainsNumber() {
    this.http.get(this.registrySearchUrl, {responseType: 'text'}).subscribe(
      (data) => {
        if (data) {
          const matches = data.match(/\([0-9]+\shosts\sin\suse\)/g);
          if (matches && matches.length > 0) {
            const subdomains = matches[0].replace('(', '').replace('hosts in use)', '').trim();
            if (!isNaN(+subdomains)) {
              this.subdomainCount = Number.parseInt(subdomains);
            } else {
              this.subdomainCount = 0;
            }
          }
        }
      },
      (_) => {
        this.subdomainCount = 0;
      }
    );
  }
}
