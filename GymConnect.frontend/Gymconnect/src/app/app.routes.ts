import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserChatComponent } from './user/user-chat/user-chat.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
    {
    path:'user', component: HeaderComponent ,
    //  children: [
    //   { path: '', component: UserComponent },
    //   { path: 'chat/:id', component: UserChatComponent }
    // ]
    }
    ,{ 
        path: '', component: UserComponent,
        // children: [
        //     {
        //         path: 'chat', component: UserChatComponent
        //     }
        // ]
    }, 
    {
                path: 'chat/:id', component: UserChatComponent,
    }
];
