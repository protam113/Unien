'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type VisibilityCategoryOption = 'show' | 'hide' | 'draft';

interface VisibilitySelectProps {
  value: VisibilityCategoryOption;
  onChange: (value: VisibilityCategoryOption) => void;
}

export const SelectCategoryStatus = ({
  value,
  onChange,
}: VisibilitySelectProps) => {
  const labelMap = {
    show: 'Show',
    hide: 'Hide',
    draft: 'Draft',
  };
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as VisibilityCategoryOption)}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Select visibility">
          {labelMap[value as VisibilityCategoryOption]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="show">Show</SelectItem>
        <SelectItem value="hide">Hide</SelectItem>
      </SelectContent>
    </Select>
  );
};
