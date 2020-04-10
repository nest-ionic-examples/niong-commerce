import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Category: {
    selectId: m => m._id
  },
  Order: {
    selectId: m => m._id
  },
  Product: {
    selectId: m => m._id
  },
  User: {
    selectId: m => m._id
  },
};

const pluralNames = {
  Category: 'categories'
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
