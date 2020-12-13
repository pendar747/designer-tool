export interface Action<PayloadT> {
  type: string,
  payload: PayloadT
}

export const creatUIAction = <PayloadT = any>(type: string) => (payload: PayloadT): Action<PayloadT> => ({
  type,
  payload
});

export const createAsyncAction = <RequestPayloadT, SuccessPayloadT, FailurePayloadT>(type: string) => ({
  request: (payload: RequestPayloadT): Action<RequestPayloadT> => ({ type: `${type}_REQUEST`, payload }),
  success: (payload: SuccessPayloadT): Action<SuccessPayloadT> => ({ type: `${type}_SUCCESS`, payload }),
  failure: (payload: FailurePayloadT): Action<FailurePayloadT> => ({ type: `${type}_FAILURE`, payload })
});