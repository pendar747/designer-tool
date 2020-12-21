import { CreateLibraryArgs } from '../../services/library';
import { Library } from '../../types/library';
import { createAsyncAction, createAsyncActionConstant, createUIAction } from '../actionCreators';

export const SHOW_CREATE_LIBRARY_MODAL = 'SHOW_CREATE_LIBRARY_MODAL';
export const CREATE_LIBRARY = createAsyncActionConstant('CREATE_LIBRARY');
export const FETCH_LIBRARIES = createAsyncActionConstant('FETCH_LIBRARIES');
export const UPDATE_LIBRARY = createAsyncActionConstant('UPDATE_LIBRARY');
export const DELETE_LIBRARY = createAsyncActionConstant('DELETE_LIBRARY');

export const showEditLibraryModalAction = createUIAction<{ show: boolean, libraryId?: string }>(SHOW_CREATE_LIBRARY_MODAL);
export const createLibraryAction = createAsyncAction<CreateLibraryArgs, Library, void>(CREATE_LIBRARY);
export const fetchUserLibrariesAction = createAsyncAction<void, Library[], void>(FETCH_LIBRARIES);
export const updateLibraryAction = createAsyncAction<{ library: Library }, { library: Library }>(UPDATE_LIBRARY);
export const deleteLibraryAction = createAsyncAction<{ libraryId: string }, { libraryId: string }>(DELETE_LIBRARY);