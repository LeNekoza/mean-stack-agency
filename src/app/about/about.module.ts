import { NgModule } from "@angular/core";
import { AboutComponent } from '../about/about.component';
@NgModule({
    declarations: [AboutComponent], //components, directives, pipes
    imports: [], //modules
    exports: [AboutComponent], //items from declarations and imports
    providers: [], //services
})

export class AboutModule{}