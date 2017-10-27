import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule,
  MatInputModule, MatFormFieldModule, MatCardModule, MatListModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatInputModule, 
  MatFormFieldModule, MatCardModule, MatListModule],
  exports: [MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatInputModule, 
  MatFormFieldModule, MatCardModule, MatListModule],
  declarations: []
})
export class MyOwnCustomMaterialModuleModule { }
