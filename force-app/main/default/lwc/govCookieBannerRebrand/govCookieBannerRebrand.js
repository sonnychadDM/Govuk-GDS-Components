import { LightningElement, api } from 'lwc';

export default class GovCookieBannerRebrand extends LightningElement {

        isVisible;
        @api label;    
        @api cookiePageUrl;
        @api acceptLabel;
        @api rejectLabel;
        @api bannerContent;
        @api preferencesSetCookieName;
        @api optionalCookieNames;

}