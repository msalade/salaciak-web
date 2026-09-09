export function shouldPlayBoot({ shared, reduced }: {
  shared: boolean; reduced: boolean;
}) {
  return !reduced && !shared;
}
