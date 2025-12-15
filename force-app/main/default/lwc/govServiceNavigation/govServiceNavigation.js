import { LightningElement, api, track } from 'lwc';
import getDefaultMenuItems from '@salesforce/apex/GovComponentHelper.getDefaultMenuItems';
import sitePath from '@salesforce/community/basePath';

class NavigationItem {
    label;
    target;
    targetPrefs;
    type;
    selected;
    constructor(rec, selected, communityBasePath) {
        this.label = rec.Label;
        this.target = rec.Type === 'ExternalLink' && rec.TargetPrefs ? rec.Target : rec.Type === 'InternalLink' ? communityBasePath + rec.Target : rec.Type === 'Event' ? communityBasePath + '/' + rec.Target.toLowerCase() : rec.Target;
        this.targetPrefs = rec.TargetPrefs;
        this.type = rec.Type;
        this.id = rec.Id;
        this.selected = selected;
        this.communityBasePath = communityBasePath;
        this.class = selected === true ? 'govuk-service-navigation__item govuk-service-navigation__item--active' : 'govuk-service-navigation__item';
        }
}
                      
export default class GovServiceNavigation extends LightningElement {

    @api navigationMenuDevName = "Default_Navigation";
    @api serviceName = 'Service Name';
    @api serviceURL = '#';
    @track menuItems;
    @track pageTarget;
    communityBasePath = sitePath;
    
    connectedCallback() {

        this.callMenuItems();
        this.getPageTarget(); 
        
    }

    getPageTarget() {
        let urlParts = window.location.href.split("/");
        this.pageTarget = `/${urlParts.pop()}`;
        this.pageTarget = this.pageTarget.split('#')[0];
    }

    callMenuItems() {
        getDefaultMenuItems({
            strNavigationMenuDevName: this.navigationMenuDevName
        }).then((menuItems) => {
            // console.log('menuItems:', JSON.stringify(menuItems));
            this.menuItems = menuItems.map((menuItem) => {
                let selected = menuItem.Target === this.pageTarget ? true : false;
                return new NavigationItem(menuItem, selected, this.communityBasePath);
            })

            // console.log('this menu', JSON.stringify(this.menuItems))
        }).catch((err => {
            console.error('error: ', JSON.stringify(err.message));
        }))
    }
}