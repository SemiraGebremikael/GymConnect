import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserChatComponent } from './user/user-chat/user-chat.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
    {path:'', component: HeaderComponent},
    { path: 'user', component: UserComponent,
        // children: [
        //     {
        //         path: 'chat', component: UserChatComponent
        //     }
        // ]
    }, 
    {path: 'chat/:id', component: UserChatComponent},
    
];
