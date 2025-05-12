import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cropSearch'
})
export class CropSearchPipe implements PipeTransform {

  transform(items:any[], searchText:string): any[]{
    if(!items || !searchText){
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item =>
      item.name.toLowerCase().includes(searchText) ??
      item.brand.toLowerCase().includes(searchText) ??
      item.category.toLowerCase().includes(searchText)
    );
  }

}
