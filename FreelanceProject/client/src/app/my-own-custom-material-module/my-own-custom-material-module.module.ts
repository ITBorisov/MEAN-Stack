import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule,
  MatInputModule, MatFormFieldModule, MatCardModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatInputModule, MatFormFieldModule, MatCardModule],
  exports: [MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatInputModule, MatFormFieldModule, MatCardModule],
  declarations: []
})
export class MyOwnCustomMaterialModuleModule { }
