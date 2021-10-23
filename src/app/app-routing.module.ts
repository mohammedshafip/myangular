import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyclassComponent } from './myclass/myclass.component';
import { MystudentComponent } from './mystudent/mystudent.component';


const routes: Routes = [
{
  path:"myclass", component:MyclassComponent
},
{ path:"student",component:MystudentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
