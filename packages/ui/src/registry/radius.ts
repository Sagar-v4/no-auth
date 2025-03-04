export const radius = [0, 0.25, 0.5, 0.75, 1] as const;

export type Radius = (typeof radius)[number];
