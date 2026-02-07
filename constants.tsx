
import { TrendMaturity, Category, TrendObject, SignalObject, SignalType, AccelerationCurve, AgeBracket, GenderProfile, PatternAnalysis } from './types';

export const TIER_PATTERNS: Record<TrendMaturity, PatternAnalysis> = {
  [TrendMaturity.WEAK_SIGNAL]: {
    repeating_drivers: ['Metabolic health', 'Stress management', 'Longevity'],
    format_convergence: 'Fragmentation across shelf-stable pantry staples (honey, broth) and daily ritual beverages.',
    claim_convergence: 'Shift from "energy" to "cortisol regulation" and "adrenal support".',
    standardization_signals: 'Emergence of "precise dosage" language in non-supplement food formats.'
  },
  [TrendMaturity.PRE_BREAKOUT]: {
    repeating_drivers: ['GLP-1 Support', 'Appetite suppression', 'Performance'],
    format_convergence: 'High-density micro-formats (shots, wafers, micro-meals) aimed at reduced gastric capacity.',
    claim_convergence: 'Focus on "muscle preservation" and "texture-softness" for appetite-suppressed users.',
    standardization_signals: 'Early D2C players standardizing "GLP-1 Friendly" labeling across categories.'
  },
  [TrendMaturity.EARLY_MAINSTREAM]: {
    repeating_drivers: ['Gut Health', 'Protein intake', 'Moderation'],
    format_convergence: 'RTD (Ready-to-Drink) dominance across sodas, coffee, and cocktails.',
    claim_convergence: 'Mainstreaming of "prebiotic" and "zero-proof" as baseline consumer expectations.',
    standardization_signals: 'Mass-market adoption of slim-can and multipack variety bundles in big-box retail.'
  }
};

const genDetailedMetrics = (base: number) => ({
  momentum: Math.min(100, base + Math.floor(Math.random() * 20)),
  breadth: Math.min(100, base + Math.floor(Math.random() * 15)),
  persistence: Math.min(100, base + Math.floor(Math.random() * 25)),
  novelty: Math.min(100, base + Math.floor(Math.random() * 30)),
  commercialization: Math.min(100, base + Math.floor(Math.random() * 10)),
  geo_diffusion: Math.min(100, base + Math.floor(Math.random() * 20)),
  noise_penalty: Math.floor(Math.random() * 15)
});

const createTrend = (id: string, title: string, maturity: TrendMaturity, category: Category, drivers: [string, string], ages: number[], genders: number[]): TrendObject => {
  return {
    id,
    title,
    definition: `Emerging movement focused on ${title.toLowerCase()} as a primary driver for ${drivers[0].toLowerCase()}.`,
    category,
    maturity,
    primaryDriver: drivers[0],
    secondaryDriver: drivers[1],
    sources: [{ name: 'System Feed', type: 'social', velocity: 50, momentum: 'stable' }],
    evidenceSummary: 'Cross-channel signal growth and emerging community discussion.',
    timeHorizon: '12-18 months',
    productImplications: [`High-potential ${category.toLowerCase()} format`],
    confidenceMetrics: genDetailedMetrics(maturity === TrendMaturity.WEAK_SIGNAL ? 40 : maturity === TrendMaturity.PRE_BREAKOUT ? 60 : 80),
    lastUpdated: '2024-05-22',
    first_detected: '2024-01-01',
    last_signal_seen: '2024-05-22',
    acceleration_curve: AccelerationCurve.ACCELERATING,
    time_to_mainstream_estimate: maturity === TrendMaturity.WEAK_SIGNAL ? '20 months' : maturity === TrendMaturity.PRE_BREAKOUT ? '12 months' : '4 months',
    demographic_profile: {
      age_distribution: {
        [AgeBracket.GEN_Z]: ages[0],
        [AgeBracket.YOUNG_MILLENNIAL]: ages[1],
        [AgeBracket.OLDER_MILLENNIAL]: ages[2],
        [AgeBracket.GEN_X]: ages[3],
        [AgeBracket.SILVER]: ages[4],
      },
      gender_skew: {
        [GenderProfile.FEMALE]: genders[0],
        [GenderProfile.MALE]: genders[1],
        [GenderProfile.NEUTRAL]: genders[2],
      },
      regional_concentration: ['CA', 'NY', 'TX'],
      early_adopter_profile: 'High-intent health explorers and ritual experimentalists.'
    },
    maturity_by_cohort: {},
    diffusion_profile: {
      origin_region: 'CA',
      current_node_index: 0,
      path: [{ label: 'Alpha Beta', status: 'active', avg_lag_months: 0 }, { label: 'National', status: 'pending', avg_lag_months: 12 }]
    },
    weekly_activity: {
      signals_7d: Math.floor(Math.random() * 50),
      wow_change_pct: Math.floor(Math.random() * 40) - 10
    }
  };
};

