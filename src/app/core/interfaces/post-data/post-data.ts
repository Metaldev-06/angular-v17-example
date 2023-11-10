export interface PostData {
  data: PostDatum[];
  meta: Meta;
}

export interface PostDatum {
  id: number;
  attributes: DatumAttributes;
}

export interface DatumAttributes {
  title: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  post: Post[];
  description: string;
  technology: string[];
  postExample: string;
  image: Image;
}

export interface Image {
  data: Data;
}

export interface Data {
  id: number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface Formats {
  small: Medium;
  medium: Medium;
  thumbnail: Medium;
}

export interface Medium {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: ResourceType;
}

export enum ResourceType {
  Image = 'image',
}

export interface Post {
  type: PostType;
  level?: number;
  children: Child[];
}

export interface Child {
  text: string;
  type: ChildType;
}

export enum ChildType {
  Text = 'text',
}

export enum PostType {
  Code = 'code',
  Heading = 'heading',
  Paragraph = 'paragraph',
  Quote = 'quote',
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
