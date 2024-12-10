import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../../../mfe-noticias/src/app/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    // configuração pra carregar o mfe 
    path: 'profile',
    // aqui vamos carregar nosso microfrontend 
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost:4200/remoteEntry.js', 
      // nome do mfe 
      remoteName: 'mfeNoticias', 
      // nome do module 
      exposedModule: './ProfileModule'
    })
    .then((m) => m.ProfileModule)
    .catch((error) => console.log(error))
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
