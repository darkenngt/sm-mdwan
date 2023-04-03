import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    @Input() deliveryDate: any;
    @Input() holaMundo: any
    @Input() orderType: any;
  
    public dateNow = new Date();
    //public dDay = new Date('Jan 01 2021 00:00:00');
    public dDay = new Date (this.dateNow)

    milliSecondsInASecond = 1000;
    hoursInADay = 24;
    minutesInAnHour = 60;
    SecondsInAMinute  = 60;

    public timeDifference;
    public secondsToDday;
    public minutesToDday;
    public hoursToDday;
    public daysToDday;

    constructor(){
        
    }


    private getTimeDifference () {
        this.secondsToDday = 0
        this.minutesToDday = 0
        this.hoursToDday = 0
        this.daysToDday = 0
        if (this.dDay.getTime() > new Date().getTime() && this.orderType === 3){
            this.timeDifference = this.dDay.getTime() - new  Date().getTime();
            this.allocateTimeUnits(this.timeDifference);
        }
        if (this.dDay.getTime() < new Date().getTime() && this.orderType !== 3){
            this.timeDifference = new Date().getTime() - this.dDay.getTime()
            this.allocateTimeUnits(this.timeDifference);
        }
    }

  private allocateTimeUnits (timeDifference) {
        this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
        this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
        this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
        this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

    ngOnInit() {
        //console.log(this.deliveryDate)
        //console.log(new Date())
        //console.log(this.orderType)
        this.dDay = this.deliveryDate
       this.subscription = interval(1000)
           .subscribe(x => { this.getTimeDifference(); });
    }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }

}