export const INITIAL_TRENDS: TrendObject[] = [
  // WEAK SIGNALS (10)
  createTrend('t-weak-1', 'Adrenal-Supportive Lattes', TrendMaturity.WEAK_SIGNAL, Category.BEVERAGE, ['Stress Management', 'Metabolic Health'], [35, 45, 10, 5, 5], [65, 25, 10]),
  createTrend('t-weak-2', 'Adaptogenic Honey Sticks', TrendMaturity.WEAK_SIGNAL, Category.SNACK, ['Convenience', 'Stress Management'], [45, 35, 10, 5, 5], [70, 20, 10]),
  createTrend('t-weak-3', 'Mushroom Sipping Broth', TrendMaturity.WEAK_SIGNAL, Category.MEAL_KIT, ['Longevity', 'Gut Health'], [15, 30, 30, 15, 10], [40, 50, 10]),
  createTrend('t-weak-4', 'Cortisol-Conscious Cacao', TrendMaturity.WEAK_SIGNAL, Category.BEVERAGE, ['Metabolic Health', 'Longevity'], [25, 50, 15, 5, 5], [80, 10, 10]),
  createTrend('t-weak-5', 'Bio-Hacked Salt Crystals', TrendMaturity.WEAK_SIGNAL, Category.INGREDIENT, ['Performance', 'Longevity'], [20, 40, 20, 10, 10], [30, 60, 10]),
  createTrend('t-weak-6', 'Mood-Stabilizing Mints', TrendMaturity.WEAK_SIGNAL, Category.SNACK, ['Stress Management', 'Convenience'], [50, 30, 10, 5, 5], [60, 30, 10]),
  createTrend('t-weak-7', 'Cellular Repair Water', TrendMaturity.WEAK_SIGNAL, Category.BEVERAGE, ['Longevity', 'Metabolic Health'], [20, 20, 20, 20, 20], [45, 45, 10]),
  createTrend('t-weak-8', 'Nootropic Tea Wafers', TrendMaturity.WEAK_SIGNAL, Category.SNACK, ['Performance', 'Convenience'], [40, 40, 10, 5, 5], [50, 40, 10]),
  createTrend('t-weak-9', 'Electrolyte Fruit Strips', TrendMaturity.WEAK_SIGNAL, Category.SNACK, ['Performance', 'Metabolic Health'], [60, 20, 10, 5, 5], [50, 40, 10]),
  createTrend('t-weak-10', 'Fermented Herb Paste', TrendMaturity.WEAK_SIGNAL, Category.INGREDIENT, ['Gut Health', 'Longevity'], [10, 20, 40, 20, 10], [40, 40, 20]),

  // PRE-BREAKOUT (10)
  createTrend('t-pre-1', 'Precision Protein Crisps', TrendMaturity.PRE_BREAKOUT, Category.SNACK, ['GLP-1 Adoption', 'Muscle Preservation'], [10, 25, 40, 20, 5], [75, 20, 5]),
  createTrend('t-pre-2', 'Metabolic Infusion Water', TrendMaturity.PRE_BREAKOUT, Category.BEVERAGE, ['Metabolic Health', 'Performance'], [30, 40, 20, 5, 5], [50, 40, 10]),
  createTrend('t-pre-3', 'Glycemic-Control Grains', TrendMaturity.PRE_BREAKOUT, Category.INGREDIENT, ['Metabolic Health', 'Gut Health'], [5, 15, 35, 35, 10], [60, 30, 10]),
  createTrend('t-pre-4', 'Fiber-Dense Micro-Meals', TrendMaturity.PRE_BREAKOUT, Category.MEAL_KIT, ['GLP-1 Adoption', 'Gut Health'], [10, 20, 40, 20, 10], [70, 20, 10]),
  createTrend('t-pre-5', 'Personalized Gut Shots', TrendMaturity.PRE_BREAKOUT, Category.BEVERAGE, ['Gut Health', 'Performance'], [25, 45, 20, 5, 5], [55, 35, 10]),
  createTrend('t-pre-6', 'Low-GI Energy Pods', TrendMaturity.PRE_BREAKOUT, Category.SNACK, ['Performance', 'Metabolic Health'], [40, 30, 20, 5, 5], [40, 50, 10]),
  createTrend('t-pre-7', 'Muscle-Sparing Seltzers', TrendMaturity.PRE_BREAKOUT, Category.BEVERAGE, ['GLP-1 Adoption', 'Performance'], [15, 35, 35, 10, 5], [65, 25, 10]),
  createTrend('t-pre-8', 'Adrenal Recovery Shakes', TrendMaturity.PRE_BREAKOUT, Category.BEVERAGE, ['Stress Management', 'Performance'], [35, 35, 20, 5, 5], [45, 45, 10]),
  createTrend('t-pre-9', 'Probiotic Flour Blends', TrendMaturity.PRE_BREAKOUT, Category.INGREDIENT, ['Gut Health', 'Longevity'], [10, 25, 45, 15, 5], [75, 20, 5]),
  createTrend('t-pre-10', 'Longevity Fruit Bites', TrendMaturity.PRE_BREAKOUT, Category.SNACK, ['Longevity', 'Gut Health'], [15, 25, 30, 20, 10], [60, 30, 10]),

  // EARLY MAINSTREAM (10)
  createTrend('t-main-1', 'Fermented Botanical Sodas', TrendMaturity.EARLY_MAINSTREAM, Category.BEVERAGE, ['Gut Health', 'Moderation'], [30, 40, 15, 10, 5], [60, 30, 10]),
  createTrend('t-main-2', 'Zero-Proof Spirits', TrendMaturity.EARLY_MAINSTREAM, Category.BEVERAGE, ['Moderation', 'Stress Management'], [40, 35, 15, 5, 5], [50, 40, 10]),
  createTrend('t-main-3', 'High-Protein Plant Jerky', TrendMaturity.EARLY_MAINSTREAM, Category.SNACK, ['Performance', 'Convenience'], [35, 35, 20, 5, 5], [40, 50, 10]),
  createTrend('t-main-4', 'Clean-Label Energy Bars', TrendMaturity.EARLY_MAINSTREAM, Category.SNACK, ['Convenience', 'Metabolic Health'], [20, 30, 30, 15, 5], [45, 45, 10]),
  createTrend('t-main-5', 'Probiotic Coffee Pods', TrendMaturity.EARLY_MAINSTREAM, Category.BEVERAGE, ['Gut Health', 'Convenience'], [15, 35, 35, 10, 5], [55, 35, 10]),
  createTrend('t-main-6', 'Ancient Grain Pasta', TrendMaturity.EARLY_MAINSTREAM, Category.MEAL_KIT, ['Gut Health', 'Longevity'], [10, 20, 40, 20, 10], [65, 25, 10]),
  createTrend('t-main-7', 'Low-Sugar Electrolytes', TrendMaturity.EARLY_MAINSTREAM, Category.BEVERAGE, ['Performance', 'Metabolic Health'], [45, 35, 15, 5, 0], [40, 50, 10]),
  createTrend('t-main-8', 'Oat-Based Creamer', TrendMaturity.EARLY_MAINSTREAM, Category.INGREDIENT, ['Convenience', 'Moderation'], [25, 45, 20, 5, 5], [70, 20, 10]),
  createTrend('t-main-9', 'Collagen Fruit Gummies', TrendMaturity.EARLY_MAINSTREAM, Category.SNACK, ['Longevity', 'Convenience'], [20, 40, 30, 5, 5], [80, 10, 10]),
  createTrend('t-main-10', 'Cauliflower Snack Chips', TrendMaturity.EARLY_MAINSTREAM, Category.SNACK, ['Metabolic Health', 'Convenience'], [15, 30, 40, 10, 5], [65, 25, 10]),
];

