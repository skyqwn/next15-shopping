import {
  CreateVariantCriteria,
  VariantImageCriteria,
} from './create-variant.criteria';

export interface UpdateVariantCriteria extends CreateVariantCriteria {
  id: number;
}
