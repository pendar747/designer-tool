export interface AsyncActionConstant {
  request: string,
  success: string,
  failure: string
};

export interface Action<PayloadT = void> {
  type: string,
  payload: PayloadT
}

export const createAsyncActionConstant = (type: string): AsyncActionConstant => ({
  request: `${type}_REQUEST`,
  success: `${type}_SUCCESS`,
  failure: `${type}_failure`
});

export const creatUIAction = <PayloadT = void>(type: string) => (payload: PayloadT): Action<PayloadT> => ({
  type,
  payload
});

export const createAsyncAction = <RequestPayloadT = void, SuccessPayloadT = void, FailurePayloadT = void>(type: AsyncActionConstant) => ({
  request: (payload: RequestPayloadT): Action<RequestPayloadT> => ({ type: type.request, payload }),
  success: (payload: SuccessPayloadT): Action<SuccessPayloadT> => ({ type: type.success, payload }),
  failure: (payload: FailurePayloadT): Action<FailurePayloadT> => ({ type: type.failure, payload })
});