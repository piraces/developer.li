import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { IPLookup } from '../interfaces/IPLookup';
import { LookupError } from 'src/interfaces/Error';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  domainAvailable = false;
  domainAvailableChecked = undefined;
  checkingAvailability = false;
  progress = 0;
  progressBarInterval: any;
  subdomain: any;
  baseDomain = '.developer.li';
  basePrefix = 'https://json.geoiplookup.io/';
  kofiUrl = 'https://ko-fi.com/F1F8OBQ5';
  registrySearchUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://freedns.afraid.org/domain/registry/?sort=5&q=developer.li&submit=SEARCH')}`;
  notOwned = 'Dosarrest';
  actualYear = new Date().getFullYear();
  subdomainCount = 0;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    this.getSubdomainsNumber();
  }

  public changeInput() {
    this.domainAvailable = false;
    this.domainAvailableChecked = undefined;
  }

  public supportMe() {
    this.document.location.href = this.kofiUrl;
  }

  public getActualClass() {
    if (typeof this.domainAvailableChecked === 'undefined') {
      return 'nes-input';
    } else if (this.domainAvailableChecked) {
      return ['nes-input', 'is-success'];
    } else if (!this.domainAvailableChecked) {
      return ['nes-input', 'is-error'];
    }
  }

  public startProgressBar() {
    this.progressBarInterval = setInterval(() => {
      if (this.progress >= 100) {
        this.progress = 0;
      } else {
        this.progress += 10;
      }
    }, 200);
  }

  public stopProgressBar() {
    clearInterval(this.progressBarInterval);
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

  public checkAvailability() {
    if (this.subdomain && this.subdomain.length > 0) {
      this.checkingAvailability = true;
      this.startProgressBar();
      this.http
        .get(this.basePrefix + this.subdomain + this.baseDomain)
        .subscribe(
          (data) => {
            let errorResponse = data as LookupError;
            const response = data as IPLookup;

            if (errorResponse && errorResponse.error && !errorResponse.success) {
              this.domainAvailable = true;
              this.domainAvailableChecked = true;
            } else if (response && response.isp && !response.isp.toLowerCase().includes(this.notOwned.toLowerCase())) {
              this.domainAvailable = false;
              this.domainAvailableChecked = false;
            } else {
              this.domainAvailable = true;
              this.domainAvailableChecked = true;
            }
            this.checkingAvailability = false;
            this.stopProgressBar();
          },
          (_) => {
            this.domainAvailable = false;
            this.domainAvailableChecked = false;
            this.checkingAvailability = false;
            this.stopProgressBar();
          });
    }
  }
}
