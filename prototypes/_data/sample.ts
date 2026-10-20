// Typed access to the sample data shared by the prototypes (content in sample.json).
// Usage in a prototype: import { sample } from "../_data/sample";
import data from "./sample.json";

export interface SampleItem {
  id: string;
  title: string;
  description: string;
}

export interface SampleData {
  items: SampleItem[];
}

export const sample: SampleData = data;
