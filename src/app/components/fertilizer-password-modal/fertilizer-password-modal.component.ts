import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fertilizer-password-modal',
  templateUrl: './fertilizer-password-modal.component.html',
  styleUrls: ['./fertilizer-password-modal.component.scss'],
})
export class FertilizerPasswordModalComponent {
  constructor(private modalCtrl: ModalController, private router: Router) {}

  goBack() {
    this.modalCtrl.dismiss();
  }
  
  goTabTwo(){
    this.modalCtrl.dismiss('passed');
    this.router.navigate(['/tabs/settings-tab2'])
  }
}
