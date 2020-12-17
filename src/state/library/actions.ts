import { createAsyncAction, createAsyncActionConstant, createUIAction } from '../actionCreators';

export const SHOW_CREATE_LIBRARY_MODAL = 'SHOW_CREATE_LIBRARY_MODAL';
export const CREATE_LIBRARY = createAsyncActionConstant('CREATE_LIBRARY');

export const showCreateLibraryModalAction = createUIAction<boolean>(SHOW_CREATE_LIBRARY_MODAL);
export const createLibraryAction = createAsyncAction(CREATE_LIBRARY);