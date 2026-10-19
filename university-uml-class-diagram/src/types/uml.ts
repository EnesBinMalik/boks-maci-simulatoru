export type RelationshipType = 
  | 'composition'     // Bileşim (Siyah Dolu Eşkenar Dörtgen)
  | 'aggregation'     // Kümeleme (Beyaz Boş Eşkenar Dörtgen)
  | 'generalization'  // Genelleme / Kalıtım (İçi Boş Üçgen Ok)
  | 'association';    // İlişki (Düz çizgi, yön veya etiket)

export interface UMLClass {
  id: string;
  name: string;
  turkishName: string;
  stereotype?: string;
  description: string;
  category: 'core' | 'structure' | 'actor' | 'location';
  x: number;
  y: number;
  width: number;
  height: number;
  sampleAttributes?: string[];
  sampleMethods?: string[];
}

export interface UMLRelationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  sourceMultiplicity?: string;
  targetMultiplicity?: string;
  label?: string;
  ruleNumber: 1 | 2 | 3 | 4;
  ruleDescription: string;
  detailedRationale: string;
}

export interface RuleAnalysis {
  ruleNumber: 1 | 2 | 3 | 4;
  promptText: string;
  umlConcept: string;
  involvedClasses: string[];
  involvedRelationships: string[];
  explanation: string;
  technicalNote: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  ruleNumber?: 1 | 2 | 3 | 4;
}

export type ThemeMode = 'blueprint' | 'slate' | 'minimal' | 'academic';
export type LayoutPreset = 'hierarchical' | 'horizontal' | 'clustered';
