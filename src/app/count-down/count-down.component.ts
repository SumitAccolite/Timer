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

  public countdownDuration = 5 * 60;
  public remainingTime = this.countdownDuration;
  public isPaused = false;

  public minutesToDday!: number;
  public secondsToDday!: number;

  private getTimeUnits() {
    this.minutesToDday = Math.floor(this.remainingTime / 60);
    this.secondsToDday = this.remainingTime % 60;
  }

  private startCountdown() {
    this.subscription = interval(1000).subscribe(() => {
      if (!this.isPaused) {
        this.remainingTime--;
        this.getTimeUnits();

        if (this.remainingTime <= 0) {
          this.stopCountdown();
        }
      }
    });
  }

  startTimer() {
    this.remainingTime = this.countdownDuration;
    this.startCountdown();
  }

  pauseTimer() {
    this.isPaused = true;
  }

  resumeTimer() {
    this.isPaused = false;
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

  ngOnInit() {
    this.resetTimer();
  }

  ngOnDestroy() {
    this.stopCountdown();
  }
}
