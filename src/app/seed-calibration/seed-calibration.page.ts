import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-seed-calibration',
  templateUrl: './seed-calibration.page.html',
  styleUrls: ['./seed-calibration.page.scss'],
})
export class SeedCalibrationPage {
  constructor(
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('seed-calibration-page.row-reset.title'),
      subHeader: this.translate.instant(
        'seed-calibration-page.row-reset.description'
      ),
      cssClass: 'row-reset-alert',
      buttons: [
        {
          text: this.translate.instant('seed-calibration-page.ok'),
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }

  // goBack(){
  //   this.location.back()
  // }
  goBack() {
    this.route.queryParams.subscribe((params) => {
      const returnUrl: string = params['returnUrl'];
      this.router.navigateByUrl(returnUrl)
    });
  }
}
