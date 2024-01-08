// count-down.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
})
export class CountDownComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  private startTime: number = 0;

  public countdownDuration = 5 * 60;
  public remainingTime = this.countdownDuration;
  public isPaused = false;

  public minutesToDday!: number;
  public secondsToDday!: number;

  private startCountdown() {
    this.startTime = Date.now();

    this.subscription = interval(1000).subscribe(() => {
      if (!this.isPaused) {
        const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        this.remainingTime = Math.max(0, this.countdownDuration - elapsedTime);
        this.getTimeUnits();

        if (this.remainingTime <= 0) {
          this.stopCountdown();
        }
      }
    });
  }

  startTimer() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.isPaused = false;
    this.remainingTime = this.countdownDuration;
    this.startCountdown();
  }

  pauseTimer() {
    this.isPaused = true;
  }

  resumeTimer() {
    this.isPaused = false;
    this.startTime =
      Date.now() - (this.countdownDuration - this.remainingTime) * 1000;
  }

  resetTimer() {
    this.stopCountdown();
    this.remainingTime = this.countdownDuration;
    this.getTimeUnits();
  }

  stopCountdown() {
    this.isPaused = true;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getTimeUnits() {
    this.minutesToDday = Math.floor(this.remainingTime / 60);
    this.secondsToDday = this.remainingTime % 60;
  }

  ngOnInit() {
    this.resetTimer();
  }

  ngOnDestroy() {
    this.stopCountdown();
  }
}
