import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ApplicationService } from '../../../services/common/models/application.service';
import { DialogService } from '../../../services/common/dialog.service';
import { AuthorizeMenuDialogComponent } from '../../../dialogs/authorize-menu-dialog/authorize-menu-dialog.component';
@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrl: './authorize-menu.component.scss'
})
export class AuthorizeMenuComponent extends BaseComponent  implements OnInit{

  constructor( spinner:NgxSpinnerService,private applicationService:ApplicationService,
    private dialogService:DialogService
  ){
    super(spinner)
  }
  async ngOnInit() {
    this.dataSource.data = (await this.applicationService.getAuthorizeDefinitionEndpoints()).map(m=>{
      const treeMenu:ITreeMenu = {
        name: m.name,
        actions : m.actions.map(a=>{
          const _treeMenu :ITreeMenu = {
            name :a.definition,
            code:a.code,
            menuName:m.name
          }
          return _treeMenu;
        })
      }
      return treeMenu;
    });
  }


  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    (menu: ITreeMenu, level: number) => {
      return {
        expandable: menu.actions?.length >0,
        name: menu.name,
        level: level,
        code:menu?.code,
        menuName:menu.menuName
      };
    },
    node => node.level,
    node => node.expandable,
    node => node.actions,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  assignRole(code:string,name:string,menuName:string){
    this.dialogService.openDialog({
      componentType:AuthorizeMenuDialogComponent,
      data:{code,name,menuName},
      options:{
        width:"750px"
      },
      afterClosed:()=>{
        
      }
    })
  }

}


interface ITreeMenu{
  name?:string;
  actions?:ITreeMenu[];
  code?:string;
  menuName?:string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
