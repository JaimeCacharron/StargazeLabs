
export enum TrendMaturity {
  WEAK_SIGNAL = 'Weak Signal',
  PRE_BREAKOUT = 'Pre-Breakout',
  EARLY_MAINSTREAM = 'Early Mainstream'
}

export enum Category {
  BEVERAGE = 'Beverage',
  SNACK = 'Snack',
  MEAL_KIT = 'Meal Kit',
  INGREDIENT = 'Ingredient',
  FORMAT = 'Format'
}

export enum SignalType {
  SEARCH = 'search',
  SOCIAL = 'social',
  RETAIL = 'retail',
  ADS = 'ads',
  CREATOR = 'creator',
  REVIEW = 'review',
  FUNDING = 'funding'
}

export enum AccelerationCurve {
  FLAT = 'flat',
  ACCELERATING = 'accelerating',
  PEAKING = 'peaking'
}

export enum AgeBracket {
  GEN_Z = 'Gen Z (18-24)',
  YOUNG_MILLENNIAL = 'Young Millennial (25-34)',
  OLDER_MILLENNIAL = 'Older Millennial (35-44)',
  GEN_X = 'Gen X (45-54)',
  SILVER = '55+'
}

export enum GenderProfile {
  MALE = 'Male',
  FEMALE = 'Female',
  NEUTRAL = 'Neutral/Mixed'
}

export interface PatternAnalysis {
  repeating_drivers: string[];
  format_convergence: string;
  claim_convergence: string;
  standardization_signals: string;
}

export interface DemographicInference {
  dominant_age: AgeBracket;
  dominant_gender: GenderProfile;
  confidence: 'low' | 'medium' | 'high';
  inference_logic: string;
}

export interface SignalSource {
  name: string;
  type: 'search' | 'social' | 'retail' | 'capital' | 'community';
  velocity: number; // 0-100
  momentum: 'up' | 'stable' | 'down';
}

export interface SignalObject {
  id: string;
  signal_type: SignalType;
  source: string;
  raw_excerpt: string;
  keyword_cluster: string;
  velocity: number; // 0-100 (week-over-week)
  novelty_score: number; // 0-100
  geo_origin: string; // Region/State
  detected_at: string; // ISO String
  confidence: 'low' | 'medium' | 'high';
  linked_trends: string[]; // IDs of TrendObjects
  demographics: DemographicInference; // Probabilistic layer
}

export interface ConfidenceMetrics {
  momentum: number;         // Velocity of volume/authors (0-100)
  breadth: number;          // Cross-channel presence (0-100)
  persistence: number;      // Weeks active (0-100)
  novelty: number;          // New language + adjacencies (0-100)
  commercialization: number;// Ads + retail pilots (0-100)
  geo_diffusion: number;    // Metro spreading (0-100)
  noise_penalty: number;     // Single-source spikes, low diversity (0-100)
}

export interface DiffusionNode {
  label: string;
  status: 'active' | 'pending' | 'saturated';
  avg_lag_months: number;
}

export interface DiffusionProfile {
  path: DiffusionNode[];
  current_node_index: number;
  origin_region: string;
}

export interface TrendDemographicProfile {
  age_distribution: Record<AgeBracket, number>; // Percentage 0-100
  gender_skew: Record<GenderProfile, number>; // Percentage 0-100
  regional_concentration: string[]; // Top states/metros
  early_adopter_profile: string;
}

export interface WeeklyActivity {
  signals_7d: number;
  wow_change_pct: number;
}

export interface TrendObject {
  id: string;
  title: string;
  definition: string;
  category: Category;
  maturity: TrendMaturity;
  primaryDriver: string;
  secondaryDriver: string; 
  sources: SignalSource[];
  evidenceSummary: string;
  timeHorizon: string;
  productImplications: string[];
  confidenceMetrics: ConfidenceMetrics;
  lastUpdated: string;
  first_detected: string; // ISO String
  last_signal_seen: string; // ISO String
  acceleration_curve: AccelerationCurve;
  time_to_mainstream_estimate: string;
  demographic_profile: TrendDemographicProfile;
  maturity_by_cohort: Partial<Record<AgeBracket, TrendMaturity>>;
  diffusion_profile: DiffusionProfile;
  weekly_activity: WeeklyActivity;
}

export interface SimulationResult {
  hypotheticalSignals: SignalObject[];
  consumerDriver: string;
  adjacentCategories: string[];
  speculativeConfidence: 'low' | 'medium' | 'high';
  validationCriteria: string;
  falsificationCriteria: string;
  hypotheticalDiffusion: DiffusionProfile;
}

export const calculateConfidenceScore = (metrics: ConfidenceMetrics): number => {
  const { 
    momentum, 
    breadth, 
    persistence, 
    novelty, 
    commercialization, 
    geo_diffusion, 
    noise_penalty 
  } = metrics;

  // Weighted sum (weights total to 1.0)
  const weights = {
    momentum: 0.20,
    breadth: 0.15,
    persistence: 0.20,
    novelty: 0.15,
    commercialization: 0.15,
    geo_diffusion: 0.15
  };

  const rawSum = 
    (momentum * weights.momentum) +
    (breadth * weights.breadth) +
    (persistence * weights.persistence) +
    (novelty * weights.novelty) +
    (commercialization * weights.commercialization) +
    (geo_diffusion * weights.geo_diffusion);

  // Noise penalty subtracts from the score (capped at 30% reduction)
  const penaltyFactor = (noise_penalty / 100) * 0.3;
  const scoreWithPenalty = rawSum * (1 - penaltyFactor);

  // Logistic normalization for smoother 0-100 output
  const k = 0.12;
  const midPoint = 50;
  const logisticScore = 100 / (1 + Math.exp(-k * (scoreWithPenalty - midPoint)));

  return Math.round(logisticScore);
};
