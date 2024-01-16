import { Pipe, PipeTransform } from '@angular/core';
import { ImageData } from '@src/app/core/interfaces/home-data/home-data';

@Pipe({
  name: 'imagePipe',
  standalone: true,
})
export class ImagePipe implements PipeTransform {
  transform(value: ImageData, ...args: unknown[]): string {
    console.log(value);
    const imageUrl = value.data[0].attributes?.formats?.medium?.url;
    return imageUrl || value.data[0].attributes.url;
  }
}
