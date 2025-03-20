import { HelloProps } from "./types";

export function hello(props: HelloProps): string {
  return `Hello, ${props.name}!`;
}
