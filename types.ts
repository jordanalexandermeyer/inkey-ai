import Stripe from 'stripe'

export interface Customer {
  stripe_customer_id?: string
}

export interface Product {
  active?: boolean
  name?: string
  description?: string
  image?: string
  metadata?: Stripe.Metadata
}

export interface ProductWithPrice extends Product {
  prices?: Price[]
}

export interface Price {
  product_id?: string
  active?: boolean
  description?: string
  unit_amount?: number
  currency?: string
  type?: Stripe.Price.Type
  interval?: Stripe.Price.Recurring.Interval
  interval_count?: number
  trial_period_days?: number | null
  metadata?: Stripe.Metadata
  products?: Product
}

export interface PriceWithProduct extends Price {}

export interface Subscription {
  id: string
  status?: Stripe.Subscription.Status
  metadata?: Stripe.Metadata
  quantity?: number
  cancel_at_period_end?: boolean
  created: string
  current_period_start: string
  current_period_end: string
  ended_at?: string
  cancel_at?: string
  canceled_at?: string
  trial_start?: string
  trial_end?: string
  prices?: Price
  role: Role
}

export enum Role {
  BASIC = 'basic',
  PREMIUM = 'premium',
  ULTIMATE = 'ultimate',
}

export interface UsageDetails {
  monthly_allowance: number
  monthly_usage: number
  total_usage: number
  bonus_allowance: number
}

export interface ReferralCode {
  id: string
  provider: string
  provider_bonus_allowance: number
  recipient_bonus_allowance: number
}

export interface Referral {
  provider: string
  recipient: string
  referral_code: ReferralCode
}

export enum BillingPeriod {
  MONTHLY = 'monthly',
  SEMI_ANNUALLY = 'semi-annually',
  ANNUALLY = 'annually',
}

export interface Feature {
  text: string
  color: string
  included: boolean
}

export enum Agent {
  USER = 'user',
  INKEY = 'inkey',
}

export interface Output {
  agent: Agent
  text: string
}

export enum EssayLength {
  SHORT = 'short',
  LONG = 'long',
}

export interface Quote {
  value: string
}

export interface QuoteMap {
  [key: string]: Quote
}

export enum PointOfView {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
}

export enum SummaryMethod {
  PARAGRAPH = 'paragraph',
  BULLET_POINTS = 'bullet-points',
}

export enum PoemType {
  FREE_VERSE = 'free-verse',
  SONNET = 'sonnet',
  ACROSTIC = 'acrostic',
  LIMERICK = 'limerick',
  HAIKU = 'haiku',
  ODE = 'ode',
  ELEGY = 'elegy',
  BALLAD = 'ballad',
}

export enum FilterType {
  WHOLE_ESSAYS = 'whole-essays',
  ESSAY_PARTS = 'essay-parts',
  WRITING_TOOLS = 'writing-tools',
  JOB_TOOLS = 'job-tools',
  CLASS_TOOLS = 'class-tools',
  OTHER = 'other',
}

export interface Filter {
  text: string
  selected: boolean
}

export interface FilterMap {
  [key: string]: Filter
}

export enum CodingLanguages {
  PYTHON = 'Python',
  JAVASCRIPT = 'Javascript',
  TYPESCRIPT = 'Typescript',
  C = 'C',
  C_PLUS_PLUS = 'C++',
  C_SHARP = 'C#',
  OBJECTIVE_C = 'Objective-C',
  GO = 'Go',
  PHP = 'Php',
  RUBY = 'Ruby',
  DART = 'Dart',
  JAVA = 'Java',
  SWIFT = 'Swift',
  KOTLIN = 'Kotlin',
  R = 'R',
  MATLAB = 'Matlab',
  SCALA = 'Scala',
}
