import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Category: {
    selectId: m => m._id
  },
  Order: {},
  Product: {},
  User: {},
};

const pluralNames = {
  Category: 'categories'
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
