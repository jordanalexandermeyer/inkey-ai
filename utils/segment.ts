declare global {
  interface Window {
    analytics: any
  }
}

export const page = (properties: any) => {
  window.analytics.page(properties)
}

export const identify = (
  uid: string,
  name: string | null,
  email: string | null,
) => {
  window.analytics.identify(uid, {
    name,
    email,
  })
}

export const track = (eventName: string, properties: any = {}) => {
  window.analytics.track(eventName, properties)
}

export enum EventName {
  // Login Page
  LOG_IN_WITH_GOOGLE_BUTTON_CLICKED = 'Log In With Google Button Clicked',
  LOG_IN_WITH_EMAIL_BUTTON_CLICKED = 'Log In With Email Button Clicked',
  LOGGED_IN_WITH_GOOGLE = 'Logged In With Google',
  LOGGED_IN_WITH_EMAIL = 'Logged In With Email',
  // Signup Page
  SIGN_UP_WITH_GOOGLE_BUTTON_CLICKED = 'Sign Up With Google Button Clicked',
  SIGN_UP_WITH_EMAIL_BUTTON_CLICKED = 'Sign Up With Email Button Clicked',
  SIGNED_UP_WITH_GOOGLE = 'Signed Up With Google',
  SIGNED_UP_WITH_EMAIL = 'Signed Up With Email',
  // Dashboard Page
  SEE_TEMPLATES_BUTTON_CLICKED = 'See Templates Button Clicked',
  ASK_A_QUESTION_BUTTON_CLICKED = 'Ask A Question Button Clicked',
  SHARE_LINK_COPIED = 'Share Link Copied',
  FEEDBACK_SUBMITTED = 'Feedback Submitted',
  // Template Discovery Page
  TEMPLATE_PANEL_CLICKED = 'Template Panel Clicked',
  TEMPLATE_FILTER_CLICKED = 'Template Filter Clicked',
  // Individual Template Page
  PROMPT_INPUT_CLICKED = 'Prompt Input Clicked',
  TRY_EXAMPLE_PROMPT_BUTTON_CLICKED = 'Try Example Prompt Button Clicked',
  LENGTH_SELECTED = 'Length Selected',
  TONE_SELECTED = 'Tone Selected',
  POV_SELECTED = 'POV Selected',
  ADD_QUOTES_TOGGLE_CLICKED = 'Add Quotes Toggle Clicked',
  CODING_LANGUAGE_SELECTED = 'Coding Language Selected',
  LANGUAGE_SELECTED = 'Language Selected',
  POEM_TYPE_SELECTED = 'Poem Type Selected',
  SUMMARY_METHOD_SELECTED = 'Summary Method Selected',
  CONTENT_TO_INCLUDE_INPUT_CLICKED = 'Content To Include Input Clicked',
  CLEAR_INPUTS_BUTTON_CLICKED = 'Clear Inputs Button Clicked',
  CANCEL_BUTTON_CLICKED = 'Cancel Button Clicked',
  GENERATE_BUTTON_CLICKED = 'Generate Button Clicked',
  COPY_OUTPUT_BUTTON_CLICKED = 'Copy Output Button Clicked',
  CLEAR_OUTPUT_BUTTON_CLICKED = 'Clear Output Button Clicked',
  // Multiple Pages
  PROMPT_SUBMITTED = 'Prompt Submitted',
  OUTPUT_GENERATED = 'Output Generated',
  USER_LEFT = 'User Left',
  USER_SIGNED_OUT = 'User Signed Out',
  // Upgrade Page
  SUBSCRIPTION_LENGTH_SELECTED = 'Subscription Length Selected',
  GET_PREMIUM_BUTTON_CLICKED = 'Get Premium Button Clicked',
  GET_ULTIMATE_BUTTON_CLICKED = 'Get Ultimate Button Clicked',
  UPGRADED = 'Upgraded',
}
