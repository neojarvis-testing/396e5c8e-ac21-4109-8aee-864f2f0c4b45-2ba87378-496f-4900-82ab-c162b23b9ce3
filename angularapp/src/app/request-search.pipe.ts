import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestSearch'
})
export class RequestSearchPipe implements PipeTransform {

  transform(items:any[], searchText:string): any[]{
    if(!items || !searchText){
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item =>
      item.agroChemicalId.name.toLowerCase().includes(searchText) ||
      item.agroChemicalId.brand.toLowerCase().includes(searchText) ||
      item.agroChemicalId.category.toLowerCase().includes(searchText)
    );
  }

}
