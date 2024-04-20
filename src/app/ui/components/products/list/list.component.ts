import { FileService } from './../../../../services/common/models/file.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { List_Product } from '../../../../contracts/list_product';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from '../../../../contracts/base_url';
import { BasketService } from '../../../../services/common/models/basket.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Add_Basket_Item } from '../../../../contracts/basket/add-basket-item';
import { CustomerToastrService, ToastrPosition, ToastrType } from '../../../../services/ui/customer-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit  {
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute,private FileService:FileService,
    private basketService:BasketService,spinner:NgxSpinnerService,private toast:CustomerToastrService
  ){
    super(spinner)
  }

  products:List_Product[];
  currentPageNo:number;
  totalProductCount:number;
  totalPageCount:number;
  pageSize:number = 10;
  baseUrl:BaseUrl;
  pageList: number[] = []

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params=> {

      this.baseUrl = await this.FileService.GetBaseStorageUrl();
      this.currentPageNo = params["pageNo"]?? 1;
      this.currentPageNo = parseInt(this.currentPageNo.toString())
      const datas = await this.productService.read(this.currentPageNo-1,this.pageSize,()=>{},errorMessage =>{
      })


      this.products = datas.products;

      this.products = this.products.map<List_Product>(p=> {
        const listProduct :List_Product ={
          id:p.id,
          name:p.name,
          price:p.price,
          stock:p.stock,
          updatedDate:p.updatedDate,
          createdDate:p.createdDate,
          productImageFiles:p.productImageFiles,
          imagePath: p.productImageFiles?.find(p=>p.showcase)?.path
        }
        return listProduct
      })

      this.totalProductCount = datas.totalCount;
      this.totalPageCount = Math.ceil(this.totalProductCount /this.pageSize);
      this.pageList = []

      if(this.currentPageNo - 3 <= 0 && this.totalPageCount<=7){
      
        for (let i = 1; i <= this.totalPageCount; i++) {
          this.pageList.push(i);
        }
      }
      else if(this.currentPageNo - 3 <= 0){
      
        for (let i = 1; i <= 7; i++) {
          this.pageList.push(i);
        }
      }
      else if(this.currentPageNo +3 >= this.totalPageCount){
        for (let i = this.totalPageCount -6; i <= this.totalPageCount; i++) {
          if(i>0) {
          this.pageList.push(i);
          }
        }
      }
      else{
        for(let i = this.currentPageNo -3; i <= this.currentPageNo + 3; i++){
          this.pageList.push(i);
        }
      }
    })
   
  }
  async addToBasket(product:List_Product){
    this.showSpinner(SpinnerType.BallFussion)
    let _basketItem:Add_Basket_Item = new Add_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
   await this.basketService.add(
      _basketItem
    );
    this.hideSpinner(SpinnerType.BallFussion)
    this.toast.message("Product added to basket","Success",{
      toastrPosition:ToastrPosition.TopRight,
      toastrType:ToastrType.Success
    })


  }

}
