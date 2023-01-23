export enum TopLevelCategory {
  Cources,
  Services,
  Books,
  Products
}

export class TopPageModel {
  firstCategory: TopLevelCategory;
  secondCategory: string;
  title: string;
  category: string;
  hh?: {
    count: number;
    juniorSalary: string;
    middleSalary: string;
    seniorSalary: string;
  };
  advantages: {
    title: string;
    description: string;
  }[];
  seoText: string;
  tagsTitle: string;
  tags: string[];

}

