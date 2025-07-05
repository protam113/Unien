export interface Category {
  _id: string;
  name: string;
}

export interface CategoryCardProps {
  onCategorySelect?: (categoryId: string | null) => void;
  type;
}
