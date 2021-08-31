export enum CheckoutFormActions {
  SUCCEEDED = 'SUCCEEDED',
  ERROR = 'ERROR',
  PROCESSING = 'PROCESSING',
  DISABLED = 'DISABLED',
  CLIENTSECRET = 'CLIENTSECRET'
}

interface CheckoutFormAction {
  type: CheckoutFormActions;
  payload: any;
}

export interface CheckoutFormState {
  succeeded: boolean;
  error: string;
  processing: boolean;
  disabled: boolean;
  clientSecret: string;
}

export function CheckoutFormReducer(state: CheckoutFormState, action: CheckoutFormAction):CheckoutFormState {
  const { type, payload } = action;
  switch (type) {
    case CheckoutFormActions.SUCCEEDED:
      return {
        ...state,
        succeeded: payload,
      };
    case CheckoutFormActions.ERROR:
      return {
        ...state,
        error: payload,
      };
    case CheckoutFormActions.PROCESSING:
      return {
        ...state,
        processing: payload,
      };
    case CheckoutFormActions.DISABLED:
      return {
        ...state,
        disabled: payload,
      };
    case CheckoutFormActions.CLIENTSECRET:
      return {
        ...state,
        clientSecret: payload,
      };
    default:
      return state;
  }
}
