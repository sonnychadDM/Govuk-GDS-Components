import { LightningElement, track, api } from 'lwc';

class ColumnItem {
    Name;
    URL;
} 

export default class GovFooterRebrandDM extends LightningElement {
     // Secondary Navigation Input variables
    @api secondaryNavigationRequired = false;
    @api singleColumnHeader = "";
    @api doubleColumnHeader = "";
    @api singleColumnURLs = "";
    @api singleColumnNames ="";
    @api doubleColumnURLs = "";
    @api doubleColumnNames = "";

    // Links with Meta Information Input variables
    @api metalinkNames = "";
    @api metalinkURL = "";
    @api metalinksRequired = false;
    @api visuallyHiddenLinksText = '';

    //Crest Copyright Logo input variables
    @api crestRequired = false;

    //Custom text and links for foote
    @api footerCustomText = "";
    @api footerCustomLink = "";
    @api footerCustomLinkText = "";

    // fields to show consolidated data on UI
    @track finalNavData = []; 
    @track finalMetaLinkData = [];
    @track isMetalinksPresent = false;
    @track isNavLLinksPresent = false;


    connectedCallback(){
   
        let metalinkNameList = this.metalinkNames? this.metalinkNames.split(';') : [];
        let metalinkURLList = this.metalinkURL ? this.metalinkURL.split(';') : [];

        //array to store multiple metalinks and URLs
        let metalinkObj = {
        metaLinkName :'',
        metaLinkURL : ''
        }

        //This loop will save the array of metalinks and URLs to iterate on the UI
        for(let i=0; i<metalinkNameList.length;i++){
            metalinkObj.metaLinkName = metalinkNameList[i];
            metalinkObj.metaLinkURL = metalinkURLList[i];
            this.finalMetaLinkData.push(metalinkObj);
            metalinkObj = {
                metaLinkName :'',
                metaLinkURL : ''
            }
        }

        this.handleLinksandNames()

    }

    finalSingleColumnItems = [];
    finalDoubleColumnItems = [];
    handleLinksandNames() {

        let singleColumnItem = new ColumnItem;
        let doubleColumnItem = new ColumnItem;

        let singleColumnNameList = this.singleColumnNames ? this.singleColumnNames.split(';') : [];
        let singleColumnURLList = this.singleColumnURLs ? this.singleColumnURLs.split(';') : [];
        let doubleColumnNameList = this.doubleColumnNames ? this.doubleColumnNames.split(';') : [];
        let doubleColumnURLList = this.doubleColumnURLs ? this.doubleColumnURLs.split(';') : [];


        //iterate for single columns
        for(let i=0; i<singleColumnNameList.length; i++) {
            singleColumnItem.Name = singleColumnNameList[i];
            singleColumnItem.URL = singleColumnURLList[i];
            this.finalSingleColumnItems.push(singleColumnItem);
            singleColumnItem = new ColumnItem;
        }

        for(let i=0; i<doubleColumnNameList.length; i++) {
            doubleColumnItem.Name = doubleColumnNameList[i];
            doubleColumnItem.URL = doubleColumnURLList[i];
            this.finalDoubleColumnItems.push(doubleColumnItem);
            doubleColumnItem = new ColumnItem;
        }
    }
}