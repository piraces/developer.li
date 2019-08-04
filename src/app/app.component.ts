import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { IPLookup } from '../interfaces/IPLookup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  domainAvailable = false;
  domainAvailableChecked = undefined;
  subdomain: any;
  baseDomain = '.developer.li';
  basePrefix = 'https://json.geoiplookup.io/';
  kofiURL = 'https://ko-fi.com/F1F8OBQ5';
  notOwned = 'DosArrest';
  actualYear = new Date().getFullYear();

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: any) {
  }

  public changeInput() {
    this.domainAvailable = false;
    this.domainAvailableChecked = undefined;
  }

  public supportMe() {
    this.document.location.href = this.kofiURL;
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

  public checkAvailability() {
    if (this.subdomain && this.subdomain.length > 0) {
      this.http
        .get(this.basePrefix + this.subdomain + this.baseDomain)
        .subscribe(
          (data) => {
            let response = data as IPLookup;
            if (response && !response.org.includes(this.notOwned)) {
              this.domainAvailable = false;
              this.domainAvailableChecked = false;
            } else {
              this.domainAvailable = true;
              this.domainAvailableChecked = true;
            }
          },
          (err) => {
            this.domainAvailable = false;
            this.domainAvailableChecked = false;
          });
    }
  }
}
