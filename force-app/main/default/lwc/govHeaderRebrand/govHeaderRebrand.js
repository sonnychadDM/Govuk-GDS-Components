import {LightningElement, api} from 'lwc';
import {NavigationMixin} from "lightning/navigation";

export default class GovHeaderRebrandDM  extends NavigationMixin(LightningElement) {
    
    @api serviceURL = "#";

}