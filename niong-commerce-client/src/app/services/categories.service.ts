import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import {
  EntityActionOptions,
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory, EntityOp,
  QueryParams
} from '@ngrx/data';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends EntityCollectionServiceBase<Category> {
  constructor(factory: EntityCollectionServiceElementsFactory) { super('Category', factory); }

  // getPageWithQuery(queryParams: QueryParams | string, options?: EntityActionOptions) {
  //   options = this.setQueryEntityActionOptions(options);
  //   const action = this.createEntityAction(
  //     EntityOp.QUERY_MANY,
  //     queryParams,
  //     options
  //   );
  //   this.dispatch(action);
  //   return this.getResponseData$<T[]>(options.correlationId).pipe(
  //     // Use the returned entity ids to get the entities from the collection
  //     // as they might be different from the entities returned from the server
  //     // because of unsaved changes (deletes or updates).
  //     withLatestFrom(this.entityCollection$),
  //     map(([entities, collection]) =>
  //       entities.reduce(
  //         (acc, e) => {
  //           const entity = collection.entities[this.selectId(e)];
  //           if (entity) {
  //             acc.push(entity); // only return an entity found in the collection
  //           }
  //           return acc;
  //         },
  //         [] as T[]
  //       )
  //     ),
  //     shareReplay(1)
  //   );
  // }
}
