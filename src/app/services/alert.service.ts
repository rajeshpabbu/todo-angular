import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

  constructor() { }

  private alerts = [];
  private maxCount = 2;
  
  getAlertsQueue() {
    return this.alerts;
  }

  updateAlertQueue(newalert) {
    this.alerts.unshift(newalert);
    this.alerts.length = this.maxCount;
  }

}
