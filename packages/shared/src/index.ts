// ============ Common Types ============

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// ============ Project Types ============

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDto {
  name: string;
  description?: string;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
}

// ============ ProductLine Types ============

export interface ProductLine {
  id: string;
  name: string;
  color: string;
  projectId: string;
  prototypeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductLineDto {
  name: string;
  color?: string;
  projectId: string;
}

export interface UpdateProductLineDto {
  name?: string;
  color?: string;
}

// ============ Prototype Types ============

export interface Version {
  id: string;
  version: string;
  description?: string;
  filePath: string;
  createdAt: string;
}

export interface Prototype {
  id: string;
  name: string;
  productLineId: string;
  coverImage?: string;
  shareToken?: string;
  sharePassword?: string;
  versions: Version[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePrototypeDto {
  name: string;
  productLineId: string;
}

export interface UpdatePrototypeDto {
  name?: string;
  shareToken?: string;
  sharePassword?: string;
}

// ============ Comment Types ============

export interface Comment {
  id: string;
  prototypeId: string;
  versionId: string;
  pageIndex: number;
  x?: number;
  y?: number;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  resolved: boolean;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentDto {
  prototypeId: string;
  versionId: string;
  pageIndex: number;
  x?: number;
  y?: number;
  content: string;
}

// ============ Design System Types ============

export interface ColorToken {
  name: string;
  value: string;
}

export interface TypographyStyle {
  fontSize: number;
  fontWeight: number;
  lineHeight?: number;
  fontFamily?: string;
}

export interface DesignTokens {
  colors: ColorToken[];
  typography: Record<string, TypographyStyle>;
  spacing: number[];
  borderRadius: number[];
  shadows?: string[];
}

export interface DesignSystem {
  id: string;
  name: string;
  description?: string;
  tokens: DesignTokens;
  componentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDesignSystemDto {
  name: string;
  description?: string;
  tokens?: DesignTokens;
}

// ============ AI Types ============

export interface ParseDesignRequest {
  imageBase64?: string;
  fileUrl?: string;
  fileType: 'png' | 'jpg' | 'jpeg' | 'sketch' | 'figma';
}

export interface ParseDesignResponse {
  tokens: DesignTokens;
  components: Array<{
    name: string;
    description?: string;
  }>;
}

export interface GeneratePageRequest {
  prompt: string;
  designSystemId?: string;
  style?: 'mobile' | 'desktop' | 'tablet';
}

export interface GeneratePageResponse {
  code: string;
  previewUrl: string;
}

// ============ Auth Types ============

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
