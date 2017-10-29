import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule,
  MatInputModule, MatFormFieldModule, MatCardModule, MatListModule, MatSelectModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatInputModule,
  MatFormFieldModule, MatCardModule, MatListModule, MatSelectModule],
  exports: [MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatInputModule,
  MatFormFieldModule, MatCardModule, MatListModule, MatSelectModule],
  declarations: []
})
export class MyOwnCustomMaterialModuleModule { }
