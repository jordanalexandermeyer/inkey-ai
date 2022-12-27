/*
 * Copyright 2020 Stripe, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Stripe from 'stripe';
import * as admin from 'firebase-admin';

export interface CustomerData {
  metadata: {
    firebaseUID: string;
  };
  email?: string;
  phone?: string;
}

export interface Price {
  /**
   * Whether the price can be used for new purchases.
   */
  active: boolean;
  currency: string;
  unit_amount: number;
  /**
   * A brief description of the price.
   */
  description: string | null;
  /**
   * One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
   */
  type: 'one_time' | 'recurring';
  /**
   * The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.
   */
  interval: 'day' | 'month' | 'week' | 'year' | null;
  /**
   * The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.
   */
  interval_count: number | null;
  /**
   * Default number of trial days when subscribing a customer to this price using [`trial_from_plan=true`](https://stripe.com/docs/api#create_subscription-trial_from_plan).
   */
  trial_period_days: number | null;
  /**
   * Any additional properties
   */
  [propName: string]: any;
}

export interface Product {
  /**
   * Whether the product is currently available for purchase.
   */
  active: boolean;
  /**
   * The product's name, meant to be displayable to the customer. Whenever this product is sold via a subscription, name will show up on associated invoice line item descriptions.
   */
  name: string;
  /**
   * The product's description, meant to be displayable to the customer. Use this field to optionally store a long form explanation of the product being sold for your own rendering purposes.
   */
  description: string | null;
  /**
   * The role that will be assigned to the user if they are subscribed to this plan.
   */
  role: string | null;
  /**
   * A list of up to 8 URLs of images for this product, meant to be displayable to the customer.
   */
  images: Array<string>;
  /**
   * A list of Prices for this billing product.
   */
  prices?: Array<Price>;
  /**
   * Any additional properties
   */
  [propName: string]: any;
}

export interface TaxRate extends Stripe.TaxRate {
  /**
   * Any additional properties
   */
  [propName: string]: any;
}

export interface Subscription {
  id?: string;
  /**
   * Set of key-value pairs that you can attach to an object.
   * This can be useful for storing additional information about the object in a structured format.
   */
  metadata: {
    [name: string]: string;
  };
  stripeLink: string;
  role: string | null;
  quantity: number;
  items: Stripe.SubscriptionItem[];
  /**
   * Firestore reference to the product doc for this Subscription.
   */
  product: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
  /**
   * Firestore reference to the price for this Subscription.
   */
  price: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
  /**
   * Array of price references. If you prvoide multiple recurring prices to the checkout session via the `line_items` parameter,
   * this array will hold the references for all recurring prices for this subscription. `price === prices[0]`.
   */
  prices: Array<
    FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
  >;
  payment_method?: string;
  latest_invoice?: string;
  /**
   * The status of the subscription object
   */
  status:
    | 'active'
    | 'canceled'
    | 'incomplete'
    | 'incomplete_expired'
    | 'past_due'
    | 'trialing'
    | 'unpaid';
  /**
   * If true the subscription has been canceled by the user and will be deleted at the end of the billing period.
   */
  cancel_at_period_end: boolean;
  /**
   * Time at which the object was created.
   */
  created: FirebaseFirestore.Timestamp;
  /**
   * Start of the current period that the subscription has been invoiced for.
   */
  current_period_start: FirebaseFirestore.Timestamp;
  /**
   * End of the current period that the subscription has been invoiced for. At the end of this period, a new invoice will be created.
   */
  current_period_end: FirebaseFirestore.Timestamp;
  /**
   * If the subscription has ended, the timestamp of the date the subscription ended.
   */
  ended_at: FirebaseFirestore.Timestamp | null;
  /**
   * A date in the future at which the subscription will automatically get canceled.
   */
  cancel_at: FirebaseFirestore.Timestamp | null;
  /**
   * If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will still reflect the date of the initial cancellation request, not the end of the subscription period when the subscription is automatically moved to a canceled state.
   */
  canceled_at: FirebaseFirestore.Timestamp | null;
  /**
   * If the subscription has a trial, the beginning of that trial.
   */
  trial_start: FirebaseFirestore.Timestamp | null;
  /**
   * If the subscription has a trial, the end of that trial.
   */
  trial_end: FirebaseFirestore.Timestamp | null;
}

export interface ReferralCode {
  provider: string;
  provider_bonus_allowance: number;
  recipient_bonus_allowance: number;
}

export interface Referral {
  provider: string;
  recipient: string;
  referral_code: admin.firestore.DocumentReference<
    admin.firestore.DocumentData
  >;
}

export interface UsageDetails {
  monthly_allowance: number;
  monthly_usage: number;
  total_usage: number;
  bonus_allowance: number;
}

export enum EssayLength {
  SHORT = 'short',
  LONG = 'long',
}

export interface Quote {
  value: string;
}

export interface QuoteMap {
  [key: string]: Quote;
}

export enum PointOfView {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
}

export enum SummaryMethod {
  PARAGRAPH = 'paragraph',
  TLDR = 'TLDR',
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

export enum TemplateId {
  // Whole essays
  GENERAL_ESSAY_ID = 'general-essay',
  COLLEGE_APP_ESSAY_ID = 'college-app-essay',
  PERSUASIVE_ESSAY_ID = 'persuasive-essay',
  EXPOSITORY_ESSAY_ID = 'expository-essay',
  COMPARE_CONTRAST_ESSAY_ID = 'compare-contrast-essay',
  ARGUMENTATIVE_ESSAY_ID = 'argumentative-essay',
  CAUSE_EFFECT_ESSAY_ID = 'cause-effect-essay',
  NARRATIVE_ESSAY_ID = 'narrative-essay',
  DEFINITION_ESSAY_ID = 'definition-essay',
  DESCRIPTIVE_ESSAY_ID = 'descriptive-essay',
  LITERARY_ESSAY_ID = 'literary-essay',
  SCIENTIFIC_ESSAY_ID = 'scientific-essay',

  // Essay parts
  THESIS_ID = 'thesis',
  INTRODUCTION_PARAGRAPH_ID = 'introduction-paragraph',
  BODY_PARAGRAPH_ID = 'body-paragraph',
  CONCLUSION_PARAGRAPH_ID = 'conclusion-paragraph',

  // Other
  POEM_ID = 'poem',
  SPEECH_ID = 'speech',
  STORY_ID = 'story',

  // Writing tools
  TRANSLATOR_ID = 'translator',
  PARAPHRASER_ID = 'paraphraser',
  SUMMARIZER_ID = 'summarizer',

  // Class tools
  DISCUSSION_BOARD_RESPONSE_ID = 'discussion-board-response',

  // Professional
  BLOG_ID = 'blog',
  // EMAIL_ID = '',
  // EMAIL_RESPONSE_ID = '',
  // BLOG_OUTLINE_ID = '',
  // BLOG_IDEAS_ID = '',

  // Job
  LINKEDIN_BIO_ID = 'linkedin-bio',
  COVER_LETTER_ID = 'cover-letter',
  RESUME_BULLET_POINTS_ID = 'resume-bullet-points',

  // Coding
  CODING_QUESTION_SOLVER_ID = 'coding-question-solver',
  FUNCTION_ID = 'function',
  CLASS_ID = 'class',
  SCRIPT_ID = 'script',
  REGEX_ID = 'regex',
  EXPLAIN_CODE_ID = 'explain-code',
}
