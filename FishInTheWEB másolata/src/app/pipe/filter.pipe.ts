import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: Product[], category: string): Product[] {
    return array.filter((products) => {
     return products.category == category

    })

  }

}
