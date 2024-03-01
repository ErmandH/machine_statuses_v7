import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fertilizer-calibration',
  templateUrl: './fertilizer-calibration.page.html',
  styleUrls: ['./fertilizer-calibration.page.scss'],
})
export class FertilizerCalibrationPage {

  tourCount=0;
  tab_index = 0;
  constructor(private route: ActivatedRoute, private router: Router) {
  }

  startTour(){
    this.tab_index = 1;
  }
  testSection(){
    this.tab_index = 2;
  }
  startTest(){
    this.tab_index = 3;
  }
  testOk(){
    this.tab_index = 4;
  }

  close(){
    this.route.queryParams.subscribe((params) => {
      const returnUrl: string = params['returnUrl'];
      this.router.navigateByUrl(returnUrl)
    });
  }
  closeTest(){
    this.route.queryParams.subscribe((params) => {
      const returnUrl: string = params['returnUrl'];
      this.router.navigateByUrl(returnUrl)
    });
  }

}
