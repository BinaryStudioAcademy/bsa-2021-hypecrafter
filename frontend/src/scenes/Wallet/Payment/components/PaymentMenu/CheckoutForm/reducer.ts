export enum CheckoutFormActions {
  SUCCEEDED = 'SUCCEEDED',
  ERROR = 'ERROR',
  PROCESSING = 'PROCESSING',
  DISABLED = 'DISABLED',
  CLIENTSECRET = 'CLIENTSECRET'
}

interface CheckoutFormAction {
  type: CheckoutFormActions;
  payload: boolean | string;
}

interface CheckoutFormState {
  succeeded: boolean;
  error: string;
  processing: boolean;
  disabled: boolean;
  clientSecret: string;
}

export function CheckoutFormReducer(state: CheckoutFormState, action: CheckoutFormAction) {
  const { type, payload } = action;
  switch (type) {
    case CheckoutFormActions.SUCCEEDED:
      return {
        ...state,
        value: payload,
      };
    case CheckoutFormActions.ERROR:
      return {
        ...state,
        value: payload,
      };
    case CheckoutFormActions.PROCESSING:
      return {
        ...state,
        value: payload,
      };
    case CheckoutFormActions.DISABLED:
      return {
        ...state,
        value: payload,
      };
    case CheckoutFormActions.CLIENTSECRET:
      return {
        ...state,
        value: payload,
      };
    default:
      return state;
  }
}