export const INITIAL_SIGNALS: SignalObject[] = [
  {
    id: 's-soc-1',
    signal_type: SignalType.SOCIAL,
    source: 'Reddit /r/Biohacking',
    raw_excerpt: 'Has anyone tried mixing L-Theanine with raw cacao for late night focus without the cortisol spike? Finding traditional coffee is too abrasive now.',
    keyword_cluster: 'Cortisol-Conscious Stimulants',
    velocity: 94, novelty_score: 82, geo_origin: 'CA, USA', detected_at: '2024-05-22T08:30:00Z', confidence: 'high', linked_trends: ['t-weak-1'],
    demographics: { dominant_age: AgeBracket.YOUNG_MILLENNIAL, dominant_gender: GenderProfile.MALE, confidence: 'medium', inference_logic: 'Subreddit language pattern analysis.' }
  },
  {
    id: 's-sea-1',
    signal_type: SignalType.SEARCH,
    source: 'Google Search Trends',
    raw_excerpt: 'Surge in "protein crisp" queries coming out of fitness-dense zip codes in Austin and Miami. Velocity up 400% MoM.',
    keyword_cluster: 'Precision Protein Snacks',
    velocity: 88, novelty_score: 75, geo_origin: 'TX, USA', detected_at: '2024-05-21T14:12:00Z', confidence: 'high', linked_trends: ['t-pre-1'],
    demographics: { dominant_age: AgeBracket.GEN_Z, dominant_gender: GenderProfile.NEUTRAL, confidence: 'high', inference_logic: 'Search keyword velocity in fitness hubs.' }
  },
  {
    id: 's-ret-1',
    signal_type: SignalType.RETAIL,
    source: 'Erewhon Markets',
    raw_excerpt: 'Zero-proof spirit alternative section expanded by 4ft shelf space. Velocity of RTD botanical seltzers exceeding traditional mixers.',
    keyword_cluster: 'Zero-Proof RTD Breakout',
    velocity: 72, novelty_score: 45, geo_origin: 'CA, USA', detected_at: '2024-05-20T11:00:00Z', confidence: 'high', linked_trends: ['t-main-2'],
    demographics: { dominant_age: AgeBracket.OLDER_MILLENNIAL, dominant_gender: GenderProfile.FEMALE, confidence: 'high', inference_logic: 'Direct point-of-sale shelf expansion data.' }
  },
  {
    id: 's-fun-1',
    signal_type: SignalType.FUNDING,
    source: 'Crunchbase / Vibe Check',
    raw_excerpt: 'AppetiteTech raises $14M Series A to scale fiber-dense meal pods specifically marketed toward GLP-1 therapy users.',
    keyword_cluster: 'GLP-1 Companion Nutrition',
    velocity: 98, novelty_score: 92, geo_origin: 'NY, USA', detected_at: '2024-05-19T16:45:00Z', confidence: 'high', linked_trends: ['t-pre-4'],
    demographics: { dominant_age: AgeBracket.OLDER_MILLENNIAL, dominant_gender: GenderProfile.FEMALE, confidence: 'medium', inference_logic: 'Capital flow into specialized appetite management formats.' }
  },
  {
    id: 's-cre-1',
    signal_type: SignalType.CREATOR,
    source: 'TikTok / Austin Wellness',
    raw_excerpt: 'Why am I seeing blue metabolic water everywhere? Every coach in Austin is drinking this blue spirulina electrolyte blend.',
    keyword_cluster: 'Metabolic Visual Cues',
    velocity: 91, novelty_score: 68, geo_origin: 'TX, USA', detected_at: '2024-05-18T09:20:00Z', confidence: 'medium', linked_trends: ['t-pre-2'],
    demographics: { dominant_age: AgeBracket.GEN_Z, dominant_gender: GenderProfile.MALE, confidence: 'high', inference_logic: 'Visual format adoption among regional fitness creators.' }
  },
  {
    id: 's-rev-1',
    signal_type: SignalType.REVIEW,
    source: 'Amazon Verified Reviews',
    raw_excerpt: 'I used to salt everything, but these herb pastes give the same "hit" without the bloating. My gut feels better already.',
    keyword_cluster: 'Savory Gut Rituals',
    velocity: 55, novelty_score: 74, geo_origin: 'WA, USA', detected_at: '2024-05-17T20:10:00Z', confidence: 'medium', linked_trends: ['t-weak-10'],
    demographics: { dominant_age: AgeBracket.GEN_X, dominant_gender: GenderProfile.FEMALE, confidence: 'low', inference_logic: 'Linguistic shift from "flavor" to "gut ritual" in condiment reviews.' }
  },
  {
    id: 's-ads-1',
    signal_type: SignalType.ADS,
    source: 'Meta Ad Library',
    raw_excerpt: '34 new advertisers launched mushroom-based sipping broth campaigns this week. CPMs in "longevity" interest groups rising.',
    keyword_cluster: 'Mushroom Broth Density',
    velocity: 84, novelty_score: 60, geo_origin: 'National', detected_at: '2024-05-16T13:00:00Z', confidence: 'high', linked_trends: ['t-weak-3'],
    demographics: { dominant_age: AgeBracket.YOUNG_MILLENNIAL, dominant_gender: GenderProfile.NEUTRAL, confidence: 'medium', inference_logic: 'Ad spend acceleration in niche health interests.' }
  },
  {
    id: 's-soc-2',
    signal_type: SignalType.SOCIAL,
    source: 'Discord / LongevityDAO',
    raw_excerpt: 'The magnesium profile in these honey sticks is perfectly balanced with the L-Theanine. No crash, just steady alpha waves.',
    keyword_cluster: 'Neuro-Optimized Rituals',
    velocity: 62, novelty_score: 89, geo_origin: 'Global', detected_at: '2024-05-15T22:30:00Z', confidence: 'low', linked_trends: ['t-weak-2'],
    demographics: { dominant_age: AgeBracket.YOUNG_MILLENNIAL, dominant_gender: GenderProfile.MALE, confidence: 'medium', inference_logic: 'Community-specific jargon for ritual snacks.' }
  },
  {
    id: 's-sea-2',
    signal_type: SignalType.SEARCH,
    source: 'Google Search Trends',
    raw_excerpt: '"Cortisol cacao" search volume cross-referenced with "sleep hygiene" shows high correlation for the first time.',
    keyword_cluster: 'Sleep-State Nutrition',
    velocity: 78, novelty_score: 81, geo_origin: 'NY, USA', detected_at: '2024-05-14T10:15:00Z', confidence: 'medium', linked_trends: ['t-weak-4'],
    demographics: { dominant_age: AgeBracket.OLDER_MILLENNIAL, dominant_gender: GenderProfile.FEMALE, confidence: 'high', inference_logic: 'Cross-keyword intent mapping.' }
  },
  {
    id: 's-ret-2',
    signal_type: SignalType.RETAIL,
    source: 'Whole Foods Market',
    raw_excerpt: 'Probiotic coffee pods shifted from specialty endcap to main coffee aisle. Category velocity is stable but high.',
    keyword_cluster: 'Digestive Morning Routine',
    velocity: 42, novelty_score: 30, geo_origin: 'National', detected_at: '2024-05-13T08:00:00Z', confidence: 'high', linked_trends: ['t-main-5'],
    demographics: { dominant_age: AgeBracket.GEN_X, dominant_gender: GenderProfile.NEUTRAL, confidence: 'high', inference_logic: 'Mass retail shelf-slotting logic.' }
  }
];
